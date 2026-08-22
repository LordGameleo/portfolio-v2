'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

interface Ripple { id: number; x: number; y: number }

// ─── Milky Way canvas ─────────────────────────────────────────────────────────
function useStarfield(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const scrollRef = useRef(0)
  const frameRef  = useRef<number>()

  // Expose a stable setter so the hook doesn't need re-wiring on scroll
  const setScroll = (v: number) => { scrollRef.current = v }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Pre-build static star field (stable across frames) ─────────────────
    interface StarData { x: number; y: number; r: number; baseA: number; twinkle: number }
    const stars: StarData[] = Array.from({ length: 350 }, (_, i) => ({
      x:       (i * 137.508) % 100,
      y:       (i * 89.312)  % 100,
      r:       0.3 + (i % 6) * 0.2,
      baseA:   0.15 + (i % 5) * 0.15,
      twinkle: (i * 0.97)  % (Math.PI * 2),
    }))

    // ── Pre-build Milky Way dust particles ─────────────────────────────────
    interface DustData { alongFrac: number; perpFrac: number; r: number; baseA: number }
    const dust: DustData[] = Array.from({ length: 2800 }, (_, i) => {
      const perp = (((i * 37.1) % 200) - 100) / 100   // −1 … +1 normalised
      const gauss = Math.exp(-perp * perp * 3.5)        // Gaussian falloff from band centre
      return {
        alongFrac: (i * 57.3) % 100,
        perpFrac:  perp,
        r:         0.3 + ((i * 1.7) % 3) * 0.35,
        baseA:     gauss * (0.04 + ((i * 3.1) % 10) * 0.006),
      }
    })

    // ── Constellation data (5 formations) ──────────────────────────────────
    type Node = { xPct: number; yPct: number }
    type Const = { nodes: Node[]; edges: [number, number][] }
    const constellations: Const[] = [
      { nodes:[{xPct:12,yPct:12},{xPct:20,yPct:20},{xPct:14,yPct:30},{xPct:24,yPct:36},{xPct:9,yPct:40},{xPct:26,yPct:40}],
        edges:[[0,1],[1,2],[2,3],[3,4],[3,5]] },
      { nodes:[{xPct:72,yPct:10},{xPct:80,yPct:13},{xPct:88,yPct:10},{xPct:90,yPct:20},{xPct:82,yPct:26},{xPct:74,yPct:22}],
        edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]] },
      { nodes:[{xPct:8,yPct:8},{xPct:16,yPct:18},{xPct:26,yPct:8},{xPct:34,yPct:18},{xPct:42,yPct:8}],
        edges:[[0,1],[1,2],[2,3],[3,4]] },
      { nodes:[{xPct:60,yPct:8},{xPct:52,yPct:18},{xPct:60,yPct:24},{xPct:68,yPct:18},{xPct:60,yPct:16}],
        edges:[[0,4],[1,4],[2,4],[3,4]] },
      { nodes:[{xPct:82,yPct:30},{xPct:76,yPct:40},{xPct:80,yPct:50},{xPct:72,yPct:56},{xPct:78,yPct:62},{xPct:85,yPct:58}],
        edges:[[0,1],[1,2],[2,3],[3,4],[4,5]] },
    ]

    let frame = 0

    const draw = () => {
      const W  = canvas.width
      const H  = canvas.height
      const sp = scrollRef.current

      ctx.clearRect(0, 0, W, H)

      // Pure black background
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, W, H)

      // ── Milky Way band ────────────────────────────────────────────────────
      const bandAngle = -0.45   // radians — matches the sweeping diagonal
      const cosA = Math.cos(bandAngle)
      const sinA = Math.sin(bandAngle)
      const bandOriginX = W * 0.5
      const bandOriginY = H * 0.42
      const bandLen = Math.max(W, H) * 1.8

      dust.forEach(d => {
        const along  = (d.alongFrac / 100 - 0.5) * bandLen
        const perpPx = d.perpFrac * 140          // band width ≈ 280 px
        const x = bandOriginX + along * cosA - perpPx * sinA
        const y = bandOriginY + along * sinA + perpPx * cosA
        if (x < -10 || x > W + 10 || y < -10 || y > H + 10) return

        ctx.beginPath()
        ctx.arc(x, y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${d.baseA})`
        ctx.fill()
      })

      // Soft glow along band centre (two radial gradients)
      const g1 = ctx.createLinearGradient(
        bandOriginX - bandLen * 0.5 * cosA, bandOriginY - bandLen * 0.5 * sinA,
        bandOriginX + bandLen * 0.5 * cosA, bandOriginY + bandLen * 0.5 * sinA,
      )
      g1.addColorStop(0,    'rgba(255,255,255,0)')
      g1.addColorStop(0.35, 'rgba(200,180,255,0.025)')
      g1.addColorStop(0.5,  'rgba(220,200,255,0.045)')
      g1.addColorStop(0.65, 'rgba(200,180,255,0.025)')
      g1.addColorStop(1,    'rgba(255,255,255,0)')
      ctx.save()
      ctx.translate(bandOriginX, bandOriginY)
      ctx.rotate(bandAngle)
      ctx.fillStyle = g1
      ctx.fillRect(-bandLen * 0.55, -90, bandLen * 1.1, 180)
      ctx.restore()

      // ── Stars (twinkle + scroll parallax) ─────────────────────────────────
      const t = frame * 0.016
      stars.forEach(s => {
        const sx = (s.x / 100) * W
        const sy = (s.y / 100) * H - sp * H * 0.22
        const twinkle = 0.55 + 0.45 * Math.sin(t + s.twinkle)
        const a = s.baseA * twinkle
        ctx.beginPath()
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${a})`
        ctx.fill()
      })

      // ── Constellations (fade in/out per scroll band) ───────────────────────
      const N = constellations.length
      constellations.forEach((c, ci) => {
        const bandStart = ci / N
        const bandMid   = (ci + 0.5) / N
        const bandEnd   = (ci + 1.3) / N
        let alpha = 0
        if (sp >= bandStart && sp <= bandEnd) {
          if (sp < bandMid)  alpha = (sp - bandStart) / (bandMid - bandStart)
          else               alpha = 1 - (sp - bandMid) / (bandEnd - bandMid)
          alpha = Math.max(0, Math.min(1, alpha))
        }
        if (alpha < 0.02) return

        const nodes = c.nodes.map(n => ({
          px: (n.xPct / 100) * W,
          py: (n.yPct / 100) * H,
        }))

        // Dashed edges
        ctx.strokeStyle = `rgba(200,180,255,${alpha * 0.4})`
        ctx.lineWidth   = 0.8
        ctx.setLineDash([3, 7])
        c.edges.forEach(([a, b]) => {
          ctx.beginPath()
          ctx.moveTo(nodes[a].px, nodes[a].py)
          ctx.lineTo(nodes[b].px, nodes[b].py)
          ctx.stroke()
        })
        ctx.setLineDash([])

        // Star nodes
        nodes.forEach(n => {
          // Glow
          const grd = ctx.createRadialGradient(n.px, n.py, 0, n.px, n.py, 9)
          grd.addColorStop(0, `rgba(180,160,255,${alpha * 0.5})`)
          grd.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = grd
          ctx.beginPath(); ctx.arc(n.px, n.py, 9, 0, Math.PI * 2); ctx.fill()
          // Core
          ctx.beginPath(); ctx.arc(n.px, n.py, 1.8, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(230,220,255,${alpha * 0.95})`
          ctx.fill()
        })
      })

      frame++
      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)
    return () => {
      window.removeEventListener('resize', resize)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [canvasRef])

  return setScroll
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function GlobalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const { scrollYProgress } = useScroll()

  const setScroll = useStarfield(canvasRef)
  useMotionValueEvent(scrollYProgress, 'change', setScroll)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const id = Date.now() + Math.random()
      setRipples(p => [...p, { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => setRipples(p => p.filter(r => r.id !== id)), 900)
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />

      <div className="fixed inset-0 pointer-events-none z-[1]">
        <AnimatePresence>
          {ripples.map(r => (
            <motion.div key={r.id} className="absolute" style={{ left: r.x, top: r.y }}>
              <motion.div
                className="absolute rounded-full border border-white/30"
                style={{ x: '-50%', y: '-50%' }}
                animate={{ width: [0, 100], height: [0, 100], opacity: [0.8, 0] }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute rounded-full border border-white/15"
                style={{ x: '-50%', y: '-50%' }}
                animate={{ width: [0, 200], height: [0, 200], opacity: [0.5, 0] }}
                transition={{ duration: 0.9, ease: 'easeOut', delay: 0.05 }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}

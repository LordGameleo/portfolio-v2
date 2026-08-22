'use client'

/**
 * SpaceOrbit — photorealistic planet with 4 moons on differently-inclined orbits.
 * Each moon is depth-sorted: rendered behind the planet when in the back half,
 * in front when in the front half, using SVG z-order + opacity motion values.
 */
import { useTime, useTransform, motion, type MotionValue } from 'framer-motion'

const CX = 150, CY = 150   // planet centre in SVG canvas
const PR = 78              // planet radius

// ─── Orbit definitions ────────────────────────────────────────────────────────
interface OrbitDef {
  rx: number        // semi-major axis (px)
  ry: number        // semi-minor axis (px)
  theta: number     // orbit rotation from horizontal (radians)
  period: number    // ms for full revolution
  phase: number     // starting phase offset (radians)
  moonR: number     // moon radius
  color: string     // moon colour
  glowColor: string // glow rgba string
  ringAlpha: number // ring stroke opacity
}

const ORBITS: OrbitDef[] = [
  // A — nearly equatorial
  { rx: 118, ry: 26,  theta: 0,            period:  9500, phase: 0,
    moonR: 3.5, color: '#ede9fe', glowColor: 'rgba(237,233,254,0.6)', ringAlpha: 0.45 },
  // B — 30° tilt
  { rx: 102, ry: 52,  theta:  0.52,        period:  7200, phase: Math.PI * 0.5,
    moonR: 2.8, color: '#c4b5fd', glowColor: 'rgba(196,181,253,0.55)', ringAlpha: 0.35 },
  // C — −48° tilt
  { rx:  88, ry: 76,  theta: -0.84,        period: 12500, phase: Math.PI,
    moonR: 2.2, color: '#a78bfa', glowColor: 'rgba(167,139,250,0.5)', ringAlpha: 0.28 },
  // D — 68° tilt (almost polar)
  { rx:  70, ry: 90,  theta:  1.19,        period:  5200, phase: Math.PI * 1.5,
    moonR: 1.8, color: '#7c3aed', glowColor: 'rgba(124,58,237,0.45)', ringAlpha: 0.22 },
]

const STARS = [
  { x:18,y:22,r:1.0,a:0.60 }, { x:272,y:38,r:0.8,a:0.40 },
  { x:42,y:272,r:1.1,a:0.65 }, { x:258,y:262,r:0.9,a:0.50 },
  { x:8,y:145,r:0.7,a:0.40 }, { x:290,y:152,r:1.0,a:0.50 },
  { x:148,y:8,r:0.8,a:0.40 }, { x:145,y:290,r:0.9,a:0.50 },
  { x:78,y:65,r:0.6,a:0.40 }, { x:222,y:218,r:0.7,a:0.40 },
  { x:30,y:205,r:0.9,a:0.60 }, { x:262,y:78,r:0.7,a:0.40 },
]

// ─── Moon motion values ───────────────────────────────────────────────────────
interface MoonValues {
  mx: MotionValue<number>
  my: MotionValue<number>
  backOpacity: MotionValue<number>
  frontOpacity: MotionValue<number>
  orb: OrbitDef
}

function useMoon(t: MotionValue<number>, orb: OrbitDef): MoonValues {
  const cos = Math.cos(orb.theta)
  const sin = Math.sin(orb.theta)

  // Orbital phase (increases with time)
  const alpha = useTransform(t, ms =>
    (ms / orb.period) * Math.PI * 2 + orb.phase
  )

  // Parametric position on rotated ellipse
  const mx = useTransform(alpha, a =>
    CX + orb.rx * Math.cos(a) * cos - orb.ry * Math.sin(a) * sin
  )
  const my = useTransform(alpha, a =>
    CY + orb.rx * Math.cos(a) * sin + orb.ry * Math.sin(a) * cos
  )

  // Depth: moon is "in front" when it's below the planet centre (y > CY)
  const backOpacity  = useTransform(my, (y): number => y <= CY ? 1 : 0)
  const frontOpacity = useTransform(my, (y): number => y >  CY ? 1 : 0)

  return { mx, my, backOpacity, frontOpacity, orb }
}

// ─── Moon layer (back or front) ───────────────────────────────────────────────
function MoonLayer({ moons, which }: {
  moons: MoonValues[]
  which: 'back' | 'front'
}) {
  return (
    <>
      {moons.map((m, i) => {
        const opacity = which === 'back' ? m.backOpacity : m.frontOpacity
        return (
          <g key={i}>
            {/* Glow halo */}
            <motion.circle
              style={{ cx: m.mx, cy: m.my, opacity }}
              r={m.orb.moonR * 3.5}
              fill="none"
              stroke={m.orb.color}
              strokeWidth="0"
            />
            <motion.ellipse
              style={{ cx: m.mx, cy: m.my, opacity }}
              rx={m.orb.moonR * 3}
              ry={m.orb.moonR * 3}
              fill={m.orb.glowColor.replace('0.', '0.0').replace('rgba', 'rgba')}
            />
            {/* Core */}
            <motion.circle
              style={{ cx: m.mx, cy: m.my, opacity }}
              r={m.orb.moonR}
              fill={m.orb.color}
            />
          </g>
        )
      })}
    </>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SpaceOrbit() {
  const t = useTime()

  // Build motion values for each moon
  // (hooks must be called unconditionally — one per orbit)
  const moonA = useMoon(t, ORBITS[0])
  const moonB = useMoon(t, ORBITS[1])
  const moonC = useMoon(t, ORBITS[2])
  const moonD = useMoon(t, ORBITS[3])
  const moons = [moonA, moonB, moonC, moonD]

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[340px]" aria-hidden>
      <defs>
        {/* Planet gradients */}
        <radialGradient id="planetMain" cx="33%" cy="27%" r="72%">
          <stop offset="0%"   stopColor="#c084fc" />
          <stop offset="18%"  stopColor="#9333ea" />
          <stop offset="42%"  stopColor="#6d28d9" />
          <stop offset="68%"  stopColor="#3b0764" />
          <stop offset="88%"  stopColor="#12003a" />
          <stop offset="100%" stopColor="#04000f" />
        </radialGradient>
        <radialGradient id="terminator" cx="68%" cy="72%" r="60%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.55)" />
          <stop offset="55%"  stopColor="rgba(0,0,0,0.30)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <radialGradient id="atmRim" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0)" />
          <stop offset="70%"  stopColor="rgba(0,0,0,0)" />
          <stop offset="86%"  stopColor="rgba(124,58,237,0.22)" />
          <stop offset="96%"  stopColor="rgba(168,85,247,0.32)" />
          <stop offset="100%" stopColor="rgba(196,130,255,0)" />
        </radialGradient>
        <radialGradient id="specular" cx="30%" cy="24%" r="28%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.38)" />
          <stop offset="60%"  stopColor="rgba(255,255,255,0.06)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <radialGradient id="atmHalo" cx="50%" cy="50%" r="50%">
          <stop offset="78%"  stopColor="rgba(0,0,0,0)" />
          <stop offset="90%"  stopColor="rgba(109,40,217,0.18)" />
          <stop offset="100%" stopColor="rgba(88,28,135,0)" />
        </radialGradient>
        <clipPath id="planetClip">
          <circle cx={CX} cy={CY} r={PR} />
        </clipPath>
      </defs>

      {/* Stars */}
      {STARS.map((s, i) => (
        <motion.circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white"
          animate={{ opacity: [s.a, s.a * 0.2, s.a] }}
          transition={{ duration: 2 + (i % 5) * 0.7, delay: i * 0.28, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Orbit track rings ── */}
      {ORBITS.map((orb, i) => (
        <ellipse key={i}
          cx={CX} cy={CY} rx={orb.rx} ry={orb.ry}
          transform={`rotate(${(orb.theta * 180) / Math.PI} ${CX} ${CY})`}
          fill="none"
          stroke={orb.color}
          strokeOpacity={orb.ringAlpha}
          strokeWidth="0.8"
          strokeDasharray="2 8"
        />
      ))}

      {/* Atmospheric outer halo */}
      <circle cx={CX} cy={CY} r={PR + 12} fill="url(#atmHalo)" />

      {/* ── BACK moons (rendered before planet — depth behind) ── */}
      <MoonLayer moons={moons} which="back" />

      {/* ── Planet ── */}
      <circle cx={CX} cy={CY} r={PR} fill="url(#planetMain)" />
      <g clipPath="url(#planetClip)">
        <ellipse cx={CX} cy={CY - 22} rx={PR} ry={9}  fill="rgba(147,51,234,0.14)" />
        <ellipse cx={CX} cy={CY -  8} rx={PR} ry={5}  fill="rgba(124,58,237,0.10)" />
        <ellipse cx={CX} cy={CY + 14} rx={PR} ry={7}  fill="rgba(88,28,135,0.18)" />
        <ellipse cx={CX} cy={CY + 28} rx={PR} ry={4}  fill="rgba(109,40,217,0.12)" />
        <ellipse cx={CX + 22} cy={CY + 10} rx={18} ry={9} fill="rgba(192,132,252,0.08)" />
      </g>
      <circle cx={CX} cy={CY} r={PR} fill="url(#terminator)" />
      <circle cx={CX} cy={CY} r={PR} fill="url(#atmRim)" />
      <circle cx={CX} cy={CY} r={PR} fill="url(#specular)" />

      {/* ── FRONT moons (rendered after planet — depth in front) ── */}
      <MoonLayer moons={moons} which="front" />
    </svg>
  )
}

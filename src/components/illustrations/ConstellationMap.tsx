'use client'

/**
 * ConstellationMap — star field with two constellations whose edges draw in on mount.
 * Used in the Skills section left column.
 */
import { motion } from 'framer-motion'

// Two mini-constellations on a 300×300 canvas
const CONST_A = {
  stars: [
    { x: 60,  y: 55  },
    { x: 100, y: 30  },
    { x: 140, y: 60  },
    { x: 115, y: 100 },
    { x: 75,  y: 95  },
  ],
  edges: [[0,1],[1,2],[2,3],[3,4],[4,0],[1,3]] as [number,number][],
}

const CONST_B = {
  stars: [
    { x: 185, y: 175 },
    { x: 220, y: 155 },
    { x: 255, y: 170 },
    { x: 240, y: 205 },
    { x: 200, y: 210 },
    { x: 225, y: 190 },
  ],
  edges: [[0,1],[1,2],[2,3],[3,4],[4,0],[1,5],[2,5],[0,5]] as [number,number][],
}

const BG_STARS = [
  {x:20,y:20,r:0.9},{x:280,y:15,r:1.1},{x:15,y:280,r:0.8},{x:285,y:285,r:1.0},
  {x:155,y:10,r:0.7},{x:10,y:155,r:0.9},{x:285,y:150,r:0.8},{x:150,y:290,r:0.7},
  {x:40,y:190,r:0.6},{x:240,y:50,r:0.8},{x:265,y:240,r:0.9},{x:35,y:100,r:0.7},
  {x:170,y:145,r:0.5},{x:90,y:200,r:0.6},{x:200,y:90,r:0.8},
]

const LINE_VARIANT = {
  hidden: { pathLength: 0, opacity: 0 },
  show:   { pathLength: 1, opacity: 1, transition: { duration: 1.2, ease: 'easeOut' } },
}

function ConstellationSVG({ data, delay = 0 }: {
  data: typeof CONST_A; delay?: number
}) {
  return (
    <>
      {data.edges.map(([a, b], i) => {
        const s = data.stars[a], e = data.stars[b]
        return (
          <motion.line
            key={i}
            x1={s.x} y1={s.y} x2={e.x} y2={e.y}
            stroke="rgba(167,139,250,0.45)" strokeWidth="0.9"
            strokeDasharray="3 5"
            variants={LINE_VARIANT}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: delay + i * 0.15, duration: 1.0, ease: 'easeOut' }}
          />
        )
      })}

      {data.stars.map((s, i) => (
        <motion.g key={i}>
          {/* Glow */}
          <motion.circle cx={s.x} cy={s.y} r={7} fill="rgba(139,92,246,0.2)"
            animate={{ r: [6, 9, 6], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2.5 + i * 0.4, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Core */}
          <motion.circle cx={s.x} cy={s.y} r={2.5} fill="#c4b5fd"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + i * 0.1, duration: 0.4 }}
          />
        </motion.g>
      ))}
    </>
  )
}

export default function ConstellationMap() {
  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[320px]" aria-hidden>
      {/* Background stars */}
      {BG_STARS.map((s, i) => (
        <motion.circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2 + (i % 5) * 0.7, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Nebula hint */}
      <ellipse cx={150} cy={150} rx={100} ry={70} fill="rgba(88,28,135,0.06)" />

      <ConstellationSVG data={CONST_A} delay={0.2} />
      <ConstellationSVG data={CONST_B} delay={0.8} />
    </svg>
  )
}

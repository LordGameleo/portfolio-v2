'use client'

/**
 * DeepSpaceSignal — satellite dish transmitting into deep space.
 * Used in the Contact section right column.
 */
import { motion } from 'framer-motion'

export default function DeepSpaceSignal() {
  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[300px]" aria-hidden>
      <defs>
        <radialGradient id="dishGlow" cx="50%" cy="50%">
          <stop offset="0%"   stopColor="rgba(124,58,237,0.3)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      {/* Background stars */}
      {[
        {x:30,y:40},{x:260,y:30},{x:50,y:240},{x:270,y:250},
        {x:155,y:20},{x:15,y:140},{x:280,y:130},{x:150,y:275},
        {x:80,y:80},{x:220,y:200},{x:240,y:70},{x:60,y:195},
      ].map((s, i) => (
        <motion.circle key={i} cx={s.x} cy={s.y} r={0.9 + (i%3)*0.3} fill="white"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2 + i*0.4, delay: i*0.25, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Dish glow */}
      <ellipse cx={150} cy={220} rx={70} ry={40} fill="url(#dishGlow)" />

      {/* Dish body */}
      {/* Parabola approximated by arc */}
      <motion.path
        d="M 95 220 Q 150 170 205 220"
        fill="none" stroke="rgba(139,92,246,0.8)" strokeWidth="3" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      {/* Dish inner detail */}
      <motion.path
        d="M 110 220 Q 150 182 190 220"
        fill="none" stroke="rgba(167,139,250,0.4)" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
      />
      {/* Support pole */}
      <motion.line x1={150} y1={220} x2={150} y2={260}
        stroke="rgba(139,92,246,0.7)" strokeWidth="3" strokeLinecap="round"
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        style={{ transformOrigin: '150px 260px' }}
        transition={{ duration: 0.5, delay: 1.1 }}
      />
      {/* Base */}
      <motion.line x1={120} y1={260} x2={180} y2={260}
        stroke="rgba(139,92,246,0.6)" strokeWidth="3" strokeLinecap="round"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        style={{ transformOrigin: '150px 260px' }}
        transition={{ duration: 0.5, delay: 1.3 }}
      />
      {/* Feed horn */}
      <motion.circle cx={150} cy={195} r={5}
        fill="#7c3aed"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 1.2 }}
      />
      <motion.circle cx={150} cy={195} r={8}
        fill="none" stroke="rgba(167,139,250,0.4)" strokeWidth={1}
        animate={{ r: [8, 12, 8], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
      />

      {/* Signal arcs — expanding from dish */}
      {[0, 1, 2, 3].map(i => (
        <motion.path
          key={i}
          d={`M ${150 - 20 - i*22} ${190 - i*22} Q 150 ${145 - i*25} ${150 + 20 + i*22} ${190 - i*22}`}
          fill="none"
          stroke={`rgba(139,92,246,${0.6 - i*0.12})`}
          strokeWidth={1.2 - i*0.15}
          strokeLinecap="round"
          strokeDasharray="4 5"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: [0, 0.8, 0], pathLength: 1 }}
          transition={{
            opacity:    { duration: 1.6, delay: 1.5 + i * 0.5, repeat: Infinity, ease: 'easeOut' },
            pathLength: { duration: 0.8, delay: 1.5 + i * 0.5, repeat: Infinity, ease: 'easeOut' },
          }}
        />
      ))}

      {/* Distant star cluster — "target" */}
      {[{x:148,y:55},{x:155,y:48},{x:142,y:50},{x:158,y:58},{x:145,y:63}].map((s,i)=>(
        <motion.circle key={i} cx={s.x} cy={s.y} r={1.2} fill="#e9d5ff"
          animate={{ opacity:[0.3,1,0.3] }}
          transition={{ duration:1.5, delay:i*0.3, repeat:Infinity, ease:'easeInOut' }}
        />
      ))}
    </svg>
  )
}

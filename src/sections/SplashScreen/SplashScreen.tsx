'use client'

import { motion } from 'framer-motion'
import { greeting } from '../../data/portfolio'

// Deterministic star positions for the splash
const SPLASH_STARS = Array.from({ length: 60 }, (_, i) => ({
  cx: (i * 137.5) % 100,
  cy: (i * 89.3)  % 100,
  r:  0.3 + (i % 4) * 0.25,
  delay: (i * 0.11) % 2,
  dur:   1.5 + (i % 5) * 0.5,
}))

export default function SplashScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050510]"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Star field */}
      <svg className="absolute inset-0 w-full h-full" aria-hidden>
        {SPLASH_STARS.map((s, i) => (
          <motion.circle
            key={i}
            cx={`${s.cx}%`} cy={`${s.cy}%`} r={s.r} fill="white"
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </svg>

      {/* Central nebula glow */}
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Planet */}
      <motion.div
        className="relative w-20 h-20 rounded-full mb-6"
        style={{ background: 'radial-gradient(circle at 38% 32%, #7c3aed, #1e1b4b)' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Orbital ring */}
        <svg className="absolute -inset-6" viewBox="0 0 80 80" aria-hidden>
          <ellipse cx="40" cy="40" rx="36" ry="9"
            fill="none" stroke="rgba(167,139,250,0.5)" strokeWidth="1.2" strokeDasharray="3 5"
          />
        </svg>
      </motion.div>

      {/* Name */}
      <motion.div
        className="relative flex items-center gap-px font-agustina text-2xl sm:text-3xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-zinc-600">&lt;</span>
        <span className="text-white">{greeting.username}</span>
        <span className="text-zinc-600">/&gt;</span>
      </motion.div>

      {/* Subtitle loading dots */}
      <motion.div
        className="relative flex gap-1.5 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-1 h-1 rounded-full bg-violet-400"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
            transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

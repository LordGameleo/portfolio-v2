'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex items-center gap-1 w-[52px] h-[26px] rounded-full px-1
        border transition-colors duration-300
        border-gray-300 bg-gray-200
        dark:border-white/[0.12] dark:bg-white/[0.07]"
    >
      {/* Sun icon */}
      <Sun
        size={11}
        className="relative z-10 flex-shrink-0 transition-colors duration-300 text-amber-500 dark:text-zinc-600"
      />

      {/* Sliding thumb */}
      <motion.span
        className="absolute w-[18px] h-[18px] rounded-full shadow-sm
          bg-white dark:bg-violet-500"
        animate={{ x: isDark ? 26 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        style={{ top: '50%', translateY: '-50%', willChange: 'transform' }}
      />

      {/* Moon icon */}
      <Moon
        size={11}
        className="relative z-10 ml-auto flex-shrink-0 transition-colors duration-300 text-zinc-400 dark:text-violet-300"
      />
    </button>
  )
}

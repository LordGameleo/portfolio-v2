'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function AnimatedCursor() {
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const ringX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.5 })
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 0.5 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  return (
    // Hidden on touch devices via CSS in index.css (pointer: coarse has auto cursor)
    <div className="hidden md:block pointer-events-none select-none">
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-violet-400"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
      />
      {/* Lagging ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] w-9 h-9 rounded-full border border-violet-400/50"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
      />
    </div>
  )
}

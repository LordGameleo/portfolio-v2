'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ExperienceCard from './ExperienceCard'
import { workExperiences } from '../../data/portfolio'

export default function WorkExperience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 85%', 'end 15%'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" className="relative z-10 py-24 sm:py-32 max-w-6xl mx-auto px-6 sm:px-8">
      <div className="w-full h-px bg-white/[0.06] mb-24" />

      <motion.h2
        className="font-orbitron text-xs sm:text-sm tracking-[0.35em] uppercase text-white/90 mb-16"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        Experiences
      </motion.h2>

      <div ref={containerRef} className="relative">
        {/* Scroll-driven timeline line */}
        <div className="absolute left-0 md:left-[calc(50%-0.5px)] top-0 bottom-0 hidden md:block w-px bg-white/[0.05]">
          <motion.div
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-transparent via-white/20 to-transparent"
            style={{ scaleY, height: '100%', originY: 0 }}
          />
        </div>

        {workExperiences.map((exp, i) => (
          <ExperienceCard key={`${exp.company}-${i}`} exp={exp} index={i} isLeft={i % 2 === 0} />
        ))}
      </div>
    </section>
  )
}

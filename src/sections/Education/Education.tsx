'use client'

import { motion } from 'framer-motion'
import EducationCard from './EducationCard'
import { educationInfo } from '../../data/portfolio'

export default function Education() {
  return (
    <section id="education" className="relative z-10 py-24 sm:py-32 max-w-6xl mx-auto px-6 sm:px-8">
      <div className="w-full h-px bg-white/[0.06] mb-24" />

      <motion.h2
        className="font-orbitron text-xs sm:text-sm tracking-[0.35em] uppercase text-white/90 mb-12"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        Education
      </motion.h2>

      <div className="flex flex-col gap-6 max-w-2xl">
        {educationInfo.map((school, i) => (
          <EducationCard key={i} school={school} index={i} />
        ))}
      </div>
    </section>
  )
}

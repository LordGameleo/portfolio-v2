'use client'

import { motion } from 'framer-motion'
import { type School } from '../../data/portfolio'

export default function EducationCard({ school, index }: { school: School; index: number }) {
  return (
    <motion.div
      className="flex items-start gap-5 py-6 border-b border-white/[0.06]"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden bg-white/5 flex items-center justify-center">
        <img src={school.logo} alt={school.schoolName}
          loading="lazy" className="w-8 h-8 object-contain" crossOrigin="anonymous" />
      </div>

      <div className="min-w-0">
        <p className="font-space text-xs tracking-widest uppercase text-white/60 mb-1">{school.duration}</p>
        <h3 className="font-space text-white/90 text-sm sm:text-base font-medium leading-snug mb-0.5">
          {school.schoolName}
        </h3>
        <p className="font-space text-violet-400/80 text-xs sm:text-sm">{school.subHeader}</p>
      </div>
    </motion.div>
  )
}

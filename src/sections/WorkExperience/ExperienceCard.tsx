'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { type WorkExperienceEntry } from '../../data/portfolio'
import { cn } from '../../lib/utils'

const COLLAPSED = 3

interface Props { exp: WorkExperienceEntry; index: number; isLeft: boolean }

function LiveBadge() {
  return (
    <span className="flex items-center gap-1.5 font-space text-[9px] tracking-[0.2em] uppercase text-emerald-400/90">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
        <span className="relative rounded-full h-1.5 w-1.5 bg-emerald-400" />
      </span>
      Current
    </span>
  )
}

export default function ExperienceCard({ exp, index, isLeft }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={cn(
      'relative flex items-start mb-12',
      'flex-col md:flex-row md:gap-10',
      isLeft ? 'md:flex-row-reverse' : '',
    )}>
      {/* Timeline dot */}
      {exp.isCurrent ? (
        <span className="absolute left-0 md:left-1/2 top-1.5 hidden md:flex -translate-x-1/2 z-10">
          <span className="animate-ping absolute h-3 w-3 rounded-full opacity-40" style={{ backgroundColor: exp.brandColor }} />
          <span className="relative h-3 w-3 rounded-full" style={{ backgroundColor: exp.brandColor, boxShadow: `0 0 10px ${exp.brandColor}` }} />
        </span>
      ) : (
        <div className="absolute left-0 md:left-1/2 top-1.5 w-2.5 h-2.5 rounded-full border border-white/30 bg-black -translate-x-1/2 z-10 hidden md:block" />
      )}

      <div className="hidden md:block md:w-[calc(50%-1.25rem)] flex-shrink-0" />

      {/* Card */}
      <motion.div
        className={cn(
          'w-full md:w-[calc(50%-1.25rem)] flex-shrink-0',
          'border-l-2 pl-5 py-1',
          exp.isCurrent ? 'border-l-[3px]' : 'border-white/[0.08]',
        )}
        style={exp.isCurrent ? { borderLeftColor: exp.brandColor } : undefined}
        initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, delay: index * 0.07 }}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            {exp.companylogo ? (
              <img src={exp.companylogo} alt={exp.company} crossOrigin="anonymous"
                loading="lazy" className="w-6 h-6 object-contain opacity-80" />
            ) : (
              <span className="w-6 h-6 flex items-center justify-center text-xs font-bold text-white/50"
                style={{ color: exp.brandColor }}>
                {exp.company[0]}
              </span>
            )}
            <div>
              <p className="font-orbitron text-[10px] tracking-[0.2em] uppercase text-white/80">{exp.company}</p>
              <p className="font-space text-[10px] text-white/60 tracking-widest mt-0.5">{exp.date}</p>
            </div>
          </div>
          {exp.isCurrent && <LiveBadge />}
        </div>

        <p className="font-space text-xs sm:text-sm text-white/70 tracking-wider mb-3">{exp.role}</p>

        {exp.descBullets.length > 0 && (
          <>
            {/* layout on wrapper → height animates smoothly when items appear/disappear */}
            <motion.div layout transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}>
              <ul className="space-y-2 list-none">
                <AnimatePresence initial={false}>
                  {exp.descBullets.map((bullet, i) => {
                    if (!expanded && i >= COLLAPSED) return null
                    return (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="flex gap-2 font-space text-white/60 text-xs leading-relaxed"
                      >
                        <span className="mt-1.5 w-0.5 h-0.5 rounded-full bg-white/30 flex-shrink-0" />
                        {bullet}
                      </motion.li>
                    )
                  })}
                </AnimatePresence>
              </ul>
            </motion.div>

            {exp.descBullets.length > COLLAPSED && (
              <button onClick={() => setExpanded(p => !p)}
                className="mt-3 flex items-center gap-1 font-space text-[10px] tracking-widest uppercase text-white/55 hover:text-white/70 transition-colors">
                {expanded ? 'Show less' : `+${exp.descBullets.length - COLLAPSED} more`}
                <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown size={12} />
                </motion.span>
              </button>
            )}
          </>
        )}

        {exp.isCurrent && exp.descBullets.length === 1 && (
          <p className="font-space text-white/60 text-xs italic mt-2 border-t border-white/[0.06] pt-2">
            Still writing the full story — check back soon ✍️
          </p>
        )}
      </motion.div>
    </div>
  )
}

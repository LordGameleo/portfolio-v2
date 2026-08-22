'use client'

import { motion } from 'framer-motion'
import ConstellationMap from '../../components/illustrations/ConstellationMap'
import SkillPill from './SkillPill'
import EducationCard from '../Education/EducationCard'
import { skillsSection, techStack, educationInfo } from '../../data/portfolio'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      className="font-orbitron text-xs sm:text-sm tracking-[0.35em] uppercase text-white/90 mb-10"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.h2>
  )
}

function ProgressBar({ stack, percentage, index }: { stack: string; percentage: number; index: number }) {
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-space text-xs tracking-widest uppercase text-white/70">{stack}</span>
        <span className="font-space text-xs text-white/65">{percentage}%</span>
      </div>
      <div className="h-px w-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-white/60"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.2 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'left', width: `${percentage}%` }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 py-24 sm:py-32 max-w-6xl mx-auto px-6 sm:px-8">

      {/* ── Tool icons ── */}
      <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16 mb-20">
        <motion.div
          className="hidden lg:block lg:max-w-[220px] lg:flex-1 opacity-70"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 0.7, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <ConstellationMap />
        </motion.div>

        <div className="flex-1 w-full">
          <SectionLabel>{skillsSection.title}</SectionLabel>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {skillsSection.softwareSkills.map((skill, i) => (
              <SkillPill key={skill.skillName} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/[0.06] mb-20" />

      {/* ── Proficiency + Education in the same row ── */}
      <div className="flex flex-col md:flex-row md:gap-16 md:items-start">

        {/* Proficiency */}
        <div className="flex-1 mb-16 md:mb-0">
          <SectionLabel>Proficiency</SectionLabel>
          {techStack.map((entry, i) => (
            <ProgressBar
              key={entry.Stack}
              stack={entry.Stack}
              percentage={entry.progressPercentage}
              index={i}
            />
          ))}
        </div>

        {/* Vertical divider — desktop only */}
        <div className="hidden md:block w-px self-stretch bg-white/[0.06]" />

        {/* Education */}
        <div id="education" className="flex-1">
          <SectionLabel>Education</SectionLabel>
          <div className="flex flex-col gap-5">
            {educationInfo.map((school, i) => (
              <EducationCard key={i} school={school} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

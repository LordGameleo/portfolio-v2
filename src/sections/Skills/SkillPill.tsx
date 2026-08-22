'use client'

import { motion } from 'framer-motion'
import { type SoftwareSkill } from '../../data/portfolio'
import KotlinIcon from '../../components/icons/KotlinIcon'
import SqlIcon from '../../components/icons/SqlIcon'
import FlutterIcon from '../../components/icons/FlutterIcon'
import CosmosIcon from '../../components/icons/CosmosIcon'
import KubernetesIcon from '../../components/icons/KubernetesIcon'
import CursorIcon from '../../components/icons/CursorIcon'
import ClaudeIcon from '../../components/icons/ClaudeIcon'

function CustomIcon({ svg }: { svg: SoftwareSkill['svg'] }) {
  const s = { size: 22 }
  switch (svg) {
    case 'kotlin':     return <KotlinIcon {...s} />
    case 'sql':        return <SqlIcon {...s} />
    case 'flutter':    return <FlutterIcon {...s} />
    case 'cosmos':     return <CosmosIcon {...s} />
    case 'kubernetes': return <KubernetesIcon {...s} />
    case 'cursor':     return <CursorIcon {...s} />
    case 'claude':     return <ClaudeIcon {...s} />
    default:           return null
  }
}

export default function SkillPill({ skill, index }: { skill: SoftwareSkill; index: number }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-1.5 px-3 py-2.5 group cursor-default
        border border-white/[0.08] bg-white/[0.03]
        text-white/65 hover:text-white hover:border-white/30 transition-colors duration-300"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.035 }}
      whileHover={{ scale: 1.08 }}
      style={{ willChange: 'transform' }}
    >
      <span className="text-[22px] leading-none">
        {skill.svg
          ? <CustomIcon svg={skill.svg} />
          : <i className={skill.fontAwesomeClassname} />}
      </span>
      <span className="font-space text-[9px] sm:text-[10px] tracking-widest uppercase whitespace-nowrap">
        {skill.skillName}
      </span>
    </motion.div>
  )
}

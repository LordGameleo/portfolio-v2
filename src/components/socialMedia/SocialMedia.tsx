'use client'

import { Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { socialMediaLinks } from '../../data/portfolio'
import { cn } from '../../lib/utils'

const links = [
  { href: socialMediaLinks.github,              label: 'GitHub',   icon: Github  },
  { href: socialMediaLinks.linkedin,            label: 'LinkedIn', icon: Linkedin },
  { href: `mailto:${socialMediaLinks.gmail}`,   label: 'Email',    icon: Mail    },
]

export default function SocialMedia({ size = 'md', className }: { size?: 'sm'|'md'|'lg'; className?: string }) {
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 17
  const boxSize  = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-10 h-10' : 'w-9 h-9'

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {links.map(({ href, label, icon: Icon }) => (
        <motion.a
          key={label}
          href={href}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          aria-label={label}
          className={cn(
            'flex items-center justify-center border border-white/[0.08] text-white/30',
            'hover:text-white hover:border-white/30 transition-colors duration-300',
            boxSize,
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon size={iconSize} />
        </motion.a>
      ))}
    </div>
  )
}

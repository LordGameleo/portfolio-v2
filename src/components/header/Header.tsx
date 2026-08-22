'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { greeting } from '../../data/portfolio'
import { cn } from '../../lib/utils'

// `external` links leave the homepage, so they never participate in
// active-section tracking. /research is a static passthrough published by
// scripts/sync-research.mjs, not a Next route — plain <a>, never next/link.
const NAV_LINKS: { label: string; href: string; external?: boolean }[] = [
  { label: 'Resume',     href: '#resume' },
  { label: 'Skills & Education', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
  { label: 'Research',   href: '/research', external: true },
]

function useActiveSection() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const ids = NAV_LINKS.filter(l => !l.external).map(l => l.href.replace('#', ''))

    const update = () => {
      // Trigger point: 40% down from the top of the viewport
      const trigger = window.scrollY + window.innerHeight * 0.4

      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= trigger) {
          current = id
        }
      }
      setActive(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return active
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useActiveSection()

  useEffect(() => {
    const h = () => { setScrolled(window.scrollY > 10); if (window.scrollY > 10) setMenuOpen(false) }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-[border-color] duration-500',
      scrolled ? 'border-b border-white/[0.04] bg-black/60 backdrop-blur-md' : 'border-b border-transparent',
    )}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between h-14 sm:h-16">
        {/* Logo */}
        <a href="/" className="flex items-center gap-1 font-agustina text-sm sm:text-base shrink-0">
          <span className="text-white/25">&lt;</span>
          <span className="text-white/90">{greeting.username}</span>
          <span className="text-white/25">/&gt;</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, href, external }) => {
            const isActive = !external && activeSection === href.replace('#', '')
            return (
              <a key={href} href={href}
                className={cn(
                  'font-space text-[10px] tracking-[0.25em] uppercase transition-colors duration-300',
                  isActive ? 'text-white' : 'text-white/30 hover:text-white/70',
                )}>
                {label}
              </a>
            )
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/40 hover:text-white transition-colors p-1.5"
          onClick={() => setMenuOpen(p => !p)}
          aria-label={menuOpen ? 'Close' : 'Menu'}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="md:hidden border-t border-white/[0.04] bg-black/90 backdrop-blur-md"
          >
            <nav className="flex flex-col py-3 px-6 gap-1">
              {NAV_LINKS.map(({ label, href, external }) => {
                const isActive = !external && activeSection === href.replace('#', '')
                return (
                  <a key={href} href={href} onClick={() => setMenuOpen(false)}
                    className={cn(
                      'font-space text-[10px] tracking-[0.25em] uppercase py-3 transition-colors',
                      isActive ? 'text-white' : 'text-white/30',
                    )}>
                    {label}
                  </a>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

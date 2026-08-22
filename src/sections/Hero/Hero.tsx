'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SocialMedia from '../../components/socialMedia/SocialMedia'
import SpaceOrbit from '../../components/illustrations/SpaceOrbit'
import { greeting } from '../../data/portfolio'

const TYPEWRITER_TEXT = 'Curiosity-driven Software Engineer'
const CHAR_DELAY = 42

function useTypewriter(text: string) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(id); setDone(true) }
    }, CHAR_DELAY)
    return () => clearInterval(id)
  }, [text])
  return { displayed, done }
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.055 } } }
const charVariant = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Hero() {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT)
  const nameChars = greeting.username.split('')

  return (
    <section id="resume" className="relative min-h-screen flex items-center overflow-hidden pt-14 sm:pt-16">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-28
        flex flex-col md:flex-row items-center gap-12 md:gap-8">

        {/* ── Text ── */}
        <div className="w-full md:w-[58%] shrink-0">

          {/* Title badge */}
          <motion.p
            className="font-space text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/65 mb-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {greeting.title}
          </motion.p>

          {/* Name — character stagger, Agustina font */}
          <motion.h1
            className="font-agustina text-5xl sm:text-6xl md:text-7xl text-white leading-none mb-6 flex flex-wrap"
            variants={container} initial="hidden" animate="show"
          >
            {nameChars.map((char, i) => (
              <motion.span key={i} variants={charVariant}>
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            className="font-space text-violet-400 text-sm sm:text-base tracking-widest mb-6 min-h-[1.5rem]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
          >
            {displayed}
            {!done && <span className="inline-block w-px h-4 bg-violet-400 ml-0.5 animate-pulse" />}
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="font-space text-white/70 text-sm sm:text-base leading-relaxed mb-8 max-w-lg"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            {greeting.subTitle}
          </motion.p>

          {/* Thin separator */}
          <motion.div
            className="w-16 h-px bg-white/20 mb-8"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            style={{ transformOrigin: 'left' }}
            transition={{ delay: 1.3, duration: 0.6 }}
          />

          {/* Social + CTAs */}
          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <SocialMedia />
            <div className="flex flex-wrap gap-3">
              <a href="#contact"
                className="font-space px-6 py-2.5 text-sm tracking-widest uppercase
                  border border-white/20 text-white hover:bg-white hover:text-black
                  transition-colors duration-300">
                Contact Me
              </a>
              <a href="/resume.pdf" download={greeting.resumeDownloadName}
                className="font-space px-6 py-2.5 text-sm tracking-widest uppercase
                  border border-white/10 text-white/60 hover:border-white/30 hover:text-white
                  transition-colors duration-300">
                Resume
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Illustration ── */}
        <motion.div
          className="flex-1 flex items-center justify-center opacity-80"
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 0.8, x: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <SpaceOrbit />
        </motion.div>
      </div>
    </section>
  )
}

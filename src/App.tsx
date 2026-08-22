'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import AnimatedCursor from './components/AnimatedCursor/AnimatedCursor'
import GlobalBackground from './components/GlobalBackground/GlobalBackground'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import SplashScreen from './sections/SplashScreen/SplashScreen'
import Hero from './sections/Hero/Hero'

// Lazy-load below-fold sections — JS loads only when needed
const Skills       = dynamic(() => import('./sections/Skills/Skills'))
const WorkExperience = dynamic(() => import('./sections/WorkExperience/WorkExperience'))
const Contact      = dynamic(() => import('./sections/Contact/Contact'))

const SPLASH_DURATION = 1000

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px]">
      <motion.div
        className="absolute left-0 top-0 h-full rounded-r-full
          bg-gradient-to-r from-violet-600 via-indigo-400 to-violet-500"
        style={{ width }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
          w-[10px] h-[10px] rounded-full bg-violet-300
          shadow-[0_0_8px_3px_rgba(167,139,250,0.7),0_0_20px_6px_rgba(139,92,246,0.35)]" />
      </motion.div>
    </div>
  )
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), SPLASH_DURATION)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Scope cursor:none to the portfolio page only */}
      <style>{`
        @media (pointer: fine) {
          body, a, button, [role='button'] { cursor: none !important; }
        }
      `}</style>
      <GlobalBackground />
      <ScrollProgressBar />
      <AnimatedCursor />

      {/* Content renders immediately underneath the splash so it loads during the 1s wait */}
      <Header />
      <main className="relative z-10">
        <Hero />
        <Skills />
        <WorkExperience />
        <Contact />
      </main>
      <Footer />

      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>
    </div>
  )
}

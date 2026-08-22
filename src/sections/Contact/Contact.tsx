'use client'

import { motion } from 'framer-motion'
import { Phone, Mail } from 'lucide-react'
import SocialMedia from '../../components/socialMedia/SocialMedia'
import { contactInfo } from '../../data/portfolio'

/**
 * ISS-accurate space station SVG:
 * - Dark-blue solar panels with cell grid overlay
 * - Metallic truss with specular highlight line
 * - White cylindrical pressure modules with gradient
 * - Radiator panels in light grey
 */
function SpaceStation() {
  return (
    <motion.svg
      viewBox="0 0 300 130"
      className="w-36 opacity-90"
      aria-hidden
      animate={{ rotate: 360 }}
      transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      style={{ willChange: 'transform' }}
    >
      <defs>
        {/* Solar panel fill — dark navy */}
        <linearGradient id="sp" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#1e3d6e" />
          <stop offset="100%" stopColor="#0d1e38" />
        </linearGradient>
        {/* Solar cell grid overlay */}
        <pattern id="grid" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M5,0 L0,0 0,5" fill="none" stroke="rgba(120,200,255,0.22)" strokeWidth="0.35" />
        </pattern>
        {/* Main truss — metallic gradient */}
        <linearGradient id="truss" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#ccd4e0" />
          <stop offset="45%"  stopColor="#8090a4" />
          <stop offset="100%" stopColor="#4a5464" />
        </linearGradient>
        {/* Pressure modules — white cylinder look */}
        <linearGradient id="mod" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#eef2fa" />
          <stop offset="55%"  stopColor="#b8c4d8" />
          <stop offset="100%" stopColor="#606878" />
        </linearGradient>
        {/* Radiator panels */}
        <linearGradient id="rad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#c8d4e4" />
          <stop offset="100%" stopColor="#8898ac" />
        </linearGradient>
      </defs>

      {/* ─── SOLAR ARRAYS ─────────────────────────────────────────────────────
          4 array pairs (P6, P4, S4, S6) each with 2 upper + 2 lower panels.
          Panel size: 46 × 19px. Gap between inner/outer: 3px.
          Mast connects panel block to truss centre (y=64).
      ───────────────────────────────────────────────────────────────────────── */}

      {/* ── P6 (far left) x=4–50 ── */}
      {/* upper masts */}
      <line x1="18" y1="44" x2="18" y2="62" stroke="#8898aa" strokeWidth="1.2"/>
      <line x1="36" y1="44" x2="36" y2="62" stroke="#8898aa" strokeWidth="1.2"/>
      {/* upper outer panel */}
      <rect x="4"  y="7"  width="46" height="19" fill="url(#sp)"/><rect x="4"  y="7"  width="46" height="19" fill="url(#grid)"/>
      {/* upper inner panel */}
      <rect x="4"  y="27" width="46" height="17" fill="url(#sp)"/><rect x="4"  y="27" width="46" height="17" fill="url(#grid)"/>
      {/* lower masts */}
      <line x1="18" y1="66" x2="18" y2="84" stroke="#8898aa" strokeWidth="1.2"/>
      <line x1="36" y1="66" x2="36" y2="84" stroke="#8898aa" strokeWidth="1.2"/>
      {/* lower inner panel */}
      <rect x="4"  y="84" width="46" height="17" fill="url(#sp)"/><rect x="4"  y="84" width="46" height="17" fill="url(#grid)"/>
      {/* lower outer panel */}
      <rect x="4"  y="102" width="46" height="19" fill="url(#sp)"/><rect x="4"  y="102" width="46" height="19" fill="url(#grid)"/>

      {/* ── P4 (left-centre) x=60–106 ── */}
      <line x1="74" y1="44" x2="74" y2="62" stroke="#8898aa" strokeWidth="1.2"/>
      <line x1="92" y1="44" x2="92" y2="62" stroke="#8898aa" strokeWidth="1.2"/>
      <rect x="60" y="7"  width="46" height="19" fill="url(#sp)"/><rect x="60" y="7"  width="46" height="19" fill="url(#grid)"/>
      <rect x="60" y="27" width="46" height="17" fill="url(#sp)"/><rect x="60" y="27" width="46" height="17" fill="url(#grid)"/>
      <line x1="74" y1="66" x2="74" y2="84" stroke="#8898aa" strokeWidth="1.2"/>
      <line x1="92" y1="66" x2="92" y2="84" stroke="#8898aa" strokeWidth="1.2"/>
      <rect x="60" y="84" width="46" height="17" fill="url(#sp)"/><rect x="60" y="84" width="46" height="17" fill="url(#grid)"/>
      <rect x="60" y="102" width="46" height="19" fill="url(#sp)"/><rect x="60" y="102" width="46" height="19" fill="url(#grid)"/>

      {/* ── S4 (right-centre) x=194–240 ── */}
      <line x1="208" y1="44" x2="208" y2="62" stroke="#8898aa" strokeWidth="1.2"/>
      <line x1="226" y1="44" x2="226" y2="62" stroke="#8898aa" strokeWidth="1.2"/>
      <rect x="194" y="7"  width="46" height="19" fill="url(#sp)"/><rect x="194" y="7"  width="46" height="19" fill="url(#grid)"/>
      <rect x="194" y="27" width="46" height="17" fill="url(#sp)"/><rect x="194" y="27" width="46" height="17" fill="url(#grid)"/>
      <line x1="208" y1="66" x2="208" y2="84" stroke="#8898aa" strokeWidth="1.2"/>
      <line x1="226" y1="66" x2="226" y2="84" stroke="#8898aa" strokeWidth="1.2"/>
      <rect x="194" y="84" width="46" height="17" fill="url(#sp)"/><rect x="194" y="84" width="46" height="17" fill="url(#grid)"/>
      <rect x="194" y="102" width="46" height="19" fill="url(#sp)"/><rect x="194" y="102" width="46" height="19" fill="url(#grid)"/>

      {/* ── S6 (far right) x=250–296 ── */}
      <line x1="264" y1="44" x2="264" y2="62" stroke="#8898aa" strokeWidth="1.2"/>
      <line x1="282" y1="44" x2="282" y2="62" stroke="#8898aa" strokeWidth="1.2"/>
      <rect x="250" y="7"  width="46" height="19" fill="url(#sp)"/><rect x="250" y="7"  width="46" height="19" fill="url(#grid)"/>
      <rect x="250" y="27" width="46" height="17" fill="url(#sp)"/><rect x="250" y="27" width="46" height="17" fill="url(#grid)"/>
      <line x1="264" y1="66" x2="264" y2="84" stroke="#8898aa" strokeWidth="1.2"/>
      <line x1="282" y1="66" x2="282" y2="84" stroke="#8898aa" strokeWidth="1.2"/>
      <rect x="250" y="84" width="46" height="17" fill="url(#sp)"/><rect x="250" y="84" width="46" height="17" fill="url(#grid)"/>
      <rect x="250" y="102" width="46" height="19" fill="url(#sp)"/><rect x="250" y="102" width="46" height="19" fill="url(#grid)"/>

      {/* ─── MAIN INTEGRATED TRUSS (ITS) ──────────────────────────────────── */}
      <rect x="0" y="60" width="300" height="10" fill="url(#truss)" rx="1"/>
      {/* Specular highlight */}
      <line x1="0" y1="61.5" x2="300" y2="61.5" stroke="rgba(255,255,255,0.5)" strokeWidth="0.7"/>
      {/* Truss cross-brace details */}
      {[30,60,90,120,150,180,210,240,270].map(x => (
        <line key={x} x1={x} y1="60" x2={x} y2="70" stroke="rgba(60,72,88,0.6)" strokeWidth="0.5"/>
      ))}

      {/* ─── RADIATOR PANELS (flanking modules) ───────────────────────────── */}
      <rect x="112" y="46" width="10" height="18" fill="url(#rad)" rx="1"/>
      <rect x="178" y="46" width="10" height="18" fill="url(#rad)" rx="1"/>
      <rect x="112" y="66" width="10" height="18" fill="url(#rad)" rx="1"/>
      <rect x="178" y="66" width="10" height="18" fill="url(#rad)" rx="1"/>

      {/* ─── PRESSURISED MODULES ──────────────────────────────────────────── */}
      {/* US Lab (Destiny) */}
      <rect x="126" y="54" width="48" height="22" fill="url(#mod)" rx="4"/>
      <line x1="127" y1="56" x2="173" y2="56" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6"/>
      {/* Node 1 (Unity) */}
      <rect x="122" y="56" width="16" height="18" fill="url(#mod)" rx="3"/>
      {/* Russian Segment (Zarya/Zvezda) */}
      <rect x="162" y="56" width="18" height="18" fill="url(#mod)" rx="3"/>
      <line x1="163" y1="57.5" x2="179" y2="57.5" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5"/>
      {/* Docking port */}
      <rect x="148" y="52" width="8" height="6" fill="#b0bccf" rx="1"/>
      <rect x="148" y="72" width="8" height="6" fill="#b0bccf" rx="1"/>
    </motion.svg>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1 },
  }),
}

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 py-24 sm:py-32 max-w-6xl mx-auto px-6 sm:px-8">
      <div className="w-full h-px bg-white/[0.06] mb-24" />

      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-8">

        {/* ── Space station — top on mobile, right on desktop ── */}
        <motion.div
          className="flex items-center justify-center md:justify-end flex-shrink-0 order-first md:order-last"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SpaceStation />
        </motion.div>

        {/* ── Left: all content ── */}
        <div className="flex-1 w-full order-last md:order-first">
          <motion.h2
            className="font-orbitron text-xs sm:text-sm tracking-[0.35em] uppercase text-white/90 mb-12"
            custom={0} variants={fadeUp} initial="hidden"
            whileInView="show" viewport={{ once: true, margin: '-80px' }}
          >
            {contactInfo.title}
          </motion.h2>

          <motion.p
            className="font-space text-white/65 text-sm sm:text-base leading-relaxed mb-12 max-w-sm"
            custom={1} variants={fadeUp} initial="hidden"
            whileInView="show" viewport={{ once: true, margin: '-80px' }}
          >
            {contactInfo.subtitle}
          </motion.p>

          <div className="flex flex-col gap-4 mb-10">
            {contactInfo.number && (
              <motion.a href={`tel:${contactInfo.number}`}
                className="group flex items-center gap-3 font-space text-sm text-white/65 hover:text-white transition-colors duration-300"
                custom={2} variants={fadeUp} initial="hidden"
                whileInView="show" viewport={{ once: true, margin: '-80px' }}
              >
                <Phone size={14} className="text-white/20 group-hover:text-violet-400 transition-colors" />
                {contactInfo.number}
              </motion.a>
            )}
            <motion.a href={`mailto:${contactInfo.email_address}`}
              className="group flex items-center gap-3 font-space text-sm text-white/65 hover:text-white transition-colors duration-300"
              custom={3} variants={fadeUp} initial="hidden"
              whileInView="show" viewport={{ once: true, margin: '-80px' }}
            >
              <Mail size={14} className="text-white/20 group-hover:text-violet-400 transition-colors" />
              {contactInfo.email_address}
            </motion.a>
          </div>

          <motion.div
            custom={4} variants={fadeUp} initial="hidden"
            whileInView="show" viewport={{ once: true, margin: '-80px' }}
          >
            <SocialMedia />
          </motion.div>
        </div>


      </div>
    </section>
  )
}

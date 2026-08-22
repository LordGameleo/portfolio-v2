'use client'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.04] py-8 text-center">
      <p className="font-space text-[10px] tracking-[0.3em] uppercase text-white/50">
        Hrithik Adhikari &copy; {new Date().getFullYear()}
      </p>
    </footer>
  )
}

'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface ThemeContextValue {
  isDark: boolean
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue>({ isDark: true, toggle: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always start with dark (matches server render) — avoids hydration mismatch
  const [isDark, setIsDark] = useState(true)

  // After hydration: read the real preference from localStorage / OS
  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme')
      if (stored !== null) {
        setIsDark(stored === 'dark')
      } else {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
      }
    } catch {
      // keep default dark
    }
  }, [])

  // Sync class to <html> and persist preference
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch { /* storage blocked */ }
  }, [isDark])

  return (
    <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark(p => !p) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

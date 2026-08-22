'use client'

import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { categories, categoryMeta, menu, dishTags, type Category } from '../../data/food'
import { foodImages } from '../../data/foodImages'

const EMOJI: Record<Category, string> = {
  'Comfort Food':          '🧠',
  'Light Food':            '🌿',
  'Energy-Rich / Heavy':   '🔥',
  'Special Occasion':      '🎉',
  'Quick & Lazy':          '⚡',
  'Protein-Rich':          '💪',
  'Balanced Everyday':     '🥗',
  'Craving / Street-Style':'🌶️',
}

type Dish = { dish: string; category: Category }

function getPool(selected: Set<Category>): Dish[] {
  const cats = selected.size === 0 ? categories : Array.from(selected)
  return cats.flatMap(cat => menu[cat].map(dish => ({ dish, category: cat })))
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

const SPIN_FRAMES   = 22
const SPIN_INTERVAL = 70

export default function FoodPage() {
  const [selected, setSelected]   = useState<Set<Category>>(new Set())
  const [result, setResult]       = useState<Dish | null>(null)
  const [shortlist, setShortlist] = useState<Dish[] | null>(null)
  const [spinning, setSpinning]   = useState(false)
  const [spinText, setSpinText]   = useState('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])

  function toggle(cat: Category) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      return next
    })
    setResult(null)
    setShortlist(null)
  }

  function clearAll() {
    setSelected(new Set())
    setResult(null)
    setShortlist(null)
  }

  function spin(finalPick: Dish) {
    const pool = getPool(selected)
    setSpinning(true)
    setResult(null)
    setShortlist(null)
    let count = 0
    intervalRef.current = setInterval(() => {
      setSpinText(randomFrom(pool).dish)
      count++
      if (count >= SPIN_FRAMES) {
        clearInterval(intervalRef.current!)
        setSpinText(finalPick.dish)
        setResult(finalPick)
        setSpinning(false)
      }
    }, SPIN_INTERVAL)
  }

  function pickOne() {
    if (!pool.length) return
    spin(randomFrom(pool))
  }

  function pickThree() {
    if (!pool.length) return
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    setResult(null)
    setShortlist(shuffled.slice(0, Math.min(3, shuffled.length)))
  }

  const [breakfastOnly, setBreakfastOnly] = useState(false)

  const pool         = getPool(selected).filter(d =>
    !breakfastOnly || dishTags[d.dish]?.includes('Breakfast')
  )
  const noneSelected = selected.size === 0

  return (
    <div
      className="min-h-screen bg-[#FAFAF9]"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      <div className="w-[85%] mx-auto py-10 pb-20">

        {/* Header */}
        <div className="text-center lg:text-left mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-1">What should I eat?</h1>
          <p className="text-stone-400 text-sm">Pick your mood — or skip to eat anything.</p>
        </div>

        {/* Two-col on desktop, stacked on mobile (CTAs first) */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_320px] lg:gap-12 lg:items-start">

          {/* LEFT — category mood cards (below CTAs on mobile) */}
          <div className="order-2 lg:order-1 mt-8 lg:mt-0">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">
                {noneSelected && !breakfastOnly
                  ? 'Filter by vibe'
                  : `${pool.length} option${pool.length !== 1 ? 's' : ''}`}
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setBreakfastOnly(v => !v); setResult(null); setShortlist(null) }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border-2 transition-all"
                  style={breakfastOnly
                    ? { background: '#FEF3C7', borderColor: '#D97706', color: '#B45309' }
                    : { background: 'white', borderColor: '#E7E5E4', color: '#78716C' }
                  }
                >
                  🌅 Breakfast
                </button>
                {!noneSelected && (
                  <button onClick={clearAll} className="text-xs text-stone-400 hover:text-stone-600 transition-colors">
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categories.map(cat => {
                const meta   = categoryMeta[cat]
                const active = selected.has(cat)
                return (
                  <button
                    key={cat}
                    onClick={() => toggle(cat)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 text-left transition-all active:scale-[0.97]"
                    style={active
                      ? { borderColor: meta.accent, background: meta.accent + '18' }
                      : { borderColor: '#E7E5E4', background: 'white' }
                    }
                  >
                    <span className="text-2xl leading-none select-none">{EMOJI[cat]}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-tight truncate"
                        style={{ color: active ? meta.accent : '#292524' }}>
                        {cat}
                      </p>
                      <p className="text-[11px] text-stone-400 leading-tight mt-0.5 truncate">
                        {meta.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* RIGHT — CTAs + result (top on mobile) */}
          <div className="order-1 lg:order-2 lg:mt-9 lg:sticky lg:top-10">

            {/* CTA buttons */}
            <div className="flex gap-2 mb-5">
              <button
                onClick={pickOne}
                disabled={spinning}
                className="flex-1 py-3.5 rounded-2xl text-white font-bold text-base transition-all active:scale-95 disabled:opacity-60"
                style={{ background: '#EA580C' }}
              >
                {spinning ? 'Picking…' : result ? 'Pick again ↺' : 'Pick for me'}
              </button>
              <button
                onClick={pickThree}
                disabled={spinning}
                className="px-4 py-3.5 rounded-2xl border-2 border-stone-200 text-stone-600 font-semibold text-sm transition-all active:scale-95 hover:border-stone-300 disabled:opacity-50 bg-white"
              >
                Top 3
              </button>
              <Link
                href="/food/list"
                className="px-4 py-3.5 rounded-2xl border-2 border-stone-200 text-stone-500 text-sm transition-all hover:border-stone-300 bg-white flex items-center justify-center"
                title="See full list"
              >
                ☰
              </Link>
            </div>

            {/* Result area */}
            <AnimatePresence mode="wait">

              {/* Spinning */}
              {spinning && (
                <motion.div
                  key="spin"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-3xl overflow-hidden border-2 border-stone-100 bg-white"
                >
                  <div className="w-full aspect-[4/3] bg-stone-100 animate-pulse" />
                  <div className="px-5 py-4 text-center">
                    <p className="text-[11px] text-stone-400 uppercase tracking-widest mb-2">Deciding…</p>
                    <p className="text-xl font-bold text-stone-600 min-h-[1.75rem]">{spinText}</p>
                  </div>
                </motion.div>
              )}

              {/* Single result */}
              {result && !spinning && !shortlist && (
                <motion.div
                  key={result.dish}
                  initial={{ opacity: 0, scale: 0.92, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  className="rounded-3xl overflow-hidden border-2"
                  style={{ borderColor: categoryMeta[result.category].accent + '50' }}
                >
                  {/* Image */}
                  <div
                    className="w-full aspect-[4/3] flex items-center justify-center text-5xl"
                    style={{ background: categoryMeta[result.category].accent + '12' }}
                  >
                    {foodImages[result.dish] ? (
                      <img
                        src={foodImages[result.dish]!}
                        alt={result.dish}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{EMOJI[result.category]}</span>
                    )}
                  </div>
                  {/* Info */}
                  <div className="px-5 py-4 bg-white">
                    <p className="text-[11px] font-bold uppercase tracking-widest mb-1"
                      style={{ color: categoryMeta[result.category].accent }}>
                      {EMOJI[result.category]} {result.category}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap mt-0.5">
                      <p className="text-2xl font-bold text-stone-800 leading-tight">{result.dish}</p>
                      {dishTags[result.dish]?.includes('Breakfast') && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                          🌅 Breakfast
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-400 mt-1">{categoryMeta[result.category].description}</p>
                  </div>
                </motion.div>
              )}

              {/* Top 3 shortlist */}
              {shortlist && !spinning && (
                <motion.div
                  key="shortlist"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-2"
                >
                  <p className="text-[11px] text-stone-400 uppercase tracking-widest text-center mb-1">Pick one</p>
                  {shortlist.map((item, i) => {
                    const meta = categoryMeta[item.category]
                    const img  = foodImages[item.dish] ?? null
                    return (
                      <motion.button
                        key={item.dish}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        onClick={() => { setResult(item); setShortlist(null) }}
                        className="flex items-center gap-3 rounded-2xl border-2 text-left overflow-hidden transition-all active:scale-[0.98] hover:border-stone-300 bg-white"
                        style={{ borderColor: '#E7E5E4' }}
                      >
                        {/* Thumbnail */}
                        <div
                          className="shrink-0 w-16 h-16 flex items-center justify-center text-2xl"
                          style={{ background: meta.accent + '12' }}
                        >
                          {img
                            ? <img src={img} alt={item.dish} className="w-full h-full object-cover" />
                            : <span>{EMOJI[item.category]}</span>
                          }
                        </div>
                        <div className="min-w-0 py-2 pr-3">
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-semibold text-stone-800 leading-tight truncate">{item.dish}</p>
                            {dishTags[item.dish]?.includes('Breakfast') && (
                              <span className="shrink-0 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-700">🌅</span>
                            )}
                          </div>
                          <p className="text-[11px] font-medium mt-0.5" style={{ color: meta.accent }}>
                            {EMOJI[item.category]} {item.category}
                          </p>
                        </div>
                      </motion.button>
                    )
                  })}
                </motion.div>
              )}

              {/* Empty state */}
              {!spinning && !result && !shortlist && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-3xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center py-12 text-center"
                >
                  <p className="text-4xl mb-3">🍽️</p>
                  <p className="text-stone-400 text-sm">Hit "Pick for me" and find out.</p>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  )
}

'use client'

import { useMemo, useState, useRef } from 'react'
import Link from 'next/link'
import { categories, categoryMeta, menu, dishTags } from '../../data/food'
import type { Category } from '../../data/food'
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

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s + 0x6D2B79F5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 0x100000000
  }
}

function googleImageSearchUrl(dish: string) {
  return `https://www.google.com/search?q=${encodeURIComponent(dish + ' indian food')}&tbm=isch`
}

const WINDOW_MS = 30 * 60 * 1000
const IS_DEV    = process.env.NEXT_PUBLIC_FOOD_DEV === 'true'

interface Fix { newUrl: string }

export default function FoodListPage() {
  const all = useMemo(() => {
    const seed = Math.floor(Date.now() / WINDOW_MS)
    const rand = seededRandom(seed)
    const flat = categories.flatMap(cat =>
      menu[cat].map(dish => ({ dish, category: cat as Category }))
    )
    for (let i = flat.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1))
      ;[flat[i], flat[j]] = [flat[j], flat[i]]
    }
    return flat
  }, [])

  // filters
  const [selectedCats, setSelectedCats] = useState<Set<Category>>(new Set())
  const [breakfastOnly, setBreakfastOnly] = useState(false)

  function toggleCat(cat: Category) {
    setSelectedCats(prev => {
      const next = new Set(prev)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      return next
    })
  }

  function clearFilters() {
    setSelectedCats(new Set())
    setBreakfastOnly(false)
  }

  const filtered = all.filter(({ dish, category }) => {
    if (selectedCats.size > 0 && !selectedCats.has(category)) return false
    if (breakfastOnly && !dishTags[dish]?.includes('Breakfast')) return false
    return true
  })

  const hasFilters = selectedCats.size > 0 || breakfastOnly

  // dishes marked as wrong
  const [wrong, setWrong] = useState<Set<string>>(new Set())
  // per-dish new URL the user pastes
  const [fixes, setFixes]   = useState<Record<string, Fix>>({})
  // which card's input is open
  const [editing, setEditing] = useState<string | null>(null)
  const [draft, setDraft]     = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function toggleWrong(dish: string) {
    setWrong(prev => {
      const next = new Set(prev)
      if (next.has(dish)) {
        next.delete(dish)
        setFixes(f => { const n = { ...f }; delete n[dish]; return n })
        if (editing === dish) setEditing(null)
      } else {
        next.add(dish)
      }
      return next
    })
  }

  function openInput(dish: string) {
    setEditing(dish)
    setDraft(fixes[dish]?.newUrl ?? '')
    setTimeout(() => inputRef.current?.focus(), 40)
  }

  function saveUrl(dish: string) {
    if (draft.trim()) setFixes(prev => ({ ...prev, [dish]: { newUrl: draft.trim() } }))
    else setFixes(prev => { const n = { ...prev }; delete n[dish]; return n })
    setEditing(null)
  }

  function exportCSV() {
    const rows = [
      ['dish', 'old_url', 'new_url', 'google_search'],
      ...Array.from(wrong).map(dish => [
        dish,
        foodImages[dish] ?? '',
        fixes[dish]?.newUrl ?? '',
        googleImageSearchUrl(dish),
      ]),
    ]
    const csv = rows
      .map(r => r.map(v => `"${v.replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = 'wrong-food-images.csv'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const wrongCount = wrong.size

  return (
    <div
      className="min-h-screen bg-[#FAFAF9]"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      <div className="w-[85%] mx-auto py-10 pb-28">

        {/* Header */}
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-800">All dishes</h1>
            <p className="text-stone-400 text-sm mt-1">
              {hasFilters ? `${filtered.length} of ${all.length}` : `${all.length} options`}
            </p>
          </div>
          <Link
            href="/food"
            className="shrink-0 px-4 py-2 rounded-xl border-2 border-stone-200 bg-white text-stone-600 text-sm font-semibold hover:border-stone-300 transition-colors"
          >
            ← Picker
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {/* Breakfast chip */}
          <button
            onClick={() => setBreakfastOnly(v => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all active:scale-95"
            style={breakfastOnly
              ? { background: '#FEF3C7', borderColor: '#D97706', color: '#B45309' }
              : { background: 'white', borderColor: '#E7E5E4', color: '#78716C' }
            }
          >
            🌅 Breakfast
          </button>

          {/* Category chips */}
          {categories.map(cat => {
            const meta   = categoryMeta[cat]
            const active = selectedCats.has(cat)
            return (
              <button
                key={cat}
                onClick={() => toggleCat(cat)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all active:scale-95"
                style={active
                  ? { background: meta.accent + '18', borderColor: meta.accent, color: meta.accent }
                  : { background: 'white', borderColor: '#E7E5E4', color: '#78716C' }
                }
              >
                {EMOJI[cat]} {cat}
              </button>
            )
          })}

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-stone-400 hover:text-stone-600 transition-colors"
            >
              Clear ✕
            </button>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(({ dish, category }, i) => {
            const meta      = categoryMeta[category]
            const img       = foodImages[dish] ?? null
            const isWrong   = wrong.has(dish)
            const hasFix    = !!fixes[dish]
            const isEditing = editing === dish
            const previewImg = fixes[dish]?.newUrl ?? img

            return (
              <div
                key={`${category}-${dish}-${i}`}
                className="rounded-2xl overflow-hidden border bg-white transition-colors"
                style={{ borderColor: isWrong ? '#EF4444' : meta.accent + '40' }}
              >
                {/* Image */}
                <div
                  className="relative w-full aspect-[4/3] flex items-center justify-center text-5xl"
                  style={{ background: meta.accent + '12' }}
                >
                  {previewImg ? (
                    <img
                      src={previewImg}
                      alt={dish}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <span className="select-none">{EMOJI[category]}</span>
                  )}

                  {/* Wrong toggle — dev only */}
                  {IS_DEV && (
                    <button
                      onClick={() => toggleWrong(dish)}
                      className="absolute top-2 right-2 px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm transition-all"
                      style={isWrong
                        ? { background: '#EF4444', color: '#fff' }
                        : { background: 'rgba(0,0,0,0.55)', color: '#fff' }
                      }
                    >
                      {isWrong ? '✕ Wrong' : 'Wrong?'}
                    </button>
                  )}

                  {!img && (
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/40 text-white/80">
                      No image
                    </span>
                  )}
                </div>

                {/* Wrong — action panel (dev only) */}
                {IS_DEV && isWrong && (
                  <div className="px-3 pt-3 pb-2 bg-red-50 border-t border-red-100 flex flex-col gap-2">

                    {/* Google search + paste URL row */}
                    <div className="flex gap-2">
                      <a
                        href={googleImageSearchUrl(dish)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1.5 rounded-lg border border-red-200 text-red-600 text-xs font-semibold text-center hover:bg-red-100 transition-colors"
                      >
                        🔍 Google Images
                      </a>
                      <button
                        onClick={() => openInput(dish)}
                        className="flex-1 py-1.5 rounded-lg border text-xs font-semibold transition-colors"
                        style={hasFix
                          ? { borderColor: '#16a34a', color: '#16a34a', background: '#f0fdf4' }
                          : { borderColor: '#d6d3d1', color: '#78716c', background: 'white' }
                        }
                      >
                        {hasFix ? '✓ URL saved' : '+ Paste URL'}
                      </button>
                    </div>

                    {/* URL input */}
                    {isEditing && (
                      <div className="flex gap-1.5">
                        <input
                          ref={inputRef}
                          type="url"
                          value={draft}
                          onChange={e => setDraft(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') saveUrl(dish)
                            if (e.key === 'Escape') setEditing(null)
                          }}
                          placeholder="Paste image URL…"
                          className="flex-1 min-w-0 text-xs px-2.5 py-2 rounded-lg border border-stone-200 bg-white outline-none focus:border-stone-400 font-mono text-stone-700"
                        />
                        <button
                          onClick={() => saveUrl(dish)}
                          className="px-3 py-2 rounded-lg bg-stone-800 text-white text-xs font-semibold shrink-0"
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Name + category + tags */}
                <div className="px-4 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-base font-semibold text-stone-700 leading-tight">{dish}</p>
                    {dishTags[dish]?.includes('Breakfast') && (
                      <span className="shrink-0 mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                        🌅 Breakfast
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-medium mt-1" style={{ color: meta.accent }}>
                    {EMOJI[category]} {category}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>

      {/* Floating bar — dev only */}
      {IS_DEV && <div className="fixed bottom-0 inset-x-0 flex justify-center pb-6 pointer-events-none">
        <div
          className="flex items-center gap-4 px-6 py-3.5 rounded-2xl bg-stone-900 shadow-2xl pointer-events-auto transition-opacity"
          style={{ opacity: wrongCount > 0 ? 1 : 0.35 }}
        >
          <span className="text-sm text-white font-medium">
            {wrongCount > 0
              ? `${wrongCount} wrong · ${Object.keys(fixes).length} fixed`
              : 'Mark wrong images above'}
          </span>
          <button
            onClick={exportCSV}
            disabled={wrongCount === 0}
            className="px-4 py-1.5 rounded-xl bg-white text-stone-900 text-sm font-bold disabled:opacity-40 hover:bg-stone-100 transition-colors"
          >
            Export CSV
          </button>
        </div>
      </div>}

    </div>
  )
}

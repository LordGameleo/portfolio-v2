/**
 * Two-step image fetcher:
 *   1. DuckDuckGo → finds the correct Wikipedia page (handles spelling)
 *   2. Wikipedia REST API → pulls the page image
 *
 * Quality checks:
 *   - Title-relevance: page title must share a keyword with the dish name
 *   - Food-relevance: page description must mention food keywords
 *
 * Usage:
 *   node scripts/fix-food-images.mjs              # fix all null images
 *   node scripts/fix-food-images.mjs wrong.csv    # fix dishes listed in CSV
 *   node scripts/fix-food-images.mjs --dry-run    # preview without writing
 */

import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname   = path.dirname(fileURLToPath(import.meta.url))
const ROOT        = path.resolve(__dirname, '..')
const IMAGES_PATH = path.join(ROOT, 'src/data/foodImages.ts')
const DRY_RUN     = process.argv.includes('--dry-run')
const ALL         = process.argv.includes('--all')
const csvArg      = process.argv.find(a => a.endsWith('.csv'))

const HEADERS = { 'User-Agent': 'food-image-fetcher/1.0 (portfolio dev tool)' }

// ── Search term helpers ───────────────────────────────────────────────────────

// Words to strip when extracting the core ingredient/dish name
const STRIP_WORDS = new Set([
  'sauteed', 'boiled', 'grilled', 'fried', 'mix', 'mixed', 'plain',
  'masala', 'sabzi', 'curry', 'with', 'and', 'from', 'saute',
])

// Manual overrides: our dish name → Wikipedia page title to search directly
const ALIASES = {
  'Khichadi':           'Khichdi',
  'Mix Dal':            'Dal',
  'Dal with Lauki':     'Lauki',
  'Dal with Palak':     'Palak',
  'Muli Paratha':       'Mooli paratha',
  'Besan Chilla':       'Cheela',
  'Rawa Chilla':        'Cheela',
  'Mix Paratha':        'Paratha',
  'Aloo Capsicum Sabzi':'Aloo shimla mirch',
  'Soya Chunks':        'Textured vegetable protein',
  'Mixed Veg Saute':    'Sautéed vegetables',
  'Mutton Rogan Josh':  'Rogan josh',
  'Veg Manchurian':     'Manchurian (dish)',
  'Chicken Manchurian': 'Manchurian (dish)',
  'Paneer Butter Masala':'Butter paneer',
  'Pav Bhaji':          'Pav bhaji',
  'Chole Bhature':      'Chole bhature',
  'Dal Makhni':         'Dal makhani',
  'Paneer Tikka':       'Paneer tikka',
  'Plain Dosa':         'Dosa',
  'Grilled Chicken':    'Grilled chicken',
  'Boiled Eggs':        'Boiled egg',
  'Egg Curry':          'Egg curry',
  'Mushroom Curry':     'Mushroom curry',
  'Chole':              'Chana masala',
  'Maggie':             'Maggi noodles',
  'Masala Maggie':      'Maggi noodles',
  'Sauteed Broccoli':   'Broccoli',
  'Sauteed Beans':      'Green bean',
  'Sauteed Mushroom':   'Sautéed mushrooms',
  'Sauteed Zucchini':   'Zucchini',
}

// Extract meaningful keywords from a dish name (for title-relevance check)
function coreWords(dish) {
  return dish.toLowerCase()
    .split(/[\s+]+/)
    .filter(w => w.length > 2 && !STRIP_WORDS.has(w))
}

// Build ordered list of search terms to try for a dish
function searchTerms(dish) {
  const terms = []
  if (ALIASES[dish]) terms.push(ALIASES[dish])
  terms.push(dish)
  const core = coreWords(dish).join(' ')
  if (core !== dish.toLowerCase() && core.length > 2) terms.push(core)
  const firstWord = coreWords(dish)[0]
  if (firstWord && firstWord !== core) terms.push(firstWord)
  return [...new Set(terms)]
}

// ── Quality checks ────────────────────────────────────────────────────────────

const FOOD_KEYWORDS = [
  'food', 'dish', 'cuisine', 'recipe', 'meal', 'ingredient', 'rice', 'bread',
  'curry', 'vegetable', 'meat', 'soup', 'snack', 'breakfast', 'lunch', 'dinner',
  'indian', 'spice', 'flour', 'dough', 'fried', 'boiled', 'baked', 'roasted',
  'grilled', 'sauce', 'gravy', 'lentil', 'bean', 'paneer', 'chicken', 'mutton',
  'egg', 'potato', 'onion', 'tomato', 'milk', 'curd', 'yogurt', 'flatbread',
  'noodle', 'porridge', 'oat', 'mushroom', 'broccoli', 'zucchini', 'okra',
  'paratha', 'roti', 'biryani', 'pulao', 'fungi', 'squash', 'edible', 'cooked',
  'cheese', 'plant-based', 'protein', 'pulse', 'legume', 'cereal', 'grain',
]

function isFoodRelated(text = '') {
  const lower = text.toLowerCase()
  return FOOD_KEYWORDS.some(kw => lower.includes(kw))
}

// Page title must share at least one meaningful word with the dish name
// OR the dish has an alias that matches the title
function isTitleRelevant(dish, pageTitle) {
  if (ALIASES[dish]) {
    const aliasLower = ALIASES[dish].toLowerCase()
    const titleLower = pageTitle.toLowerCase()
    if (aliasLower.includes(titleLower) || titleLower.includes(aliasLower.split(' ')[0])) return true
  }
  const dishWords = coreWords(dish)
  const titleLower = pageTitle.toLowerCase()
  return dishWords.some(w => titleLower.includes(w))
}

// ── DDG + Wikipedia ───────────────────────────────────────────────────────────

async function ddgSearch(term) {
  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(term + ' indian dish food recipe')}&format=json&no_redirect=1&no_html=1&skip_disambig=1`
  try {
    const res  = await fetch(url, { headers: HEADERS })
    const data = await res.json()
    if (data.AbstractURL?.includes('wikipedia.org') && data.AbstractText) {
      const title = decodeURIComponent(data.AbstractURL.split('/wiki/')[1] ?? '').replace(/_/g, ' ')
      return { title, description: data.AbstractText }
    }
  } catch { /* ignore */ }
  return null
}

async function wikiSearchResults(term) {
  const url = `https://en.wikipedia.org/w/api.php?` + new URLSearchParams({
    action: 'query', list: 'search',
    srsearch: term + ' dish food recipe', srlimit: 5, format: 'json', origin: '*',
  })
  try {
    const res  = await fetch(url, { headers: HEADERS })
    const data = await res.json()
    return (data.query?.search ?? []).map(r => ({
      title:       r.title,
      description: r.snippet?.replace(/<[^>]+>/g, '') ?? '',
    }))
  } catch { return [] }
}

async function wikiImage(title) {
  try {
    const res  = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      { headers: HEADERS }
    )
    if (!res.ok) return null
    const data = await res.json()
    if (data.type === 'disambiguation') return null
    return {
      imageUrl:    data.thumbnail?.source ?? data.originalimage?.source ?? null,
      description: data.description ?? data.extract?.slice(0, 100) ?? '',
      pageTitle:   data.title,
    }
  } catch { return null }
}

async function findImage(dish) {
  for (const term of searchTerms(dish)) {
    // Try DuckDuckGo first (best spelling correction)
    const ddg = await ddgSearch(term)
    if (ddg && isTitleRelevant(dish, ddg.title) && isFoodRelated(ddg.description)) {
      const wiki = await wikiImage(ddg.title)
      if (wiki?.imageUrl) return { ...wiki, via: `DDG→"${wiki.pageTitle}"` }
    }

    // Wikipedia search fallback
    const results = await wikiSearchResults(term)
    for (const r of results) {
      if (!isTitleRelevant(dish, r.title)) continue
      if (!isFoodRelated(r.description)) continue
      const wiki = await wikiImage(r.title)
      if (wiki?.imageUrl) return { ...wiki, via: `Wiki→"${wiki.pageTitle}"` }
    }

    await new Promise(res => setTimeout(res, 150))
  }
  return null
}

// ── Load & parse foodImages.ts ────────────────────────────────────────────────
const imagesRaw = fs.readFileSync(IMAGES_PATH, 'utf8')
const existing  = {}
for (const m of imagesRaw.matchAll(/"([^"]+)":\s*("([^"]*?)"|null)/g)) {
  existing[m[1]] = m[3] ?? null
}

// ── Determine targets ─────────────────────────────────────────────────────────
let targets = []
if (csvArg) {
  const csv = fs.readFileSync(path.resolve(csvArg), 'utf8')
  targets = csv.trim().split('\n').slice(1)
    .map(r => r.split(',')[0].replace(/^"|"$/g, '').trim()).filter(Boolean)
  console.log(`Fixing ${targets.length} dishes from ${csvArg}\n`)
} else if (ALL) {
  targets = Object.keys(existing)
  console.log(`Re-fetching all ${targets.length} dishes\n`)
} else {
  targets = Object.entries(existing).filter(([, v]) => !v).map(([k]) => k)
  console.log(`Fixing ${targets.length} dishes with no image\n`)
}

if (!targets.length) { console.log('Nothing to fix.'); process.exit(0) }
if (DRY_RUN) console.log('DRY RUN — no files will be written\n')

// ── Run ───────────────────────────────────────────────────────────────────────
const updates = { ...existing }
let found = 0, skipped = 0

for (const dish of targets) {
  process.stdout.write(`  ${dish.padEnd(28)} `)
  const result = await findImage(dish)
  if (result?.imageUrl) {
    updates[dish] = result.imageUrl
    found++
    console.log(`✓  ${result.via}`)
    if (result.description) console.log(`     ${result.description.slice(0, 90)}`)
  } else {
    skipped++
    console.log(`✗  (no confident match)`)
  }
  await new Promise(r => setTimeout(r, 200))
}

console.log(`\n  Found: ${found}  |  Skipped: ${skipped}`)

if (DRY_RUN) {
  console.log('\n  Dry run — skipping write.')
} else {
  const entries = Object.entries(updates)
    .map(([k, v]) => `  "${k}": ${v ? `"${v}"` : 'null'},`)
    .join('\n')
  fs.writeFileSync(IMAGES_PATH, `export const foodImages: Record<string, string | null> = {\n${entries}\n}\n`)
  console.log(`\n  ✓ Updated ${IMAGES_PATH}`)
}

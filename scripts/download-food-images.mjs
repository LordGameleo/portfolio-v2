/**
 * Downloads all food images, optimizes them with sharp (WebP, max 800px, quality 82),
 * saves to public/images/food/, and updates foodImages.ts to use local paths.
 *
 * Usage: node scripts/download-food-images.mjs
 */

import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname   = path.dirname(fileURLToPath(import.meta.url))
const ROOT        = path.resolve(__dirname, '..')
const IMAGES_PATH = path.join(ROOT, 'src/data/foodImages.ts')
const OUT_DIR     = path.join(ROOT, 'public/images/food')

fs.mkdirSync(OUT_DIR, { recursive: true })

// ── Parse foodImages.ts ───────────────────────────────────────────────────────
const raw      = fs.readFileSync(IMAGES_PATH, 'utf8')
const existing = {}
for (const m of raw.matchAll(/"([^"]+)":\s*("([^"]*?)"|null)/g)) {
  existing[m[1]] = m[3] ?? null
}

// ── Slug helper ───────────────────────────────────────────────────────────────
function slug(dish) {
  return dish.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// ── Download + optimize ───────────────────────────────────────────────────────
const updates = {}
let downloaded = 0, skipped = 0, failed = 0

for (const [dish, url] of Object.entries(existing)) {
  const filename = `${slug(dish)}.webp`
  const outPath  = path.join(OUT_DIR, filename)
  const localPath = `/images/food/${filename}`

  if (!url) {
    updates[dish] = null
    skipped++
    process.stdout.write(`  ${dish.padEnd(32)} ✗  (no url)\n`)
    continue
  }

  process.stdout.write(`  ${dish.padEnd(32)} `)

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; food-image-downloader/1.0)' },
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const buf = Buffer.from(await res.arrayBuffer())

    await sharp(buf)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outPath)

    const { size } = fs.statSync(outPath)
    updates[dish] = localPath
    downloaded++
    console.log(`✓  ${(size / 1024).toFixed(0)} KB`)
  } catch (e) {
    // Keep original remote URL on failure
    updates[dish] = url
    failed++
    console.log(`✗  ${e.message}`)
  }

  await new Promise(r => setTimeout(r, 80))
}

console.log(`\n  Downloaded: ${downloaded}  |  Failed: ${failed}  |  No URL: ${skipped}`)

// ── Write updated foodImages.ts ───────────────────────────────────────────────
const entries = Object.entries(updates)
  .map(([k, v]) => `  "${k}": ${v ? `"${v}"` : 'null'},`)
  .join('\n')

fs.writeFileSync(IMAGES_PATH, `export const foodImages: Record<string, string | null> = {\n${entries}\n}\n`)
console.log(`\n  ✓ Updated ${IMAGES_PATH}`)
console.log(`  ✓ Images saved to ${OUT_DIR}`)

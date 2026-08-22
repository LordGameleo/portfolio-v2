/**
 * Publishes the company-analysis library into public/research/ so that
 * `next build` copies it verbatim into out/ and `firebase deploy` ships it
 * alongside the portfolio. Runs automatically via the `prebuild` npm hook.
 *
 * The generated dashboards are fully self-contained — one inline <style>, one
 * inline <script>, no CDN, no webfonts — so publishing is a file copy.
 *
 * Redaction is NOT done here. The analysis generator builds public-safe pages by
 * default and only names files on disk when ANALYSIS_SHOW_SOURCES is set. What
 * this script adds is the gate: it refuses to publish anything that still
 * mentions the private store, so a store left in private mode fails the deploy
 * instead of leaking. Treat the gate as the guarantee, not the generator.
 *
 * Copied: index.html and each company's charts/*.html. Nothing else — no
 * sources/ PDFs, no notes.md, no manifest.json, no derived/*.json. The derived
 * JSON is unnecessary because the generator inlines its data into each page.
 *
 * Usage: node scripts/sync-research.mjs
 *        RESEARCH_SRC=/path/to/company-analysis node scripts/sync-research.mjs
 */

import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT      = path.resolve(__dirname, '..')
const SRC       = process.env.RESEARCH_SRC
  ? path.resolve(process.env.RESEARCH_SRC)
  : path.resolve(ROOT, '../personal-claude/company-analysis')
const DEST      = path.join(ROOT, 'public/research')

// ── The gate ─────────────────────────────────────────────────────────────────
// Any of these appearing in a published page means the store was built with
// ANALYSIS_SHOW_SOURCES set. Each is chosen to be unambiguous: none is a
// plausible substring of the analysis prose or of a minified identifier.
const FORBIDDEN = [
  'sources/', 'notes.md', 'manifest.json', 'raw/', 'derived/',
  'pdf_text', 'build_index', 'build_report', 'report.json',
  'transcript PDF', 'Cached datasets', 'Archived documents',
  '.pdf', 'on disk', 'this repo',
  'balance_sheet', 'profit_loss', 'cash_flow',
  '<PRIVATE>', '</PRIVATE>',
]

// ── Link rewrites ────────────────────────────────────────────────────────────
// Firebase hosting has cleanUrls, so /x.html 301s to /x. Rewriting the internal
// links to be extensionless keeps every in-site hop direct. Each rule must match
// at least once — a miss means the templates moved and the output would ship
// links that redirect or break, so it fails loudly.
const CHART_COMMON = [
  { why: 'breadcrumb to the library index',
    find: 'href="../../index.html"', to: 'href="../../"' },
]

const REWRITES = {
  'index.html': [
    { why: 'dashboard URL',      find: '${c.slug}/charts/financials.html', to: '${c.slug}/charts/financials' },
    { why: 'call-pointers URL',  find: '${c.slug}/charts/concalls.html',   to: '${c.slug}/charts/concalls' },
  ],
  'financials.html': [
    ...CHART_COMMON,
    { why: 'sibling link', find: 'href="concalls.html"', to: 'href="concalls"' },
  ],
  'concalls.html': [
    ...CHART_COMMON,
    { why: 'sibling link', find: 'href="financials.html"', to: 'href="financials"' },
  ],
}

function rewrite(name, html) {
  let out = html
  for (const { why, find, to } of REWRITES[name] ?? []) {
    if (!out.includes(find)) {
      throw new Error(
        `${name}: no match for "${why}" (expected ${JSON.stringify(find)}).\n` +
        '  The analysis templates changed. Update REWRITES in scripts/sync-research.mjs.'
      )
    }
    out = out.split(find).join(to)
  }
  return out
}

function gate(name, html) {
  const hits = FORBIDDEN.filter(s => html.includes(s))
  if (hits.length) {
    throw new Error(
      `${name} still references the private store: ${hits.join(', ')}\n` +
      '  The library was built with ANALYSIS_SHOW_SOURCES set. Rebuild it public:\n' +
      '    python3 lib/build_report.py <slug> && python3 lib/build_index.py\n' +
      '  (no env var — public is the default) and re-run this script.'
    )
  }
}

// ── Guard: is the analysis library reachable? ───────────────────────────────
if (!fs.existsSync(SRC)) {
  // personal-claude lives outside this repo and isn't synced, so a build on
  // another machine won't see it. Fall back to whatever is committed rather
  // than blocking the whole deploy.
  if (fs.existsSync(DEST)) {
    console.warn(`[research] source not found at ${SRC}`)
    console.warn('[research] keeping the committed public/research/ as-is')
    process.exit(0)
  }
  console.error(`[research] source not found at ${SRC} and nothing committed at public/research/`)
  console.error('[research] set RESEARCH_SRC to the company-analysis directory')
  process.exit(1)
}

// ── Copy ─────────────────────────────────────────────────────────────────────
// Staged in memory and gated before anything is written, so a private-mode store
// leaves no partial publish behind.
const staged = []

function stage(srcFile, destFile) {
  const name = path.basename(srcFile)
  const html = rewrite(name, fs.readFileSync(srcFile, 'utf8'))
  gate(path.relative(SRC, srcFile), html)
  staged.push({ destFile, html })
}

stage(path.join(SRC, 'index.html'), path.join(DEST, 'index.html'))

// A company is any directory carrying a report.json — the same rule the analysis
// index builder uses to decide what lands on the library page.
const slugs = fs.readdirSync(SRC, { withFileTypes: true })
  .filter(d => d.isDirectory() && fs.existsSync(path.join(SRC, d.name, 'report.json')))
  .map(d => d.name)
  .sort()

if (!slugs.length) {
  console.error('[research] no companies found (no directory contains report.json)')
  process.exit(1)
}

for (const slug of slugs) {
  const chartsDir = path.join(SRC, slug, 'charts')
  if (!fs.existsSync(chartsDir)) {
    console.warn(`[research] ${slug}: no charts/ — run the report builder first, skipping`)
    continue
  }
  for (const f of fs.readdirSync(chartsDir).filter(f => f.endsWith('.html')).sort()) {
    stage(path.join(chartsDir, f), path.join(DEST, slug, 'charts', f))
  }
}

fs.rmSync(DEST, { recursive: true, force: true })
let bytes = 0
for (const { destFile, html } of staged) {
  fs.mkdirSync(path.dirname(destFile), { recursive: true })
  fs.writeFileSync(destFile, html)
  bytes += Buffer.byteLength(html)
  console.log(`[research] ${path.relative(DEST, destFile)}  ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB`)
}

console.log(
  `[research] published ${staged.length} file(s), ${(bytes / 1024).toFixed(0)} KB, ` +
  `${slugs.length} company(ies): ${slugs.join(', ')}`
)

#!/usr/bin/env node
/**
 * generate-logo.mjs
 *
 * Generates PNG logo variants and OG image from SVG sources using sharp.
 * Run: node scripts/generate-logo.mjs
 */

import { mkdirSync, readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT       = join(__dirname, '..')
const PUBLIC_DIR = join(ROOT, 'docs', 'public')

// ─── Logo sizes ────────────────────────────────────────────────────────────────
const LOGO_SIZES = [16, 32, 48, 64, 128, 192, 256, 512]
const logoSvg    = readFileSync(join(PUBLIC_DIR, 'logo.svg'))
const ogSvg      = readFileSync(join(PUBLIC_DIR, 'og-image.svg'))

async function run() {
  console.log('🎨 Generating logo PNG files...\n')

  // ── Favicon / logo PNGs ────────────────────────────────────────────────────
  for (const size of LOGO_SIZES) {
    const outPath = join(PUBLIC_DIR, `logo-${size}.png`)
    await sharp(logoSvg)
      .resize(size, size)
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(outPath)
    console.log(`  ✓ logo-${size}.png`)
  }

  // ── favicon.png (32px, used by many browsers alongside .ico) ──────────────
  await sharp(logoSvg)
    .resize(32, 32)
    .png({ compressionLevel: 9 })
    .toFile(join(PUBLIC_DIR, 'favicon.png'))
  console.log(`  ✓ favicon.png`)

  // ── Apple touch icon ──────────────────────────────────────────────────────
  await sharp(logoSvg)
    .resize(180, 180)
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(join(PUBLIC_DIR, 'apple-touch-icon.png'))
  console.log(`  ✓ apple-touch-icon.png (180x180)`)

  // ── OG image 1200×630 ────────────────────────────────────────────────────
  await sharp(ogSvg)
    .resize(1200, 630)
    .png({ compressionLevel: 7 })
    .toFile(join(PUBLIC_DIR, 'og-image.png'))
  console.log(`  ✓ og-image.png (1200×630)`)

  // ── Twitter card 1200×600 ────────────────────────────────────────────────
  await sharp(ogSvg)
    .resize(1200, 600)
    .png({ compressionLevel: 7 })
    .toFile(join(PUBLIC_DIR, 'twitter-card.png'))
  console.log(`  ✓ twitter-card.png (1200×600)`)

  console.log('\n✅ All logo assets generated in docs/public/\n')
}

run().catch((err) => {
  console.error('❌ Logo generation failed:', err.message)
  process.exit(1)
})

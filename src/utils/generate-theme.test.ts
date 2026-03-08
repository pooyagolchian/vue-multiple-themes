import { describe, it, expect } from 'vitest'
import {
  generateLightTheme,
  generateDarkTheme,
  generateThemePair,
  generateThemeFromPalette,
  generateSeasonalThemes,
  buildCssMixTheme,
  checkContrast,
} from './generate-theme'
import { contrastRatio } from './color'

describe('generateLightTheme', () => {
  it('returns a theme with all required color tokens', () => {
    const theme = generateLightTheme('#7c3aed')
    expect(theme.name).toBe('generated-light')
    expect(theme.label).toBe('Light')
    expect(theme.colors.primary).toBeDefined()
    expect(theme.colors.background).toBeDefined()
    expect(theme.colors.text).toBeDefined()
    expect(theme.colors.surface).toBeDefined()
    expect(theme.colors.border).toBeDefined()
  })

  it('accepts custom name and label', () => {
    const theme = generateLightTheme('#3b82f6', { name: 'brand', label: 'Brand Light' })
    expect(theme.name).toBe('brand')
    expect(theme.label).toBe('Brand Light')
  })

  it('generates a light background', () => {
    const theme = generateLightTheme('#3b82f6')
    // Background should be very light (high lightness hex)
    const bg = theme.colors.background!
    expect(bg).toMatch(/^#[f-f][0-9a-f]{5}$/i)
  })

  it('generates WCAG-compliant text on background', () => {
    const theme = generateLightTheme('#3b82f6')
    const ratio = contrastRatio(theme.colors.text!, theme.colors.background!)
    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })

  it('uses custom accent color when provided', () => {
    const theme = generateLightTheme('#3b82f6', { accentColor: '#ff6600' })
    expect(theme.colors.accent).toBe('#ff6600')
  })

  it('disables tinted surfaces when tintedSurfaces=false', () => {
    const tinted = generateLightTheme('#ff0000', { tintedSurfaces: true })
    const plain = generateLightTheme('#ff0000', { tintedSurfaces: false })
    // Both should produce valid light themes
    expect(tinted.colors.background).toBeDefined()
    expect(plain.colors.background).toBeDefined()
  })
})

describe('generateDarkTheme', () => {
  it('returns a theme with all required color tokens', () => {
    const theme = generateDarkTheme('#7c3aed')
    expect(theme.name).toBe('generated-dark')
    expect(theme.label).toBe('Dark')
    expect(theme.colors.primary).toBeDefined()
    expect(theme.colors.background).toBeDefined()
    expect(theme.colors.text).toBeDefined()
  })

  it('generates a dark background', () => {
    const theme = generateDarkTheme('#3b82f6')
    // Background should be very dark (low R value hex)
    const bg = theme.colors.background!
    expect(bg).toMatch(/^#[0-3][0-9a-f]{5}$/i)
  })

  it('accepts custom name and label', () => {
    const theme = generateDarkTheme('#3b82f6', { name: 'brand-dark', label: 'Brand Dark' })
    expect(theme.name).toBe('brand-dark')
    expect(theme.label).toBe('Brand Dark')
  })
})

describe('generateThemePair', () => {
  it('returns exactly two themes', () => {
    const pair = generateThemePair('#7c3aed')
    expect(pair).toHaveLength(2)
  })

  it('first is light, second is dark', () => {
    const [light, dark] = generateThemePair('#7c3aed')
    expect(light.name).toBe('light')
    expect(dark.name).toBe('dark')
  })

  it('accepts custom names', () => {
    const [light, dark] = generateThemePair('#7c3aed', {
      lightName: 'brand-light',
      darkName: 'brand-dark',
    })
    expect(light.name).toBe('brand-light')
    expect(dark.name).toBe('brand-dark')
  })
})

describe('generateThemeFromPalette', () => {
  it('generates light variant with palette overrides', () => {
    const theme = generateThemeFromPalette(
      { primary: '#3b82f6', secondary: '#8b5cf6', accent: '#f59e0b' },
      'light',
    )
    expect(theme.colors.secondary).toBe('#8b5cf6')
    expect(theme.colors.accent).toBe('#f59e0b')
  })

  it('generates dark variant', () => {
    const theme = generateThemeFromPalette(
      { primary: '#3b82f6' },
      'dark',
    )
    expect(theme.colors.primary).toBeDefined()
    expect(theme.colors.background).toBeDefined()
  })
})

describe('generateSeasonalThemes', () => {
  const seasons = ['spring', 'summer', 'autumn', 'winter', 'midnight', 'neon', 'pastel'] as const

  for (const season of seasons) {
    it(`generates ${season} theme pair`, () => {
      const [light, dark] = generateSeasonalThemes(season)
      expect(light.name).toBe(`${season}-light`)
      expect(dark.name).toBe(`${season}-dark`)
      expect(light.colors.primary).toBeDefined()
      expect(dark.colors.primary).toBeDefined()
    })
  }
})

describe('buildCssMixTheme', () => {
  it('returns CSS string with selector', () => {
    const css = buildCssMixTheme('#7c3aed', 'brand')
    expect(css).toContain('[data-theme="brand"]')
    expect(css).toContain('--vmt-primary')
    expect(css).toContain('color-mix')
  })

  it('supports dark variant', () => {
    const css = buildCssMixTheme('#7c3aed', 'brand', 'dark')
    expect(css).toContain('[data-theme="brand"]')
    expect(css).toContain('#000000')
  })
})

describe('checkContrast', () => {
  it('black on white passes all levels', () => {
    const report = checkContrast('#000000', '#ffffff')
    expect(report.aa).toBe(true)
    expect(report.aaLarge).toBe(true)
    expect(report.aaa).toBe(true)
    expect(report.aaaLarge).toBe(true)
    expect(report.ratio).toBeCloseTo(21, 0)
  })

  it('same color fails all levels', () => {
    const report = checkContrast('#808080', '#808080')
    expect(report.aa).toBe(false)
    expect(report.aaLarge).toBe(false)
    expect(report.ratio).toBeCloseTo(1, 0)
  })

  it('reports correct intermediate values', () => {
    const report = checkContrast('#767676', '#ffffff')
    expect(report.aaLarge).toBe(true)
    expect(report.ratio).toBeGreaterThanOrEqual(4.5)
  })
})

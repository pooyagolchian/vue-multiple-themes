import { describe, expect, it } from 'vitest'
import { contrastRatio, hexToHsl } from '../../src/utils/color'
import {
  buildCssMixTheme,
  checkContrast,
  generateDarkTheme,
  generateLightTheme,
  generateSeasonalThemes,
  generateThemeFromPalette,
  generateThemePair,
} from '../../src/utils/generate-theme'

const TEST_PRIMARY = '#7c3aed' // violet-600

describe('generateLightTheme', () => {
  it('returns a ThemeDefinition with the correct name', () => {
    const theme = generateLightTheme(TEST_PRIMARY, { name: 'brand' })
    expect(theme.name).toBe('brand')
  })

  it('uses default name when none provided', () => {
    const theme = generateLightTheme(TEST_PRIMARY)
    expect(theme.name).toBe('generated-light')
  })

  it('generates light surfaces (background L > 90)', () => {
    const theme = generateLightTheme(TEST_PRIMARY)
    const bg = theme.colors.background
    if (!bg) return
    const [, , l] = hexToHsl(bg)
    expect(l).toBeGreaterThan(90)
  })

  it('foreground passes WCAG AA on generated background', () => {
    const theme = generateLightTheme(TEST_PRIMARY)
    if (!theme.colors.text || !theme.colors.background) return
    const ratio = contrastRatio(theme.colors.text, theme.colors.background)
    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })

  it('includes all required color keys', () => {
    const theme = generateLightTheme(TEST_PRIMARY)
    const keys = ['primary', 'secondary', 'accent', 'background', 'surface',
      'surfaceElevated', 'text', 'textMuted', 'textInverse', 'border']
    keys.forEach((key) => {
      expect(theme.colors).toHaveProperty(key)
    })
  })

  it('respects custom name, label, icon', () => {
    const theme = generateLightTheme('#ef4444', { name: 'red', label: 'Red', icon: 'star' })
    expect(theme.name).toBe('red')
    expect(theme.label).toBe('Red')
    expect(theme.icon).toBe('star')
  })

  it('uses the given accent color when provided', () => {
    const accent = '#f59e0b'
    const theme = generateLightTheme(TEST_PRIMARY, { accentColor: accent })
    expect(theme.colors.accent).toBe(accent)
  })
})

describe('generateDarkTheme', () => {
  it('generates dark surfaces (background L < 15)', () => {
    const theme = generateDarkTheme(TEST_PRIMARY)
    const bg = theme.colors.background
    if (!bg) return
    const [, , l] = hexToHsl(bg)
    expect(l).toBeLessThan(15)
  })

  it('foreground passes WCAG AA on dark background', () => {
    const theme = generateDarkTheme(TEST_PRIMARY)
    if (!theme.colors.text || !theme.colors.background) return
    const ratio = contrastRatio(theme.colors.text!, theme.colors.background!)
    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })

  it('primary color is lighter than input on dark theme', () => {
    const [, , lIn] = hexToHsl(TEST_PRIMARY)
    const theme = generateDarkTheme(TEST_PRIMARY)
    const [, , lOut] = hexToHsl(theme.colors.primary!)
    expect(lOut).toBeGreaterThan(lIn)
  })
})

describe('generateThemePair', () => {
  it('returns an array of exactly two themes', () => {
    const pair = generateThemePair(TEST_PRIMARY)
    expect(pair).toHaveLength(2)
  })

  it('first is light, second is dark by default', () => {
    const [light, dark] = generateThemePair(TEST_PRIMARY)
    const [, , lLight] = hexToHsl(light.colors.background!)
    const [, , lDark] = hexToHsl(dark.colors.background!)
    expect(lLight).toBeGreaterThan(lDark)
  })

  it('respects custom light/dark names', () => {
    const [light, dark] = generateThemePair('#3b82f6', {
      lightName: 'brand-light',
      darkName: 'brand-dark',
    })
    expect(light.name).toBe('brand-light')
    expect(dark.name).toBe('brand-dark')
  })
})

describe('generateThemeFromPalette', () => {
  it('uses secondary color from palette', () => {
    const secondary = '#10b981'
    const theme = generateThemeFromPalette(
      { primary: TEST_PRIMARY, secondary },
      'light',
    )
    expect(theme.colors.secondary).toBe(secondary)
  })

  it('uses accent color from palette', () => {
    const accent = '#f59e0b'
    const theme = generateThemeFromPalette(
      { primary: TEST_PRIMARY, accent },
      'dark',
    )
    expect(theme.colors.accent).toBe(accent)
  })
})

describe('generateSeasonalThemes', () => {
  const seasons = ['spring', 'summer', 'autumn', 'winter', 'midnight', 'neon', 'pastel'] as const

  seasons.forEach((season) => {
    it(`generates a valid pair for season: ${season}`, () => {
      const [light, dark] = generateSeasonalThemes(season)
      expect(light.name).toBe(`${season}-light`)
      expect(dark.name).toBe(`${season}-dark`)
      expect(light.colors.primary).toBeTruthy()
      expect(dark.colors.primary).toBeTruthy()
    })
  })
})

describe('buildCssMixTheme', () => {
  it('returns a CSS string containing the selector', () => {
    const css = buildCssMixTheme(TEST_PRIMARY, 'brand')
    expect(css).toContain('[data-theme="brand"]')
  })

  it('includes --vmt-primary', () => {
    const css = buildCssMixTheme(TEST_PRIMARY, 'brand')
    expect(css).toContain('--vmt-primary')
  })

  it('uses different bg lightness for dark variant', () => {
    const lightCss = buildCssMixTheme(TEST_PRIMARY, 'brand', 'light')
    const darkCss = buildCssMixTheme(TEST_PRIMARY, 'brand', 'dark')
    expect(lightCss).toContain('98%')
    expect(darkCss).toContain('8%')
  })
})

describe('checkContrast', () => {
  it('black on white equals ~21:1', () => {
    const report = checkContrast('#000000', '#ffffff')
    expect(report.ratio).toBeCloseTo(21, 0)
    expect(report.aa).toBe(true)
    expect(report.aaa).toBe(true)
  })

  it('same color gives ratio 1', () => {
    const report = checkContrast('#3b82f6', '#3b82f6')
    expect(report.ratio).toBeCloseTo(1, 1)
    expect(report.aa).toBe(false)
  })

  it('correctly identifies AA failure for low-contrast colors', () => {
    const report = checkContrast('#aaaaaa', '#ffffff')
    expect(report.aa).toBe(false)
  })

  it('reports AAA threshold correctly', () => {
    const report = checkContrast('#000000', '#ffffff')
    expect(report.aaa).toBe(true)
    expect(report.aaaLarge).toBe(true)
  })
})

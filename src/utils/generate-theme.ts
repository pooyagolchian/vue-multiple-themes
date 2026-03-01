/**
 * generate-theme.ts
 *
 * Developer-experience utilities that solve the #1 pain point:
 * "I have a brand color — how do I get a full theme from it?"
 *
 * Core functions:
 *   generateLightTheme(baseColor, options)  → ThemeDefinition
 *   generateDarkTheme(baseColor, options)   → ThemeDefinition
 *   generateThemePair(baseColor, options)   → [light, dark] ThemeDefinition[]
 *   generateSeasonalTheme(season, options)  → ThemeDefinition
 *   generateFromCssVar(varName, options)    → CSS string (runtime, browser-only)
 */

import type { Component } from 'vue'
import type { ThemeColors, ThemeDefinition } from '../types'
import {
  autoContrast,
  contrastRatio,
  ensureContrast,
  hexToHsl,
  hslToHex,
  lighten,
  mix,
  saturate,
  withAlpha,
} from './color'

export interface GenerateThemeOptions {
  /** Theme name (slug used in DOM, e.g. 'brand-light') */
  name?: string
  /** Human-readable label */
  label?: string
  /** Optional icon component (e.g. from `lucide-vue-next`) */
  icon?: Component
  /**
   * Saturation boost/reduction for background tones.
   * Positive = more colorful surfaces, negative = more neutral.
   * Default: 0
   */
  saturationBias?: number
  /**
   * Whether to tint surfaces with the brand hue (default: true).
   * Set false for pure white/dark surfaces.
   */
  tintedSurfaces?: boolean
  /**
   * Accent color override. Defaults to an analogous color of the primary.
   */
  accentColor?: string
  /**
   * Extra classes appended to the theme's `extraClasses` array.
   */
  extraClasses?: string[]
}

// ─── Light theme generator ────────────────────────────────────────────────────

/**
 * Generate a WCAG-compliant light theme from a single brand color.
 *
 * @example
 * const myTheme = generateLightTheme('#7c3aed', { name: 'brand', label: 'Brand' })
 */
export function generateLightTheme(
  primaryHex: string,
  options: GenerateThemeOptions = {},
): ThemeDefinition {
  const {
    name = 'generated-light',
    label = 'Light',
    icon,
    saturationBias = 0,
    tintedSurfaces = true,
    accentColor,
    extraClasses = [],
  } = options

  const [h, s] = hexToHsl(primaryHex)
  const surfaceSat = tintedSurfaces ? Math.max(0, s * 0.08 + saturationBias) : 0
  const secondary = hslToHex(h, Math.max(0, s - 15), Math.min(70, hexToHsl(primaryHex)[2] + 10))
  const accent = accentColor ?? hslToHex((h + 30) % 360, Math.min(100, s + 5), 55)

  const background = hslToHex(h, surfaceSat, 99)
  const surface = hslToHex(h, surfaceSat + 1, 97)
  const surfaceElevated = hslToHex(h, surfaceSat + 2, 94)
  const border = hslToHex(h, surfaceSat + 4, 88)

  // Ensure primary is visible on white background (darken if needed)
  const primary = ensureContrast(primaryHex, background, 3)

  const text = ensureContrast(hslToHex(h, Math.min(20, s * 0.3), 12), background, 7)
  const textMuted = ensureContrast(hslToHex(h, Math.min(15, s * 0.2), 40), background, 4.5)
  const textInverse = autoContrast(primary, '#ffffff', '#000000') === '#ffffff'
    ? '#ffffff'
    : '#1a1a1a'

  const colors: ThemeColors = {
    primary,
    secondary,
    accent,
    background,
    surface,
    surfaceElevated,
    text,
    textMuted,
    textInverse,
    border,
    ring: withAlpha(primary, 0.4),
    success: '#16a34a',
    warning: '#d97706',
    error: '#dc2626',
    info: primary,
  }

  return { name, label, icon, colors, extraClasses }
}

// ─── Dark theme generator ─────────────────────────────────────────────────────

/**
 * Generate a WCAG-compliant dark theme from a single brand color.
 *
 * @example
 * const myDark = generateDarkTheme('#7c3aed', { name: 'brand-dark', label: 'Dark' })
 */
export function generateDarkTheme(
  primaryHex: string,
  options: GenerateThemeOptions = {},
): ThemeDefinition {
  const {
    name = 'generated-dark',
    label = 'Dark',
    icon,
    saturationBias = 0,
    tintedSurfaces = true,
    accentColor,
    extraClasses = [],
  } = options

  const [h, s] = hexToHsl(primaryHex)
  const surfaceSat = tintedSurfaces ? Math.max(0, s * 0.12 + saturationBias) : 0

  // Lighten the primary so it's visible on dark backgrounds
  const primary = lighten(saturate(primaryHex, 10), 15)
  const secondary = hslToHex(h, Math.max(0, s - 10), 75)
  const accent = accentColor ?? hslToHex((h + 30) % 360, Math.min(100, s + 10), 70)

  const background = hslToHex(h, surfaceSat, 7)
  const surface = hslToHex(h, surfaceSat + 1, 11)
  const surfaceElevated = hslToHex(h, surfaceSat + 2, 16)
  const border = hslToHex(h, surfaceSat + 3, 22)

  const text = hslToHex(h, Math.min(15, s * 0.1), 96)
  const textMuted = hslToHex(h, Math.min(12, s * 0.08), 60)
  const textInverse = hslToHex(h, Math.min(20, s * 0.3), 10)

  const colors: ThemeColors = {
    primary,
    secondary,
    accent,
    background,
    surface,
    surfaceElevated,
    text,
    textMuted,
    textInverse,
    border,
    ring: withAlpha(primary, 0.5),
    success: '#4ade80',
    warning: '#fb923c',
    error: '#f87171',
    info: primary,
  }

  return { name, label, icon, colors, extraClasses }
}

// ─── Pair generator ───────────────────────────────────────────────────────────

/**
 * Generate a matched [light, dark] `ThemeDefinition` pair from one color.
 *
 * @example
 * const [light, dark] = generateThemePair('#7c3aed')
 * app.use(VueMultipleThemesPlugin, { themes: [...generateThemePair('#7c3aed')] })
 */
export function generateThemePair(
  primaryHex: string,
  options: {
    lightName?: string
    darkName?: string
    lightLabel?: string
    darkLabel?: string
    saturationBias?: number
    tintedSurfaces?: boolean
  } = {},
): [ThemeDefinition, ThemeDefinition] {
  const {
    lightName = 'light',
    darkName = 'dark',
    lightLabel = 'Light',
    darkLabel = 'Dark',
    saturationBias,
    tintedSurfaces,
  } = options

  return [
    generateLightTheme(primaryHex, {
      name: lightName,
      label: lightLabel,
      saturationBias,
      tintedSurfaces,
    }),
    generateDarkTheme(primaryHex, {
      name: darkName,
      label: darkLabel,
      saturationBias,
      tintedSurfaces,
    }),
  ]
}

// ─── Palette from multiple brand colors ───────────────────────────────────────

export interface BrandPalette {
  primary: string
  secondary?: string
  accent?: string
}

/**
 * Generate a full theme from a complete brand palette.
 * More control than the single-color generators.
 */
export function generateThemeFromPalette(
  palette: BrandPalette,
  variant: 'light' | 'dark',
  options: GenerateThemeOptions = {},
): ThemeDefinition {
  const base = variant === 'light'
    ? generateLightTheme(palette.primary, options)
    : generateDarkTheme(palette.primary, options)

  return {
    ...base,
    colors: {
      ...base.colors,
      ...(palette.secondary ? { secondary: palette.secondary } : {}),
      ...(palette.accent ? { accent: palette.accent } : {}),
    },
  }
}

// ─── Seasonal / mood presets ──────────────────────────────────────────────────

type Season = 'spring' | 'summer' | 'autumn' | 'winter' | 'midnight' | 'neon' | 'pastel'

const SEASON_COLORS: Record<Season, string> = {
  spring: '#34d399',   // emerald green
  summer: '#f59e0b',   // amber
  autumn: '#b45309',   // burnt orange
  winter: '#7dd3fc',   // icy blue
  midnight: '#6366f1', // indigo
  neon:  '#22d3ee',    // cyan
  pastel: '#f9a8d4',   // rose
}

/**
 * Generate a light + dark theme pair for a named mood/season.
 *
 * @example
 * const themes = generateSeasonalThemes('midnight')
 */
export function generateSeasonalThemes(season: Season): [ThemeDefinition, ThemeDefinition] {
  const base = SEASON_COLORS[season]
  return generateThemePair(base, {
    lightName: `${season}-light`,
    darkName: `${season}-dark`,
    lightLabel: `${capitalize(season)} Light`,
    darkLabel: `${capitalize(season)} Dark`,
  })
}

// ─── CSS color-mix() integration (browser only) ───────────────────────────────

/**
 * Build CSS custom properties using `color-mix()` so the browser does the
 * heavy lifting at runtime. Returns a CSS string ready to inject into a
 * `<style>` tag.
 *
 * > **Browser-only**: `color-mix()` requires a modern browser (Chrome 111+,
 * > Firefox 113+, Safari 16.2+). For SSR or older browsers, prefer the
 * > static generators above.
 *
 * @example
 * import { buildCssMixTheme } from 'vue-multiple-themes'
 * const css = buildCssMixTheme('#7c3aed', 'brand')
 * document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`)
 */
export function buildCssMixTheme(
  primaryHex: string,
  name: string,
  variant: 'light' | 'dark' = 'light',
): string {
  const base = variant === 'dark' ? '#000000' : '#ffffff'
  const selector = `[data-theme="${name}"]`

  const steps = variant === 'light'
    ? { bg: '98%', surface: '95%', border: '85%', text: '10%' }
    : { bg: '8%', surface: '14%', border: '24%', text: '96%' }

  return `
${selector} {
  --vmt-primary: ${primaryHex};
  --vmt-background: color-mix(in oklch, ${primaryHex} 3%, ${base} ${steps.bg});
  --vmt-surface: color-mix(in oklch, ${primaryHex} 5%, ${base} ${steps.surface});
  --vmt-surface-elevated: color-mix(in oklch, ${primaryHex} 8%, ${base});
  --vmt-border: color-mix(in oklch, ${primaryHex} 15%, ${base} ${steps.border});
  --vmt-foreground: color-mix(in oklch, ${primaryHex} 10%, ${base === '#ffffff' ? '#000000' : '#ffffff'} ${steps.text});
  --vmt-foreground-muted: color-mix(in oklch, var(--vmt-foreground) 60%, ${base});
  --vmt-ring: color-mix(in oklch, ${primaryHex} 50%, transparent);
}`.trim()
}

// ─── Adaptive theme (detects CSS vars at runtime, browser-only) ───────────────

/**
 * Read the current CSS custom properties from the document and return them
 * as a `ThemeColors` object. Useful for syncing with design tokens from
 * another design system.
 *
 * @browser-only
 */
export function readCssVarsAsColors(
  varMap: Partial<Record<keyof ThemeColors, string>>,
  element: Element = document.documentElement,
): Partial<ThemeColors> {
  const styles = getComputedStyle(element)
  const result: Partial<ThemeColors> = {}
  for (const [key, varName] of Object.entries(varMap)) {
    const value = styles.getPropertyValue(varName as string).trim()
    if (value) {
      result[key as keyof ThemeColors] = value
    }
  }
  return result
}

// ─── Contrast checker utility ─────────────────────────────────────────────────

export interface ContrastReport {
  ratio: number
  aa: boolean
  aaLarge: boolean
  aaa: boolean
  aaaLarge: boolean
}

/**
 * Analyse a text/background color combination against WCAG 2.1 levels.
 *
 * @example
 * const report = checkContrast('#7c3aed', '#ffffff')
 * console.log(report.aa)  // true
 */
export function checkContrast(foreground: string, background: string): ContrastReport {
  const ratio = contrastRatio(foreground, background)
  return {
    ratio: Math.round(ratio * 100) / 100,
    aa: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaa: ratio >= 7,
    aaaLarge: ratio >= 4.5,
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

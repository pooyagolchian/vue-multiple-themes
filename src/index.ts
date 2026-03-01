/**
 * vue-multiple-themes – public API
 *
 * Vue 3 theme switcher with full Tailwind CSS opacity modifier support:
 *  - CSS custom properties strategy (`data-theme` attribute)
 *  - TailwindCSS strategy (`theme-<name>` class)
 *  - Both simultaneously
 *  - Full TypeScript support
 *  - `useTheme()` composable with reactive ComputedRef returns
 *  - `VueMultipleThemesPlugin` (Options API / global install)
 *  - `createBrandContext()` for white-label / multi-tenant setups
 *  - Tailwind CSS v3 plugin (`vue-multiple-themes/tailwind`)
 *  - Tailwind CSS v4 plugin (`vue-multiple-themes/tailwind-v4`)
 *  - Bring-your-own icon library via `VmtIcon :as="SomeComponent"`
 *  - RGB channel CSS vars for `bg-vmt-primary/50` opacity modifiers
 */

// ─── Core components ──────────────────────────────────────────────────────────
export { default as VueMultipleThemes } from './components/VueMultipleThemes.vue'
export { default as VmtIcon } from './components/VmtIcon.vue'
export { default as VmtThemePicker } from './components/VmtThemePicker.vue'

// ─── Plugin ───────────────────────────────────────────────────────────────────
export { VueMultipleThemesPlugin } from './plugin'

// ─── Composable ──────────────────────────────────────────────────────────────
export { useTheme } from './composables/useTheme'

// ─── Brand context (white-label / multi-tenant) ───────────────────────────────
export { createBrandContext } from './composables/createBrandContext'
export type { BrandContext } from './composables/createBrandContext'

// ─── Types ────────────────────────────────────────────────────────────────────
export type {
  ThemeColors,
  ThemeDefinition,
  ThemeStrategy,
  ThemeTarget,
  ThemeOptions,
  UseThemeReturn,
  VueMultipleThemesProps,
  TailwindPluginOptions,
} from './types'

// ─── Icons ────────────────────────────────────────────────────────────────────
export { LUCIDE_ICONS, getIcon, iconToSvg } from './icons'
export type { LucideIconData } from './icons'

// ─── Utility re-exports (tree-shakeable) ─────────────────────────────────────
export { buildCssVars, injectStyles, removeStyles, toKebab, getStyleId } from './utils/css-injector'

// ─── Color utilities ─────────────────────────────────────────────────────────
export {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  hexToHsl,
  hslToHex,
  parseColor,
  lighten,
  darken,
  saturate,
  rotateHue,
  mix,
  withAlpha,
  luminance,
  contrastRatio,
  autoContrast,
  ensureContrast,
  generateColorScale,
  complementary,
  splitComplementary,
  triadic,
  analogous,
  normalizeToRgbChannels,
} from './utils/color'
export type { RGB, RGBA, HSL } from './utils/color'

// ─── Dynamic theme generators ────────────────────────────────────────────────
export {
  generateLightTheme,
  generateDarkTheme,
  generateThemePair,
  generateThemeFromPalette,
  generateSeasonalThemes,
  buildCssMixTheme,
  readCssVarsAsColors,
  checkContrast,
} from './utils/generate-theme'
export type { GenerateThemeOptions, BrandPalette, ContrastReport } from './utils/generate-theme'

// ─── Preset themes (ready-to-use) ────────────────────────────────────────────
export {
  PRESET_THEMES,
  lightTheme,
  darkTheme,
  sepiaTheme,
  oceanTheme,
  forestTheme,
  sunsetTheme,
  winterTheme,
} from './themes/presets'

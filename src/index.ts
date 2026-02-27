/**
 * vue-multiple-themes – public API
 *
 * Vue 2 & Vue 3 compatible theme switcher with:
 *  - CSS custom properties strategy (`data-theme` attribute)
 *  - TailwindCSS strategy (`theme-<name>` class)
 *  - Both simultaneously
 *  - Full TypeScript support
 *  - `useTheme()` composable (Composition API)
 *  - `VueMultipleThemesPlugin` (Options API / global install)
 *  - Tailwind CSS plugin (`vue-multiple-themes/tailwind`)
 *  - Built-in Lucide icons with `currentColor` SVG rendering
 */

// ─── Core component ───────────────────────────────────────────────────────────
export { default as VueMultipleThemes } from './components/VueMultipleThemes.vue'

// ─── Plugin ───────────────────────────────────────────────────────────────────
export { VueMultipleThemesPlugin } from './plugin'

// ─── Composable ──────────────────────────────────────────────────────────────
export { useTheme } from './composables/useTheme'

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
export { buildCssVars, injectStyles, removeStyles } from './utils/css-injector'

// ─── Preset themes (ready-to-use) ────────────────────────────────────────────
export { PRESET_THEMES, lightTheme, darkTheme, sepiaTheme, oceanTheme, forestTheme, sunsetTheme } from './themes/presets'

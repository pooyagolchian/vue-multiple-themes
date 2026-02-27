// ─── Color Tokens ────────────────────────────────────────────────────────────
/**
 * Mapping of semantic color tokens to CSS values.
 * Values can be hex, hsl, rgb, or channel-only (for Tailwind RGB opacity support).
 *
 * @example { primary: '#3b82f6', background: '#ffffff', text: '#111827' }
 * @example { primary: '59 130 246' }   // Tailwind RGB-channel format
 */
export interface ThemeColors {
  primary?: string
  primaryLight?: string
  primaryDark?: string
  secondary?: string
  accent?: string
  background?: string
  surface?: string
  surfaceElevated?: string
  text?: string
  textMuted?: string
  textInverse?: string
  border?: string
  ring?: string
  success?: string
  warning?: string
  error?: string
  info?: string
  /** Any additional custom token */
  [key: string]: string | undefined
}

// ─── Theme Definition ─────────────────────────────────────────────────────────
/**
 * A single theme configuration object.
 */
export interface ThemeDefinition {
  /** Unique slug used as the value of `data-theme` / CSS class suffix */
  name: string
  /** Human-readable display name */
  label?: string
  /**
   * Name of the Lucide icon to show in the toggle button while this theme is
   * active. Uses `currentColor` so it inherits `--vmt-icon-color`.
   *
   * Supported names: 'sun' | 'moon' | 'sunset' | 'sunrise' | 'monitor' |
   *   'laptop' | 'coffee' | 'leaf' | 'droplets' | 'flame' | 'snowflake' |
   *   'palette' | 'eye' | 'star' | 'zap'
   */
  icon?: string
  /** Color tokens for this theme */
  colors: ThemeColors
  /** Extra CSS classes added to the target element alongside the theme class */
  extraClasses?: string[]
}

// ─── Strategy & Target ───────────────────────────────────────────────────────
/**
 * How the active theme is expressed on the DOM:
 *
 * - `'attribute'`  → sets `data-theme="<name>"` (default, pure CSS-vars)
 * - `'class'`      → adds `theme-<name>` class (TailwindCSS-friendly)
 * - `'both'`       → applies both simultaneously
 */
export type ThemeStrategy = 'attribute' | 'class' | 'both'

/**
 * Which DOM element receives the attribute / class.
 * `'html'` targets `<html>`, `'body'` targets `<body>`,
 * or supply any CSS selector string.
 */
export type ThemeTarget = 'html' | 'body' | string

// ─── Plugin / Composable options ─────────────────────────────────────────────
export interface ThemeOptions {
  /** All available themes (required) */
  themes: ThemeDefinition[]
  /** Name of the theme to activate on first render (defaults to first theme) */
  defaultTheme?: string
  /**
   * Name of the `data-*` attribute used when strategy includes `'attribute'`.
   * Default: `'data-theme'`
   */
  attribute?: string
  /**
   * CSS class prefix used when strategy includes `'class'`.
   * Default: `'theme-'`  →  `theme-dark`, `theme-ocean` …
   */
  classPrefix?: string
  /** DOM element that receives the attribute / class. Default: `'html'` */
  target?: ThemeTarget
  /** How the theme is expressed in the DOM. Default: `'attribute'` */
  strategy?: ThemeStrategy
  /**
   * Whether to inject CSS custom properties (`--vmt-*`) into a `<style>` tag.
   * Default: `true`
   */
  injectCssVars?: boolean
  /**
   * Prefix for generated CSS variable names.
   * Default: `'--vmt-'`  →  `--vmt-primary`, `--vmt-background` …
   */
  cssVarPrefix?: string
  /** Where to persist the active theme name. Default: `'localStorage'` */
  storage?: 'localStorage' | 'sessionStorage' | 'none'
  /** Storage key for persistence. Default: `'vmt-theme'` */
  storageKey?: string
  /**
   * When true, auto-select a theme matching the OS dark/light preference
   * on first load (before any stored value). Default: `false`
   */
  respectSystemPreference?: boolean
  /** Called after every theme change */
  onChange?: (theme: ThemeDefinition) => void
}

// ─── Composable return type ───────────────────────────────────────────────────
export interface UseThemeReturn {
  /** Currently active theme name (reactive) */
  current: string
  /** Full definition of the active theme (reactive) */
  theme: ThemeDefinition
  /** `true` when the active theme name contains `'dark'` */
  isDark: boolean
  /** All available themes */
  themes: ThemeDefinition[]
  /** Activate a theme by name */
  setTheme: (name: string) => void
  /** Advance to the next theme in the list */
  nextTheme: () => void
  /** Go back to the previous theme in the list */
  prevTheme: () => void
  /** Toggle between the first two themes (e.g. light ↔ dark) */
  toggleTheme: () => void
}

// ─── Component props ──────────────────────────────────────────────────────────
export interface VueMultipleThemesProps extends ThemeOptions {
  /** Show the built-in theme-toggle button. Default: `true` */
  showToggle?: boolean
  /** Additional CSS class(es) on the component root element */
  extraClass?: string
}

// ─── Tailwind plugin options ──────────────────────────────────────────────────
export interface TailwindPluginOptions {
  themes: ThemeDefinition[]
  /** CSS variable prefix – default: `'--vmt-'` */
  cssVarPrefix?: string
  /**
   * `'attribute'` → `[data-theme="name"]` selectors
   * `'class'`     → `.theme-name` selectors
   * `'both'`      → both (default)
   */
  strategy?: 'attribute' | 'class' | 'both'
  /**
   * When true (default), the plugin also registers semantic Tailwind utilities:
   * `bg-vmt-background`, `text-vmt-primary`, `border-vmt-border`, etc.
   */
  generateUtils?: boolean
}

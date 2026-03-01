import type { Component } from 'vue'

// ─── Color Tokens ────────────────────────────────────────────────────────────
/**
 * Mapping of semantic color tokens to CSS values.
 * Values can be hex, hsl, rgb, or channel-only (for Tailwind RGB opacity support).
 *
 * All formats are automatically normalized to RGB channels internally,
 * so you can freely mix hex, rgb(), hsl(), or pre-normalized channel values.
 *
 * @example { primary: '#3b82f6', background: '#ffffff', text: '#111827' }
 * @example { primary: '59 130 246' }   // Tailwind RGB-channel format
 * @example { primary: 'hsl(220, 90%, 56%)' }
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
   * Optional icon for this theme — pass any Vue icon component
   * (e.g. from `lucide-vue-next`).
   *
   * @example
   * import { Sun } from 'lucide-vue-next'
   * { icon: Sun, ... }
   */
  icon?: Component
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
   * Logical namespace / brand identifier.
   *
   * Use this when mounting multiple independent theme contexts in the same app
   * (e.g. white-label, micro-frontends, widget embedding).
   *
   * Namespacing isolates:
   * - The injected `<style>` tag (`id="vmt-styles-<namespace>"`)
   * - The singleton reactive state (keyed by `<namespace>:<storageKey>`)
   * - The Vue `provide` key (`vmt:options:<namespace>`)
   *
   * @example
   * createBrandContext({ namespace: 'acme', themes: acmeThemes })
   * createBrandContext({ namespace: 'beta', themes: betaThemes })
   */
  namespace?: string
  /**
   * When true, auto-select a theme matching the OS dark/light preference
   * on first load (before any stored value). Default: `false`
   */
  respectSystemPreference?: boolean
  /** Called after every theme change */
  onChange?: (theme: ThemeDefinition) => void
  /**
   * Called when the theme changes, with both old and new theme names.
   * Useful for analytics, transitions, or side effects.
   */
  onThemeChange?: (newTheme: string, oldTheme: string) => void
}

// ─── Composable return type ───────────────────────────────────────────────────
/**
 * Return type of `useTheme()`.
 *
 * Reactive properties (`current`, `theme`, `isDark`, `resolvedColors`) are
 * auto-unwrapped inside `reactive()`, so they can be used directly in templates
 * without `.value`:
 *
 * ```vue
 * <template>{{ ts.current }}</template>
 * <script setup>
 * const ts = useTheme({ ... })
 * // To watch, use a getter:
 * watch(() => ts.current, (name) => console.log(name))
 * </script>
 * ```
 */
export interface UseThemeReturn {
  /** Currently active theme name (reactive, auto-updates) */
  readonly current: string
  /** Full definition of the active theme (reactive, auto-updates) */
  readonly theme: ThemeDefinition
  /**
   * `true` when the active theme has a dark background (luminance-based detection).
   * Falls back to name-based check if no background color is defined.
   */
  readonly isDark: boolean
  /** All available themes */
  readonly themes: ThemeDefinition[]
  /**
   * Active theme's colors as parsed `{ r, g, b }` objects.
   * Useful for canvas, chart libraries, or any API that needs raw RGB values.
   */
  readonly resolvedColors: Record<string, { r: number; g: number; b: number }>
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
   * Logical namespace / brand identifier — scopes CSS variable injection.
   * Mirrors `ThemeOptions.namespace`.
   */
  namespace?: string
  /**
   * `'attribute'` → `[data-theme="name"]` selectors
   * `'class'`     → `.theme-name` selectors
   * `'both'`      → both (default)
   */
  strategy?: 'attribute' | 'class' | 'both'
  /**
   * Theme names that should be considered "dark" for Tailwind's `dark:` modifier.
   * The first entry is used as the primary dark mode selector.
   *
   * @example darkThemes: ['dark', 'midnight']
   */
  darkThemes?: string[]
}

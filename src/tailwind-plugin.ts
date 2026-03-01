/**
 * TailwindCSS plugin for vue-multiple-themes.
 *
 * Generates:
 * 1. CSS custom-property declarations under `[data-theme="..."]` and / or
 *    `.theme-...` selectors — values in RGB channel format for opacity support.
 * 2. Colors registered via `theme.extend.colors` so ALL Tailwind utilities work
 *    automatically with opacity modifiers: `bg-vmt-primary/50`, `text-vmt-accent/75`,
 *    gradient stops `from-vmt-primary`, `ring-vmt-ring/25`, etc.
 *
 * @example tailwind.config.js / ts:
 * ```ts
 * import { createVmtPlugin } from 'vue-multiple-themes/tailwind'
 * export default {
 *   plugins: [
 *     createVmtPlugin({
 *       themes: myThemes,
 *       strategy: 'both',
 *       darkThemes: ['dark', 'midnight'],
 *     }),
 *   ],
 * }
 * ```
 */

import type { TailwindPluginOptions, ThemeDefinition } from './types'
import { normalizeToRgbChannels } from './utils/color'

type PluginApi = {
  addBase: (styles: Record<string, unknown>) => void
  addUtilities: (utilities: Record<string, unknown>) => void
  matchUtilities: (
    utilities: Record<string, (value: string) => Record<string, string>>,
    options: { values: Record<string, string>; type?: string[] },
  ) => void
  theme: (path: string) => unknown
  e: (className: string) => string
  config: (path: string, defaultValue?: unknown) => unknown
}

type PluginFn = (api: PluginApi) => void

/** camelCase → kebab-case */
function toKebab(str: string): string {
  return str.replace(/([A-Z])/g, (_, c: string) => `-${c.toLowerCase()}`)
}

/** Build CSS custom-property declarations for a single theme. */
function buildCssVarRecord(
  theme: ThemeDefinition,
  prefix: string,
): Record<string, string> {
  const record: Record<string, string> = {}
  for (const [key, value] of Object.entries(theme.colors)) {
    if (value !== undefined) {
      const kebab = toKebab(key)
      const channels = normalizeToRgbChannels(value)
      // Channels for Tailwind opacity modifier: --vmt-primary: 59 130 246
      record[`${prefix}${kebab}`] = channels
      // Full rgb() for direct CSS use: --vmt-primary-color: rgb(59 130 246)
      record[`${prefix}${kebab}-color`] = `rgb(${channels})`
    }
  }
  return record
}

/** Resolve CSS selectors for a theme. */
function resolveSelectors(
  themeName: string,
  strategy: TailwindPluginOptions['strategy'],
  isFirst: boolean,
): string[] {
  const selectors: string[] = []
  if (isFirst) selectors.push(':root')

  if (strategy === 'attribute' || strategy === 'both') {
    selectors.push(`:root[data-theme="${themeName}"]`)
    selectors.push(`[data-theme="${themeName}"]`)
  }

  if (strategy === 'class' || strategy === 'both') {
    selectors.push(`:root.theme-${themeName}`)
    selectors.push(`.theme-${themeName}`)
  }

  return [...new Set(selectors)]
}

/**
 * Collect all unique color token keys from all themes.
 */
function collectColorKeys(themes: ThemeDefinition[]): Set<string> {
  const keys = new Set<string>()
  for (const theme of themes) {
    for (const key of Object.keys(theme.colors)) {
      keys.add(key)
    }
  }
  return keys
}

/**
 * Generate a safelist array for Tailwind JIT mode.
 * Use this when dynamically composing theme-colored class names.
 *
 * @example
 * ```ts
 * import { vmtSafelist } from 'vue-multiple-themes/tailwind'
 * export default {
 *   safelist: vmtSafelist(myThemes),
 * }
 * ```
 */
export function vmtSafelist(
  themes: ThemeDefinition[],
  options: { prefix?: string } = {},
): Array<{ pattern: RegExp; variants?: string[] }> {
  const { prefix = 'vmt' } = options
  const keys = collectColorKeys(themes)
  const kebabKeys = Array.from(keys).map(toKebab)
  const keyPattern = kebabKeys.join('|')
  return [
    {
      pattern: new RegExp(`^(bg|text|border|ring|fill|stroke|outline|shadow|accent|caret|divide|placeholder|from|via|to)-${prefix}-(${keyPattern})(\\/\\d+)?$`),
      variants: ['hover', 'focus', 'active', 'disabled', 'dark', 'group-hover', 'focus-visible', 'focus-within'],
    },
  ]
}

/**
 * Build the Tailwind plugin function.
 *
 * Uses `theme.extend.colors` to register colors with the
 * `rgb(var(--vmt-<token>) / <alpha-value>)` pattern, which enables
 * full opacity modifier support: `bg-vmt-primary/50`, `text-vmt-accent/75`, etc.
 */
export function vmtTailwindPlugin(opts: TailwindPluginOptions): {
  handler: PluginFn
  config: Record<string, unknown>
} {
  const {
    themes,
    cssVarPrefix = '--vmt-',
    strategy = 'both',
    darkThemes = [],
    namespace,
  } = opts

  // Derive Tailwind color key: namespace → 'acme', else strip '--' and trailing '-' from cssVarPrefix
  // '--acme-' → 'acme' | '--vmt-' → 'vmt' | namespace 'my-brand' → 'my-brand'
  const tailwindColorKey: string =
    namespace ??
    cssVarPrefix.replace(/^--/, '').replace(/-$/, '') ??
    'vmt'

  const allKeys = collectColorKeys(themes)

  // Build the colors config for theme.extend.colors
  const vmtColors: Record<string, string | ((params: { opacityValue?: string }) => string)> = {}
  for (const key of allKeys) {
    const kebab = toKebab(key)
    vmtColors[kebab] = `rgb(var(${cssVarPrefix}${kebab}) / <alpha-value>)`
  }

  // Determine dark mode selector from darkThemes
  const darkModeConfig: Record<string, unknown> = {}
  if (darkThemes.length > 0) {
    // Use the first dark theme for the dark: modifier
    const darkSelector = strategy === 'class' || strategy === 'both'
      ? `.theme-${darkThemes[0]}`
      : `[data-theme="${darkThemes[0]}"]`
    darkModeConfig.darkMode = ['selector', darkSelector]
  }

  return {
    handler: ({ addBase }) => {
      // ─── 1. CSS variable declarations under theme selectors ───────────
      const baseStyles: Record<string, Record<string, string>> = {}

      for (let i = 0; i < themes.length; i++) {
        const theme = themes[i]
        const selectors = resolveSelectors(theme.name, strategy, i === 0)
        const vars = buildCssVarRecord(theme, cssVarPrefix)

        for (const selector of selectors) {
          if (baseStyles[selector]) {
            Object.assign(baseStyles[selector], vars)
          } else {
            baseStyles[selector] = { ...vars }
          }
        }
      }

      // Icon-color convenience variable
      baseStyles[':root'] = {
        ...baseStyles[':root'],
        [`${cssVarPrefix}icon-color`]: `var(${cssVarPrefix}text-color, currentColor)`,
      }

      // ─── 2. Theme transition helper class ─────────────────────────────
      baseStyles['.vmt-transitioning'] = {
        'transition-property': 'color, background-color, border-color, text-decoration-color, fill, stroke',
        'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'transition-duration': '200ms',
      } as unknown as Record<string, string>

      baseStyles['.vmt-transitioning *'] = {
        'transition-property': 'color, background-color, border-color, text-decoration-color, fill, stroke',
        'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'transition-duration': '200ms',
      } as unknown as Record<string, string>

      addBase(baseStyles as Parameters<typeof addBase>[0])
    },

    config: {
      theme: {
        extend: {
          colors: {
            [tailwindColorKey]: vmtColors,
          },
        },
      },
      ...darkModeConfig,
    },
  }
}

/**
 * Convenience wrapper that returns a Tailwind plugin object
 * compatible with the `plugins: []` array in tailwind.config.ts.
 *
 * Returns a `{ handler, config }` shape that Tailwind v3.3+ accepts
 * directly in the `plugins` array.
 *
 * @example
 * ```ts
 * import { createVmtPlugin } from 'vue-multiple-themes/tailwind'
 * export default {
 *   plugins: [createVmtPlugin({ themes: myThemes })],
 * }
 * ```
 */
export function createVmtPlugin(opts: TailwindPluginOptions) {
  return vmtTailwindPlugin(opts)
}

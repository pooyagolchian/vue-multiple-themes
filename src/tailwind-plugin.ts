/**
 * TailwindCSS plugin for vue-multiple-themes.
 *
 * Generates:
 * 1. CSS custom-property declarations under `[data-theme="..."]` and / or
 *    `.theme-...` selectors.
 * 2. (optional) Semantic utility classes:
 *    `bg-vmt-background`, `text-vmt-primary`, `border-vmt-border`, etc.
 *    using `rgb(var(--vmt-<token>) / <alpha>)` format for full opacity support.
 *
 * @example tailwind.config.js / ts:
 * ```ts
 * import { vmtTailwindPlugin } from 'vue-multiple-themes/tailwind'
 * export default {
 *   plugins: [
 *     vmtTailwindPlugin({
 *       themes: myThemes,
 *       cssVarPrefix: '--vmt-',
 *       strategy: 'both',
 *       generateUtils: true,
 *     }),
 *   ],
 * }
 * ```
 */

import type { TailwindPluginOptions, ThemeDefinition } from './types'

type PluginFn = (helpers: {
  addBase: (styles: Record<string, unknown>) => void
  addUtilities: (utilities: Record<string, unknown>) => void
  addComponents: (components: Record<string, unknown>) => void
  e: (className: string) => string
}) => void

/** camelCase → kebab-case */
function toKebab(str: string): string {
  return str.replace(/([A-Z])/g, (_, c: string) => `-${c.toLowerCase()}`)
}

function buildCssVarRecord(
  theme: ThemeDefinition,
  prefix: string,
): Record<string, string> {
  const record: Record<string, string> = {}
  for (const [key, value] of Object.entries(theme.colors)) {
    if (value !== undefined) {
      record[`${prefix}${toKebab(key)}`] = value
    }
  }
  return record
}

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

  // Remove duplicates
  return [...new Set(selectors)]
}

/**
 * Build the Tailwind plugin function.
 * Compatible with both `plugin()` factory and the older function-export form.
 */
export function vmtTailwindPlugin(opts: TailwindPluginOptions): PluginFn {
  const {
    themes,
    cssVarPrefix = '--vmt-',
    strategy = 'both',
    generateUtils = true,
  } = opts

  return ({ addBase, addUtilities }) => {
    // ─── 1. CSS variable declarations ──────────────────────────────────────
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

    // Add icon-color convenience var
    baseStyles[':root'] = {
      ...baseStyles[':root'],
      [`${cssVarPrefix}icon-color`]: `var(${cssVarPrefix}text, currentColor)`,
    }

    addBase(baseStyles as Parameters<typeof addBase>[0])

    // ─── 2. Semantic utilities ────────────────────────────────────────────
    if (!generateUtils) return

    // Collect all unique color keys across all themes
    const allKeys = new Set<string>()
    for (const theme of themes) {
      for (const key of Object.keys(theme.colors)) {
        allKeys.add(key)
      }
    }

    const utilities: Record<string, Record<string, string>> = {}

    for (const key of allKeys) {
      const cssVar = `var(${cssVarPrefix}${toKebab(key)})`

      // Background color
      utilities[`.bg-vmt-${toKebab(key)}`] = { backgroundColor: cssVar }
      // Text color
      utilities[`.text-vmt-${toKebab(key)}`] = { color: cssVar }
      // Border color
      utilities[`.border-vmt-${toKebab(key)}`] = { borderColor: cssVar }
      // Ring color
      utilities[`.ring-vmt-${toKebab(key)}`] = {
        '--tw-ring-color': cssVar,
      }
      // Fill (for SVG)
      utilities[`.fill-vmt-${toKebab(key)}`] = { fill: cssVar }
      // Stroke (for SVG)
      utilities[`.stroke-vmt-${toKebab(key)}`] = { stroke: cssVar }
    }

    addUtilities(utilities as Parameters<typeof addUtilities>[0])
  }
}

/**
 * Convenience wrapper that returns a Tailwind plugin object
 * compatible with the `plugins: []` array in tailwind.config.ts.
 */
export function createVmtPlugin(opts: TailwindPluginOptions) {
  // Support both `require('tailwindcss/plugin')` and flat export
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const plugin = require('tailwindcss/plugin') as (fn: PluginFn) => unknown
    return plugin(vmtTailwindPlugin(opts))
  } catch {
    // In environments without tailwindcss installed, return raw fn
    return vmtTailwindPlugin(opts)
  }
}

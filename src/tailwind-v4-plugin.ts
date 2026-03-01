/**
 * TailwindCSS v4 plugin for vue-multiple-themes.
 *
 * Tailwind v4 uses CSS-first configuration with `@theme` directives.
 * This plugin generates the CSS needed for v4's theme system.
 *
 * Usage in your CSS file (e.g. app.css):
 * ```css
 * @import "tailwindcss";
 * @plugin "vue-multiple-themes/tailwind-v4";
 * ```
 *
 * Or generate the CSS string and inject manually:
 * ```ts
 * import { generateVmtCssForV4 } from 'vue-multiple-themes/tailwind-v4'
 * const css = generateVmtCssForV4({ themes: myThemes })
 * ```
 */

import type { TailwindPluginOptions, ThemeDefinition } from './types'
import { normalizeToRgbChannels } from './utils/color'

/** camelCase → kebab-case */
function toKebab(str: string): string {
  return str.replace(/([A-Z])/g, (_, c: string) => `-${c.toLowerCase()}`)
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
 * Generate a complete CSS string compatible with Tailwind v4's CSS-first approach.
 *
 * This outputs:
 * 1. `@theme` block registering `--color-vmt-*` custom properties using CSS var references.
 * 2. Theme-scoped CSS custom properties under `[data-theme]` / `.theme-*` selectors.
 * 3. Optional `@custom-variant dark` for dark mode support.
 *
 * @example
 * ```ts
 * import { generateVmtCssForV4 } from 'vue-multiple-themes/tailwind-v4'
 *
 * const css = generateVmtCssForV4({
 *   themes: [lightTheme, darkTheme],
 *   darkThemes: ['dark'],
 * })
 * // Inject via <style> tag or write to a .css file
 * ```
 */
export function generateVmtCssForV4(opts: TailwindPluginOptions): string {
  const {
    themes,
    cssVarPrefix = '--vmt-',
    strategy = 'both',
    darkThemes = [],
  } = opts

  const allKeys = collectColorKeys(themes)
  const blocks: string[] = []

  // ─── 1. @theme block for Tailwind v4 ────────────────────────────────────
  // Registers colors so utilities like `bg-vmt-primary`, `text-vmt-accent/50` work
  const themeVars: string[] = []
  for (const key of allKeys) {
    const kebab = toKebab(key)
    themeVars.push(`  --color-vmt-${kebab}: rgb(var(${cssVarPrefix}${kebab}) / <alpha-value>);`)
  }
  blocks.push(`@theme {\n${themeVars.join('\n')}\n}`)

  // ─── 2. Theme-scoped CSS custom properties ──────────────────────────────
  for (let i = 0; i < themes.length; i++) {
    const theme = themes[i]
    const selectors: string[] = []

    if (i === 0) selectors.push(':root')

    if (strategy === 'attribute' || strategy === 'both') {
      selectors.push(`:root[data-theme="${theme.name}"]`)
      selectors.push(`[data-theme="${theme.name}"]`)
    }

    if (strategy === 'class' || strategy === 'both') {
      selectors.push(`:root.theme-${theme.name}`)
      selectors.push(`.theme-${theme.name}`)
    }

    const uniqueSelectors = [...new Set(selectors)]
    const vars: string[] = []

    for (const [key, value] of Object.entries(theme.colors)) {
      if (value === undefined) continue
      const kebab = toKebab(key)
      const channels = normalizeToRgbChannels(value)
      vars.push(`  ${cssVarPrefix}${kebab}: ${channels};`)
      vars.push(`  ${cssVarPrefix}${kebab}-color: rgb(${channels});`)
    }

    // Icon color convenience
    vars.push(`  ${cssVarPrefix}icon-color: var(${cssVarPrefix}text-color, currentColor);`)

    blocks.push(`${uniqueSelectors.join(',\n')} {\n${vars.join('\n')}\n}`)
  }

  // ─── 3. Dark mode custom variant ────────────────────────────────────────
  if (darkThemes.length > 0) {
    const darkSelectors: string[] = []
    for (const name of darkThemes) {
      if (strategy === 'attribute' || strategy === 'both') {
        darkSelectors.push(`[data-theme="${name}"]`)
      }
      if (strategy === 'class' || strategy === 'both') {
        darkSelectors.push(`.theme-${name}`)
      }
    }
    if (darkSelectors.length > 0) {
      blocks.push(`@custom-variant dark (${darkSelectors.join(', ')});`)
    }
  }

  // ─── 4. Theme transition helper ─────────────────────────────────────────
  blocks.push(`.vmt-transitioning,\n.vmt-transitioning * {\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 200ms;\n}`)

  return blocks.join('\n\n')
}

/**
 * Tailwind v4 CSS plugin (for use with `@plugin` directive).
 *
 * Since Tailwind v4 plugins are JS functions that receive the plugin API,
 * this works similarly to the v3 plugin but uses v4's API conventions.
 */
export function vmtTailwindV4Plugin(opts: TailwindPluginOptions) {
  const {
    themes,
    cssVarPrefix = '--vmt-',
    strategy = 'both',
    darkThemes = [],
  } = opts

  const allKeys = collectColorKeys(themes)

  return (api: any) => {
    // Register theme values
    const themeValues: Record<string, string> = {}
    for (const key of allKeys) {
      const kebab = toKebab(key)
      themeValues[`--color-vmt-${kebab}`] = `rgb(var(${cssVarPrefix}${kebab}) / <alpha-value>)`
    }
    if (typeof api.addTheme === 'function') {
      api.addTheme(themeValues)
    }

    // Add base styles for CSS vars
    if (typeof api.addBase === 'function') {
      const baseStyles: Record<string, Record<string, string>> = {}

      for (let i = 0; i < themes.length; i++) {
        const theme = themes[i]
        const selectors: string[] = []

        if (i === 0) selectors.push(':root')
        if (strategy === 'attribute' || strategy === 'both') {
          selectors.push(`:root[data-theme="${theme.name}"]`)
          selectors.push(`[data-theme="${theme.name}"]`)
        }
        if (strategy === 'class' || strategy === 'both') {
          selectors.push(`:root.theme-${theme.name}`)
          selectors.push(`.theme-${theme.name}`)
        }

        for (const selector of [...new Set(selectors)]) {
          const vars: Record<string, string> = {}
          for (const [key, value] of Object.entries(theme.colors)) {
            if (value === undefined) continue
            const kebab = toKebab(key)
            const channels = normalizeToRgbChannels(value)
            vars[`${cssVarPrefix}${kebab}`] = channels
            vars[`${cssVarPrefix}${kebab}-color`] = `rgb(${channels})`
          }
          baseStyles[selector] = { ...baseStyles[selector], ...vars }
        }
      }

      baseStyles[':root'] = {
        ...baseStyles[':root'],
        [`${cssVarPrefix}icon-color`]: `var(${cssVarPrefix}text-color, currentColor)`,
      }

      api.addBase(baseStyles)
    }

    // Register dark mode variant
    if (darkThemes.length > 0 && typeof api.addVariant === 'function') {
      const darkSelectors: string[] = []
      for (const name of darkThemes) {
        if (strategy === 'attribute' || strategy === 'both') {
          darkSelectors.push(`[data-theme="${name}"]`)
        }
        if (strategy === 'class' || strategy === 'both') {
          darkSelectors.push(`.theme-${name}`)
        }
      }
      api.addVariant('dark', darkSelectors.map((s) => `${s} &`))
    }
  }
}

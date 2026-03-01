import type { ThemeDefinition, ThemeOptions } from '../types'
import { normalizeToRgbChannels } from './color'

const DEFAULT_STYLE_ID = 'vmt-theme-styles'

/** Return the `<style>` element id for the given namespace. */
export function getStyleId(namespace?: string): string {
  return namespace ? `vmt-theme-styles-${namespace}` : DEFAULT_STYLE_ID
}

/**
 * Convert camelCase token names to kebab-case CSS variable segments.
 * e.g. "primaryDark" → "primary-dark"
 */
export function toKebab(str: string): string {
  return str.replace(/([A-Z])/g, (_, c: string) => `-${c.toLowerCase()}`)
}

/** Build a full CSS block string for all themes. */
export function buildCssVars(
  themes: ThemeDefinition[],
  options: Pick<ThemeOptions, 'strategy' | 'attribute' | 'classPrefix' | 'cssVarPrefix' | 'target' | 'namespace'>,
): string {
  const {
    strategy = 'attribute',
    attribute = 'data-theme',
    classPrefix = 'theme-',
    cssVarPrefix = '--vmt-',
    target = 'html',
  } = options

  const rootSelector = target === 'html' ? ':root' : target

  function buildSelector(themeName: string, isDefault: boolean): string {
    const parts: string[] = []
    if (isDefault) parts.push(rootSelector)

    if (strategy === 'attribute' || strategy === 'both') {
      const base =
        target === 'html'
          ? `:root[${attribute}="${themeName}"]`
          : `${target}[${attribute}="${themeName}"]`
      if (!parts.includes(base)) parts.push(base)
    }

    if (strategy === 'class' || strategy === 'both') {
      const cls = `${classPrefix}${themeName}`
      const base = target === 'html' ? `:root.${cls}` : `${target}.${cls}`
      if (!parts.includes(base)) parts.push(base)
    }

    return parts.join(',\n')
  }

  const blocks: string[] = []

  // Convenience icon-color variable on :root
  blocks.push(
    `${rootSelector} {\n  ${cssVarPrefix}icon-color: var(${cssVarPrefix}text, currentColor);\n}`,
  )

  for (let i = 0; i < themes.length; i++) {
    const theme = themes[i]
    const selector = buildSelector(theme.name, i === 0)
    const vars = Object.entries(theme.colors)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => {
        const kebab = toKebab(k)
        const channels = normalizeToRgbChannels(v!)
        const lines: string[] = []
        // RGB channels for Tailwind opacity modifier support: bg-vmt-primary/50
        lines.push(`  ${cssVarPrefix}${kebab}: ${channels};`)
        // Full rgb() color for direct CSS use: color: var(--vmt-primary-color)
        lines.push(`  ${cssVarPrefix}${kebab}-color: rgb(${channels});`)
        return lines.join('\n')
      })
      .join('\n')
    blocks.push(`${selector} {\n${vars}\n}`)
  }

  return blocks.join('\n\n')
}

/** Inject (or update) a `<style>` tag with the generated CSS into `<head>`. */
export function injectStyles(css: string, namespace?: string): void {
  if (typeof document === 'undefined') return

  const id = getStyleId(namespace)
  let el = document.getElementById(id) as HTMLStyleElement | null
  if (!el) {
    el = document.createElement('style')
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = css
}

/** Remove the injected `<style>` tag. */
export function removeStyles(namespace?: string): void {
  if (typeof document === 'undefined') return
  document.getElementById(getStyleId(namespace))?.remove()
}

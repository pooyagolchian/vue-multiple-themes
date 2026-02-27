import type { ThemeDefinition, ThemeOptions } from '../types'

const STYLE_ID = 'vmt-theme-styles'

/**
 * Convert camelCase token names to kebab-case CSS variable segments.
 * e.g. "primaryDark" → "primary-dark"
 */
function toKebab(str: string): string {
  return str.replace(/([A-Z])/g, (_, c: string) => `-${c.toLowerCase()}`)
}

/** Build a full CSS block string for all themes. */
export function buildCssVars(
  themes: ThemeDefinition[],
  options: Pick<ThemeOptions, 'strategy' | 'attribute' | 'classPrefix' | 'cssVarPrefix' | 'target'>,
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
      .map(([k, v]) => `  ${cssVarPrefix}${toKebab(k)}: ${v};`)
      .join('\n')
    blocks.push(`${selector} {\n${vars}\n}`)
  }

  return blocks.join('\n\n')
}

/** Inject (or update) a `<style>` tag with the generated CSS into `<head>`. */
export function injectStyles(css: string): void {
  if (typeof document === 'undefined') return

  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (!el) {
    el = document.createElement('style')
    el.id = STYLE_ID
    document.head.appendChild(el)
  }
  el.textContent = css
}

/** Remove the injected `<style>` tag. */
export function removeStyles(): void {
  if (typeof document === 'undefined') return
  document.getElementById(STYLE_ID)?.remove()
}

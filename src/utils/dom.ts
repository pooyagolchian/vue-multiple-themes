import type { ThemeOptions, ThemeTarget } from '../types'

/** Resolve the target DOM element. Returns null in SSR. */
export function resolveTarget(target: ThemeTarget = 'html'): Element | null {
  if (typeof document === 'undefined') return null
  if (target === 'html') return document.documentElement
  if (target === 'body') return document.body
  return document.querySelector(target)
}

/**
 * Apply a theme to the DOM by setting attributes and / or CSS classes
 * on the target element, and removing the previous ones.
 */
export function applyThemeToDom(
  name: string,
  previousName: string | null,
  options: Pick<ThemeOptions, 'strategy' | 'attribute' | 'classPrefix' | 'target'>,
): void {
  const {
    strategy = 'attribute',
    attribute = 'data-theme',
    classPrefix = 'theme-',
    target = 'html',
  } = options

  const el = resolveTarget(target)
  if (!el) return

  if (strategy === 'attribute' || strategy === 'both') {
    el.setAttribute(attribute, name)
  }

  if (strategy === 'class' || strategy === 'both') {
    if (previousName) {
      el.classList.remove(`${classPrefix}${previousName}`)
    }
    el.classList.add(`${classPrefix}${name}`)
  }
}

/** Remove all theme markers from the DOM (cleanup). */
export function clearThemeFromDom(
  name: string,
  options: Pick<ThemeOptions, 'strategy' | 'attribute' | 'classPrefix' | 'target'>,
): void {
  const {
    strategy = 'attribute',
    attribute = 'data-theme',
    classPrefix = 'theme-',
    target = 'html',
  } = options

  const el = resolveTarget(target)
  if (!el) return

  if (strategy === 'attribute' || strategy === 'both') {
    el.removeAttribute(attribute)
  }

  if (strategy === 'class' || strategy === 'both') {
    el.classList.remove(`${classPrefix}${name}`)
  }
}

/** Read / write from Web Storage, swallowing errors in private-browsing mode. */
export function readStorage(key: string, type: 'localStorage' | 'sessionStorage'): string | null {
  try {
    return window[type].getItem(key)
  } catch {
    return null
  }
}

export function writeStorage(key: string, value: string, type: 'localStorage' | 'sessionStorage'): void {
  try {
    window[type].setItem(key, value)
  } catch {
    /* ignore */
  }
}

/** Returns 'dark' or 'light' based on OS preference (browser only). */
export function getSystemPreference(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { ThemeDefinition } from '../../src/types'
import { buildCssVars, injectStyles, removeStyles } from '../../src/utils/css-injector'

const THEMES: ThemeDefinition[] = [
  {
    name: 'light',
    label: 'Light',
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      background: '#ffffff',
      surface: '#f8fafc',
      surfaceElevated: '#f1f5f9',
      text: '#111827',
      textMuted: '#6b7280',
      textInverse: '#ffffff',
      border: '#e5e7eb',
      ring: '#3b82f6',
      accent: '#f59e0b',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },
  {
    name: 'dark',
    label: 'Dark',
    colors: {
      primary: '#60a5fa',
      secondary: '#a78bfa',
      background: '#0f172a',
      surface: '#1e293b',
      surfaceElevated: '#334155',
      text: '#f8fafc',
      textMuted: '#94a3b8',
      textInverse: '#0f172a',
      border: '#334155',
      ring: '#60a5fa',
      accent: '#fbbf24',
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171',
      info: '#60a5fa',
    },
  },
]

describe('buildCssVars', () => {
  it('produces a CSS string', () => {
    const css = buildCssVars(THEMES, { strategy: 'attribute' })
    expect(typeof css).toBe('string')
    expect(css.length).toBeGreaterThan(0)
  })

  it('contains :root for the first theme', () => {
    const css = buildCssVars(THEMES, { strategy: 'attribute' })
    expect(css).toContain(':root')
  })

  it('contains attribute selectors when strategy = attribute', () => {
    const css = buildCssVars(THEMES, { strategy: 'attribute', attribute: 'data-theme' })
    expect(css).toContain('[data-theme="light"]')
    expect(css).toContain('[data-theme="dark"]')
  })

  it('contains class selectors when strategy = class', () => {
    const css = buildCssVars(THEMES, { strategy: 'class', classPrefix: 'theme-' })
    expect(css).toContain('.theme-light')
    expect(css).toContain('.theme-dark')
  })

  it('contains both selectors when strategy = both', () => {
    const css = buildCssVars(THEMES, { strategy: 'both' })
    expect(css).toContain('[data-theme="light"]')
    expect(css).toContain('.theme-light')
  })

  it('uses the provided css var prefix', () => {
    const css = buildCssVars(THEMES, { strategy: 'attribute', cssVarPrefix: '--my-' })
    expect(css).toContain('--my-primary')
  })

  it('converts camelCase to kebab-case', () => {
    const css = buildCssVars(THEMES, { strategy: 'attribute' })
    expect(css).toContain('--vmt-surface-elevated')
    expect(css).toContain('--vmt-text-muted')
  })

  it('generates color values for each theme', () => {
    const css = buildCssVars(THEMES, { strategy: 'attribute' })
    expect(css).toContain('#3b82f6')  // light primary
    expect(css).toContain('#60a5fa')  // dark primary
  })
})

describe('injectStyles / removeStyles', () => {
  afterEach(() => {
    removeStyles()
  })

  it('injects a <style> element into document.head', () => {
    injectStyles('body { color: red; }')
    const el = document.getElementById('vmt-theme-styles')
    expect(el).not.toBeNull()
    expect(el?.tagName).toBe('STYLE')
  })

  it('sets the textContent of the injected style', () => {
    const css = 'body { background: blue; }'
    injectStyles(css)
    const el = document.getElementById('vmt-theme-styles')
    expect(el?.textContent).toBe(css)
  })

  it('updates content when called again (idempotent)', () => {
    injectStyles('body { color: red; }')
    injectStyles('body { color: blue; }')
    const elements = document.querySelectorAll('#vmt-theme-styles')
    expect(elements.length).toBe(1)
    expect((elements[0] as HTMLStyleElement).textContent).toBe('body { color: blue; }')
  })

  it('removeStyles removes the injected element', () => {
    injectStyles('body { color: red; }')
    removeStyles()
    const el = document.getElementById('vmt-theme-styles')
    expect(el).toBeNull()
  })

  it('removeStyles is safe when nothing injected', () => {
    expect(() => removeStyles()).not.toThrow()
  })
})

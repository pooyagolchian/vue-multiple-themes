import { describe, it, expect, beforeEach } from 'vitest'
import { toKebab, buildCssVars, getStyleId, injectStyles, removeStyles } from './css-injector'
import { lightTheme, darkTheme } from '../themes/presets'

describe('toKebab', () => {
  it('converts camelCase to kebab-case', () => {
    expect(toKebab('primaryDark')).toBe('primary-dark')
  })

  it('handles single word', () => {
    expect(toKebab('primary')).toBe('primary')
  })

  it('handles multiple capitals', () => {
    expect(toKebab('surfaceElevated')).toBe('surface-elevated')
  })

  it('handles textInverse', () => {
    expect(toKebab('textInverse')).toBe('text-inverse')
  })
})

describe('getStyleId', () => {
  it('returns default id without namespace', () => {
    expect(getStyleId()).toBe('vmt-theme-styles')
  })

  it('returns namespaced id', () => {
    expect(getStyleId('acme')).toBe('vmt-theme-styles-acme')
  })
})

describe('buildCssVars', () => {
  it('generates CSS with attribute selector', () => {
    const css = buildCssVars([lightTheme, darkTheme], {
      strategy: 'attribute',
      attribute: 'data-theme',
      classPrefix: 'theme-',
      cssVarPrefix: '--vmt-',
      target: 'html',
    })
    expect(css).toContain(':root[data-theme="light"]')
    expect(css).toContain(':root[data-theme="dark"]')
    expect(css).toContain('--vmt-primary:')
    expect(css).toContain('--vmt-primary-color:')
  })

  it('generates CSS with class selector', () => {
    const css = buildCssVars([lightTheme], {
      strategy: 'class',
      attribute: 'data-theme',
      classPrefix: 'theme-',
      cssVarPrefix: '--vmt-',
      target: 'html',
    })
    expect(css).toContain(':root.theme-light')
  })

  it('generates CSS with both strategy', () => {
    const css = buildCssVars([lightTheme], {
      strategy: 'both',
      attribute: 'data-theme',
      classPrefix: 'theme-',
      cssVarPrefix: '--vmt-',
      target: 'html',
    })
    expect(css).toContain(':root[data-theme="light"]')
    expect(css).toContain(':root.theme-light')
  })

  it('uses custom CSS var prefix', () => {
    const css = buildCssVars([lightTheme], {
      strategy: 'attribute',
      attribute: 'data-theme',
      classPrefix: 'theme-',
      cssVarPrefix: '--brand-',
      target: 'html',
    })
    expect(css).toContain('--brand-primary:')
  })

  it('includes RGB channels for Tailwind opacity modifiers', () => {
    const css = buildCssVars([lightTheme], {
      strategy: 'attribute',
      attribute: 'data-theme',
      classPrefix: 'theme-',
      cssVarPrefix: '--vmt-',
      target: 'html',
    })
    // Should have both channel format and rgb() format
    expect(css).toContain('--vmt-primary:')
    expect(css).toContain('--vmt-primary-color: rgb(')
  })
})

describe('injectStyles / removeStyles', () => {
  beforeEach(() => {
    document.head.innerHTML = ''
  })

  it('injects a <style> tag', () => {
    injectStyles('body { color: red }')
    const el = document.getElementById('vmt-theme-styles')
    expect(el).not.toBeNull()
    expect(el?.textContent).toBe('body { color: red }')
  })

  it('updates existing <style> tag', () => {
    injectStyles('a { color: blue }')
    injectStyles('a { color: red }')
    const els = document.querySelectorAll('#vmt-theme-styles')
    expect(els).toHaveLength(1)
    expect(els[0].textContent).toBe('a { color: red }')
  })

  it('uses namespaced id', () => {
    injectStyles('body {}', 'acme')
    expect(document.getElementById('vmt-theme-styles-acme')).not.toBeNull()
  })

  it('removeStyles removes the tag', () => {
    injectStyles('body {}')
    removeStyles()
    expect(document.getElementById('vmt-theme-styles')).toBeNull()
  })

  it('removeStyles with namespace', () => {
    injectStyles('body {}', 'acme')
    removeStyles('acme')
    expect(document.getElementById('vmt-theme-styles-acme')).toBeNull()
  })
})

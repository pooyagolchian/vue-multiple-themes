import { beforeEach, describe, expect, it } from 'vitest'
import {
  applyThemeToDom,
  clearThemeFromDom,
  readStorage,
  resolveTarget,
  writeStorage,
} from '../../src/utils/dom'

describe('resolveTarget', () => {
  it('resolves "html" to documentElement', () => {
    expect(resolveTarget('html')).toBe(document.documentElement)
  })

  it('resolves "body" to document.body', () => {
    expect(resolveTarget('body')).toBe(document.body)
  })

  it('resolves a CSS selector', () => {
    const div = document.createElement('div')
    div.id = 'app'
    document.body.appendChild(div)
    expect(resolveTarget('#app')).toBe(div)
    document.body.removeChild(div)
  })

  it('defaults to documentElement when target is undefined', () => {
    expect(resolveTarget()).toBe(document.documentElement)
  })
})

describe('applyThemeToDom', () => {
  let el: HTMLElement

  beforeEach(() => {
    el = document.documentElement
    el.removeAttribute('data-theme')
    el.className = ''
  })

  it('sets data-theme attribute when strategy = attribute', () => {
    applyThemeToDom('dark', null, { strategy: 'attribute', attribute: 'data-theme', classPrefix: 'theme-', target: 'html' })
    expect(el.getAttribute('data-theme')).toBe('dark')
  })

  it('adds a class when strategy = class', () => {
    applyThemeToDom('dark', null, { strategy: 'class', attribute: 'data-theme', classPrefix: 'theme-', target: 'html' })
    expect(el.classList.contains('theme-dark')).toBe(true)
  })

  it('both sets attribute and class when strategy = both', () => {
    applyThemeToDom('ocean', null, { strategy: 'both', attribute: 'data-theme', classPrefix: 'theme-', target: 'html' })
    expect(el.getAttribute('data-theme')).toBe('ocean')
    expect(el.classList.contains('theme-ocean')).toBe(true)
  })

  it('removes previous class when switching (strategy = class)', () => {
    applyThemeToDom('light', null, { strategy: 'class', attribute: 'data-theme', classPrefix: 'theme-', target: 'html' })
    applyThemeToDom('dark', 'light', { strategy: 'class', attribute: 'data-theme', classPrefix: 'theme-', target: 'html' })
    expect(el.classList.contains('theme-light')).toBe(false)
    expect(el.classList.contains('theme-dark')).toBe(true)
  })

  it('removes stale theme classes even without previousName (page refresh scenario)', () => {
    // Simulate a stale class left over from a previous page load
    el.classList.add('theme-ocean')
    applyThemeToDom('dark', null, { strategy: 'class', attribute: 'data-theme', classPrefix: 'theme-', target: 'html' })
    expect(el.classList.contains('theme-ocean')).toBe(false)
    expect(el.classList.contains('theme-dark')).toBe(true)
  })

  it('uses custom attribute name', () => {
    applyThemeToDom('dark', null, { strategy: 'attribute', attribute: 'theme', classPrefix: 'theme-', target: 'html' })
    expect(el.getAttribute('theme')).toBe('dark')
  })

  it('uses custom class prefix', () => {
    applyThemeToDom('dark', null, { strategy: 'class', attribute: 'data-theme', classPrefix: 'color-scheme-', target: 'html' })
    expect(el.classList.contains('color-scheme-dark')).toBe(true)
  })
})

describe('clearThemeFromDom', () => {
  let el: HTMLElement

  beforeEach(() => {
    el = document.documentElement
    el.setAttribute('data-theme', 'dark')
    el.classList.add('theme-dark')
  })

  it('removes attribute when strategy = attribute', () => {
    clearThemeFromDom('dark', { strategy: 'attribute', attribute: 'data-theme', classPrefix: 'theme-', target: 'html' })
    expect(el.getAttribute('data-theme')).toBeNull()
  })

  it('removes class when strategy = class', () => {
    clearThemeFromDom('dark', { strategy: 'class', attribute: 'data-theme', classPrefix: 'theme-', target: 'html' })
    expect(el.classList.contains('theme-dark')).toBe(false)
  })

  it('removes both when strategy = both', () => {
    clearThemeFromDom('dark', { strategy: 'both', attribute: 'data-theme', classPrefix: 'theme-', target: 'html' })
    expect(el.getAttribute('data-theme')).toBeNull()
    expect(el.classList.contains('theme-dark')).toBe(false)
  })
})

describe('readStorage / writeStorage', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  it('writes and reads from localStorage', () => {
    writeStorage('theme', 'dark', 'localStorage')
    expect(readStorage('theme', 'localStorage')).toBe('dark')
  })

  it('writes and reads from sessionStorage', () => {
    writeStorage('theme', 'ocean', 'sessionStorage')
    expect(readStorage('theme', 'sessionStorage')).toBe('ocean')
  })

  it('returns null for non-existent key', () => {
    expect(readStorage('nonexistent', 'localStorage')).toBeNull()
  })

  it('overwrites existing key', () => {
    writeStorage('theme', 'light', 'localStorage')
    writeStorage('theme', 'dark', 'localStorage')
    expect(readStorage('theme', 'localStorage')).toBe('dark')
  })
})

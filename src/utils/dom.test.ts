import { describe, it, expect, beforeEach } from 'vitest'
import { applyThemeToDom, clearThemeFromDom, readStorage, writeStorage, getSystemPreference } from './dom'

describe('applyThemeToDom', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.className = ''
  })

  it('sets data-theme attribute with attribute strategy', () => {
    applyThemeToDom('dark', null, { strategy: 'attribute' })
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('adds class with class strategy', () => {
    applyThemeToDom('dark', null, { strategy: 'class' })
    expect(document.documentElement.classList.contains('theme-dark')).toBe(true)
  })

  it('applies both strategies together', () => {
    applyThemeToDom('dark', null, { strategy: 'both' })
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(document.documentElement.classList.contains('theme-dark')).toBe(true)
  })

  it('removes old class when switching themes', () => {
    applyThemeToDom('light', null, { strategy: 'class' })
    applyThemeToDom('dark', 'light', { strategy: 'class' })
    expect(document.documentElement.classList.contains('theme-dark')).toBe(true)
    expect(document.documentElement.classList.contains('theme-light')).toBe(false)
  })

  it('uses custom attribute name', () => {
    applyThemeToDom('dark', null, { strategy: 'attribute', attribute: 'data-color-scheme' })
    expect(document.documentElement.getAttribute('data-color-scheme')).toBe('dark')
  })

  it('uses custom class prefix', () => {
    applyThemeToDom('dark', null, { strategy: 'class', classPrefix: 'color-' })
    expect(document.documentElement.classList.contains('color-dark')).toBe(true)
  })
})

describe('clearThemeFromDom', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.className = ''
  })

  it('removes attribute', () => {
    document.documentElement.setAttribute('data-theme', 'dark')
    clearThemeFromDom('dark', { strategy: 'attribute' })
    expect(document.documentElement.getAttribute('data-theme')).toBeNull()
  })

  it('removes class', () => {
    document.documentElement.classList.add('theme-dark')
    clearThemeFromDom('dark', { strategy: 'class' })
    expect(document.documentElement.classList.contains('theme-dark')).toBe(false)
  })
})

describe('readStorage / writeStorage', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  it('writes and reads from localStorage', () => {
    writeStorage('vmt-test', 'dark', 'localStorage')
    expect(readStorage('vmt-test', 'localStorage')).toBe('dark')
  })

  it('writes and reads from sessionStorage', () => {
    writeStorage('vmt-test', 'light', 'sessionStorage')
    expect(readStorage('vmt-test', 'sessionStorage')).toBe('light')
  })

  it('returns null for missing key', () => {
    expect(readStorage('nonexistent', 'localStorage')).toBeNull()
  })
})

describe('getSystemPreference', () => {
  it('returns light or dark', () => {
    const pref = getSystemPreference()
    expect(['light', 'dark']).toContain(pref)
  })
})

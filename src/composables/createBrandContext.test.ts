import { describe, it, expect, beforeEach } from 'vitest'
import { createBrandContext } from './createBrandContext'
import { lightTheme, darkTheme } from '../themes/presets'
import type { ThemeDefinition } from '../types'

const testThemes: ThemeDefinition[] = [
  {
    name: 'brand-light',
    label: 'Brand Light',
    colors: {
      primary: '#7c3aed',
      background: '#ffffff',
      text: '#111827',
      surface: '#f8fafc',
      border: '#e5e7eb',
    },
  },
  {
    name: 'brand-dark',
    label: 'Brand Dark',
    colors: {
      primary: '#a78bfa',
      background: '#0f172a',
      text: '#f8fafc',
      surface: '#1e293b',
      border: '#334155',
    },
  },
]

describe('createBrandContext', () => {
  it('creates a context with correct namespace', () => {
    const ctx = createBrandContext({
      namespace: 'acme',
      themes: testThemes,
      defaultTheme: 'brand-light',
    })
    expect(ctx.namespace).toBe('acme')
  })

  it('exposes useTheme as a function', () => {
    const ctx = createBrandContext({
      namespace: 'beta',
      themes: testThemes,
    })
    expect(typeof ctx.useTheme).toBe('function')
  })

  it('exposes BrandPlugin with install method', () => {
    const ctx = createBrandContext({
      namespace: 'gamma',
      themes: testThemes,
    })
    expect(typeof ctx.BrandPlugin.install).toBe('function')
  })

  it('two contexts with different namespaces are independent', () => {
    const ctx1 = createBrandContext({
      namespace: 'brand-a',
      themes: testThemes,
    })
    const ctx2 = createBrandContext({
      namespace: 'brand-b',
      themes: [lightTheme, darkTheme],
    })
    expect(ctx1.namespace).not.toBe(ctx2.namespace)
  })
})

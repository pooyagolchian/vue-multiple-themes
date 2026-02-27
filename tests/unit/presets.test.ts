import { describe, expect, it } from 'vitest'
import {
  PRESET_THEMES,
  darkTheme,
  forestTheme,
  lightTheme,
  oceanTheme,
  sepiaTheme,
  sunsetTheme,
  winterTheme,
} from '../../src/themes/presets'
import { hexToHsl } from '../../src/utils/color'

const ALL_THEMES = [lightTheme, darkTheme, sepiaTheme, oceanTheme, forestTheme, sunsetTheme, winterTheme]
const REQUIRED_COLORS = ['primary', 'secondary', 'background', 'surface', 'text', 'border']

describe('PRESET_THEMES', () => {
  it('contains 7 themes', () => {
    expect(PRESET_THEMES).toHaveLength(7)
  })

  it('has unique names', () => {
    const names = PRESET_THEMES.map((t) => t.name)
    expect(new Set(names).size).toBe(PRESET_THEMES.length)
  })

  it('has unique labels', () => {
    const labels = PRESET_THEMES.map((t) => t.label)
    expect(new Set(labels).size).toBe(PRESET_THEMES.length)
  })
})

ALL_THEMES.forEach((theme) => {
  describe(`theme: ${theme.name}`, () => {
    it('has a non-empty name', () => {
      expect(theme.name).toBeTruthy()
      expect(typeof theme.name).toBe('string')
    })

    it('has a non-empty label', () => {
      expect(theme.label).toBeTruthy()
    })

    it('has an icon', () => {
      expect(theme.icon).toBeTruthy()
    })

    REQUIRED_COLORS.forEach((key) => {
      it(`has ${key} color defined`, () => {
        expect((theme.colors as Record<string, unknown>)[key]).toBeTruthy()
      })

      it(`${key} color is a valid hex string`, () => {
        const value = (theme.colors as Record<string, string>)[key]
        expect(value).toMatch(/^#[0-9a-fA-F]{3,8}$/)
      })
    })
  })
})

describe('individual theme exports', () => {
  it('lightTheme name is "light"', () => {
    expect(lightTheme.name).toBe('light')
  })

  it('darkTheme name is "dark"', () => {
    expect(darkTheme.name).toBe('dark')
  })

  it('winterTheme is included in PRESET_THEMES', () => {
    expect(PRESET_THEMES.find((t) => t.name === 'winter')).toBeTruthy()
  })

  it('light background is lighter than dark background', () => {
    const [, , lLight] = hexToHsl(lightTheme.colors.background!)
    const [, , lDark] = hexToHsl(darkTheme.colors.background!)
    expect(lLight).toBeGreaterThan(lDark)
  })
})

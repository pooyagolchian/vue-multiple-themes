import { describe, expect, it } from 'vitest'
import {
  analogous,
  autoContrast,
  complementary,
  contrastRatio,
  darken,
  ensureContrast,
  generateColorScale,
  hexToHsl,
  hexToRgb,
  hslToHex,
  hslToRgb,
  lighten,
  luminance,
  mix,
  parseColor,
  rgbToHex,
  rgbToHsl,
  rotateHue,
  saturate,
  triadic,
  withAlpha,
} from '../../src/utils/color'

describe('hexToRgb', () => {
  it('parses 6-char hex', () => {
    expect(hexToRgb('#ffffff')).toEqual([255, 255, 255])
    expect(hexToRgb('#000000')).toEqual([0, 0, 0])
    expect(hexToRgb('#3b82f6')).toEqual([59, 130, 246])
  })

  it('parses 3-char hex shorthand', () => {
    expect(hexToRgb('#fff')).toEqual([255, 255, 255])
    expect(hexToRgb('#000')).toEqual([0, 0, 0])
    expect(hexToRgb('#f00')).toEqual([255, 0, 0])
  })

  it('handles hash-less hex', () => {
    expect(hexToRgb('ff0000')).toEqual([255, 0, 0])
  })
})

describe('rgbToHex', () => {
  it('converts rgb to hex', () => {
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff')
    expect(rgbToHex(0, 0, 0)).toBe('#000000')
    expect(rgbToHex(59, 130, 246)).toBe('#3b82f6')
  })

  it('clamps values outside [0, 255]', () => {
    expect(rgbToHex(-1, 0, 300)).toBe('#0000ff')
  })
})

describe('rgbToHsl', () => {
  it('converts pure red', () => {
    const [h, s, l] = rgbToHsl(255, 0, 0)
    expect(h).toBe(0)
    expect(s).toBe(100)
    expect(l).toBe(50)
  })

  it('converts white to achromatic', () => {
    const [h, s, l] = rgbToHsl(255, 255, 255)
    expect(s).toBe(0)
    expect(l).toBe(100)
  })

  it('converts black to achromatic', () => {
    const [, s, l] = rgbToHsl(0, 0, 0)
    expect(s).toBe(0)
    expect(l).toBe(0)
  })
})

describe('hslToRgb', () => {
  it('converts achromatic hsl', () => {
    expect(hslToRgb(0, 0, 100)).toEqual([255, 255, 255])
    expect(hslToRgb(0, 0, 0)).toEqual([0, 0, 0])
  })

  it('round-trips through hsl', () => {
    const hex = '#3b82f6'
    const [h, s, l] = hexToHsl(hex)
    const [r, g, b] = hslToRgb(h, s, l)
    expect(Math.abs(r - 59)).toBeLessThanOrEqual(2)
    expect(Math.abs(g - 130)).toBeLessThanOrEqual(2)
    expect(Math.abs(b - 246)).toBeLessThanOrEqual(2)
  })
})

describe('hexToHsl / hslToHex round-trip', () => {
  const colors = ['#3b82f6', '#ef4444', '#22c55e', '#a855f7', '#f59e0b']

  colors.forEach((hex) => {
    it(`round-trips ${hex}`, () => {
      const hsl = hexToHsl(hex)
      const back = hslToHex(...hsl)
      // Allow ±2 per channel due to rounding in integer conversion
      const [r1, g1, b1] = hexToRgb(hex)
      const [r2, g2, b2] = hexToRgb(back)
      expect(Math.abs(r1 - r2)).toBeLessThanOrEqual(2)
      expect(Math.abs(g1 - g2)).toBeLessThanOrEqual(2)
      expect(Math.abs(b1 - b2)).toBeLessThanOrEqual(2)
    })
  })
})

describe('parseColor', () => {
  it('parses hex strings', () => {
    const hsl = parseColor('#3b82f6')
    expect(hsl[0]).toBeGreaterThan(200)
    expect(hsl[0]).toBeLessThan(230)
  })

  it('parses rgb() strings', () => {
    const hsl = parseColor('rgb(255, 0, 0)')
    expect(hsl[0]).toBe(0)
    expect(hsl[1]).toBe(100)
  })

  it('parses hsl() strings', () => {
    const hsl = parseColor('hsl(120, 50%, 50%)')
    expect(hsl).toEqual([120, 50, 50])
  })

  it('falls back gracefully for unknown formats', () => {
    const hsl = parseColor('tomato')
    expect(hsl).toHaveLength(3)
  })
})

describe('lighten / darken', () => {
  it('lightens by increasing L', () => {
    const [, , l1] = hexToHsl('#3b82f6')
    const [, , l2] = hexToHsl(lighten('#3b82f6', 10))
    expect(l2).toBeCloseTo(l1 + 10, 0)
  })

  it('darkens by decreasing L', () => {
    const [, , l1] = hexToHsl('#3b82f6')
    const [, , l2] = hexToHsl(darken('#3b82f6', 10))
    expect(l2).toBeCloseTo(l1 - 10, 0)
  })

  it('does not exceed lightness bounds', () => {
    const [, , l1] = hexToHsl(lighten('#ffffff', 50))
    expect(l1).toBeLessThanOrEqual(100)
    const [, , l2] = hexToHsl(darken('#000000', 50))
    expect(l2).toBeGreaterThanOrEqual(0)
  })
})

describe('saturate', () => {
  it('increases saturation', () => {
    const [, s1] = hexToHsl('#3b82f6')
    const [, s2] = hexToHsl(saturate('#3b82f6', 10))
    expect(s2).toBeGreaterThanOrEqual(s1)
  })

  it('clamps to [0, 100]', () => {
    const [, s] = hexToHsl(saturate('#3b82f6', 200))
    expect(s).toBeLessThanOrEqual(100)
  })
})

describe('rotateHue', () => {
  it('rotates hue by degrees', () => {
    const [h1] = hexToHsl('#ff0000') // 0°
    const [h2] = hexToHsl(rotateHue('#ff0000', 120))
    expect(Math.abs(h2 - 120)).toBeLessThanOrEqual(2)
  })

  it('wraps around 360°', () => {
    const rotated = rotateHue('#ff0000', 360)
    const [h] = hexToHsl(rotated)
    expect(h).toBeLessThanOrEqual(2)
  })
})

describe('mix', () => {
  it('returns first color at weight 0', () => {
    expect(mix('#ff0000', '#0000ff', 0)).toBe('#ff0000')
  })

  it('returns second color at weight 1', () => {
    expect(mix('#ff0000', '#0000ff', 1)).toBe('#0000ff')
  })

  it('returns midpoint at weight 0.5', () => {
    const [r, g, b] = hexToRgb(mix('#ff0000', '#0000ff', 0.5))
    expect(r).toBeCloseTo(128, -1)
    expect(g).toBe(0)
    expect(b).toBeCloseTo(128, -1)
  })
})

describe('withAlpha', () => {
  it('returns rgba() string', () => {
    expect(withAlpha('#ff0000', 0.5)).toBe('rgba(255,0,0,0.5)')
  })

  it('handles full opacity', () => {
    expect(withAlpha('#000000', 1)).toBe('rgba(0,0,0,1)')
  })
})

describe('luminance', () => {
  it('white has luminance 1', () => {
    expect(luminance('#ffffff')).toBeCloseTo(1, 2)
  })

  it('black has luminance 0', () => {
    expect(luminance('#000000')).toBeCloseTo(0, 2)
  })

  it('midtone has luminance in (0, 1)', () => {
    const l = luminance('#808080')
    expect(l).toBeGreaterThan(0)
    expect(l).toBeLessThan(1)
  })
})

describe('contrastRatio', () => {
  it('black on white has max contrast ~21', () => {
    const ratio = contrastRatio('#000000', '#ffffff')
    expect(ratio).toBeCloseTo(21, 0)
  })

  it('same color has ratio 1', () => {
    expect(contrastRatio('#3b82f6', '#3b82f6')).toBeCloseTo(1, 1)
  })

  it('WCAG AA passes for typical dark-on-light', () => {
    expect(contrastRatio('#1e1b4b', '#ffffff')).toBeGreaterThanOrEqual(4.5)
  })
})

describe('autoContrast', () => {
  it('returns white text on dark backgrounds', () => {
    expect(autoContrast('#000000')).toBe('#ffffff')
  })

  it('returns black text on light backgrounds', () => {
    expect(autoContrast('#ffffff')).toBe('#000000')
  })

  it('uses custom foreground colors', () => {
    const result = autoContrast('#000000', '#f9fafb', '#1f2937')
    expect(result).toBe('#f9fafb')
  })
})

describe('ensureContrast', () => {
  it('adjusts text to meet AA ratio on dark bg', () => {
    const adjusted = ensureContrast('#aaaaaa', '#111111', 4.5)
    expect(contrastRatio(adjusted, '#111111')).toBeGreaterThanOrEqual(4.5)
  })

  it('adjusts text to meet AA ratio on light bg', () => {
    const adjusted = ensureContrast('#cccccc', '#ffffff', 4.5)
    expect(contrastRatio(adjusted, '#ffffff')).toBeGreaterThanOrEqual(4.5)
  })
})

describe('generateColorScale', () => {
  it('returns an object with 11 stops', () => {
    const scale = generateColorScale('#3b82f6')
    const keys = Object.keys(scale)
    expect(keys).toHaveLength(11)
    expect(keys).toContain('50')
    expect(keys).toContain('500')
    expect(keys).toContain('950')
  })

  it('stop 50 is lighter than stop 950', () => {
    const scale = generateColorScale('#3b82f6')
    const [, , l50] = hexToHsl(scale[50])
    const [, , l950] = hexToHsl(scale[950])
    expect(l50).toBeGreaterThan(l950)
  })
})

describe('complementary', () => {
  it('returns color 180 degrees away', () => {
    const [h1] = hexToHsl('#ff0000')   // 0°
    const [h2] = hexToHsl(complementary('#ff0000'))
    expect(Math.abs(h2 - 180)).toBeLessThanOrEqual(2)
  })
})

describe('triadic', () => {
  it('returns three colors 120° apart', () => {
    const [p, t1, t2] = triadic('#ff0000')
    const [hp] = hexToHsl(p)
    const [h1] = hexToHsl(t1)
    const [h2] = hexToHsl(t2)
    expect(Math.abs(h1 - (hp + 120) % 360)).toBeLessThanOrEqual(2)
    expect(Math.abs(h2 - (hp + 240) % 360)).toBeLessThanOrEqual(2)
  })
})

describe('analogous', () => {
  it('returns three nearby colors', () => {
    const [p, a1, a2] = analogous('#ff0000', 30)
    const [hp] = hexToHsl(p)
    const [h1] = hexToHsl(a1)
    const [h2] = hexToHsl(a2)
    expect(Math.abs(h1 - (hp + 30) % 360)).toBeLessThanOrEqual(2)
    // a2 is -30: wraps as (0 - 30 + 360) = 330
    expect(Math.abs(h2 - 330)).toBeLessThanOrEqual(2)
  })
})

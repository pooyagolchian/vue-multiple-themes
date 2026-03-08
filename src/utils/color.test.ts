import { describe, it, expect } from 'vitest'
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  hexToHsl,
  hslToHex,
  parseColor,
  lighten,
  darken,
  saturate,
  rotateHue,
  mix,
  withAlpha,
  luminance,
  contrastRatio,
  autoContrast,
  ensureContrast,
  generateColorScale,
  complementary,
  splitComplementary,
  triadic,
  analogous,
  normalizeToRgbChannels,
} from './color'

// ─── Parsing / Conversion ─────────────────────────────────────────────────────

describe('hexToRgb', () => {
  it('converts 6-digit hex', () => {
    expect(hexToRgb('#3b82f6')).toEqual([59, 130, 246])
  })

  it('converts 3-digit shorthand hex', () => {
    expect(hexToRgb('#fff')).toEqual([255, 255, 255])
  })

  it('handles black', () => {
    expect(hexToRgb('#000000')).toEqual([0, 0, 0])
  })

  it('works without # prefix', () => {
    expect(hexToRgb('ff0000')).toEqual([255, 0, 0])
  })
})

describe('rgbToHex', () => {
  it('converts RGB to hex', () => {
    expect(rgbToHex(59, 130, 246)).toBe('#3b82f6')
  })

  it('converts black', () => {
    expect(rgbToHex(0, 0, 0)).toBe('#000000')
  })

  it('converts white', () => {
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff')
  })

  it('clamps out-of-range values', () => {
    expect(rgbToHex(300, -10, 128)).toBe('#ff0080')
  })
})

describe('rgbToHsl', () => {
  it('converts pure red', () => {
    expect(rgbToHsl(255, 0, 0)).toEqual([0, 100, 50])
  })

  it('converts grey', () => {
    const [h, s, l] = rgbToHsl(128, 128, 128)
    expect(s).toBe(0)
    expect(l).toBe(50)
  })

  it('converts white', () => {
    expect(rgbToHsl(255, 255, 255)).toEqual([0, 0, 100])
  })
})

describe('hslToRgb', () => {
  it('converts achromatic (grey)', () => {
    const [r, g, b] = hslToRgb(0, 0, 50)
    expect(r).toBe(g)
    expect(r).toBe(b)
    expect(r).toBe(128)
  })

  it('converts pure red', () => {
    expect(hslToRgb(0, 100, 50)).toEqual([255, 0, 0])
  })

  it('roundtrips with rgbToHsl', () => {
    const original: [number, number, number] = [59, 130, 246]
    const hsl = rgbToHsl(...original)
    const back = hslToRgb(...hsl)
    // Allow ±1 for rounding
    for (let i = 0; i < 3; i++) {
      expect(Math.abs(back[i] - original[i])).toBeLessThanOrEqual(1)
    }
  })
})

describe('hexToHsl / hslToHex roundtrip', () => {
  it('roundtrips #3b82f6', () => {
    const hsl = hexToHsl('#3b82f6')
    const hex = hslToHex(...hsl)
    const [r1, g1, b1] = hexToRgb('#3b82f6')
    const [r2, g2, b2] = hexToRgb(hex)
    expect(Math.abs(r1 - r2)).toBeLessThanOrEqual(1)
    expect(Math.abs(g1 - g2)).toBeLessThanOrEqual(1)
    expect(Math.abs(b1 - b2)).toBeLessThanOrEqual(1)
  })
})

describe('parseColor', () => {
  it('parses hex', () => {
    const [h, s, l] = parseColor('#ff0000')
    expect(h).toBe(0)
    expect(s).toBe(100)
    expect(l).toBe(50)
  })

  it('parses rgb()', () => {
    const [h, s, l] = parseColor('rgb(255, 0, 0)')
    expect(h).toBe(0)
    expect(s).toBe(100)
    expect(l).toBe(50)
  })

  it('parses hsl()', () => {
    const hsl = parseColor('hsl(220, 90%, 56%)')
    expect(hsl).toEqual([220, 90, 56])
  })

  it('returns fallback for unknown format', () => {
    const hsl = parseColor('not-a-color')
    expect(hsl).toEqual([220, 90, 56])
  })
})

// ─── Manipulation ─────────────────────────────────────────────────────────────

describe('lighten', () => {
  it('increases lightness', () => {
    const result = lighten('#3b82f6', 20)
    const [, , l] = hexToHsl(result)
    const [, , originalL] = hexToHsl('#3b82f6')
    expect(l).toBeGreaterThan(originalL)
  })

  it('does not exceed 100', () => {
    const result = lighten('#ffffff', 50)
    const [, , l] = hexToHsl(result)
    expect(l).toBeLessThanOrEqual(100)
  })
})

describe('darken', () => {
  it('decreases lightness', () => {
    const result = darken('#3b82f6', 20)
    const [, , l] = hexToHsl(result)
    const [, , originalL] = hexToHsl('#3b82f6')
    expect(l).toBeLessThan(originalL)
  })

  it('does not go below 0', () => {
    const result = darken('#000000', 50)
    const [, , l] = hexToHsl(result)
    expect(l).toBeGreaterThanOrEqual(0)
  })
})

describe('saturate', () => {
  it('increases saturation', () => {
    const result = saturate('#808080', 20)
    const [, s] = hexToHsl(result)
    expect(s).toBeGreaterThan(0)
  })

  it('clamps to 100', () => {
    const result = saturate('#ff0000', 200)
    const [, s] = hexToHsl(result)
    expect(s).toBeLessThanOrEqual(100)
  })
})

describe('rotateHue', () => {
  it('rotates hue by degrees', () => {
    const complement = rotateHue('#ff0000', 180)
    const [h] = hexToHsl(complement)
    expect(h).toBe(180)
  })

  it('wraps around 360', () => {
    const result = rotateHue('#ff0000', 400)
    const [h] = hexToHsl(result)
    expect(h).toBe(40)
  })

  it('handles negative degrees', () => {
    const result = rotateHue('#ff0000', -90)
    const [h] = hexToHsl(result)
    expect(h).toBe(270)
  })
})

describe('mix', () => {
  it('mixes two colors at 50%', () => {
    const result = mix('#000000', '#ffffff', 0.5)
    const [r, g, b] = hexToRgb(result)
    expect(r).toBeCloseTo(128, -1)
    expect(g).toBeCloseTo(128, -1)
    expect(b).toBeCloseTo(128, -1)
  })

  it('returns first color at weight 0', () => {
    expect(mix('#ff0000', '#0000ff', 0)).toBe('#ff0000')
  })

  it('returns second color at weight 1', () => {
    expect(mix('#ff0000', '#0000ff', 1)).toBe('#0000ff')
  })
})

describe('withAlpha', () => {
  it('returns rgba string', () => {
    expect(withAlpha('#ff0000', 0.5)).toBe('rgba(255,0,0,0.5)')
  })

  it('handles full opacity', () => {
    expect(withAlpha('#000000', 1)).toBe('rgba(0,0,0,1)')
  })
})

// ─── Contrast & Accessibility ─────────────────────────────────────────────────

describe('luminance', () => {
  it('returns 0 for black', () => {
    expect(luminance('#000000')).toBeCloseTo(0, 4)
  })

  it('returns 1 for white', () => {
    expect(luminance('#ffffff')).toBeCloseTo(1, 4)
  })

  it('returns mid-range for mid-grey', () => {
    const lum = luminance('#808080')
    expect(lum).toBeGreaterThan(0.1)
    expect(lum).toBeLessThan(0.5)
  })
})

describe('contrastRatio', () => {
  it('max contrast is 21:1 for black vs white', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0)
  })

  it('same color has ratio 1:1', () => {
    expect(contrastRatio('#3b82f6', '#3b82f6')).toBeCloseTo(1, 0)
  })

  it('is symmetric', () => {
    const ab = contrastRatio('#3b82f6', '#ffffff')
    const ba = contrastRatio('#ffffff', '#3b82f6')
    expect(ab).toBeCloseTo(ba, 4)
  })
})

describe('autoContrast', () => {
  it('picks white text on dark background', () => {
    expect(autoContrast('#0f172a')).toBe('#ffffff')
  })

  it('picks black text on light background', () => {
    expect(autoContrast('#ffffff')).toBe('#000000')
  })
})

describe('ensureContrast', () => {
  it('adjusts text color until WCAG AA contrast is met', () => {
    const adjusted = ensureContrast('#cccccc', '#ffffff', 4.5)
    const ratio = contrastRatio(adjusted, '#ffffff')
    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })

  it('returns original if already passing', () => {
    const result = ensureContrast('#000000', '#ffffff', 4.5)
    expect(result).toBe('#000000')
  })
})

// ─── Color Scale ──────────────────────────────────────────────────────────────

describe('generateColorScale', () => {
  it('returns 11 stops', () => {
    const scale = generateColorScale('#3b82f6')
    const keys = Object.keys(scale)
    expect(keys).toHaveLength(11)
    expect(keys).toContain('50')
    expect(keys).toContain('500')
    expect(keys).toContain('950')
  })

  it('50 is lightest, 950 is darkest', () => {
    const scale = generateColorScale('#3b82f6')
    const l50 = hexToHsl(scale['50'])[2]
    const l950 = hexToHsl(scale['950'])[2]
    expect(l50).toBeGreaterThan(l950)
  })
})

// ─── Harmony ──────────────────────────────────────────────────────────────────

describe('complementary', () => {
  it('returns 180° opposite hue', () => {
    const result = complementary('#ff0000')
    const [h] = hexToHsl(result)
    expect(h).toBe(180)
  })
})

describe('splitComplementary', () => {
  it('returns 3 colors', () => {
    const result = splitComplementary('#ff0000')
    expect(result).toHaveLength(3)
    expect(result[0]).toBe('#ff0000')
  })
})

describe('triadic', () => {
  it('returns 3 colors at 120° intervals', () => {
    const [, b, c] = triadic('#ff0000')
    const hB = hexToHsl(b)[0]
    const hC = hexToHsl(c)[0]
    expect(hB).toBe(120)
    expect(hC).toBe(240)
  })
})

describe('analogous', () => {
  it('returns 3 colors', () => {
    const result = analogous('#ff0000')
    expect(result).toHaveLength(3)
    expect(result[0]).toBe('#ff0000')
  })

  it('respects custom angle', () => {
    const [, b, c] = analogous('#ff0000', 45)
    const hB = hexToHsl(b)[0]
    const hC = hexToHsl(c)[0]
    expect(hB).toBe(45)
    expect(hC).toBe(315)
  })
})

// ─── normalizeToRgbChannels ───────────────────────────────────────────────────

describe('normalizeToRgbChannels', () => {
  it('normalizes hex to R G B', () => {
    expect(normalizeToRgbChannels('#3b82f6')).toBe('59 130 246')
  })

  it('normalizes 3-digit hex', () => {
    expect(normalizeToRgbChannels('#fff')).toBe('255 255 255')
  })

  it('passthrough channel format', () => {
    expect(normalizeToRgbChannels('59 130 246')).toBe('59 130 246')
  })

  it('normalizes rgb()', () => {
    expect(normalizeToRgbChannels('rgb(59, 130, 246)')).toBe('59 130 246')
  })

  it('normalizes rgba()', () => {
    expect(normalizeToRgbChannels('rgba(59, 130, 246, 0.5)')).toBe('59 130 246')
  })

  it('normalizes hsl()', () => {
    const result = normalizeToRgbChannels('hsl(0, 100%, 50%)')
    expect(result).toBe('255 0 0')
  })

  it('normalizes named colors', () => {
    expect(normalizeToRgbChannels('red')).toBe('255 0 0')
    expect(normalizeToRgbChannels('white')).toBe('255 255 255')
    expect(normalizeToRgbChannels('black')).toBe('0 0 0')
  })

  it('handles hex without # prefix', () => {
    expect(normalizeToRgbChannels('ff0000')).toBe('255 0 0')
  })
})

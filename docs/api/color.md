# Color Utilities API

All functions are tree-shakeable — import only what you need.

```ts
import { hexToRgb, contrastRatio, lighten } from 'vue-multiple-themes'
```

## Types

```ts
type RGB = [number, number, number]    // [0-255, 0-255, 0-255]
type RGBA = [number, number, number, number]
type HSL = [number, number, number]    // [0-360, 0-100, 0-100]
```

## Conversion Functions

### `hexToRgb(hex: string): RGB`

Converts hex color to RGB tuple. Supports 3-digit and 6-digit hex.

### `rgbToHex(r: number, g: number, b: number): string`

Converts RGB values to hex string. Clamps out-of-range values.

### `rgbToHsl(r: number, g: number, b: number): HSL`

Converts RGB to HSL.

### `hslToRgb(h: number, s: number, l: number): RGB`

Converts HSL to RGB.

### `hexToHsl(hex: string): HSL`

Shorthand for `rgbToHsl(...hexToRgb(hex))`.

### `hslToHex(h: number, s: number, l: number): string`

Shorthand for `rgbToHex(...hslToRgb(h, s, l))`.

### `parseColor(color: string): HSL`

Parse any CSS color string (hex, rgb(), hsl()) into HSL tuple.

### `normalizeToRgbChannels(color: string): string`

Normalize any CSS color to space-separated RGB channels: `"R G B"`. Required by Tailwind for opacity modifiers.

## Manipulation Functions

### `lighten(hex: string, amount: number): string`

Increase lightness by `amount` points (0-100).

### `darken(hex: string, amount: number): string`

Decrease lightness by `amount` points (0-100).

### `saturate(hex: string, amount: number): string`

Adjust saturation. Positive = more saturated, negative = more muted.

### `rotateHue(hex: string, degrees: number): string`

Shift hue by `degrees`. Wraps around 360°.

### `mix(hexA: string, hexB: string, weight?: number): string`

Mix two colors. `weight` (0-1): 0 = full A, 1 = full B, 0.5 = equal mix.

### `withAlpha(hex: string, alpha: number): string`

Returns `rgba(r,g,b,alpha)` string.

## Accessibility Functions

### `luminance(hex: string): number`

Returns WCAG 2.1 relative luminance (0 = black, 1 = white).

### `contrastRatio(hexA: string, hexB: string): number`

Returns WCAG contrast ratio. ≥4.5 = AA, ≥7 = AAA.

### `autoContrast(bg: string, onLight?: string, onDark?: string): string`

Returns whichever text color has higher contrast against `bg`.

### `ensureContrast(text: string, bg: string, minRatio?: number): string`

Iteratively adjusts `text` until it meets `minRatio` (default 4.5) against `bg`.

## Harmony Functions

### `complementary(hex: string): string`

Returns 180° opposite color.

### `triadic(hex: string): [string, string, string]`

Returns 3 colors at 120° intervals.

### `analogous(hex: string, angle?: number): [string, string, string]`

Returns 3 adjacent colors shifted by `angle` (default 30°).

### `splitComplementary(hex: string): [string, string, string]`

Returns split-complementary triad (150° and 210°).

## Scale Generator

### `generateColorScale(hex: string): Record<string, string>`

Returns an 11-stop Tailwind-style scale: `{ 50, 100, 200, ..., 900, 950 }`.

# Color Utilities

vue-multiple-themes includes 20+ tree-shakeable color utility functions. Import only what you need.

## Conversion

```ts
import { hexToRgb, rgbToHex, hexToHsl, hslToHex, rgbToHsl, hslToRgb, parseColor } from 'vue-multiple-themes'

hexToRgb('#3b82f6')        // [59, 130, 246]
rgbToHex(59, 130, 246)     // '#3b82f6'
hexToHsl('#3b82f6')        // [217, 91, 60]
hslToHex(217, 91, 60)      // '#3b82f6'
parseColor('rgb(59,130,246)') // [217, 91, 60] (HSL)
parseColor('hsl(220,90%,56%)') // [220, 90, 56]
```

## Manipulation

```ts
import { lighten, darken, saturate, rotateHue, mix, withAlpha } from 'vue-multiple-themes'

lighten('#3b82f6', 20)         // lighter by 20 lightness points
darken('#3b82f6', 20)          // darker by 20 lightness points
saturate('#808080', 30)        // increase saturation by 30
rotateHue('#ff0000', 120)      // shift hue by 120° → green
mix('#ff0000', '#0000ff', 0.5) // 50% mix of red and blue
withAlpha('#3b82f6', 0.5)      // 'rgba(59,130,246,0.5)'
```

## Contrast & Accessibility

```ts
import { luminance, contrastRatio, autoContrast, ensureContrast } from 'vue-multiple-themes'

luminance('#ffffff')            // 1 (white)
luminance('#000000')            // 0 (black)
contrastRatio('#000000', '#ffffff') // 21 (maximum)

// Pick white or black text for best readability
autoContrast('#0f172a')         // '#ffffff' (white on dark)
autoContrast('#f8fafc')         // '#000000' (black on light)

// Adjust color until WCAG AA contrast is met
ensureContrast('#cccccc', '#ffffff', 4.5) // darkened to pass 4.5:1
```

## Color Harmony

```ts
import { complementary, triadic, analogous, splitComplementary } from 'vue-multiple-themes'

complementary('#ff0000')        // '#00ffff' (180° opposite)
triadic('#ff0000')              // ['#ff0000', green, blue] (120° intervals)
analogous('#ff0000', 30)        // ['#ff0000', '#ff8000', '#ff0080']
splitComplementary('#ff0000')   // ['#ff0000', 150°, 210°]
```

## Normalize for Tailwind

```ts
import { normalizeToRgbChannels } from 'vue-multiple-themes'

normalizeToRgbChannels('#3b82f6')          // '59 130 246'
normalizeToRgbChannels('rgb(59,130,246)')   // '59 130 246'
normalizeToRgbChannels('hsl(220,90%,56%)')  // '59 130 246'
normalizeToRgbChannels('red')               // '255 0 0'
normalizeToRgbChannels('59 130 246')        // '59 130 246' (passthrough)
```

## Color Scales

```ts
import { generateColorScale } from 'vue-multiple-themes'

const scale = generateColorScale('#3b82f6')
// Returns: { 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950 }
// Each stop is a hex color with appropriate lightness
```

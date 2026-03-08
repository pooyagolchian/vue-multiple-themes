# Theme Generation

Generate complete WCAG-compliant themes from a single brand color — the fastest way to ship multi-theme support.

## Generate a Theme Pair

```ts
import { generateThemePair } from 'vue-multiple-themes'

const [light, dark] = generateThemePair('#7c3aed')
// light.colors.primary, light.colors.background, etc.
// dark.colors.primary, dark.colors.background, etc.

// Use directly:
app.use(VueMultipleThemesPlugin, {
  themes: generateThemePair('#7c3aed'),
  defaultTheme: 'light',
})
```

## Generate Light or Dark Individually

```ts
import { generateLightTheme, generateDarkTheme } from 'vue-multiple-themes'

const light = generateLightTheme('#3b82f6', {
  name: 'brand-light',
  label: 'Brand Light',
})

const dark = generateDarkTheme('#3b82f6', {
  name: 'brand-dark',
  label: 'Brand Dark',
  saturationBias: 5, // more colorful dark surfaces
})
```

## Generate from a Full Palette

```ts
import { generateThemeFromPalette } from 'vue-multiple-themes'

const theme = generateThemeFromPalette(
  {
    primary: '#7c3aed',
    secondary: '#ec4899',
    accent: '#f59e0b',
  },
  'light', // or 'dark'
  { name: 'my-brand', label: 'My Brand' },
)
```

## Seasonal / Mood Themes

```ts
import { generateSeasonalThemes } from 'vue-multiple-themes'

const [springLight, springDark] = generateSeasonalThemes('spring')
// Also: 'summer', 'autumn', 'winter', 'midnight', 'neon', 'pastel'
```

## WCAG Compliance

All generated themes automatically ensure:

- **Text on background** meets WCAG AA (4.5:1 contrast ratio)
- **TextInverse on primary** is readable (auto-selected white or dark)
- **Muted text** meets WCAG AA for large text (3:1 ratio)

You can verify with:

```ts
import { checkContrast } from 'vue-multiple-themes'

const report = checkContrast('#7c3aed', '#ffffff')
console.log(report)
// { ratio: 5.98, aa: true, aaLarge: true, aaa: false, aaaLarge: true }
```

## Color Scale Generator

Generate Tailwind-style color scales from any base color:

```ts
import { generateColorScale } from 'vue-multiple-themes'

const scale = generateColorScale('#3b82f6')
// { 50: '#...', 100: '#...', ..., 900: '#...', 950: '#...' }
```

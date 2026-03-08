# Theme Generators API

## `generateLightTheme(primaryHex, options?): ThemeDefinition`

Generate a WCAG-compliant light theme from a single brand color.

### Options

| Property | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | `'generated-light'` | Theme slug |
| `label` | `string` | `'Light'` | Display name |
| `icon` | `Component` | `undefined` | Vue icon component |
| `saturationBias` | `number` | `0` | Surface saturation adjustment |
| `tintedSurfaces` | `boolean` | `true` | Tint surfaces with brand hue |
| `accentColor` | `string` | Auto (analogous) | Override accent color |
| `extraClasses` | `string[]` | `[]` | Extra CSS classes |

## `generateDarkTheme(primaryHex, options?): ThemeDefinition`

Same options as `generateLightTheme`, but defaults to `'generated-dark'` and `'Dark'`.

## `generateThemePair(primaryHex, options?): [ThemeDefinition, ThemeDefinition]`

Returns `[light, dark]` pair from one color.

### Options

| Property | Type | Default |
|---|---|---|
| `lightName` | `string` | `'light'` |
| `darkName` | `string` | `'dark'` |
| `lightLabel` | `string` | `'Light'` |
| `darkLabel` | `string` | `'Dark'` |
| `saturationBias` | `number` | `0` |
| `tintedSurfaces` | `boolean` | `true` |

## `generateThemeFromPalette(palette, variant, options?): ThemeDefinition`

Generate from a multi-color palette.

```ts
interface BrandPalette {
  primary: string
  secondary?: string
  accent?: string
}
```

## `generateSeasonalThemes(season): [ThemeDefinition, ThemeDefinition]`

Available seasons: `'spring'`, `'summer'`, `'autumn'`, `'winter'`, `'midnight'`, `'neon'`, `'pastel'`.

## `buildCssMixTheme(primaryHex, name, variant?): string`

Returns CSS string using `color-mix()` (browser-only, Chrome 111+).

## `checkContrast(foreground, background): ContrastReport`

```ts
interface ContrastReport {
  ratio: number      // e.g. 5.98
  aa: boolean        // ratio >= 4.5
  aaLarge: boolean   // ratio >= 3
  aaa: boolean       // ratio >= 7
  aaaLarge: boolean  // ratio >= 4.5
}
```

## `readCssVarsAsColors(varMap, element?): Partial<ThemeColors>`

Reads current CSS custom properties from the DOM (browser-only).

# API Reference

## Composables

| API | Description |
|---|---|
| [`useTheme(options)`](/api/use-theme) | Core composable — returns reactive theme state |
| [`createBrandContext(options)`](/api/brand-context) | Factory for isolated, namespaced theme engines |

## Plugin

| API | Description |
|---|---|
| [`VueMultipleThemesPlugin`](/api/plugin) | Vue plugin for global registration |

## Components

| Component | Description |
|---|---|
| [`<VueMultipleThemes>`](/api/components) | Wrapper component (registers via plugin) |
| [`<VmtThemePicker>`](/api/components) | Headless theme picker with keyboard nav & ARIA |
| [`<VmtIcon>`](/api/components) | Icon forwarder — bring your own icon library |

## Color Utilities

| Function | Description |
|---|---|
| [`hexToRgb`](/api/color) | Hex → [R, G, B] |
| [`rgbToHex`](/api/color) | [R, G, B] → Hex |
| [`hexToHsl`](/api/color) | Hex → [H, S, L] |
| [`hslToHex`](/api/color) | [H, S, L] → Hex |
| [`parseColor`](/api/color) | Any CSS color → [H, S, L] |
| [`lighten`](/api/color) | Increase lightness |
| [`darken`](/api/color) | Decrease lightness |
| [`saturate`](/api/color) | Adjust saturation |
| [`rotateHue`](/api/color) | Shift hue by degrees |
| [`mix`](/api/color) | Mix two colors |
| [`withAlpha`](/api/color) | Add alpha channel |
| [`luminance`](/api/color) | WCAG relative luminance |
| [`contrastRatio`](/api/color) | WCAG contrast ratio |
| [`autoContrast`](/api/color) | Pick text color for readability |
| [`ensureContrast`](/api/color) | Adjust until WCAG AA met |
| [`generateColorScale`](/api/color) | 11-stop Tailwind-style scale |
| [`complementary`](/api/color) | 180° color harmony |
| [`triadic`](/api/color) | 120° color harmony |
| [`analogous`](/api/color) | Adjacent hue harmony |
| [`normalizeToRgbChannels`](/api/color) | Any format → `"R G B"` channels |

## Theme Generators

| Function | Description |
|---|---|
| [`generateLightTheme`](/api/generators) | WCAG-compliant light theme from one color |
| [`generateDarkTheme`](/api/generators) | WCAG-compliant dark theme from one color |
| [`generateThemePair`](/api/generators) | Matched light+dark pair |
| [`generateThemeFromPalette`](/api/generators) | Theme from multi-color palette |
| [`generateSeasonalThemes`](/api/generators) | Mood/season theme pairs |
| [`buildCssMixTheme`](/api/generators) | CSS color-mix() theme |
| [`checkContrast`](/api/generators) | WCAG contrast report |

<p align="center">
  <strong>vue-multiple-themes</strong>
</p>

# vue-multiple-themes

> Dynamic multi-theme support for **Vue 3** — CSS custom properties, TailwindCSS (with full opacity modifier support), WCAG contrast utilities, and a reactive composable API.

[![npm version](https://img.shields.io/npm/v/vue-multiple-themes)](https://www.npmjs.com/package/vue-multiple-themes)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Development

> **Prerequisites:** [pnpm](https://pnpm.io) v9+ and Node.js v18+

```bash
# Install all workspace dependencies
pnpm install

# Run the interactive playground (Vite dev server → http://localhost:5173)
pnpm dev

# Build the library
pnpm build

# Build the playground for production (deployed to GitHub Pages)
pnpm build:playground
```

---

## Features

- **Vue 3 Optimized** — leverage the latest Composition API and `<script setup>`
- **TypeScript** — full type definitions included
- **CSS custom properties** — semantic `--vmt-*` variables injected automatically
- **TailwindCSS plugin** — `bg-vmt-primary`, `text-vmt-foreground`, etc., with **full opacity modifier support** (`bg-vmt-primary/50`)
- **Tailwind v3 & v4** — dedicated plugin for each major version
- **7 preset themes** — light, dark, sepia, ocean, forest, sunset, winter
- **Dynamic theme generation** — create themes from a single brand color
- **Color utilities** — lighten, darken, mix, contrast ratio, WCAG compliance
- **`useTheme()` composable** — reactive, SSR-safe, localStorage-persistent, luminance-based `isDark`
- **System preference detection** — auto-select light/dark based on OS setting
- **Headless components** — `VmtThemePicker` with keyboard nav & ARIA, `VmtIcon`
- **Zero runtime dependencies** (only `vue` peer dependency)

---

## Installation

```bash
# pnpm (recommended)
pnpm add vue-multiple-themes

# npm
npm install vue-multiple-themes

# yarn
yarn add vue-multiple-themes
```

---

## Quick Start

### Vue 3 — Composition API

```ts
// main.ts
import { createApp } from 'vue';
import { VueMultipleThemesPlugin } from 'vue-multiple-themes';
import App from './App.vue';

const app = createApp(App);
app.use(VueMultipleThemesPlugin, {
  defaultTheme: 'dark',
  strategy: 'attribute', // 'attribute' | 'class' | 'both'
  storage: 'localStorage', // 'localStorage' | 'sessionStorage' | 'none'
});
app.mount('#app');
```

```vue
<!-- App.vue -->
<script setup lang="ts">
import { useTheme, PRESET_THEMES } from 'vue-multiple-themes';

const ts = useTheme({ themes: PRESET_THEMES });
// ts.current, ts.isDark, ts.theme are reactive (auto-unwrapped)
</script>

<template>
  <button v-for="t in ts.themes" :key="t.name" @click="ts.setTheme(t.name)">
    {{ t.label }} (Active: {{ ts.current === t.name }})
  </button>
  <p>Dark mode: {{ ts.isDark }}</p>
</template>
```

---

## CSS Custom Properties

Themes inject **dual CSS variables** on the target element (default: `<html>`):

```css
/* Channel format (for Tailwind opacity modifiers) */
--vmt-primary: 59 130 246;

/* Full color (for direct CSS use) */
--vmt-primary-color: rgb(59 130 246);
```

Use the `-color` suffixed variables in custom CSS:

```css
.card {
  background: var(--vmt-background-color);
  color: var(--vmt-foreground-color);
  border: 1px solid var(--vmt-border-color);
}

/* Manual opacity using the channel format */
.overlay {
  background: rgb(var(--vmt-primary) / 0.5);
}
```

---

## TailwindCSS Integration

### Tailwind v3

```js
// tailwind.config.js
import { createVmtPlugin } from 'vue-multiple-themes/tailwind';
import { PRESET_THEMES } from 'vue-multiple-themes';

export default {
  content: ['./src/**/*.{vue,ts,tsx}'],
  plugins: [
    createVmtPlugin({
      themes: PRESET_THEMES,
      strategy: 'both',
      darkThemes: ['dark'], // enables Tailwind `dark:` modifier
    }),
  ],
};
```

**Opacity modifiers work out of the box:**

```html
<div class="bg-vmt-primary/50 text-vmt-text border-vmt-border/75">
  <span class="text-vmt-primary/80">Semi-transparent text</span>
</div>
```

All Tailwind utilities are available: `bg-`, `text-`, `border-`, `ring-`, `divide-`, `placeholder-`, `outline-`, `shadow-`, `accent-`, `caret-`, `fill-`, `stroke-`, gradients (`from-`, `via-`, `to-`), and more.

### Tailwind v4

```ts
import { generateVmtCssForV4 } from 'vue-multiple-themes/tailwind-v4';
import { PRESET_THEMES } from 'vue-multiple-themes';

// Outputs @theme and @custom-variant blocks for your CSS
const css = generateVmtCssForV4({
  themes: PRESET_THEMES,
  strategy: 'both',
  darkThemes: ['dark'],
});
```

---

## Preset Themes

| Name     | Description           |
| -------- | --------------------- |
| `light`  | Clean white + indigo  |
| `dark`   | Dark gray + violet    |
| `sepia`  | Warm parchment browns |
| `ocean`  | Deep sea blues        |
| `forest` | Rich greens           |
| `sunset` | Warm oranges & reds   |
| `winter` | Icy blues & whites    |

```ts
import { PRESET_THEMES, oceanTheme, forestTheme } from 'vue-multiple-themes';
```

---

## Dynamic Theme Generation

Create light/dark theme pairs from a single brand color:

```ts
import { generateThemePair } from 'vue-multiple-themes';

const [light, dark] = generateThemePair('#6366f1'); // indigo
```

Generate a full color scale:

```ts
import { generateColorScale } from 'vue-multiple-themes';

const scale = generateColorScale('#6366f1', 9); // 9-step palette
```

---

## Color Utilities

All utilities are SSR-safe (no DOM dependency) and tree-shakeable:

```ts
import {
  lighten,
  darken,
  mix,
  contrastRatio,
  autoContrast,
  checkContrast,
  complementary,
  triadic,
  analogous,
  normalizeToRgbChannels,
} from 'vue-multiple-themes';

lighten('#6366f1', 0.2);       // lighter hex
darken('#6366f1', 0.3);        // darker hex
mix('#ff0000', '#0000ff', 0.5); // purple blend
contrastRatio('#000', '#fff');  // 21
autoContrast('#6366f1');        // '#ffffff' or '#000000'
checkContrast('#6366f1', '#fff'); // { ratio, aa, aaa, aaLarge, aaaLarge }
normalizeToRgbChannels('#6366f1'); // '99 102 241'
```

---

## API

### `useTheme(options)`

| Option                   | Type                               | Default        | Description                        |
| ------------------------ | ---------------------------------- | -------------- | ---------------------------------- |
| `themes`                 | `ThemeDefinition[]`                | —              | Available themes (required)        |
| `defaultTheme`           | `string`                           | first theme    | Initial theme name                 |
| `strategy`               | `'attribute' \| 'class' \| 'both'` | `'attribute'`  | How theme is applied to DOM        |
| `target`                 | `string`                           | `'html'`       | Target element selector            |
| `storage`                | `'localStorage' \| 'sessionStorage' \| 'none'` | `'localStorage'` | Where to persist the active theme |
| `storageKey`             | `string`                           | `'vmt-theme'`  | Storage key for persistence        |
| `respectSystemPreference`| `boolean`                          | `false`        | Auto-select theme matching OS mode |
| `onThemeChange`          | `(newTheme, oldTheme) => void`     | —              | Callback on every theme change     |

**Returns:**

| Property         | Type                                   | Description                                     |
| ---------------- | -------------------------------------- | ----------------------------------------------- |
| `current`        | `readonly string`                      | Active theme name (reactive)                     |
| `theme`          | `readonly ThemeDefinition`             | Active theme definition (reactive)               |
| `isDark`         | `readonly boolean`                     | Luminance-based dark detection (reactive)        |
| `themes`         | `readonly ThemeDefinition[]`           | All available themes                             |
| `resolvedColors` | `readonly Record<string, {r,g,b}>`    | Active theme colors as RGB objects               |
| `setTheme()`     | `(name: string) => void`              | Activate a theme by name                         |
| `nextTheme()`    | `() => void`                          | Advance to the next theme                        |
| `prevTheme()`    | `() => void`                          | Go back to the previous theme                    |
| `toggleTheme()`  | `() => void`                          | Toggle between first two themes                  |

> **Note:** `current`, `theme`, `isDark`, and `resolvedColors` are reactive properties wrapped in `reactive()`. Use them directly in templates: `{{ ts.current }}`. To `watch()` them, use a getter: `watch(() => ts.current, ...)`.

---

## Migrating from v5 to v6

### Breaking Changes

1. **CSS variable format changed** — `--vmt-primary` now contains RGB channels (`59 130 246`) instead of hex. Use `--vmt-primary-color` for the full `rgb()` value in custom CSS.

2. **Tailwind plugin API changed** — `createVmtPlugin()` now requires a `themes` option:
   ```js
   // Before (v5)
   createVmtPlugin()
   // After (v6)
   createVmtPlugin({ themes: PRESET_THEMES })
   ```

3. **`persist` option renamed** — Use `storage: 'localStorage'` instead of `persist: true`.

4. **`useTheme()` return type changed** — Returns a `reactive()` object. Properties are accessed directly (no `.value` needed). `currentTheme`/`currentName` renamed to `theme`/`current`.

5. **`isDark` uses luminance** — Now calculated from background color luminance instead of name matching.

---

## Documentation

Full documentation and live demos:

**<https://pooyagolchian.github.io/vue-multiple-themes/>**

---

## License

[MIT](LICENSE) © Pooya Golchian

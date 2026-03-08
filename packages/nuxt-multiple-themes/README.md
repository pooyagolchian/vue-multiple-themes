# nuxt-multiple-themes

> Nuxt 3 module for [vue-multiple-themes](https://www.npmjs.com/package/vue-multiple-themes) — multi-theme engine with CSS custom properties, TailwindCSS support, WCAG contrast tools, and white-label brand contexts.

## Installation

```bash
pnpm add nuxt-multiple-themes vue-multiple-themes
```

## Setup

Add the module to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-multiple-themes'],

  multipleThemes: {
    defaultTheme: 'light',
    strategy: 'both',
    storage: 'localStorage',
    storageKey: 'vmt-theme',
    respectSystemPreference: true,
    preventFouc: true, // prevents flash of unstyled content
  },
})
```

## Usage

The module auto-imports `useTheme`, `createBrandContext`, `PRESET_THEMES`, and theme generators:

```vue
<script setup>
// No import needed — auto-imported by the module
const { current, isDark, setTheme, toggleTheme } = useTheme({
  themes: PRESET_THEMES,
})
</script>

<template>
  <button @click="toggleTheme">
    {{ isDark ? 'Light' : 'Dark' }}
  </button>
</template>
```

## Custom Themes

```ts
// nuxt.config.ts
import { generateThemePair } from 'vue-multiple-themes'

const [light, dark] = generateThemePair('#7c3aed')

export default defineNuxtConfig({
  modules: ['nuxt-multiple-themes'],
  multipleThemes: {
    themes: [light, dark],
    defaultTheme: 'light',
  },
})
```

## Features

- **FOUC prevention** — inline script sets theme before Vue hydrates
- **Auto-imports** — `useTheme()`, `createBrandContext()`, `PRESET_THEMES`, and generators
- **Full vue-multiple-themes API** — all features work in Nuxt
- **SSR-safe** — server-side rendering compatible

## Documentation

Full documentation: [https://pooyagolchian.github.io/vue-multiple-themes/guide/nuxt-ssr](https://pooyagolchian.github.io/vue-multiple-themes/guide/nuxt-ssr)

## License

[MIT](../../LICENSE) © Pooya Golchian

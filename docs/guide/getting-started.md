# Getting Started

<img src="/guide-getting-started.svg" alt="Getting Started" style="width:100%;border-radius:12px;margin:1.5rem 0 2rem;display:block;" />

## Running Locally

Want to explore interactively before installing? Clone the repo and try the live playground or this documentation site from source.

```sh
# 1. Clone & install
git clone https://github.com/pooyagolchian/vue-multiple-themes.git
cd vue-multiple-themes
pnpm install

# 2a. Launch the interactive playground  →  http://localhost:5173
pnpm dev

# 2b. Launch the documentation site      →  http://localhost:5173
pnpm docs:dev

# 2c. Run both in parallel (different ports)
pnpm dev:all

# Run unit tests
pnpm test
```

---

## Installation

::: code-group

```sh [pnpm]
pnpm add vue-multiple-themes
```

```sh [npm]
npm install vue-multiple-themes
```

```sh [yarn]
yarn add vue-multiple-themes
```

:::

> **Vue 2** also requires `@vue/composition-api`:
>
> ```sh
> pnpm add @vue/composition-api
> ```

---

## The Two Strategies

`vue-multiple-themes` supports three DOM strategies, each suitable for different workflows:

| Strategy      | DOM effect                            | Best for                       |
| ------------- | ------------------------------------- | ------------------------------ |
| `'attribute'` | Sets `data-theme="ocean"` on `<html>` | Pure CSS custom properties     |
| `'class'`     | Adds `theme-ocean` class to `<html>`  | TailwindCSS dark-mode variants |
| `'both'`      | Both attribute **and** class          | Maximum compatibility          |

---

## Quick Start (Vue 3 Plugin)

```ts
// main.ts
import { createApp } from 'vue';
import { VueMultipleThemesPlugin, PRESET_THEMES } from 'vue-multiple-themes';
import App from './App.vue';

createApp(App)
  .use(VueMultipleThemesPlugin, {
    themes: PRESET_THEMES, // 7 built-in themes
    defaultTheme: 'light',
    strategy: 'both', // attribute + class
    respectSystemPreference: true,
  })
  .mount('#app');
```

Then drop the toggle button anywhere in your template:

```vue
<template>
  <!-- Built-in toggle cycles through all themes on click -->
  <VueMultipleThemes />
</template>
```

---

## Quick Start (Composable)

Use `useTheme()` from the Composition API without registering the plugin:

```vue
<script setup lang="ts">
import { useTheme, PRESET_THEMES } from 'vue-multiple-themes';

const { current, theme, isDark, nextTheme, setTheme } = useTheme({
  themes: PRESET_THEMES,
  defaultTheme: 'light',
  strategy: 'both',
});
</script>

<template>
  <button @click="nextTheme">
    Current: {{ theme.label }} | Dark: {{ isDark }}
  </button>
</template>
```

---

## Apply Colours in CSS

When `injectCssVars: true` (the default), the library injects CSS custom properties into `<head>`:

```css
/* Available globally – no imports needed */
.my-card {
  background-color: var(--vmt-surface);
  color: var(--vmt-text);
  border: 1px solid var(--vmt-border);
}

.cta {
  background-color: var(--vmt-primary);
  color: var(--vmt-text-inverse);
}
```

See [CSS Variables Strategy](/guide/css-variables) and [TailwindCSS Strategy](/guide/tailwindcss) for in-depth guides.

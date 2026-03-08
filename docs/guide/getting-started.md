# Getting Started

## Installation

::: code-group

```bash [pnpm]
pnpm add vue-multiple-themes
```

```bash [npm]
npm install vue-multiple-themes
```

```bash [yarn]
yarn add vue-multiple-themes
```

:::

## Quick Setup

### 1. Register the plugin

```ts
// main.ts
import { createApp } from 'vue'
import { VueMultipleThemesPlugin, PRESET_THEMES } from 'vue-multiple-themes'
import App from './App.vue'

const app = createApp(App)

app.use(VueMultipleThemesPlugin, {
  themes: PRESET_THEMES,
  defaultTheme: 'light',
  strategy: 'both',       // 'attribute' | 'class' | 'both'
  storage: 'localStorage', // persists user's choice
})

app.mount('#app')
```

### 2. Use the composable

```vue
<script setup lang="ts">
import { useTheme, PRESET_THEMES } from 'vue-multiple-themes'

const { current, isDark, setTheme, toggleTheme, themes } = useTheme({
  themes: PRESET_THEMES,
})
</script>

<template>
  <div>
    <p>Current theme: {{ current }}</p>
    <p>Is dark: {{ isDark }}</p>

    <button v-for="t in themes" :key="t.name" @click="setTheme(t.name)">
      {{ t.label }}
    </button>

    <button @click="toggleTheme">Toggle</button>
  </div>
</template>
```

### 3. Use CSS variables in your styles

```css
.card {
  background: var(--vmt-surface-color);
  color: var(--vmt-text-color);
  border: 1px solid var(--vmt-border-color);
}

.button {
  background: var(--vmt-primary-color);
  color: var(--vmt-text-inverse-color);
}
```

## What's Next?

- [TailwindCSS Integration](/guide/tailwind) — use `bg-vmt-primary/50` opacity modifiers
- [Theme Generation](/guide/generation) — generate themes from a single brand color
- [White-Label / Multi-Tenant](/guide/brand-context) — isolated theme contexts
- [API Reference](/api/) — full API documentation

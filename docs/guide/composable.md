# Composable – `useTheme()`

<img src="/guide-composable.png" alt="Composable API" style="width:100%;border-radius:12px;margin:1.5rem 0 2rem;display:block;" />

The `useTheme()` composable is the core of the library.  
It works in Vue 3 and Vue 2 (with `@vue/composition-api`).

## Signature

```ts
function useTheme(options: ThemeOptions): UseThemeReturn;
```

## Return value

| Property         | Type                | Description                              |
| ---------------- | ------------------- | ---------------------------------------- |
| `current`        | `string`            | Reactive name of the active theme        |
| `theme`          | `ThemeDefinition`   | Reactive full definition of active theme |
| `isDark`         | `boolean`           | `true` when theme name contains `'dark'` |
| `themes`         | `ThemeDefinition[]` | All available themes                     |
| `setTheme(name)` | `void`              | Activate a theme by name                 |
| `nextTheme()`    | `void`              | Advance to the next theme                |
| `prevTheme()`    | `void`              | Go back to the previous theme            |
| `toggleTheme()`  | `void`              | Toggle between first two themes          |

## Basic example

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
  <div>
    <p>Active: {{ theme.label }}</p>
    <p>Is dark: {{ isDark }}</p>
    <button @click="nextTheme">Next</button>
    <button @click="setTheme('ocean')">Ocean</button>
  </div>
</template>
```

## Accessing colour tokens

```vue
<script setup lang="ts">
const { theme } = useTheme({ themes });

// theme.colors is reactive
</script>

<template>
  <!-- Inline style using the reactive token -->
  <div :style="{ background: theme.colors.primary }">Primary colour swatch</div>
</template>
```

## Shared state

When `useTheme()` is called multiple times with the **same `storageKey`**, all
instances share the same reactive `current` ref.  
This means setting the theme anywhere updates all subscribers instantly.

```ts
// ComponentA.vue
const { setTheme } = useTheme({ themes, storageKey: 'app-theme' });

// ComponentB.vue
const { current } = useTheme({ themes, storageKey: 'app-theme' });
// current updates whenever ComponentA changes the theme
```

## Options reference

See the [API Reference](/api/) for the full list.

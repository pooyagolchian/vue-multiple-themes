# useTheme()

The core composable for managing themes in Vue 3 components.

## Signature

```ts
function useTheme(options: ThemeOptions): UseThemeReturn
```

## Options

| Property | Type | Default | Description |
|---|---|---|---|
| `themes` | `ThemeDefinition[]` | **required** | Array of theme definitions |
| `defaultTheme` | `string` | First theme | Name of initial theme |
| `strategy` | `'attribute' \| 'class' \| 'both'` | `'attribute'` | How theme is applied to DOM |
| `attribute` | `string` | `'data-theme'` | Attribute name for attribute strategy |
| `classPrefix` | `string` | `'theme-'` | Class prefix for class strategy |
| `target` | `'html' \| 'body' \| string` | `'html'` | DOM element to apply theme to |
| `storage` | `'localStorage' \| 'sessionStorage' \| 'none'` | `'localStorage'` | Persistence mode |
| `storageKey` | `string` | `'vmt-theme'` | Storage key for persistence |
| `injectCssVars` | `boolean` | `true` | Auto-inject CSS custom properties |
| `cssVarPrefix` | `string` | `'--vmt-'` | Prefix for CSS variables |
| `namespace` | `string` | `undefined` | Namespace for isolated contexts |
| `respectSystemPreference` | `boolean` | `false` | Auto-select based on OS preference |
| `onChange` | `(theme: ThemeDefinition) => void` | `undefined` | Callback after each change |
| `onThemeChange` | `(newTheme: string, oldTheme: string) => void` | `undefined` | Callback with old + new names |

## Return Value

`useTheme()` returns a **reactive** object. Properties auto-unwrap in templates (no `.value`):

| Property | Type | Description |
|---|---|---|
| `current` | `string` | Active theme name (reactive) |
| `theme` | `ThemeDefinition` | Full definition of active theme (reactive) |
| `isDark` | `boolean` | `true` if background luminance < 0.5 (reactive) |
| `themes` | `ThemeDefinition[]` | All available themes |
| `resolvedColors` | `Record<string, { r, g, b }>` | Parsed RGB values of active theme |
| `setTheme(name)` | `(name: string) => void` | Set theme by name |
| `nextTheme()` | `() => void` | Cycle to next theme |
| `prevTheme()` | `() => void` | Cycle to previous theme |
| `toggleTheme()` | `() => void` | Toggle between first two themes |

## Example

```vue
<script setup lang="ts">
import { useTheme, PRESET_THEMES } from 'vue-multiple-themes'
import { watch } from 'vue'

const ts = useTheme({
  themes: PRESET_THEMES,
  defaultTheme: 'light',
  strategy: 'both',
  respectSystemPreference: true,
  onThemeChange: (next, prev) => {
    console.log(`Theme: ${prev} → ${next}`)
  },
})

// Watch for changes
watch(() => ts.current, (name) => {
  document.title = `App — ${name} theme`
})
</script>

<template>
  <div>
    <span>{{ ts.current }} (dark: {{ ts.isDark }})</span>
    <button @click="ts.toggleTheme">Toggle</button>
    <button @click="ts.nextTheme">Next</button>
  </div>
</template>
```

## Singleton Behavior

Multiple `useTheme()` calls with the same `storageKey` (and `namespace`) share a singleton reactive state. This is intentional — the same theme state is shared across your entire app.

```ts
// Component A
const { setTheme } = useTheme({ themes, storageKey: 'my-theme' })

// Component B — same reactive state as A
const { current } = useTheme({ themes, storageKey: 'my-theme' })

setTheme('dark') // Both components react to this change
```

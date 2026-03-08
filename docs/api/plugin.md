# VueMultipleThemesPlugin

Vue 3 plugin for global registration.

## Signature

```ts
app.use(VueMultipleThemesPlugin, options: ThemeOptions)
```

## What It Does

1. **Resolves initial theme** — checks storage → OS preference → `defaultTheme` → first theme
2. **Injects CSS variables** — generates and injects a `<style>` tag with all theme variables
3. **Applies theme to DOM** — sets `data-theme` attribute and/or CSS class
4. **Registers global component** — `<VueMultipleThemes>` available in all templates
5. **Provides options** — makes theme config accessible via Vue's `provide/inject`

## Example

```ts
import { createApp } from 'vue'
import { VueMultipleThemesPlugin, PRESET_THEMES } from 'vue-multiple-themes'

const app = createApp(App)

app.use(VueMultipleThemesPlugin, {
  themes: PRESET_THEMES,
  defaultTheme: 'light',
  strategy: 'both',
  storage: 'localStorage',
  storageKey: 'my-app-theme',
  injectCssVars: true,
  cssVarPrefix: '--vmt-',
  respectSystemPreference: true,
})

app.mount('#app')
```

## Options

See [useTheme() Options](/api/use-theme#options) — the plugin accepts the same `ThemeOptions` interface.

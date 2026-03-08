# Nuxt / SSR Integration

vue-multiple-themes is SSR-safe by design — all DOM access is guarded behind `typeof document !== 'undefined'` checks.

## Nuxt 3

### Plugin Setup

Create a Nuxt plugin:

```ts
// plugins/theme.client.ts
import { VueMultipleThemesPlugin, PRESET_THEMES } from 'vue-multiple-themes'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueMultipleThemesPlugin, {
    themes: PRESET_THEMES,
    defaultTheme: 'light',
    strategy: 'both',
    respectSystemPreference: true,
  })
})
```

### Using the Composable

```vue
<script setup>
import { useTheme, PRESET_THEMES } from 'vue-multiple-themes'

// Only runs client-side (theme DOM operations are guarded)
const { current, isDark, setTheme } = useTheme({
  themes: PRESET_THEMES,
})
</script>
```

### Prevent Flash of Unstyled Content (FOUC)

Add an inline script to `nuxt.config.ts` to set the theme before Vue hydrates:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          innerHTML: `
            (function() {
              var theme = localStorage.getItem('vmt-theme') || 'light';
              document.documentElement.setAttribute('data-theme', theme);
              document.documentElement.classList.add('theme-' + theme);
            })()
          `,
          type: 'text/javascript',
        },
      ],
    },
  },
})
```

## Generic SSR (Vite SSR, Quasar, etc.)

All color utilities and theme generators work server-side:

```ts
// Works in SSR
import { generateThemePair, contrastRatio, hexToRgb } from 'vue-multiple-themes'

const [light, dark] = generateThemePair('#7c3aed')
const ratio = contrastRatio('#000000', '#ffffff') // 21
```

DOM-dependent functions (`injectStyles`, `applyThemeToDom`) are no-ops on the server.

## TailwindCSS with SSR

The Tailwind plugin works at build time and doesn't require DOM access. It pre-generates all CSS variable references in your compiled CSS.

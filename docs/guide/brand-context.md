# White-Label / Multi-Tenant

`createBrandContext()` creates fully isolated theme engines — each with its own CSS variables, storage key, and reactive state. Perfect for:

- **White-label SaaS** serving multiple brands
- **Micro-frontends** where each module manages its own theme
- **Embeddable widgets** that shouldn't interfere with the host page

## Basic Usage

```ts
// brands/acme.ts
import { createBrandContext } from 'vue-multiple-themes'
import { acmeThemes } from './themes'

export const acme = createBrandContext({
  namespace: 'acme',
  themes: acmeThemes,
  storageKey: 'acme-theme',
  cssVarPrefix: '--acme-',
  defaultTheme: 'light',
  strategy: 'both',
})
```

```ts
// main.ts
import { createApp } from 'vue'
import { acme } from './brands/acme'

const app = createApp(App)
app.use(acme.BrandPlugin)
app.mount('#app')
```

```vue
<!-- Any component -->
<script setup>
import { acme } from './brands/acme'

const { current, setTheme, isDark } = acme.useTheme()
</script>
```

## Multiple Brands in One App

```ts
import { createBrandContext } from 'vue-multiple-themes'

const brandA = createBrandContext({
  namespace: 'brand-a',
  themes: brandAThemes,
  cssVarPrefix: '--brand-a-',
})

const brandB = createBrandContext({
  namespace: 'brand-b',
  themes: brandBThemes,
  cssVarPrefix: '--brand-b-',
})

// Register both
app.use(brandA.BrandPlugin)
app.use(brandB.BrandPlugin)
```

## How Isolation Works

Each `createBrandContext()` creates:

| Resource | Scoped By |
|---|---|
| `<style>` tag | `id="vmt-theme-styles-<namespace>"` |
| Reactive state | Singleton key `<namespace>:<storageKey>` |
| Vue provide key | `vmt:options:<namespace>` |
| CSS variables | Custom `cssVarPrefix` per brand |
| Storage key | Unique `storageKey` per brand |

This means two brand contexts can have completely different active themes, different color tokens, and different persistence — all in the same Vue application.

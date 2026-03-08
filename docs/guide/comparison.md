# Comparison

How does vue-multiple-themes compare to other Vue theming solutions?

## Feature Matrix

| Feature | vue-multiple-themes | @vueuse/core useColorMode | nuxt-color-mode | VueDarkMode |
|---|:---:|:---:|:---:|:---:|
| **Multi-theme (3+)** | ✅ Unlimited | ⚠️ Manual | ⚠️ Light/Dark/System | ❌ |
| **Tailwind v3 plugin** | ✅ Built-in | ❌ | ❌ | ❌ |
| **Tailwind v4 plugin** | ✅ Built-in | ❌ | ❌ | ❌ |
| **Opacity modifiers** (`bg-primary/50`) | ✅ RGB channels | ❌ | ❌ | ❌ |
| **WCAG contrast utilities** | ✅ 5+ functions | ❌ | ❌ | ❌ |
| **Theme generation** | ✅ From 1 color | ❌ | ❌ | ❌ |
| **White-label / namespace** | ✅ `createBrandContext()` | ❌ | ❌ | ❌ |
| **Preset themes** | ✅ 7 included | ❌ | ❌ | ❌ |
| **Color utilities** | ✅ 20+ tree-shakeable | ❌ | ❌ | ❌ |
| **System preference** | ✅ | ✅ | ✅ | ✅ |
| **Storage persistence** | ✅ LS + SS | ✅ | ✅ | ❌ |
| **SSR safe** | ✅ | ✅ | ✅ | ⚠️ |
| **TypeScript** | ✅ Full | ✅ | ✅ | ⚠️ |
| **Zero dependencies** | ✅ | ❌ (@vueuse) | ❌ (Nuxt) | ❌ |
| **Vue 3 Composition API** | ✅ | ✅ | ✅ | ❌ |
| **Headless components** | ✅ | ❌ | ❌ | ✅ |
| **Color harmony** | ✅ Triadic, complementary | ❌ | ❌ | ❌ |

## When to Use What

### Choose vue-multiple-themes if you need:
- More than 2 themes (light/dark/sepia/ocean/custom...)
- TailwindCSS integration with opacity modifiers
- White-label / multi-tenant theme isolation
- WCAG-compliant theme generation from brand colors
- A color utility library (lighten, darken, mix, contrast)

### Choose @vueuse/core `useColorMode` if you need:
- Simple light/dark/auto toggle as part of a larger @vueuse setup
- Already using @vueuse in your project

### Choose nuxt-color-mode if you need:
- Nuxt-specific integration with SSR support
- Only light/dark/system switching
- Nuxt module ecosystem compatibility

## Migration from Other Solutions

If you're migrating from a simpler dark mode toggle, vue-multiple-themes is a drop-in upgrade:

```ts
// Before (manual dark mode)
const isDark = ref(false)
document.documentElement.classList.toggle('dark', isDark.value)

// After (vue-multiple-themes)
import { useTheme, lightTheme, darkTheme } from 'vue-multiple-themes'

const { isDark, toggleTheme } = useTheme({
  themes: [lightTheme, darkTheme],
  respectSystemPreference: true,
})
```

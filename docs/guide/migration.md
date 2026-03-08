# Migration Guide (v5 → v6)

## Breaking Changes

### Icon API

v6 removed bundled Lucide icon data. Icons are now bring-your-own via the `:as` prop:

```vue
<!-- v5 (removed) -->
<VmtIcon name="sun" />

<!-- v6 -->
<script setup>
import { Sun } from 'lucide-vue-next'
</script>
<VmtIcon :as="Sun" />
```

### Composable Return Type

`useTheme()` now returns a `reactive()` object with auto-unwrapping `ComputedRef` properties. No `.value` needed in templates:

```vue
<!-- v5 -->
<span>{{ current.value }}</span>

<!-- v6 -->
<span>{{ current }}</span>
```

In script, watch with a getter:

```ts
// v6
watch(() => ts.current, (name) => console.log(name))
```

### New Callbacks

v6 adds `onThemeChange(newTheme, oldTheme)` callback alongside the existing `onChange(themeDefinition)`:

```ts
useTheme({
  themes: PRESET_THEMES,
  onThemeChange: (newTheme, oldTheme) => {
    console.log(`Changed from ${oldTheme} to ${newTheme}`)
  },
})
```

### CSS Variable Dual Format

v6 generates two variables per token:
- `--vmt-primary: 59 130 246` (RGB channels for Tailwind)
- `--vmt-primary-color: rgb(59 130 246)` (full color for direct CSS use)

If you were using `var(--vmt-primary)` directly in CSS, update to `var(--vmt-primary-color)`.

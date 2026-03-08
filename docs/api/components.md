# Components

## `<VueMultipleThemes>`

Wrapper component registered globally by the plugin.

```vue
<template>
  <VueMultipleThemes
    :themes="themes"
    default-theme="light"
    strategy="both"
    show-toggle
  >
    <template #default="{ current, isDark, setTheme, toggleTheme }">
      <button @click="toggleTheme">
        {{ isDark ? '🌙' : '☀️' }}
      </button>
    </template>
  </VueMultipleThemes>
</template>
```

## `<VmtThemePicker>`

Headless theme picker with keyboard navigation and ARIA attributes.

```vue
<script setup>
import { VmtThemePicker, PRESET_THEMES } from 'vue-multiple-themes'
</script>

<template>
  <VmtThemePicker :themes="PRESET_THEMES" v-slot="{ themes, current, setTheme }">
    <button
      v-for="t in themes"
      :key="t.name"
      :aria-pressed="t.name === current"
      @click="setTheme(t.name)"
    >
      {{ t.label }}
    </button>
  </VmtThemePicker>
</template>
```

## `<VmtIcon>`

Bring-your-own icon forwarder. Does not bundle any icon data.

```vue
<script setup>
import { VmtIcon } from 'vue-multiple-themes'
import { Sun, Moon, Palette } from 'lucide-vue-next'
</script>

<template>
  <!-- Forward to any Vue icon component -->
  <VmtIcon :as="Sun" :size="20" />
  <VmtIcon :as="Moon" :size="20" />
  <VmtIcon :as="Palette" :size="20" class="text-vmt-primary" />
</template>
```

Supports any icon library that exposes Vue components: `lucide-vue-next`, `@heroicons/vue`, `@iconify/vue`, etc.

<script setup lang="ts">
/**
 * VmtThemePicker.vue
 *
 * Headless dropdown/popover for selecting themes.
 * Provides keyboard navigation (arrow keys, Enter, Escape) and full ARIA support.
 * No built-in styles — use slots and Tailwind classes for custom styling.
 *
 * @example
 * ```vue
 * <VmtThemePicker :themes="themes" v-slot="{ open, toggle, items, activeIndex }">
 *   <button @click="toggle">{{ current }}</button>
 *   <ul v-if="open">
 *     <li v-for="(item, i) in items" :key="item.name"
 *         :class="{ active: i === activeIndex }"
 *         @click="item.select()">
 *       {{ item.label }}
 *     </li>
 *   </ul>
 * </VmtThemePicker>
 * ```
 */
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import type { ThemeDefinition, ThemeOptions } from '../types'
import { useTheme } from '../composables/useTheme'

const props = withDefaults(
  defineProps<{
    /** All available themes */
    themes: ThemeDefinition[]
    /** Theme options passed to useTheme */
    defaultTheme?: string
    strategy?: ThemeOptions['strategy']
    storage?: ThemeOptions['storage']
    storageKey?: string
    /** Close dropdown when a theme is selected. Default: true */
    closeOnSelect?: boolean
  }>(),
  {
    strategy: 'both',
    storage: 'localStorage',
    storageKey: 'vmt-theme',
    closeOnSelect: true,
  },
)

const emit = defineEmits<{
  (e: 'select', theme: ThemeDefinition): void
  (e: 'open'): void
  (e: 'close'): void
}>()

const themeApi = useTheme({
  themes: props.themes,
  defaultTheme: props.defaultTheme,
  strategy: props.strategy,
  storage: props.storage,
  storageKey: props.storageKey,
})

const isOpen = ref(false)
const activeIndex = ref(-1)
const pickerRef = ref<HTMLElement | null>(null)

function toggle() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    activeIndex.value = props.themes.findIndex((t) => t.name === themeApi.current)
    emit('open')
  } else {
    emit('close')
  }
}

function open() {
  if (!isOpen.value) {
    isOpen.value = true
    activeIndex.value = props.themes.findIndex((t) => t.name === themeApi.current)
    emit('open')
  }
}

function close() {
  if (isOpen.value) {
    isOpen.value = false
    activeIndex.value = -1
    emit('close')
  }
}

function selectTheme(theme: ThemeDefinition) {
  themeApi.setTheme(theme.name)
  emit('select', theme)
  if (props.closeOnSelect) {
    close()
  }
}

function onKeydown(e: KeyboardEvent) {
  if (!isOpen.value) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault()
      open()
    }
    return
  }

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      activeIndex.value = (activeIndex.value + 1) % props.themes.length
      break
    case 'ArrowUp':
      e.preventDefault()
      activeIndex.value = (activeIndex.value - 1 + props.themes.length) % props.themes.length
      break
    case 'Enter':
    case ' ':
      e.preventDefault()
      if (activeIndex.value >= 0) {
        selectTheme(props.themes[activeIndex.value])
      }
      break
    case 'Escape':
      e.preventDefault()
      close()
      break
    case 'Home':
      e.preventDefault()
      activeIndex.value = 0
      break
    case 'End':
      e.preventDefault()
      activeIndex.value = props.themes.length - 1
      break
  }
}

// Close on outside click
function onClickOutside(e: MouseEvent) {
  if (pickerRef.value && !pickerRef.value.contains(e.target as Node)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside, true)
})

const items = computed(() =>
  props.themes.map((theme) => ({
    name: theme.name,
    label: theme.label ?? theme.name,
    icon: theme.icon,
    colors: theme.colors,
    isActive: theme.name === themeApi.current,
    select: () => selectTheme(theme),
  })),
)
</script>

<template>
  <div
    ref="pickerRef"
    role="listbox"
    :aria-expanded="isOpen"
    aria-label="Theme picker"
    @keydown="onKeydown"
    tabindex="0"
  >
    <slot
      :open="isOpen"
      :toggle="toggle"
      :close="close"
      :items="items"
      :active-index="activeIndex"
      :current="themeApi.current"
      :current-theme="themeApi.theme"
      :is-dark="themeApi.isDark"
      :set-theme="themeApi.setTheme"
      :next-theme="themeApi.nextTheme"
      :prev-theme="themeApi.prevTheme"
      :toggle-theme="themeApi.toggleTheme"
    />
  </div>
</template>

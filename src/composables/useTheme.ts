import {
  computed,
  isVue2,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue-demi'
import type { ThemeDefinition, ThemeOptions, UseThemeReturn } from '../types'
import { buildCssVars, injectStyles, removeStyles } from '../utils/css-injector'
import { applyThemeToDom, getSystemPreference, readStorage, writeStorage } from '../utils/dom'

// ─── Shared singleton state (module-level) ────────────────────────────────────
// Allows multiple useTheme() calls to share the same reactive state when
// options match. We track instances per storage-key.
const singletons = new Map<
  string,
  { current: ReturnType<typeof ref<string>>; options: ThemeOptions }
>()

function getSingletonKey(options: ThemeOptions): string {
  return options.storageKey ?? 'vmt-theme'
}

// ─── Main composable ──────────────────────────────────────────────────────────
/**
 * `useTheme(options)` – the core Composition-API composable.
 *
 * Works in Vue 3 and Vue 2 (with `@vue/composition-api`).
 * When called multiple times with the same `storageKey`, all instances share
 * the same reactive state.
 *
 * @example
 * ```ts
 * const { current, theme, setTheme, toggleTheme } = useTheme({
 *   themes: [lightTheme, darkTheme, oceanTheme],
 *   defaultTheme: 'light',
 *   strategy: 'both',
 * })
 * ```
 */
export function useTheme(options: ThemeOptions): UseThemeReturn {
  const {
    themes,
    defaultTheme,
    strategy = 'attribute',
    attribute = 'data-theme',
    classPrefix = 'theme-',
    target = 'html',
    storage = 'localStorage',
    storageKey = 'vmt-theme',
    injectCssVars = true,
    cssVarPrefix = '--vmt-',
    respectSystemPreference = false,
    onChange,
  } = options

  if (themes.length === 0) {
    throw new Error('[vue-multiple-themes] `themes` array must not be empty.')
  }

  // ─── Resolve initial theme name ─────────────────────────────────────────
  function getInitialTheme(): string {
    // 1. Check storage
    if (storage !== 'none') {
      const stored = readStorage(storageKey, storage as 'localStorage' | 'sessionStorage')
      if (stored && themes.some((t) => t.name === stored)) return stored
    }

    // 2. OS preference
    if (respectSystemPreference) {
      const pref = getSystemPreference()
      const match = themes.find((t) => t.name === pref)
      if (match) return match.name
    }

    // 3. Explicit default
    if (defaultTheme && themes.some((t) => t.name === defaultTheme)) {
      return defaultTheme
    }

    // 4. First theme
    return themes[0].name
  }

  // ─── Singleton current-name ref ─────────────────────────────────────────
  const singletonKey = getSingletonKey(options)
  let currentName: ReturnType<typeof ref<string>>

  const existing = singletons.get(singletonKey)
  if (existing) {
    currentName = existing.current
  } else {
    currentName = ref<string>(getInitialTheme())
    singletons.set(singletonKey, { current: currentName, options })
  }

  // ─── Derived state ──────────────────────────────────────────────────────
  const theme = computed<ThemeDefinition>(
    () => themes.find((t) => t.name === currentName.value) ?? themes[0],
  )

  const isDark = computed<boolean>(() =>
    (currentName.value ?? '').toLowerCase().includes('dark'),
  )

  // ─── Apply theme to DOM ─────────────────────────────────────────────────
  let previousName: string | null = null

  function applyTheme(name: string) {
    applyThemeToDom(name, previousName, { strategy, attribute, classPrefix, target })
    previousName = name

    if (storage !== 'none') {
      writeStorage(storageKey, name, storage as 'localStorage' | 'sessionStorage')
    }

    const def = themes.find((t) => t.name === name) ?? themes[0]
    onChange?.(def)
  }

  // ─── Inject CSS vars (once) ─────────────────────────────────────────────
  function ensureStyles() {
    if (!injectCssVars) return
    const css = buildCssVars(themes, { strategy, attribute, classPrefix, cssVarPrefix, target })
    injectStyles(css)
  }

  // ─── Actions ────────────────────────────────────────────────────────────
  function setTheme(name: string) {
    if (!themes.some((t) => t.name === name)) {
      console.warn(`[vue-multiple-themes] Unknown theme: "${name}"`)
      return
    }
    currentName.value = name
  }

  function nextTheme() {
    const idx = themes.findIndex((t) => t.name === currentName.value)
    currentName.value = themes[(idx + 1) % themes.length].name
  }

  function prevTheme() {
    const idx = themes.findIndex((t) => t.name === currentName.value)
    currentName.value = themes[(idx - 1 + themes.length) % themes.length].name
  }

  function toggleTheme() {
    if (themes.length < 2) return
    const current = currentName.value
    const next = themes.find((t) => t.name !== current) ?? themes[1]
    currentName.value = next.name
  }

  // ─── Lifecycle ──────────────────────────────────────────────────────────
  onMounted(() => {
    ensureStyles()
    if (currentName.value) applyTheme(currentName.value)
  })

  watch(currentName, (name) => {
    if (name) applyTheme(name)
  })

  // Clean up injected styles only when ALL instances are unmounted
  let instanceCount = (singletons.get(singletonKey) as any)?._count ?? 0
  instanceCount++
  ;(singletons.get(singletonKey) as any)!._count = instanceCount

  onBeforeUnmount(() => {
    const entry = singletons.get(singletonKey) as any
    if (entry) {
      entry._count = (entry._count ?? 1) - 1
      if (entry._count <= 0) {
        singletons.delete(singletonKey)
        removeStyles()
      }
    }
  })

  return {
    get current() {
      return currentName.value ?? themes[0]?.name ?? ''
    },
    get theme() {
      return theme.value
    },
    get isDark() {
      return isDark.value
    },
    themes,
    setTheme,
    nextTheme,
    prevTheme,
    toggleTheme,
  }
}

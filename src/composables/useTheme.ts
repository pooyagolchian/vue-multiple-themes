import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'
import type { ThemeDefinition, ThemeOptions, UseThemeReturn } from '../types'
import { buildCssVars, injectStyles, removeStyles } from '../utils/css-injector'
import { normalizeToRgbChannels } from '../utils/color'
import { applyThemeToDom, getSystemPreference, readStorage, writeStorage } from '../utils/dom'

// ─── Shared singleton state (module-level) ────────────────────────────────────
// Allows multiple useTheme() calls to share the same reactive state when
// options match. We track instances per storage-key.
const singletons = new Map<
  string,
  {
    current: ReturnType<typeof ref<string>>
    options: ThemeOptions
    _count: number
    _mediaCleanup?: () => void
  }
>()

function getSingletonKey(options: ThemeOptions): string {
  return options.storageKey ?? 'vmt-theme'
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Determine if a theme is "dark" by checking the background color luminance.
 * Falls back to name-based check if no background color is defined.
 */
function isThemeDark(theme: ThemeDefinition): boolean {
  const bg = theme.colors.background
  if (bg) {
    try {
      // Normalize to RGB channels, then reconstruct hex for luminance check
      const channels = normalizeToRgbChannels(bg)
      const parts = channels.split(' ').map(Number)
      if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
        // Calculate relative luminance: dark if < 0.5
        const [r, g, b] = parts.map((v) => {
          const c = v / 255
          return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
        })
        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
        return lum < 0.5
      }
    } catch {
      // Fall through to name-based check
    }
  }
  return (theme.name ?? '').toLowerCase().includes('dark')
}

/**
 * Parse a theme's colors into `{ r, g, b }` objects.
 */
function resolveThemeColors(theme: ThemeDefinition): Record<string, { r: number; g: number; b: number }> {
  const result: Record<string, { r: number; g: number; b: number }> = {}
  for (const [key, value] of Object.entries(theme.colors)) {
    if (value === undefined) continue
    try {
      const channels = normalizeToRgbChannels(value)
      const parts = channels.split(' ').map(Number)
      if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
        result[key] = { r: parts[0], g: parts[1], b: parts[2] }
      }
    } catch {
      // Skip unparseable colors
    }
  }
  return result
}

// ─── Main composable ──────────────────────────────────────────────────────────
/**
 * `useTheme(options)` – the core Composition-API composable.
 *
 * Returns reactive `ComputedRef` values that auto-unwrap in templates and can be
 * destructured for use with `watch()`:
 *
 * ```ts
 * const { current, isDark, setTheme } = useTheme({
 *   themes: [lightTheme, darkTheme, oceanTheme],
 *   defaultTheme: 'light',
 *   strategy: 'both',
 * })
 *
 * // Watch for theme changes
 * watch(current, (name) => console.log('Theme changed to', name))
 *
 * // Use in template (auto-unwraps)
 * // <span>{{ current }}</span>
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
    onThemeChange,
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
  let singleton = singletons.get(singletonKey)
  let currentName: ReturnType<typeof ref<string>>

  if (singleton) {
    currentName = singleton.current
  } else {
    currentName = ref<string>(getInitialTheme())
    singleton = { current: currentName, options, _count: 0 }
    singletons.set(singletonKey, singleton)
  }

  // ─── Derived state (ComputedRefs) ──────────────────────────────────────
  const currentComputed = computed<string>(
    () => currentName.value ?? themes[0]?.name ?? '',
  )

  const themeComputed = computed<ThemeDefinition>(
    () => themes.find((t) => t.name === currentName.value) ?? themes[0],
  )

  const isDarkComputed = computed<boolean>(() => isThemeDark(themeComputed.value))

  const resolvedColorsComputed = computed<Record<string, { r: number; g: number; b: number }>>(
    () => resolveThemeColors(themeComputed.value),
  )

  // ─── Apply theme to DOM ─────────────────────────────────────────────────
  let previousName: string | null = null

  function applyTheme(name: string) {
    const oldName = previousName

    // Add transition class for smooth color changes
    if (typeof document !== 'undefined' && oldName !== null) {
      const el = document.documentElement
      el.classList.add('vmt-transitioning')
      // Remove after transition completes
      setTimeout(() => el.classList.remove('vmt-transitioning'), 250)
    }

    applyThemeToDom(name, previousName, { strategy, attribute, classPrefix, target })
    previousName = name

    if (storage !== 'none') {
      writeStorage(storageKey, name, storage as 'localStorage' | 'sessionStorage')
    }

    const def = themes.find((t) => t.name === name) ?? themes[0]
    onChange?.(def)

    // Fire onThemeChange callback with old and new theme names
    if (onThemeChange && oldName !== null && oldName !== name) {
      onThemeChange(name, oldName)
    }

    // Dispatch DOM custom event for non-Vue consumers
    if (typeof document !== 'undefined') {
      document.dispatchEvent(
        new CustomEvent('vmt:theme-change', {
          detail: { theme: name, previous: oldName, definition: def },
        }),
      )
    }
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
    if (themes.length === 2) {
      const other = themes.find((t) => t.name !== currentName.value) ?? themes[1]
      currentName.value = other.name
    } else {
      nextTheme()
    }
  }

  // ─── System preference watcher ──────────────────────────────────────────
  function setupSystemPreferenceWatcher() {
    if (typeof window === 'undefined') return
    if (!respectSystemPreference) return
    if (singleton!._mediaCleanup) return // Already watching

    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      const pref = e.matches ? 'dark' : 'light'
      const match = themes.find((t) => t.name === pref)
      if (match) {
        currentName.value = match.name
      }
    }
    mql.addEventListener('change', handler)
    singleton!._mediaCleanup = () => mql.removeEventListener('change', handler)
  }

  // ─── Lifecycle ──────────────────────────────────────────────────────────
  let appliedInSetup = false
  if (typeof document !== 'undefined') {
    ensureStyles()
    const initialName = currentName.value
    if (initialName) applyTheme(initialName)
    appliedInSetup = true
    setupSystemPreferenceWatcher()
  }

  onMounted(() => {
    if (!appliedInSetup) {
      ensureStyles()
      const mountedName = currentName.value
      if (mountedName) applyTheme(mountedName)
      setupSystemPreferenceWatcher()
    }
  })

  watch(currentName, (name) => {
    if (name) applyTheme(name)
  })

  // Clean up injected styles only when ALL instances are unmounted
  singleton._count++

  onBeforeUnmount(() => {
    const entry = singletons.get(singletonKey)
    if (entry) {
      entry._count--
      if (entry._count <= 0) {
        // Clean up system preference watcher
        entry._mediaCleanup?.()
        singletons.delete(singletonKey)
        removeStyles()
      }
    }
  })

  // Wrap in reactive() so ComputedRef properties auto-unwrap in Vue templates.
  // Both access patterns work:
  //   Template: {{ ts.current }}     — auto-unwrapped by reactive()
  //   Script:   ts.current.value     — still a ComputedRef when destructured
  //   Script:   const { current } = ts; current.value — works as Ref
  return reactive({
    current: currentComputed,
    theme: themeComputed,
    isDark: isDarkComputed,
    themes,
    resolvedColors: resolvedColorsComputed,
    setTheme,
    nextTheme,
    prevTheme,
    toggleTheme,
  }) as UseThemeReturn
}

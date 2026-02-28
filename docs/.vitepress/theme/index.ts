import type { Theme } from 'vitepress'
import { useRouter } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { buildCssVars, injectStyles, PRESET_THEMES, VueMultipleThemesPlugin } from 'vue-multiple-themes'
import ColorGrid from '../components/ColorGrid.vue'
import LiveDemo from '../components/LiveDemo.vue'
import './custom.css'

// Shared plugin options — single source of truth used by both enhanceApp and setup
const VMT_OPTIONS = {
  themes: PRESET_THEMES,
  defaultTheme: 'light',
  strategy: 'both' as const,
  storageKey: 'vmt-docs-theme',
  attribute: 'data-theme',
  classPrefix: 'theme-',
  cssVarPrefix: '--vmt-',
  target: 'html' as const,
  injectCssVars: true,
}

export default {
  extends: DefaultTheme,

  enhanceApp({ app }) {
    // Install the theme plugin so demos work inside docs
    app.use(VueMultipleThemesPlugin, VMT_OPTIONS)

    // Register demo components globally
    app.component('LiveDemo', LiveDemo)
    app.component('ColorGrid', ColorGrid)
  },

  setup() {
    // Guard: VitePress calls setup() on every page render, including SSR.
    // Only register the router hook in the browser.
    if (typeof window === 'undefined') return

    const router = useRouter()
    const _prev = router.onAfterRouteChanged

    router.onAfterRouteChanged = async (href) => {
      // Chain any previously registered handler
      await _prev?.(href)

      // After each SPA navigation, ensure the theme <style> tag is still in
      // the DOM and that <html> still carries the correct data-theme attribute.
      // This is a safety net for cases where component unmounts during
      // navigation inadvertently removed the shared style tag.
      if (!document.getElementById('vmt-theme-styles')) {
        const css = buildCssVars(VMT_OPTIONS.themes, VMT_OPTIONS)
        injectStyles(css)
      }

      // Re-stamp data-theme + theme-* class on <html> from localStorage
      try {
        const stored = localStorage.getItem(VMT_OPTIONS.storageKey)
        const active = stored && VMT_OPTIONS.themes.some(t => t.name === stored)
          ? stored
          : VMT_OPTIONS.defaultTheme
        const h = document.documentElement
        h.setAttribute(VMT_OPTIONS.attribute, active)
        const toRemove: string[] = []
        h.classList.forEach(c => { if (c.startsWith(VMT_OPTIONS.classPrefix)) toRemove.push(c) })
        toRemove.forEach(c => h.classList.remove(c))
        h.classList.add(VMT_OPTIONS.classPrefix + active)
      } catch (_) { /* private browsing / storage disabled */ }
    }
  },
} satisfies Theme

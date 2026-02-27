import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { PRESET_THEMES, VueMultipleThemesPlugin } from 'vue-multiple-themes'
import ColorGrid from '../components/ColorGrid.vue'
import LiveDemo from '../components/LiveDemo.vue'
import NavThemeSwitcher from '../components/NavThemeSwitcher.vue'
import ThemeDemo from '../components/ThemeDemo.vue'
import './custom.css'

export default {
  extends: DefaultTheme,

  // Inject NavThemeSwitcher into the nav bar (replaces the dark/light toggle)
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(NavThemeSwitcher),
    })
  },

  enhanceApp({ app }) {
    // Install the theme plugin so demos work inside docs
    app.use(VueMultipleThemesPlugin, {
      themes: PRESET_THEMES,
      defaultTheme: 'light',
      strategy: 'both',
      storageKey: 'vmt-docs-theme',
      injectCssVars: true,
    })

    // Register demo components globally
    app.component('ThemeDemo', ThemeDemo)
    app.component('LiveDemo', LiveDemo)
    app.component('ColorGrid', ColorGrid)
  },
} satisfies Theme

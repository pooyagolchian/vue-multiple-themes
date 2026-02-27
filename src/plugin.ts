/**
 * Vue plugin for vue-multiple-themes.
 *
 * Registers `<VueMultipleThemes>` globally and optionally applies the initial
 * theme before the app mounts (useful for SSR / SSG hydration).
 *
 * @example Vue 3
 * ```ts
 * import { createApp } from 'vue'
 * import { VueMultipleThemesPlugin } from 'vue-multiple-themes'
 *
 * createApp(App).use(VueMultipleThemesPlugin, {
 *   themes: myThemes,
 *   defaultTheme: 'light',
 *   strategy: 'both',
 * }).mount('#app')
 * ```
 *
 * @example Vue 2
 * ```js
 * import Vue from 'vue'
 * import { VueMultipleThemesPlugin } from 'vue-multiple-themes'
 *
 * Vue.use(VueMultipleThemesPlugin, {
 *   themes: myThemes,
 *   defaultTheme: 'light',
 * })
 * ```
 */

import { isVue2 } from 'vue-demi'
import type { App } from 'vue-demi'
import VueMultipleThemes from './components/VueMultipleThemes.vue'
import type { ThemeOptions } from './types'
import { buildCssVars, injectStyles } from './utils/css-injector'
import { applyThemeToDom, getSystemPreference, readStorage, writeStorage } from './utils/dom'

export const VueMultipleThemesPlugin = {
  install(app: App, options: ThemeOptions = { themes: [] }) {
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
    } = options

    if (themes.length === 0) {
      console.warn('[vue-multiple-themes] Plugin installed with empty themes array.')
      return
    }

    // ── Resolve & apply initial theme immediately (before mount) ─────────
    let initialTheme = themes[0]?.name ?? 'light'
    let fromStorage = false

    // 1. Check storage first (highest priority — user's previous choice)
    if (storage !== 'none') {
      const stored = readStorage(storageKey, storage as 'localStorage' | 'sessionStorage')
      if (stored && themes.some((t) => t.name === stored)) {
        initialTheme = stored
        fromStorage = true
      }
    }

    // 2. OS preference (only when nothing was stored)
    if (!fromStorage && respectSystemPreference) {
      const pref = getSystemPreference()
      const match = themes.find((t) => t.name === pref)
      if (match) initialTheme = match.name
    }

    // 3. Explicit default (only when neither storage nor OS preference matched)
    if (!fromStorage && initialTheme === (themes[0]?.name ?? 'light') && defaultTheme && themes.some((t) => t.name === defaultTheme)) {
      initialTheme = defaultTheme
    }

    // Inject CSS vars into <head> immediately
    if (injectCssVars) {
      const css = buildCssVars(themes, { strategy, attribute, classPrefix, cssVarPrefix, target })
      injectStyles(css)
    }

    // Persist the resolved theme so the composable picks up the same value
    if (storage !== 'none') {
      writeStorage(storageKey, initialTheme, storage as 'localStorage' | 'sessionStorage')
    }

    // Apply theme to DOM
    applyThemeToDom(initialTheme, null, { strategy, attribute, classPrefix, target })

    // ── Register global component ─────────────────────────────────────────
    if (isVue2) {
      // Vue 2: app is the Vue constructor
      ;(app as any).component('VueMultipleThemes', VueMultipleThemes)
    } else {
      // Vue 3: app is the application instance
      ;(app as any).component('VueMultipleThemes', VueMultipleThemes)
    }

    // ── Provide the options for injection (Vue 3 only) ───────────────────
    if (!isVue2 && typeof (app as any).provide === 'function') {
      ;(app as any).provide('vmt:options', options)
    }
  },
}

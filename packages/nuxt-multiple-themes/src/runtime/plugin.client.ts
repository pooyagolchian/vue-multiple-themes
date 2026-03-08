import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { VueMultipleThemesPlugin, PRESET_THEMES } from 'vue-multiple-themes'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const options = config.public.multipleThemes || {}

  const themes = options.themes || PRESET_THEMES

  nuxtApp.vueApp.use(VueMultipleThemesPlugin, {
    themes,
    defaultTheme: options.defaultTheme || 'light',
    strategy: options.strategy || 'both',
    storage: options.storage || 'localStorage',
    storageKey: options.storageKey || 'vmt-theme',
    injectCssVars: options.injectCssVars !== false,
    cssVarPrefix: options.cssVarPrefix || '--vmt-',
    respectSystemPreference: options.respectSystemPreference || false,
    namespace: options.namespace,
  })
})

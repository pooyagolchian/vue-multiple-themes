import { defineNuxtModule, addPlugin, addImports, createResolver } from '@nuxt/kit'
import type { ThemeOptions } from 'vue-multiple-themes'

export interface ModuleOptions extends Partial<ThemeOptions> {
  /**
   * Whether to inject an inline script to prevent FOUC (flash of unstyled content).
   * The script reads the stored theme from localStorage and applies it
   * before Vue hydrates.
   * @default true
   */
  preventFouc?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-multiple-themes',
    configKey: 'multipleThemes',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    preventFouc: true,
    storage: 'localStorage',
    storageKey: 'vmt-theme',
    strategy: 'both',
    defaultTheme: 'light',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Register the client-side plugin
    addPlugin({
      src: resolver.resolve('./runtime/plugin.client'),
      mode: 'client',
    })

    // Auto-import useTheme and createBrandContext from vue-multiple-themes
    addImports([
      {
        name: 'useTheme',
        from: 'vue-multiple-themes',
      },
      {
        name: 'createBrandContext',
        from: 'vue-multiple-themes',
      },
      {
        name: 'PRESET_THEMES',
        from: 'vue-multiple-themes',
      },
      {
        name: 'generateThemePair',
        from: 'vue-multiple-themes',
      },
      {
        name: 'generateLightTheme',
        from: 'vue-multiple-themes',
      },
      {
        name: 'generateDarkTheme',
        from: 'vue-multiple-themes',
      },
    ])

    // Inject FOUC prevention script into <head>
    if (options.preventFouc !== false) {
      const storageKey = options.storageKey || 'vmt-theme'
      const defaultTheme = options.defaultTheme || 'light'
      const strategy = options.strategy || 'both'

      // Build a minimal inline script
      const scriptParts: string[] = [
        `var t=localStorage.getItem('${storageKey}')||'${defaultTheme}';`,
      ]

      if (strategy === 'attribute' || strategy === 'both') {
        scriptParts.push(`document.documentElement.setAttribute('data-theme',t);`)
      }
      if (strategy === 'class' || strategy === 'both') {
        scriptParts.push(`document.documentElement.classList.add('theme-'+t);`)
      }

      nuxt.options.app.head.script = nuxt.options.app.head.script || []
      nuxt.options.app.head.script.push({
        innerHTML: `(function(){${scriptParts.join('')}})()`,
        type: 'text/javascript',
      })
    }

    // Provide module options to runtime via public runtime config
    nuxt.options.runtimeConfig.public.multipleThemes = options
  },
})

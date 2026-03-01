/**
 * `createBrandContext` — factory for isolated, namespaced theme contexts.
 *
 * Use this when you need multiple independent theme engines in the same Vue
 * application — e.g. white-label setups, micro-frontends, or embeddable
 * widgets where each brand manages its own palette, storage key, and CSS
 * variable namespace.
 *
 * Each context gets:
 * - A scoped `<style>` tag (`id="vmt-theme-styles-<namespace>"`)
 * - An isolated singleton reactive state (keyed by `<namespace>:<storageKey>`)
 * - A namespaced `provide` key (`"vmt:options:<namespace>"`)
 *
 * @example
 * ```ts
 * // brand-a.ts
 * import { createBrandContext } from 'vue-multiple-themes'
 * import brandAThemes from './themes/brand-a'
 *
 * export const brandA = createBrandContext({
 *   namespace: 'brand-a',
 *   themes: brandAThemes,
 *   storageKey: 'brand-a-theme',
 *   cssVarPrefix: '--brand-a-',
 *   defaultTheme: 'light',
 *   strategy: 'both',
 * })
 *
 * // In main.ts:
 * app.use(brandA.BrandPlugin)
 *
 * // In any component:
 * const { current, setTheme, isDark } = brandA.useTheme()
 * ```
 *
 * @example Multiple brands in one app
 * ```ts
 * const acme = createBrandContext({ namespace: 'acme', themes: acmeThemes, cssVarPrefix: '--acme-' })
 * const beta = createBrandContext({ namespace: 'beta', themes: betaThemes, cssVarPrefix: '--beta-' })
 *
 * app.use(acme.BrandPlugin)
 * app.use(beta.BrandPlugin)
 * ```
 */

import type { App } from 'vue'
import type { ThemeOptions, UseThemeReturn } from '../types'
import { useTheme } from './useTheme'
import { VueMultipleThemesPlugin } from '../plugin'

export interface BrandContext {
  /** The namespace string that was used to create this context. */
  readonly namespace: string
  /**
   * Composable — returns the reactive theme state for this brand context.
   * Optionally accepts partial overrides (e.g. to temporarily swap themes).
   */
  useTheme: (overrides?: Partial<ThemeOptions>) => UseThemeReturn
  /**
   * Vue plugin — install this into your `app` to register the global
   * `<VueMultipleThemes>` component and apply the initial theme.
   *
   * @example app.use(brandA.BrandPlugin)
   * @example app.use(brandA.BrandPlugin, { defaultTheme: 'dark' }) // override
   */
  BrandPlugin: {
    install: (app: App, overrides?: Partial<ThemeOptions>) => void
  }
}

/**
 * Create an isolated, namespaced brand context.
 *
 * @param defaults - Base options for this brand. `namespace` is required and
 *   must be **unique per application** to prevent state collisions.
 */
export function createBrandContext(
  defaults: ThemeOptions & { namespace: string },
): BrandContext {
  const { namespace } = defaults

  return {
    namespace,

    useTheme(overrides?: Partial<ThemeOptions>): UseThemeReturn {
      return useTheme({ ...defaults, ...overrides, namespace })
    },

    BrandPlugin: {
      install(app: App, overrides: Partial<ThemeOptions> = {}): void {
        VueMultipleThemesPlugin.install(app, { ...defaults, ...overrides, namespace })
      },
    },
  }
}

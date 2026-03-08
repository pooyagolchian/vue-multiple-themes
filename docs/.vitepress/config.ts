import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'vue-multiple-themes',
  description: 'Vue 3 multi-theme engine with CSS custom properties, TailwindCSS, WCAG contrast, and white-label brand contexts',
  base: '/vue-multiple-themes/',

  head: [
    ['link', { rel: 'icon', href: '/vue-multiple-themes/logo.svg' }],
    ['meta', { property: 'og:title', content: 'vue-multiple-themes' }],
    ['meta', { property: 'og:description', content: 'Vue 3 multi-theme engine with TailwindCSS support, WCAG contrast tools, and white-label brand contexts' }],
    ['meta', { property: 'og:image', content: '/vue-multiple-themes/og-image.svg' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' },
      { text: 'Playground', link: '/vue-multiple-themes/playground/' },
      { text: 'Changelog', link: 'https://github.com/pooyagolchian/vue-multiple-themes/blob/main/CHANGELOG.md' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Why vue-multiple-themes?', link: '/guide/why' },
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Comparison', link: '/guide/comparison' },
        ],
      },
      {
        text: 'Guide',
        items: [
          { text: 'Themes & Presets', link: '/guide/themes' },
          { text: 'TailwindCSS Integration', link: '/guide/tailwind' },
          { text: 'White-Label / Multi-Tenant', link: '/guide/brand-context' },
          { text: 'Theme Generation', link: '/guide/generation' },
          { text: 'Color Utilities', link: '/guide/color-utils' },
          { text: 'Nuxt / SSR', link: '/guide/nuxt-ssr' },
          { text: 'Migration (v5 → v6)', link: '/guide/migration' },
        ],
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Overview', link: '/api/' },
          { text: 'useTheme()', link: '/api/use-theme' },
          { text: 'createBrandContext()', link: '/api/brand-context' },
          { text: 'Plugin', link: '/api/plugin' },
          { text: 'Color Utilities', link: '/api/color' },
          { text: 'Theme Generators', link: '/api/generators' },
          { text: 'Components', link: '/api/components' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pooyagolchian/vue-multiple-themes' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/vue-multiple-themes' },
    ],

    editLink: {
      pattern: 'https://github.com/pooyagolchian/vue-multiple-themes/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Pooya Golchian',
    },

    search: {
      provider: 'local',
    },
  },
})

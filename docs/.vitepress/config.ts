import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'vue-multiple-themes',
  description: 'Vue 2 & Vue 3 theme switcher – CSS Variables, TailwindCSS, Composable API',
  base: '/vue-multiple-themes/',

  head: [
    ['link', { rel: 'icon', href: '/vue-multiple-themes/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: 'vue-multiple-themes' }],
  ],

  themeConfig: {
    logo: { src: '/favicon.svg', width: 24, height: 24 },
    siteTitle: 'vue-multiple-themes',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' },
      { text: 'Demo', link: '/demo' },
      {
        text: 'v4.0',
        items: [
          { text: 'Changelog', link: 'https://github.com/pooyagolchian/vue-multiple-themes/blob/main/CHANGELOG.md' },
          { text: 'NPM', link: 'https://npmjs.com/package/vue-multiple-themes' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is it?',       link: '/guide/what-is-it' },
            { text: 'Getting Started',   link: '/guide/getting-started' },
            { text: 'Quick Start',       link: '/guide/quick-start' },
          ],
        },
        {
          text: 'Strategies',
          items: [
            { text: 'CSS Variables',   link: '/guide/css-variables' },
            { text: 'TailwindCSS',     link: '/guide/tailwindcss' },
            { text: 'Both (Combined)', link: '/guide/combined' },
          ],
        },
        {
          text: 'API',
          items: [
            { text: 'Composable – useTheme()',    link: '/guide/composable' },
            { text: 'Component',                  link: '/guide/component' },
            { text: 'Plugin',                     link: '/guide/plugin' },
            { text: 'Tailwind Plugin',            link: '/guide/tailwind-plugin' },
            { text: 'Preset Themes',              link: '/guide/presets' },
          ],
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Custom Icons',         link: '/guide/custom-icons' },
            { text: 'SSR / Nuxt',           link: '/guide/ssr' },
            { text: 'Vue 2 Setup',          link: '/guide/vue2' },
            { text: 'TypeScript',           link: '/guide/typescript' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview',         link: '/api/' },
            { text: 'Types',            link: '/api/types' },
            { text: 'useTheme()',       link: '/api/use-theme' },
            { text: 'Component Props', link: '/api/component' },
            { text: 'Tailwind Plugin', link: '/api/tailwind' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pooyagolchian/vue-multiple-themes' },
      { icon: 'npm',    link: 'https://npmjs.com/package/vue-multiple-themes' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Pooya Golchian',
    },

    search: { provider: 'local' },

    editLink: {
      pattern: 'https://github.com/pooyagolchian/vue-multiple-themes/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },

  vite: {
    resolve: {
      alias: {
        'vue-multiple-themes': resolve(__dirname, '../../src/index.ts'),
      },
      dedupe: ['vue'],
    },
  },
})

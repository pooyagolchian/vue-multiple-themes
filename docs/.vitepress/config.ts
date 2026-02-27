import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'

const SITE_URL = 'https://pooyagolchian.github.io/vue-multiple-themes'
const OG_IMAGE = `${SITE_URL}/og-image.png`

export default defineConfig({
  lang: 'en-US',
  title: 'vue-multiple-themes',
  description: 'Vue 2 & Vue 3 theme switcher – CSS Variables, TailwindCSS, Composable API',
  base: '/vue-multiple-themes/',

  // ── Sitemap ────────────────────────────────────────────────────────────────
  sitemap: {
    hostname: SITE_URL,
  },

  head: [
    // Favicon
    ['link', { rel: 'icon', href: '/vue-multiple-themes/logo.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'icon', href: '/vue-multiple-themes/favicon.png', type: 'image/png', sizes: '32x32' }],
    ['link', { rel: 'apple-touch-icon', href: '/vue-multiple-themes/apple-touch-icon.png' }],

    // Open Graph
    ['meta', { property: 'og:type',        content: 'website' }],
    ['meta', { property: 'og:locale',      content: 'en_US' }],
    ['meta', { property: 'og:site_name',   content: 'vue-multiple-themes' }],
    ['meta', { property: 'og:title',       content: 'vue-multiple-themes — Dynamic Theme Switching for Vue' }],
    ['meta', { property: 'og:description', content: 'Vue 2 & Vue 3 theme switcher with CSS Variables, TailwindCSS, SSR-safe, WCAG contrast, composable API.' }],
    ['meta', { property: 'og:image',       content: OG_IMAGE }],
    ['meta', { property: 'og:image:width',  content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:url',         content: SITE_URL }],

    // Twitter / X card
    ['meta', { name: 'twitter:card',        content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title',       content: 'vue-multiple-themes' }],
    ['meta', { name: 'twitter:description', content: 'Dynamic theme switching for Vue 2 & 3. CSS Variables, TailwindCSS, composable API.' }],
    ['meta', { name: 'twitter:image',       content: OG_IMAGE }],

    // Canonical / general SEO
    ['meta', { name: 'author',    content: 'Pooya Golchian' }],
    ['meta', { name: 'keywords',  content: 'vue, vue3, vue2, themes, dark mode, css variables, tailwindcss, composable, typescript' }],
    ['link', { rel: 'canonical',  href: SITE_URL }],
  ],

  themeConfig: {
    logo: { src: '/logo.svg', width: 24, height: 24 },
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

import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'

const SITE_URL = 'https://pooyagolchian.github.io/vue-multiple-themes'
const OG_IMAGE = `${SITE_URL}/og-image.png`

export default defineConfig({
  lang: 'en-US',
  title: 'vue-multiple-themes',
  description: 'Vue 2 & Vue 3 theme switcher – CSS Variables, TailwindCSS, Composable API',
  base: '/vue-multiple-themes/',

  // Disable the built-in dark/light toggle — we use our own NavThemeSwitcher
  appearance: false,

  // ── Sitemap ────────────────────────────────────────────────────────────────
  sitemap: {
    hostname: SITE_URL,
  },

  head: [
    // ── Anti-FOUC: apply stored theme before first paint ───────────────────
    // Runs synchronously before any CSS is parsed, preventing the flash of
    // the default (light) theme when the user has a different theme stored.
    ['script', {}, `(function(){try{var t=localStorage.getItem('vmt-docs-theme');if(t){var h=document.documentElement,r=[];h.setAttribute('data-theme',t);h.classList.forEach(function(c){if(c.startsWith('theme-'))r.push(c)});r.forEach(function(c){h.classList.remove(c)});h.classList.add('theme-'+t);}}catch(e){}})()`],

    // ── Google Fonts: Space Grotesk + JetBrains Mono ───────────────────────
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;1,400&display=swap' }],

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
      {
        text: 'v4.3',
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
            { text: 'Getting Started', link: '/guide/getting-started' },
          ],
        },
        {
          text: 'Strategies',
          items: [
            { text: 'CSS Variables', link: '/guide/css-variables' },
            { text: 'TailwindCSS',   link: '/guide/tailwindcss' },
          ],
        },
        {
          text: 'API',
          items: [
            { text: 'Composable – useTheme()', link: '/guide/composable' },
            { text: 'Preset Themes',           link: '/guide/presets' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/' },
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

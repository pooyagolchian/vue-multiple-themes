---
layout: home

hero:
  name: 'vue-multiple-themes'
  text: 'Real Multi-Theme System for Vue'
  tagline: Vue 2 & 3 · TypeScript · CSS Variables · TailwindCSS · Lucide Icons
  image:
    src: /hero.svg
    alt: vue-multiple-themes
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/pooyagolchian/vue-multiple-themes

features:
  - icon: 🎨
    title: Real Multiple Themes
    details: Not just dark/light – define unlimited custom themes (Ocean, Forest, Sunset, Winter…) with a full semantic colour token system.
  - icon: ✨
    title: Two Strategies
    details: Use CSS custom properties (`data-theme` attribute) or Tailwind CSS classes (`theme-<name>`) – or both simultaneously for maximum flexibility.
  - icon: 🔩
    title: Composable API
    details: '`useTheme()` gives you reactive access to the current theme, typed colour tokens, and navigation helpers (next, prev, toggle).'
  - icon: 🦄
    title: Vue 2 & Vue 3
    details: Powered by `vue-demi` for seamless support across both major Vue versions with zero API differences.
  - icon: 📦
    title: Tree-Shakeable
    details: Import only what you need. ESM-first, fully typed, SSR-safe.
  - icon: 🖼️
    title: Lucide Icons
    details: Built-in Lucide SVG icons (sun, moon, coffee, leaf…) with `currentColor` rendering – icon colours follow your theme automatically.
---

<LiveDemo />
<ColorGrid />

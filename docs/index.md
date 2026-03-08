---
layout: home

hero:
  name: vue-multiple-themes
  text: Multi-Theme Engine for Vue 3
  tagline: CSS custom properties, TailwindCSS opacity modifiers, WCAG contrast, white-label brand contexts — zero dependencies.
  image:
    src: /logo.svg
    alt: vue-multiple-themes logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/pooyagolchian/vue-multiple-themes

features:
  - icon: 🎨
    title: Multiple Themes
    details: Ship 7 preset themes or generate unlimited custom themes from a single brand color. Light, dark, sepia, ocean, forest, sunset, winter — all included.
  - icon: 🌊
    title: TailwindCSS v3 & v4
    details: First-class Tailwind plugin with full opacity modifier support. Use bg-vmt-primary/50 out of the box.
  - icon: ♿
    title: WCAG Contrast
    details: Built-in luminance, contrast ratio, and auto-contrast utilities. Generate themes that automatically pass WCAG AA.
  - icon: 🏢
    title: White-Label Ready
    details: createBrandContext() isolates theme state per namespace — perfect for multi-tenant, micro-frontend, and embeddable widget architectures.
  - icon: ⚡
    title: Zero Dependencies
    details: Only vue@^3.5 as a peer dependency. Tree-shakeable utilities keep your bundle small.
  - icon: 🔧
    title: Composable API
    details: useTheme() returns reactive state with auto-unwrapping — current theme, isDark, resolvedColors, setTheme, toggleTheme, and more.
---

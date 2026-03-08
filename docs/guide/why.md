# Why vue-multiple-themes?

Most Vue theming solutions only handle light/dark toggling. **vue-multiple-themes** is a complete multi-theme engine designed for production applications that need:

## The Problem

- **Design systems** require multiple brand themes, not just light/dark
- **White-label SaaS** products serve multiple brands from one codebase
- **Accessibility** demands WCAG-compliant contrast ratios — not just "looks dark enough"
- **TailwindCSS** needs RGB channel variables for opacity modifiers (`bg-primary/50`)
- **Theme persistence** across sessions, with OS preference respect

## The Solution

`vue-multiple-themes` solves all of these with a single, zero-dependency package:

| Capability | How |
|---|---|
| **Multi-theme** | Define unlimited themes with 17+ semantic color tokens |
| **TailwindCSS v3 & v4** | Dedicated plugins with full `bg-vmt-primary/50` opacity support |
| **WCAG compliance** | Built-in `contrastRatio()`, `autoContrast()`, `ensureContrast()` |
| **White-label** | `createBrandContext()` isolates theme state per namespace |
| **Persistence** | localStorage / sessionStorage with OS preference detection |
| **Generator** | `generateThemePair('#brand-color')` → WCAG-compliant light+dark pair |
| **SSR-safe** | All utilities work server-side; DOM access is guarded |
| **Tree-shakeable** | Import only what you need — 20+ individually exported utilities |

## Who Uses It?

vue-multiple-themes is designed for:

- **Enterprise applications** with complex theming requirements
- **Design systems** that need semantic color tokens
- **White-label SaaS platforms** serving multiple brands
- **Micro-frontends** where multiple theme engines coexist
- Any Vue 3 project that wants more than just light/dark mode

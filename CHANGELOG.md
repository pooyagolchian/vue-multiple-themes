# Changelog

## 7.0.0

### New Features 🚀

- **Full test suite** — 116 tests across 5 test files covering color utilities, CSS injection, DOM strategies, theme generation, and brand context (Vitest + happy-dom).
- **VitePress documentation site** — complete docs with Getting Started, API Reference, TailwindCSS Integration, White-Label Guide, Theme Generation, Color Utilities, Nuxt/SSR, Migration Guide, and Comparison pages.
- **`llms.txt`** — structured API documentation following the [llmstxt.org](https://llmstxt.org) specification for AI/LLM discoverability.
- **`nuxt-multiple-themes` module** — Nuxt 3 module with auto-imports (`useTheme`, `createBrandContext`, `PRESET_THEMES`, generators), FOUC prevention, and runtime config integration.
- **Comparison table** — feature matrix comparing vue-multiple-themes vs @vueuse/core vs nuxt-color-mode in README and docs.
- **Enhanced npm metadata** — 11 new keywords (accessibility, a11y, vite, multi-tenant, etc.), GitHub Sponsors funding field, npm download badge.

### Improvements ✨

- **README** — added download/TypeScript/Vue/Tailwind/zero-deps/tests badges, comparison table, docs links, llms.txt mention.
- **package.json** — new scripts: `test`, `test:watch`, `test:coverage`, `typecheck`, `docs:dev`, `docs:build`, `docs:preview`.
- **Workspace** — added `packages/*` to pnpm-workspace.yaml for the Nuxt module.

---

## 6.0.2

### Patch Changes 🩹

- **Icons:** Strip remaining SVG path data from `src/icons/index.ts` — `LUCIDE_ICONS`, `getIcon`, and `iconToSvg` are now no-op deprecated stubs. Bundle reduced by ~2.7 kB.
- **Playground:** Rebuilt with updated icon demo (`IconsDemo.vue`) using real `lucide-vue-next` components.
- **GitHub Pages:** Force-redeploy to pick up all v6 playground changes.

---

## 6.0.1

### Patch Changes 🩹

- Fix: npm publish — bump patch version to resolve E403 conflict with previously published 6.0.0 artefact.

---

## 6.0.0

### Breaking Changes 💥

- **Icon API** — `ThemeDefinition.icon` is now `Component` (Vue component reference) instead of `string`. `VmtIcon` now uses `:as="ComponentRef"` prop instead of `:name="string"`. No icon bundles are included — bring your own library (e.g. `lucide-vue-next`, `@heroicons/vue`).
- **No Lucide dependency** — the library ships zero icon data. Assign icon components directly to theme definitions.

### New Features 🚀

- **`createBrandContext()`** — factory for isolated, namespaced theme engines. Each context gets its own `<style>` tag, reactive singleton, provide key, and Tailwind color namespace. Ideal for white-label apps, micro-frontends, and embeddable widgets.
- **`namespace` option in `ThemeOptions`** — pass `namespace` to `useTheme()` or `VueMultipleThemesPlugin` to isolate singleton state and style injection.
- **Tailwind plugin namespace** — `createVmtPlugin({ namespace: 'acme' })` generates `bg-acme-primary`, `text-acme-foreground`, etc., instead of the default `vmt-` prefix.
- **`BrandContextDemo.vue`** — playground demo showcasing side-by-side isolated brand contexts.
- **SVG assets** — `playground/public/favicon.svg`, `docs/public/logo.svg`, `docs/public/og-image.svg` added.

### Refactors 🔧

- `VmtIcon.vue` rewritten as a pure forwarder component (`as: Component`).
- `src/icons/index.ts` now exports only deprecated stub types; all Lucide imports removed.
- `src/utils/css-injector.ts` namespaced: `injectStyles(css, ns)`, `removeStyles(ns)`, `getStyleId(ns)`.
- `src/composables/useTheme.ts` singleton key namespaced: `vmt:singleton:<ns>:<storageKey>`.
- `src/plugin.ts` provide key namespaced: `vmt:options:<ns>`.
- `src/utils/generate-theme.ts` — `icon` field type changed from `string` to `Component`.

---

## 5.0.2

### Patch Changes 🩹

- **Fix**: Resolved build failure in `VmtIcon.vue` by removing the lingering `vue-demi` reference.
- **DX**: Refactored `VmtIcon.vue` to `<script setup>` for better type inference and consistency.

## 5.0.1

### Patch Changes 🩹

- **Post-Release Cleanup**: Removed remaining `vue-demi` and Vue 2 peer dependencies to strictly follow the Vue 3 modernization goal.
- **Documentation**: Synchronized code examples in README with the v5 API and updated project descriptions.

## 5.0.0

### Breaking Changes 💥

- **Vue 3 Only**: Dropped support for Vue 2 and removed `vue-demi`. The library is now strictly optimized for Vue 3 environments.
- **Dependencies**: Upgraded to **Vite 6** and **Vue 3.5**.
- **TypeScript**: Minimum TypeScript version bumped to 5.x.

### Refactor & UX 🛠️

- **Modern Syntax**: Refactored all components and composables to use `<script setup>` and modern Vue 3 APIs (`defineProps`, `defineEmits`, `ref`, `computed`).
- **Visual Refresh**: Complete brand refresh with a cinematic black-and-white aesthetic across the entire documentation and playground.
- **Improved Types**: Enhanced TypeScript definitions for better developer experience and strictly typed theme configurations.
- **Assets**: Replaced all legacy SVG icons/banners with refined high-end monochrome PNG assets (favicon, logo, social banner).

### Docs 📄

- **Rewrite**: Major documentation overhaul to reflect the Vue 3 focus and new visual identity.
- **Guides**: Added cinematic monochrome illustrations to all documentation guides.

## 4.3.0

### Patch / Docs Changes

- **Nav**: Removed theme-switcher pills from the header entirely — nav bar is now clean with Guide, API, version, GitHub and npm links only.
- **Nav**: Theme switcher no longer appears in the mobile hamburger menu.
- **Nav**: Added spacing between nav bar items (padding, gap).
- **Theming**: VitePress `--vp-c-*` colour vars now fully bridge to `--vmt-*` tokens — selecting a preset theme changes the entire docs page background, text, borders and brand colour.
- **Buttons**: Fixed "View on GitHub" (alt) button showing invisible text — bridged `--vp-c-default-*` to surface tokens and added explicit `background`/`color` rules.
- **Typography**: Space Grotesk font now applied to all `<button>`, `<input>`, `<select>`, `<textarea>` elements.
- **Docs config**: Nav version badge updated to `v4.3`.

## 4.2.0

### Minor Changes

- **Docs redesign**: All demo components (`LiveDemo`, `ColorGrid`, `ThemeDemo`) rebuilt with Lucide Vue Next icons, Space Grotesk + JetBrains Mono fonts, and a modern black-and-white VitePress theme.
- **Bug fix**: Active theme button no longer stays locked after clicking — root cause was destructuring `current`/`theme` getters from `useTheme()`, which captured a one-time snapshot instead of a tracked reactive dependency. Components now access state via `ts.current` / `ts.theme` on the return object.
- **Bug fix**: Demo component shells no longer inherit the active theme's colors (e.g. full dark-green page when Forest theme was selected). Shell backgrounds now use `--vp-c-*` VitePress variables, isolating the docs chrome from `--vmt-*` CSS vars.
- **DX**: Added `dev:all` script to run playground and docs simultaneously in parallel (`pnpm run --parallel --filter=playground --filter=docs dev`).
- **Docs**: New _Running Locally_ section in Getting Started guide with all `pnpm dev`, `pnpm docs:dev`, `pnpm dev:all`, and `pnpm test` commands.

## 4.1.0

### Minor Changes

- Replaced `v-html` icon rendering with proper Vue `VmtIcon` component using render functions. Added `#icon` slot to `VueMultipleThemes` for custom icon rendering. Exported `VmtIcon` as a standalone component. Removed all legacy v2/v3 files (`vue-multiple-themes.vue`, `entry.js`, `build/`, `dev/`, `babel.config.js`, `publish.sh`).

## [4.0.0] — Unreleased

### Breaking Changes

- Complete rewrite in TypeScript with full type definitions
- Package requires Vue 2.7+ or Vue 3.x (drops Vue 2.0–2.6 support)
- New unified API via `vue-demi`; old `themeColorList` / `themeIcons` props removed
- CSS variable prefix changed from `--app-*` to `--vmt-*`
- `strategy` prop replaces `[theme]` attribute — now `data-theme` by default

### New Features

- **Vue 2.7+ and Vue 3** dual-compatibility via `vue-demi`
- **`useTheme()` composable** for Composition API usage
- **7 built-in preset themes**: light, dark, sepia, ocean, forest, sunset, winter
- **TailwindCSS plugin** (`vue-multiple-themes/tailwind`) with `bg-vmt-*`, `text-vmt-*` utilities
- **15 Lucide SVG icons** with `currentColor` stroke support
- **pnpm monorepo** with `playground/` (Vue 3 dev sandbox) and `docs/` (VitePress)
- **GitHub Actions** for CI, GitHub Pages docs deploy, and npm publishing
- Full SSR-safety, storage persistence, system preference detection
- Custom theme definitions with typed `ThemeColors` interface

### Changed

- Build system migrated from Rollup + Babel → Vite 5 + vite-plugin-dts
- Package manager from npm → pnpm 9

---

### Changelog

#### Version 3.0.0

- Refactored codebase for enhanced maintainability and readability.
- Revised and updated the README document to improve clarity and provide more comprehensive guidance.
- Addressed and resolved various bugs to ensure smoother operation.

#### Version 2.0.0

- Conducted extensive code updates to incorporate new features and optimizations.
- Resolved previously identified bugs to enhance the overall functionality.
- Discontinued the use of font icons in favor of improved code quality and efficiency.

#### Version 1.5.1

- Corrected the icon path to ensure accurate rendering.
- Implemented GitHub Actions for automated workflows and processes.
- Made stylistic adjustments to address and fix layout issues.

#### Version 1.0.8

- Introduced font icon support for enhanced visual elements.
- Fixed a bug that occurred after routing changes when the component is mounted.
- Established a persistent array to hold three constant color values for theme management.
- Added new properties to allow for custom styling configurations.

#### Version 1.0.1

- Expanded the documentation to provide users with detailed guidance on using the software.
- Included a license file to clarify the terms under which the software is distributed.

The revisions across these versions reflect continuous improvements in functionality, usability, and code quality, aligning with user feedback and technological advancements.

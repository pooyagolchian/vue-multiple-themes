# Changelog

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

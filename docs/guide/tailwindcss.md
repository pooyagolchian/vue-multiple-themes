# TailwindCSS Strategy

<img src="/guide-tailwindcss.png" alt="TailwindCSS Strategy" style="width:100%;border-radius:12px;margin:1.5rem 0 2rem;display:block;" />

## Overview

When `strategy: 'class'` (or `'both'`) is set, the library adds a class
`theme-<name>` to the target element.  
Pair this with the included **Tailwind plugin** to generate typed utility classes
like `bg-vmt-background`, `text-vmt-primary`, `border-vmt-border`.

## Setup

### 1. Configure the Tailwind plugin

```ts
// tailwind.config.ts
import { vmtTailwindPlugin } from 'vue-multiple-themes/tailwind';
import { PRESET_THEMES } from 'vue-multiple-themes';

export default {
  content: ['./src/**/*.{vue,ts,tsx,html}'],

  // Enable class-based dark mode that matches our theme-dark class
  darkMode: ['class', '.theme-dark'],

  plugins: [
    vmtTailwindPlugin({
      themes: PRESET_THEMES,
      strategy: 'both', // generate [data-theme] AND .theme- selectors
      generateUtils: true, // bg-vmt-*, text-vmt-*, border-vmt-* etc.
    }),
  ],
};
```

### 2. Use the utility classes

```html
<div
  class="bg-vmt-surface text-vmt-text border border-vmt-border rounded-xl p-4"
>
  <h2 class="text-vmt-primary font-bold">Hello theme!</h2>
  <p class="text-vmt-text-muted">Muted description text</p>
  <button class="bg-vmt-primary text-vmt-text-inverse px-4 py-2 rounded-lg">
    Click me
  </button>
</div>
```

### 3. Enable the theme strategy in your app

```ts
createApp(App).use(VueMultipleThemesPlugin, {
  themes: PRESET_THEMES,
  strategy: 'class', // or 'both'
});
```

## Generated utilities

The plugin generates the following utility groups for every colour token:

| Prefix               | CSS property       |
| -------------------- | ------------------ |
| `bg-vmt-<token>`     | `background-color` |
| `text-vmt-<token>`   | `color`            |
| `border-vmt-<token>` | `border-color`     |
| `ring-vmt-<token>`   | `--tw-ring-color`  |
| `fill-vmt-<token>`   | `fill` (SVG)       |
| `stroke-vmt-<token>` | `stroke` (SVG)     |

All utilities use CSS variable references so they automatically update when the
theme changes, without Tailwind generating separate colour values.

## Dark mode with Tailwind

Add `.theme-dark` as a dark mode selector so Tailwind's `dark:` variants work:

```ts
// tailwind.config.ts
darkMode: ['class', '.theme-dark'],
```

Now you can use `dark:` variants alongside the vmt utilities:

```html
<div class="bg-vmt-surface dark:ring-2 dark:ring-vmt-primary">
  Automatically rings in dark theme
</div>
```

## Custom prefix

```ts
vmtTailwindPlugin({
  themes,
  cssVarPrefix: '--my-theme-',
  generateUtils: true,
});
// → .bg-vmt-primary will use var(--my-theme-primary)
```

> **Note:** If you change the prefix here, also pass the same `cssVarPrefix`
> to `useTheme()` / the plugin so the injected CSS matches.

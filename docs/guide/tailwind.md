# TailwindCSS Integration

vue-multiple-themes provides dedicated plugins for both TailwindCSS v3 and v4 with **full opacity modifier support**.

## Why a Dedicated Plugin?

Tailwind's opacity modifiers (`bg-primary/50`) require CSS variables in RGB channel format (`59 130 246`), not regular color values. vue-multiple-themes automatically generates both formats:

```css
/* Generated automatically */
:root[data-theme="light"] {
  --vmt-primary: 59 130 246;           /* RGB channels for Tailwind */
  --vmt-primary-color: rgb(59 130 246); /* Full color for direct CSS use */
}
```

## Tailwind v3

### 1. Configure the plugin

```js
// tailwind.config.js
const vmtPlugin = require('vue-multiple-themes/tailwind')

module.exports = {
  plugins: [
    vmtPlugin({
      themes: require('./src/themes').default,
      cssVarPrefix: '--vmt-',
    }),
  ],
}
```

### 2. Use in templates

```html
<div class="bg-vmt-background text-vmt-text">
  <button class="bg-vmt-primary/90 hover:bg-vmt-primary text-vmt-text-inverse">
    Click me
  </button>
  <p class="text-vmt-text-muted border-vmt-border/50">
    Muted text with semi-transparent border
  </p>
</div>
```

## Tailwind v4

```js
// tailwind.config.js (v4)
import vmtPlugin from 'vue-multiple-themes/tailwind-v4'

export default {
  plugins: [
    vmtPlugin({
      themes: myThemes,
      cssVarPrefix: '--vmt-',
    }),
  ],
}
```

## Available Utility Classes

All semantic tokens are available as Tailwind utilities:

| CSS Variable | Tailwind Class | With Opacity |
|---|---|---|
| `--vmt-primary` | `bg-vmt-primary` | `bg-vmt-primary/50` |
| `--vmt-background` | `bg-vmt-background` | `bg-vmt-background/80` |
| `--vmt-text` | `text-vmt-text` | `text-vmt-text/70` |
| `--vmt-border` | `border-vmt-border` | `border-vmt-border/30` |
| `--vmt-surface` | `bg-vmt-surface` | `bg-vmt-surface/90` |
| `--vmt-ring` | `ring-vmt-ring` | `ring-vmt-ring/50` |

Custom tokens in your themes are also automatically available.

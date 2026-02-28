# CSS Variables Strategy

<img src="/guide-css-variables.svg" alt="CSS Variables Strategy" style="width:100%;border-radius:12px;margin:1.5rem 0 2rem;display:block;" />

When you use `strategy: 'attribute'` (or `'both'`), the library:

1. Injects a `<style>` tag into `<head>` with all theme declarations.
2. Sets `data-theme="<name>"` on the target element (default: `<html>`).

## What gets injected

For a theme named `ocean` with `{ primary: '#0ea5e9', background: '#0c1a2e' }`:

```css
/* :root defaults (first theme) */
:root {
  --vmt-primary: #3b82f6;
  --vmt-background: #ffffff;
  /* … */
}

/* Per-theme overrides */
:root[data-theme='ocean'],
[data-theme='ocean'] {
  --vmt-primary: #0ea5e9;
  --vmt-background: #0c1a2e;
  /* … */
}
```

All token names are the camelCase key names from `ThemeColors`, converted to kebab-case:

- `primaryDark` → `--vmt-primary-dark`
- `textMuted` → `--vmt-text-muted`
- `surfaceElevated` → `--vmt-surface-elevated`

## Available tokens

| Token              | CSS Variable             |
| ------------------ | ------------------------ |
| `primary`          | `--vmt-primary`          |
| `primaryLight`     | `--vmt-primary-light`    |
| `primaryDark`      | `--vmt-primary-dark`     |
| `secondary`        | `--vmt-secondary`        |
| `accent`           | `--vmt-accent`           |
| `background`       | `--vmt-background`       |
| `surface`          | `--vmt-surface`          |
| `surfaceElevated`  | `--vmt-surface-elevated` |
| `text`             | `--vmt-text`             |
| `textMuted`        | `--vmt-text-muted`       |
| `textInverse`      | `--vmt-text-inverse`     |
| `border`           | `--vmt-border`           |
| `ring`             | `--vmt-ring`             |
| `success`          | `--vmt-success`          |
| `warning`          | `--vmt-warning`          |
| `error`            | `--vmt-error`            |
| `info`             | `--vmt-info`             |
| _(any custom key)_ | `--vmt-<kebab-key>`      |

## Changing the prefix

```ts
useTheme({
  themes,
  cssVarPrefix: '--my-', // → --my-primary, --my-background …
});
```

## Changing the attribute

```ts
useTheme({
  themes,
  attribute: 'data-color-scheme', // → <html data-color-scheme="dark">
});
```

## Custom target element

```ts
useTheme({
  themes,
  target: '#app', // scope theme to #app instead of <html>
});
```

## Disable auto-injection

Set `injectCssVars: false` if you manage the CSS yourself (e.g. in a separate `.css` file):

```ts
useTheme({ themes, injectCssVars: false });
```

Then generate the CSS using the exported helper:

```ts
import { buildCssVars } from 'vue-multiple-themes';

const css = buildCssVars(themes, {
  cssVarPrefix: '--vmt-',
  strategy: 'attribute',
});
// write css to a .css file at build time
```

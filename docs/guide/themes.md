# Themes & Presets

## Preset Themes

vue-multiple-themes ships with 7 ready-to-use themes:

```ts
import { PRESET_THEMES } from 'vue-multiple-themes'
// Includes: light, dark, sepia, ocean, forest, sunset, winter
```

Each preset defines 17 semantic color tokens:

| Token | Purpose |
|---|---|
| `primary` | Brand/accent color |
| `primaryLight` | Lighter variant |
| `primaryDark` | Darker variant |
| `secondary` | Secondary brand color |
| `accent` | Accent/highlight |
| `background` | Page background |
| `surface` | Card/container background |
| `surfaceElevated` | Elevated surface (modals, dropdowns) |
| `text` | Primary text |
| `textMuted` | Secondary/muted text |
| `textInverse` | Text on primary-colored backgrounds |
| `border` | Border/divider color |
| `ring` | Focus ring color |
| `success` | Success state |
| `warning` | Warning state |
| `error` | Error state |
| `info` | Informational state |

## Custom Themes

Define your own themes:

```ts
import type { ThemeDefinition } from 'vue-multiple-themes'

const myTheme: ThemeDefinition = {
  name: 'corporate',
  label: 'Corporate',
  colors: {
    primary: '#1a56db',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    textMuted: '#6b7280',
    textInverse: '#ffffff',
    border: '#e5e7eb',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    info: '#2563eb',
  },
}
```

You can also add custom tokens:

```ts
const theme: ThemeDefinition = {
  name: 'custom',
  label: 'Custom',
  colors: {
    primary: '#7c3aed',
    // ... standard tokens
    sidebar: '#1e1b4b',        // custom token
    headerGradient: '#4c1d95', // custom token
  },
}
```

Custom tokens generate CSS variables automatically: `--vmt-sidebar`, `--vmt-header-gradient`.

## DOM Strategies

Control how themes are applied to the DOM:

```ts
useTheme({
  themes: PRESET_THEMES,
  strategy: 'attribute', // Sets data-theme="light" (default)
  // strategy: 'class',  // Adds .theme-light class
  // strategy: 'both',   // Both attribute + class
})
```

## Storage & Persistence

```ts
useTheme({
  themes: PRESET_THEMES,
  storage: 'localStorage',    // default — persists across sessions
  // storage: 'sessionStorage', // persists for tab lifetime
  // storage: 'none',           // no persistence
  storageKey: 'my-app-theme',  // custom storage key
})
```

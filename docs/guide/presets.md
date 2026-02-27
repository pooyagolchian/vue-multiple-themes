# Preset Themes

`vue-multiple-themes` ships with **7 ready-to-use preset themes**:

<ColorGrid />

## Usage

```ts
import {
  PRESET_THEMES,
  lightTheme,
  darkTheme,
  oceanTheme,
} from 'vue-multiple-themes';

// Use all presets
useTheme({ themes: PRESET_THEMES });

// Pick a subset
useTheme({ themes: [lightTheme, darkTheme] });
```

## Available presets

| Name     | Label  | Icon      | Description                    |
| -------- | ------ | --------- | ------------------------------ |
| `light`  | Light  | sun       | Clean white with blue accents  |
| `dark`   | Dark   | moon      | Deep navy with soft blue tones |
| `sepia`  | Sepia  | coffee    | Warm paper-like reading mode   |
| `ocean`  | Ocean  | droplets  | Deep ocean with cyan accents   |
| `forest` | Forest | leaf      | Dark forest green              |
| `sunset` | Sunset | flame     | Warm amber-orange palette      |
| `winter` | Winter | snowflake | Cool indigo-purple night sky   |

## Extending presets

```ts
import { PRESET_THEMES } from 'vue-multiple-themes';
import type { ThemeDefinition } from 'vue-multiple-themes';

const myTheme: ThemeDefinition = {
  name: 'rose',
  label: 'Rose',
  icon: 'star',
  colors: {
    primary: '#f43f5e',
    background: '#fff1f2',
    surface: '#ffe4e6',
    text: '#1c0b0e',
    textMuted: '#9f1239',
    textInverse: '#fff1f2',
    border: '#fda4af',
    ring: '#f43f5e',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    // ──── any custom tokens ────
    heroBanner: '#fda4af',
  },
};

useTheme({ themes: [...PRESET_THEMES, myTheme] });
```

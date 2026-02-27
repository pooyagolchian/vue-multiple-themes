# API Reference

## Exports

```ts
// Core
export { VueMultipleThemes } from 'vue-multiple-themes';
export { VueMultipleThemesPlugin } from 'vue-multiple-themes';
export { useTheme } from 'vue-multiple-themes';

// Preset themes
export { PRESET_THEMES } from 'vue-multiple-themes';
export {
  lightTheme,
  darkTheme,
  sepiaTheme,
  oceanTheme,
  forestTheme,
  sunsetTheme,
  winterTheme,
};

// Utilities (tree-shakeable)
export { buildCssVars, injectStyles, removeStyles } from 'vue-multiple-themes';
export { LUCIDE_ICONS, getIcon, iconToSvg } from 'vue-multiple-themes';

// Tailwind plugin (separate entry point)
export {
  vmtTailwindPlugin,
  createVmtPlugin,
} from 'vue-multiple-themes/tailwind';

// Types
export type {
  ThemeColors,
  ThemeDefinition,
  ThemeStrategy,
  ThemeTarget,
  ThemeOptions,
  UseThemeReturn,
  VueMultipleThemesProps,
  TailwindPluginOptions,
} from 'vue-multiple-themes';
```

## `ThemeOptions`

| Option                    | Type                                           | Default          | Description                                |
| ------------------------- | ---------------------------------------------- | ---------------- | ------------------------------------------ |
| `themes`                  | `ThemeDefinition[]`                            | _(required)_     | All available themes                       |
| `defaultTheme`            | `string`                                       | first theme      | Name to activate on first render           |
| `strategy`                | `'attribute' \| 'class' \| 'both'`             | `'attribute'`    | How to stamp the theme on the DOM          |
| `attribute`               | `string`                                       | `'data-theme'`   | Attribute name for `'attribute'` strategy  |
| `classPrefix`             | `string`                                       | `'theme-'`       | Class prefix for `'class'` strategy        |
| `target`                  | `string`                                       | `'html'`         | DOM element to receive the attribute/class |
| `injectCssVars`           | `boolean`                                      | `true`           | Auto-inject CSS vars into `<head>`         |
| `cssVarPrefix`            | `string`                                       | `'--vmt-'`       | Prefix for generated CSS variables         |
| `storage`                 | `'localStorage' \| 'sessionStorage' \| 'none'` | `'localStorage'` | Persistence layer                          |
| `storageKey`              | `string`                                       | `'vmt-theme'`    | Storage key                                |
| `respectSystemPreference` | `boolean`                                      | `false`          | Auto-select dark/light from OS             |
| `onChange`                | `(theme: ThemeDefinition) => void`             | —                | Callback on theme change                   |

## `ThemeDefinition`

| Field          | Type          | Required | Description                           |
| -------------- | ------------- | -------- | ------------------------------------- |
| `name`         | `string`      | ✓        | Unique slug (`data-theme` value)      |
| `label`        | `string`      | —        | Human-readable display name           |
| `icon`         | `string`      | —        | Lucide icon name for built-in toggle  |
| `colors`       | `ThemeColors` | ✓        | Colour token map                      |
| `extraClasses` | `string[]`    | —        | Extra classes added to target element |

## `<VueMultipleThemes>` Props

| Prop                      | Type                | Default          | Description               |
| ------------------------- | ------------------- | ---------------- | ------------------------- |
| `themes`                  | `ThemeDefinition[]` | built-in 3       | Theme list                |
| `defaultTheme`            | `string`            | —                | Initial theme             |
| `strategy`                | `ThemeStrategy`     | `'attribute'`    | DOM strategy              |
| `attribute`               | `string`            | `'data-theme'`   | Attribute name            |
| `classPrefix`             | `string`            | `'theme-'`       | Class prefix              |
| `target`                  | `string`            | `'html'`         | DOM target                |
| `injectCssVars`           | `boolean`           | `true`           | Inject CSS                |
| `cssVarPrefix`            | `string`            | `'--vmt-'`       | CSS var prefix            |
| `storage`                 | `string`            | `'localStorage'` | Storage type              |
| `storageKey`              | `string`            | `'vmt-theme'`    | Storage key               |
| `respectSystemPreference` | `boolean`           | `false`          | OS preference             |
| `showToggle`              | `boolean`           | `true`           | Show toggle button        |
| `showLabel`               | `boolean`           | `false`          | Show label alongside icon |
| `iconSize`                | `number`            | `20`             | Icon size in px           |
| `extraClass`              | `string`            | `''`             | CSS class on root wrapper |

### Emits

| Event    | Payload           | Description                 |
| -------- | ----------------- | --------------------------- |
| `change` | `ThemeDefinition` | Emitted after theme changes |

### Slots

| Slot      | Props                                                                    | Description               |
| --------- | ------------------------------------------------------------------------ | ------------------------- |
| `default` | `{ theme, themes, setTheme, nextTheme, prevTheme, toggleTheme, isDark }` | Replace the toggle button |
| `picker`  | `{ themes, current, setTheme }`                                          | Add a full theme picker   |

/**
 * Shared icon-map and helper used by all docs demo components.
 * Keeps the Lucide imports and ICON_MAP in one place.
 */
import {
  Coffee,
  Moon,
  Palette,
  Snowflake,
  Sun,
  Sunset,
  TreePine,
  Waves,
} from 'lucide-vue-next'
import type { ThemeDefinition } from 'vue-multiple-themes'

const ICON_MAP: Record<string, unknown> = {
  sun:       Sun,
  moon:      Moon,
  coffee:    Coffee,
  droplets:  Waves,
  leaf:      TreePine,
  flame:     Sunset,
  snowflake: Snowflake,
}

/** Return the Lucide component matching the theme's `icon` field. */
export function iconFor(t: ThemeDefinition) {
  return ICON_MAP[t.icon ?? ''] ?? Palette
}

/** Shared `useTheme` options used by all docs-level components. */
export const DOCS_THEME_OPTIONS = {
  storageKey:  'vmt-docs-theme',
  defaultTheme: 'light',
  strategy:    'both',
  attribute:   'data-theme',
  classPrefix: 'theme-',
  cssVarPrefix: '--vmt-',
  target:      'html',
} as const

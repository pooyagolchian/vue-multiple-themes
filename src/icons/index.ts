/**
 * @deprecated The built-in icon registry has been removed in v6.
 *
 * Import icon components directly from `lucide-vue-next` or any Vue icon
 * library and pass them via `<VmtIcon :as="IconComponent" />` or
 * `ThemeDefinition.icon`.
 *
 * @module
 */

/**
 * @deprecated No icon data is shipped by vue-multiple-themes.
 * Import icon components directly from lucide-vue-next or any Vue icon library
 * and pass them to <VmtIcon :as="IconComponent" /> or ThemeDefinition.icon.
 */
export const LUCIDE_ICONS: Record<string, never> = {}

/** @deprecated See LUCIDE_ICONS. */
export interface LucideIconData {
  path: string
  extra?: string
}

/** @deprecated See LUCIDE_ICONS. */
export function getIcon(_name: string): undefined {
  return undefined
}

/**
 * @deprecated The built-in SVG path registry has been removed.
 * Returns an empty string. Replace with your icon library.
 */
export function iconToSvg(_name: string, _size?: number, _color?: string, _strokeWidth?: number): string {
  return ''
}

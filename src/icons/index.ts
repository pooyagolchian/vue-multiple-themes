/**
 * Hand-picked Lucide icon SVG path data.
 * All paths use `currentColor` so they inherit --vmt-icon-color.
 * viewBox is always "0 0 24 24".
 */

export interface LucideIconData {
  /** SVG <path> `d` attribute */
  path: string
  /** Additional SVG attributes (optional, e.g. circles) */
  extra?: string
}

export const LUCIDE_ICONS: Record<string, LucideIconData> = {
  sun: {
    path: 'M12 3V4M12 20V21M4 12H3M6.31 6.31L5.5 5.5M17.69 6.31L18.5 5.5M6.31 17.69L5.5 18.5M17.69 17.69L18.5 18.5M21 12H20M16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12Z',
  },
  moon: {
    path: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z',
  },
  sunset: {
    path: 'M17 18H17.01M3 18H5M19 18H21M12 2V4M4.22 10.22L5.64 11.64M18.36 11.64L19.78 10.22M12 6C9.24 6 7 8.24 7 11V18H17V11C17 8.24 14.76 6 12 6Z',
  },
  sunrise: {
    path: 'M17 18H17.01M3 18H5M19 18H21M12 2V4M4.22 10.22L5.64 11.64M18.36 11.64L19.78 10.22M12 10C10.34 10 9 11.34 9 13V18H15V13C15 11.34 13.66 10 12 10Z',
  },
  monitor: {
    path: 'M20 3H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h3l-1 4h6l-1-4h3a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z',
  },
  laptop: {
    path: 'M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9M14 2H10M2 20h20',
  },
  coffee: {
    path: 'M18 8H19a2 2 0 0 1 0 4H18M2 8H18V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8ZM6 2V5M10 2V5M14 2V5',
  },
  leaf: {
    path: 'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2C19 10 14 12 12.2 12.6A5.49 5.49 0 0 1 2 12C2 12 4 10 9 11.2M4 20C2 18 2 14 4 12',
  },
  droplets: {
    path: 'M7 16.3C5 14.3 5 11 7 9L12 3L17 9C19 11 19 14.3 17 16.3C15 18.3 12 18.3 10 17L7 16.3ZM5 20H19',
  },
  flame: {
    path: 'M8.5 14.5A2.5 2.5 0 0 0 11 12C11 9 7 7.5 7 7.5C7 7.5 5 11 5 13C5 15.76 7.24 18 10 18C13 18 14.5 15.24 14.5 13C14.5 10.76 12 7 12 7C12 7 8.5 9 8.5 14.5ZM12 22C16.97 22 21 17.97 21 13C21 8 15 2 15 2C15 2 14 9 11 9C8 9 7 2 7 2C7 2 3 8 3 13C3 17.97 7.03 22 12 22Z',
  },
  snowflake: {
    path: 'M2 12H22M12 2V22M20 16L4 8M4 16L20 8M17.66 6.34L6.34 17.66M6.34 6.34L17.66 17.66',
  },
  palette: {
    path: 'M12 2C6.48 2 2 6.48 2 12C2 15.31 3.7 18.23 6.24 20.1L6.17 20.17C5.53 20.55 5 21.22 5 22C5 22 8 21 12 21C16 21 19 22 19 22C19 21.22 18.47 20.55 17.83 20.17L17.76 20.1C20.3 18.23 22 15.31 22 12C22 6.48 17.52 2 12 2ZM8 13C7.45 13 7 12.55 7 12C7 11.45 7.45 11 8 11C8.55 11 9 11.45 9 12C9 12.55 8.55 13 8 13ZM12 9C11.45 9 11 8.55 11 8C11 7.45 11.45 7 12 7C12.55 7 13 7.45 13 8C13 8.55 12.55 9 12 9ZM16 13C15.45 13 15 12.55 15 12C15 11.45 15.45 11 16 11C16.55 11 17 11.45 17 12C17 12.55 16.55 13 16 13Z',
  },
  eye: {
    path: 'M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12ZM12 15A3 3 0 1 0 12 9A3 3 0 0 0 12 15Z',
  },
  star: {
    path: 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z',
  },
  zap: {
    path: 'M13 2L3 14H12L11 22L21 10H12L13 2Z',
  },
  // Fallback generic circle icon
  circle: {
    path: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z',
  },
}

/** Return the icon data for a given Lucide icon name (falls back to 'circle'). */
export function getIcon(name: string): LucideIconData {
  return LUCIDE_ICONS[name] ?? LUCIDE_ICONS.circle
}

/**
 * Generate an SVG string for a Lucide icon.
 * Uses `currentColor` for stroke so it inherits CSS `color` / `--vmt-icon-color`.
 */
export function iconToSvg(
  name: string,
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
): string {
  const icon = getIcon(name)
  const attrs = [
    `xmlns="http://www.w3.org/2000/svg"`,
    `width="${size}"`,
    `height="${size}"`,
    `viewBox="0 0 24 24"`,
    `fill="none"`,
    `stroke="${color}"`,
    `stroke-width="${strokeWidth}"`,
    `stroke-linecap="round"`,
    `stroke-linejoin="round"`,
  ].join(' ')

  return `<svg ${attrs}><path d="${icon.path}" /></svg>`
}

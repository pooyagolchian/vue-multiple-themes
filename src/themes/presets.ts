import type { ThemeDefinition } from '../types'

// ─── Light (default) ──────────────────────────────────────────────────────────
export const lightTheme: ThemeDefinition = {
  name: 'light',
  label: 'Light',
  colors: {
    primary: '#3b82f6',
    primaryLight: '#93c5fd',
    primaryDark: '#1d4ed8',
    secondary: '#8b5cf6',
    accent: '#f59e0b',
    background: '#ffffff',
    surface: '#f8fafc',
    surfaceElevated: '#f1f5f9',
    text: '#111827',
    textMuted: '#6b7280',
    textInverse: '#ffffff',
    border: '#e5e7eb',
    ring: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
}

// ─── Dark ─────────────────────────────────────────────────────────────────────
export const darkTheme: ThemeDefinition = {
  name: 'dark',
  label: 'Dark',
  colors: {
    primary: '#60a5fa',
    primaryLight: '#bfdbfe',
    primaryDark: '#3b82f6',
    secondary: '#a78bfa',
    accent: '#fbbf24',
    background: '#0f172a',
    surface: '#1e293b',
    surfaceElevated: '#334155',
    text: '#f8fafc',
    textMuted: '#94a3b8',
    textInverse: '#0f172a',
    border: '#334155',
    ring: '#60a5fa',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa',
  },
}

// ─── Sepia ────────────────────────────────────────────────────────────────────
export const sepiaTheme: ThemeDefinition = {
  name: 'sepia',
  label: 'Sepia',
  colors: {
    primary: '#92400e',
    primaryLight: '#d97706',
    primaryDark: '#78350f',
    secondary: '#78350f',
    accent: '#d97706',
    background: '#fdf6e3',
    surface: '#f5e9c9',
    surfaceElevated: '#ede0b5',
    text: '#3c2415',
    textMuted: '#78583d',
    textInverse: '#fdf6e3',
    border: '#d6b896',
    ring: '#92400e',
    success: '#166534',
    warning: '#92400e',
    error: '#991b1b',
    info: '#1e40af',
  },
}

// ─── Ocean ────────────────────────────────────────────────────────────────────
export const oceanTheme: ThemeDefinition = {
  name: 'ocean',
  label: 'Ocean',
  colors: {
    primary: '#0ea5e9',
    primaryLight: '#7dd3fc',
    primaryDark: '#0369a1',
    secondary: '#06b6d4',
    accent: '#f0abfc',
    background: '#0c1a2e',
    surface: '#132338',
    surfaceElevated: '#1b3554',
    text: '#e0f2fe',
    textMuted: '#7dd3fc',
    textInverse: '#0c1a2e',
    border: '#1e4877',
    ring: '#0ea5e9',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#38bdf8',
  },
}

// ─── Forest ───────────────────────────────────────────────────────────────────
export const forestTheme: ThemeDefinition = {
  name: 'forest',
  label: 'Forest',
  colors: {
    primary: '#16a34a',
    primaryLight: '#86efac',
    primaryDark: '#166534',
    secondary: '#15803d',
    accent: '#84cc16',
    background: '#052e16',
    surface: '#14532d',
    surfaceElevated: '#166534',
    text: '#dcfce7',
    textMuted: '#86efac',
    textInverse: '#052e16',
    border: '#166534',
    ring: '#16a34a',
    success: '#4ade80',
    warning: '#facc15',
    error: '#f87171',
    info: '#60a5fa',
  },
}

// ─── Sunset ───────────────────────────────────────────────────────────────────
export const sunsetTheme: ThemeDefinition = {
  name: 'sunset',
  label: 'Sunset',
  colors: {
    primary: '#f97316',
    primaryLight: '#fdba74',
    primaryDark: '#c2410c',
    secondary: '#fb923c',
    accent: '#facc15',
    background: '#1c0a00',
    surface: '#2d1507',
    surfaceElevated: '#3f2010',
    text: '#fff7ed',
    textMuted: '#fdba74',
    textInverse: '#1c0a00',
    border: '#7c2d12',
    ring: '#f97316',
    success: '#4ade80',
    warning: '#facc15',
    error: '#f87171',
    info: '#60a5fa',
  },
}

// ─── Winter ───────────────────────────────────────────────────────────────────
export const winterTheme: ThemeDefinition = {
  name: 'winter',
  label: 'Winter',
  colors: {
    primary: '#818cf8',
    primaryLight: '#c7d2fe',
    primaryDark: '#4f46e5',
    secondary: '#a5b4fc',
    accent: '#67e8f9',
    background: '#0f0f23',
    surface: '#1a1a3e',
    surfaceElevated: '#252550',
    text: '#e0e7ff',
    textMuted: '#a5b4fc',
    textInverse: '#0f0f23',
    border: '#312e81',
    ring: '#818cf8',
    success: '#4ade80',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#67e8f9',
  },
}

// ─── All presets ──────────────────────────────────────────────────────────────
export const PRESET_THEMES: ThemeDefinition[] = [
  lightTheme,
  darkTheme,
  sepiaTheme,
  oceanTheme,
  forestTheme,
  sunsetTheme,
  winterTheme,
]

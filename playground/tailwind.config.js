/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  darkMode: ['class', '.theme-dark'],
  theme: {
    extend: {
      colors: {
        // Map CSS vars to Tailwind color utilities for demonstration
        vmt: {
          primary:    'var(--vmt-primary)',
          secondary:  'var(--vmt-secondary)',
          accent:     'var(--vmt-accent)',
          bg:         'var(--vmt-background)',
          surface:    'var(--vmt-surface)',
          elevated:   'var(--vmt-surface-elevated)',
          text:       'var(--vmt-text)',
          muted:      'var(--vmt-text-muted)',
          inverse:    'var(--vmt-text-inverse)',
          border:     'var(--vmt-border)',
          ring:       'var(--vmt-ring)',
          success:    'var(--vmt-success)',
          warning:    'var(--vmt-warning)',
          error:      'var(--vmt-error)',
          info:       'var(--vmt-info)',
        },
      },
      backgroundColor: {
        vmt: 'var(--vmt-background)',
      },
    },
  },
  plugins: [],
}

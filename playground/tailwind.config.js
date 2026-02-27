/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  darkMode: ['class', '.theme-dark'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        noir: {
          50:  '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
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
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [],
}

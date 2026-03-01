/** @type {import('tailwindcss').Config} */
import { createVmtPlugin } from 'vue-multiple-themes/tailwind'
import { PRESET_THEMES } from 'vue-multiple-themes'

export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
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
        // vmt.* colors are now auto-registered by createVmtPlugin()
        // with full opacity modifier support: bg-vmt-primary/50
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [
    createVmtPlugin({
      themes: PRESET_THEMES,
      strategy: 'both',
      darkThemes: ['dark'],
    }),
  ],
}

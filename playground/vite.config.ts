import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  // Base path for GitHub Pages deployment
  base: process.env.NODE_ENV === 'production' ? '/vue-multiple-themes/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      'vue-multiple-themes': resolve(__dirname, '../src/index.ts'),
    },
    dedupe: ['vue'],
  },
})

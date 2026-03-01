import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  // Base path for GitHub Pages deployment.
  // VITE_BASE is injected by the deploy-docs workflow from configure-pages output
  // so it works for both subdirectory (/vue-multiple-themes/) and custom-domain (/) deployments.
  base: process.env.VITE_BASE ?? (process.env.NODE_ENV === 'production' ? '/vue-multiple-themes/' : '/'),
  plugins: [vue()],
  resolve: {
    alias: {
      'vue-multiple-themes': resolve(__dirname, '../src/index.ts'),
    },
    dedupe: ['vue'],
  },
})

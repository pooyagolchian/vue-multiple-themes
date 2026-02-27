import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'vue-multiple-themes': resolve(__dirname, '../src/index.ts'),
    },
    dedupe: ['vue'],
  },
})

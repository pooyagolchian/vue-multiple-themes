import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/**/*.test.ts', '**/*.spec.ts'],
      outDir: 'dist',
      rollupTypes: true,
      tsconfigPath: './tsconfig.json',
    }),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    dedupe: ['vue', 'vue-demi'],
  },

  build: {
    lib: {
      entry: {
        'vue-multiple-themes': resolve(__dirname, 'src/index.ts'),
        'tailwind-plugin': resolve(__dirname, 'src/tailwind-plugin.ts'),
        'tailwind-v4-plugin': resolve(__dirname, 'src/tailwind-v4-plugin.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) =>
        format === 'cjs' ? `${entryName}.cjs` : `${entryName}.js`,
    },

    rollupOptions: {
      // Declare all externals – do NOT bundle them
      external: [
        'vue',
        'vue-demi',
        '@vue/composition-api',
        'tailwindcss',
        /^node:/,
      ],
      output: {
        // Make sure vue-demi stays external but provide globals for UMD
        globals: {
          vue: 'Vue',
          'vue-demi': 'VueDemi',
          '@vue/composition-api': 'VueCompositionApi',
        },
        // Preserve CSS injection via inline styles; don't extract to CSS file
        exports: 'named',
        // Ensure interop with Vue 2 CJS consumers
        interop: 'auto',
      },
    },

    // Keep comments for better DX in built output
    minify: false,
    sourcemap: true,
  },
})

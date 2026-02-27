<template>
  <section class="space-y-6">
    <div>
      <h2 class="section-title">Composable API</h2>
      <p class="section-desc"><code>useTheme()</code> — full reactive control from Composition API</p>
    </div>

    <div class="code-block">
      <div class="code-block-header">
        <span class="text-xs font-mono text-noir-500">MyComponent.vue</span>
      </div>
      <pre class="code-block-body"><code>import { useTheme, PRESET_THEMES } from 'vue-multiple-themes'

const {
  current,      // Ref&lt;string&gt;         — active theme name
  theme,        // Ref&lt;ThemeDefinition&gt;
  isDark,       // ComputedRef&lt;boolean&gt;
  themes,       // ThemeDefinition[]
  setTheme,     // (name: string) =&gt; void
  nextTheme,    // () =&gt; void
  toggleTheme,  // () =&gt; void
} = useTheme({
  themes:                  PRESET_THEMES,
  defaultTheme:           'light',
  strategy:               'both',
  respectSystemPreference: true,
})</code></pre>
    </div>

    <div class="card-surface space-y-5">
      <p class="label-mono">Live demo</p>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="rounded-md border border-noir-800 bg-noir-950 p-3.5 text-center">
          <p class="text-[10px] font-mono text-noir-600 uppercase tracking-wider mb-1.5">current</p>
          <p class="text-sm font-semibold text-white font-mono">{{ ts.current }}</p>
        </div>
        <div class="rounded-md border border-noir-800 bg-noir-950 p-3.5 text-center">
          <p class="text-[10px] font-mono text-noir-600 uppercase tracking-wider mb-1.5">isDark</p>
          <p class="text-sm font-semibold font-mono" :class="ts.isDark ? 'text-white' : 'text-noir-600'">
            {{ ts.isDark }}
          </p>
        </div>
        <div class="rounded-md border border-noir-800 bg-noir-950 p-3.5 text-center">
          <p class="text-[10px] font-mono text-noir-600 uppercase tracking-wider mb-1.5">count</p>
          <p class="text-sm font-semibold text-white font-mono">{{ ts.themes.length }}</p>
        </div>
        <div class="rounded-md border border-noir-800 bg-noir-950 p-3.5 text-center">
          <p class="text-[10px] font-mono text-noir-600 uppercase tracking-wider mb-1.5">primary</p>
          <div class="w-6 h-6 rounded-md mx-auto mt-1 border border-noir-700"
            :style="{ background: ts.theme?.colors.primary }" />
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <button class="btn-secondary text-xs px-3 py-1.5" @click="ts.prevTheme()">
          &larr; prev
        </button>
        <button class="btn-primary text-xs px-3 py-1.5" @click="ts.nextTheme()">
          next &rarr;
        </button>
        <button class="btn-ghost text-xs px-3 py-1.5" @click="ts.toggleTheme()">
          toggle
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PRESET_THEMES, useTheme } from 'vue-multiple-themes'

const ts = useTheme({
  themes: PRESET_THEMES,
  defaultTheme: 'light',
  strategy: 'both',
  storageKey: 'pg-composable-demo',
  injectCssVars: false,
})
</script>

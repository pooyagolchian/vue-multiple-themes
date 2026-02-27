<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-lg font-semibold text-zinc-100 mb-1">Composable API</h2>
      <p class="text-xs font-mono" style="color: var(--noir-muted)">
        useTheme() — full reactive control from Composition API
      </p>
    </div>

    <div class="rounded-md border overflow-hidden" style="border-color: var(--noir-border)">
      <div class="px-4 py-2 border-b" style="background: var(--noir-surface); border-color: var(--noir-border)">
        <span class="text-xs font-mono text-zinc-500">MyComponent.vue</span>
      </div>
      <pre class="p-4 text-xs font-mono overflow-x-auto leading-relaxed"
        style="background: #09090b; color: #71717a"><code>import { useTheme, PRESET_THEMES } from 'vue-multiple-themes'

const {
  current,      // Ref&lt;string&gt;        active theme name
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

    <div class="rounded-md border p-5 space-y-4"
      style="background: var(--noir-surface); border-color: var(--noir-border)">
      <p class="text-xs font-mono text-zinc-400">// live demo</p>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="rounded-md border p-3 text-center" style="background: #09090b; border-color: var(--noir-border)">
          <p class="text-xs font-mono text-zinc-500 mb-1">current</p>
          <p class="text-sm font-semibold text-zinc-100 font-mono">{{ ts.current }}</p>
        </div>
        <div class="rounded-md border p-3 text-center" style="background: #09090b; border-color: var(--noir-border)">
          <p class="text-xs font-mono text-zinc-500 mb-1">isDark</p>
          <p class="text-sm font-semibold font-mono" :class="ts.isDark ? 'text-zinc-100' : 'text-zinc-500'">
            {{ ts.isDark ? 'true' : 'false' }}
          </p>
        </div>
        <div class="rounded-md border p-3 text-center" style="background: #09090b; border-color: var(--noir-border)">
          <p class="text-xs font-mono text-zinc-500 mb-1">count</p>
          <p class="text-sm font-semibold text-zinc-100 font-mono">{{ ts.themes.length }}</p>
        </div>
        <div class="rounded-md border p-3 text-center" style="background: #09090b; border-color: var(--noir-border)">
          <p class="text-xs font-mono text-zinc-500 mb-1">primary</p>
          <div class="w-6 h-6 rounded mx-auto mt-1 border"
            :style="{ background: ts.theme?.colors.primary, borderColor: '#27272a' }" />
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <button class="px-3 py-1.5 rounded-md text-xs font-mono border transition-all hover:bg-zinc-800"
          style="border-color: var(--noir-border-strong); color: var(--noir-subtle)"
          @click="ts.prevTheme()">&#8592; prev</button>
        <button class="px-3 py-1.5 rounded-md text-xs font-mono bg-white text-zinc-950 hover:bg-zinc-100 transition-all"
          @click="ts.nextTheme()">next &#8594;</button>
        <button class="px-3 py-1.5 rounded-md text-xs font-mono border transition-all hover:bg-zinc-800"
          style="border-color: var(--noir-border-strong); color: var(--noir-subtle)"
          @click="ts.toggleTheme()">toggle dark</button>
      </div>
    </div>
  </div>
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

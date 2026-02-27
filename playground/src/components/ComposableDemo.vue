<template>
    <section class="rounded-2xl p-6 border space-y-4"
        style="background: var(--vmt-surface); border-color: var(--vmt-border)">
        <h2 class="text-lg font-bold">Composable API – <code>useTheme()</code></h2>
        <p class="text-sm" style="color: var(--vmt-text-muted)">
            Use the composable anywhere in your Composition API setup:
        </p>

        <pre class="rounded-xl p-4 text-xs font-mono overflow-x-auto"
            style="background: var(--vmt-surface-elevated); color: var(--vmt-text)"><code>import { useTheme } from 'vue-multiple-themes'
import { PRESET_THEMES } from 'vue-multiple-themes'

const {
  current,   // Ref&lt;string&gt;  –  active theme name
  theme,     // Ref&lt;ThemeDefinition&gt;
  isDark,    // ComputedRef&lt;boolean&gt;
  themes,    // ThemeDefinition[]
  setTheme,  // (name: string) => void
  nextTheme, // () => void
  prevTheme, // () => void
  toggleTheme,
} = useTheme({
  themes: PRESET_THEMES,
  defaultTheme: 'light',
  strategy: 'both',
  respectSystemPreference: true,
})</code></pre>

        <!-- Live demo -->
        <div class="flex items-center gap-4 p-4 rounded-xl border"
            style="background: var(--vmt-surface-elevated); border-color: var(--vmt-border)">
            <div>
                <p class="text-xs font-semibold" style="color: var(--vmt-text-muted)">Current theme</p>
                <p class="text-base font-bold" style="color: var(--vmt-primary)">{{ themeState.current }}</p>
            </div>
            <div>
                <p class="text-xs font-semibold" style="color: var(--vmt-text-muted)">Is dark?</p>
                <p class="text-base font-bold" style="color: var(--vmt-text)">{{ themeState.isDark ? 'Yes' : 'No' }}</p>
            </div>
            <div class="flex-1" />
            <button class="px-3 py-1.5 rounded-lg text-sm"
                style="background: var(--vmt-primary); color: var(--vmt-text-inverse)" @click="themeState.nextTheme()">
                Next Theme →
            </button>
        </div>
    </section>
</template>

<script setup lang="ts">
import { PRESET_THEMES, useTheme } from 'vue-multiple-themes'

const themeState = useTheme({
    themes: PRESET_THEMES,
    defaultTheme: 'light',
    strategy: 'both',
    storageKey: 'pg-composable-demo',
    injectCssVars: false, // Already injected by the plugin
})
</script>

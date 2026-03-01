<template>
  <section class="space-y-6">
    <div>
      <h2 class="section-title">TailwindCSS Strategy</h2>
      <p class="section-desc">Full Tailwind opacity modifier support — use <code>bg-vmt-primary/50</code>, gradient stops, and all modifiers</p>
    </div>

    <div class="code-block">
      <div class="code-block-header">
        <span class="text-xs font-mono text-noir-500">tailwind.config.js — using createVmtPlugin()</span>
      </div>
      <pre class="code-block-body"><code>import { createVmtPlugin } from 'vue-multiple-themes/tailwind'
import { PRESET_THEMES } from 'vue-multiple-themes'

export default {
  plugins: [
    createVmtPlugin({
      themes: PRESET_THEMES,
      strategy: 'both',
      darkThemes: ['dark'],
    }),
  ],
}</code></pre>
    </div>

    <div class="code-block">
      <div class="code-block-header">
        <span class="text-xs font-mono text-noir-500">Available utility classes (auto-registered via theme.extend.colors)</span>
      </div>
      <div class="divide-y divide-noir-800">
        <div v-for="util in tailwindUtils" :key="util.cls"
          class="flex items-center gap-4 px-4 py-3 text-xs font-mono hover:bg-noir-900/50 transition-colors">
          <span class="w-52 flex-shrink-0 text-white font-medium">{{ util.cls }}</span>
          <span class="text-noir-700">&rarr;</span>
          <span class="flex-1 text-noir-500">{{ util.resolves }}</span>
          <span class="w-5 h-5 rounded-sm border border-noir-700 flex-shrink-0"
            :style="{ background: 'rgb(var(' + util.varName + '))' }" />
        </div>
      </div>
    </div>

    <!-- Opacity Modifier Demo -->
    <div class="card-surface space-y-4">
      <p class="label-mono">✨ Opacity modifiers — the key feature</p>
      <div class="flex flex-wrap gap-3">
        <div class="px-4 py-2 rounded-md text-sm font-medium bg-vmt-primary text-white">bg-vmt-primary</div>
        <div class="px-4 py-2 rounded-md text-sm font-medium bg-vmt-primary/75 text-white">bg-vmt-primary/75</div>
        <div class="px-4 py-2 rounded-md text-sm font-medium bg-vmt-primary/50 text-white">bg-vmt-primary/50</div>
        <div class="px-4 py-2 rounded-md text-sm font-medium bg-vmt-primary/25 text-noir-200">bg-vmt-primary/25</div>
        <div class="px-4 py-2 rounded-md text-sm font-medium bg-vmt-primary/10 text-noir-200">bg-vmt-primary/10</div>
      </div>
    </div>

    <!-- Gradient Demo -->
    <div class="card-surface space-y-4">
      <p class="label-mono">Gradient stops</p>
      <div class="flex flex-wrap gap-3">
        <div class="w-full h-12 rounded-lg bg-gradient-to-r from-vmt-primary to-vmt-secondary"></div>
        <div class="w-full h-12 rounded-lg bg-gradient-to-r from-vmt-primary via-vmt-accent to-vmt-secondary"></div>
        <div class="w-full h-12 rounded-lg bg-gradient-to-r from-vmt-success via-vmt-warning to-vmt-error"></div>
      </div>
      <pre class="text-xs font-mono text-noir-500 mt-2"><code>from-vmt-primary to-vmt-secondary
from-vmt-primary via-vmt-accent to-vmt-secondary
from-vmt-success via-vmt-warning to-vmt-error</code></pre>
    </div>

    <!-- Hover/Focus/Ring Demo -->
    <div class="card-surface space-y-4">
      <p class="label-mono">Interactive modifiers & ring</p>
      <div class="flex flex-wrap gap-3">
        <button class="px-4 py-2 rounded-md text-sm font-medium bg-vmt-primary text-white hover:bg-vmt-primary/80 transition-colors">
          hover:bg-vmt-primary/80
        </button>
        <button class="px-4 py-2 rounded-md text-sm font-medium border-2 border-vmt-primary text-vmt-primary hover:bg-vmt-primary/10 transition-colors">
          hover:bg-vmt-primary/10
        </button>
        <button class="px-4 py-2 rounded-md text-sm font-medium bg-vmt-accent text-noir-900 ring-2 ring-vmt-accent/50 ring-offset-2 ring-offset-noir-900">
          ring-vmt-accent/50
        </button>
      </div>
    </div>

    <!-- Border & Text Opacity Demo -->
    <div class="card-surface space-y-4">
      <p class="label-mono">Border & text opacity</p>
      <div class="flex flex-wrap gap-3">
        <div class="px-4 py-2 rounded-md text-sm border-2 border-vmt-primary text-vmt-text">border-vmt-primary</div>
        <div class="px-4 py-2 rounded-md text-sm border-2 border-vmt-primary/50 text-vmt-text">border-vmt-primary/50</div>
        <div class="px-4 py-2 rounded-md text-sm font-medium text-vmt-primary">text-vmt-primary</div>
        <div class="px-4 py-2 rounded-md text-sm font-medium text-vmt-primary/60">text-vmt-primary/60</div>
      </div>
    </div>

    <!-- Direct CSS var access -->
    <div class="card-surface space-y-4">
      <p class="label-mono">Direct CSS variable access</p>
      <pre class="text-xs font-mono text-noir-500"><code>/* RGB channels (for Tailwind) */
--vmt-primary: 59 130 246;

/* Full rgb() color (for plain CSS) */
--vmt-primary-color: rgb(59 130 246);

/* Usage in custom CSS */
.my-element {
  background: rgb(var(--vmt-primary) / 0.5);
  color: var(--vmt-text-color);
  border: 1px solid var(--vmt-border-color);
}</code></pre>
    </div>
  </section>
</template>

<script setup lang="ts">
const tailwindUtils = [
  { cls: 'bg-vmt-primary',        resolves: 'background-color + opacity', varName: '--vmt-primary' },
  { cls: 'bg-vmt-primary/50',     resolves: 'background-color at 50% opacity', varName: '--vmt-primary' },
  { cls: 'text-vmt-text',         resolves: 'color + opacity',            varName: '--vmt-text' },
  { cls: 'border-vmt-border',     resolves: 'border-color + opacity',     varName: '--vmt-border' },
  { cls: 'ring-vmt-ring/75',      resolves: 'ring-color at 75% opacity',  varName: '--vmt-ring' },
  { cls: 'from-vmt-primary',      resolves: 'gradient-from',              varName: '--vmt-primary' },
  { cls: 'via-vmt-accent',        resolves: 'gradient-via',               varName: '--vmt-accent' },
  { cls: 'to-vmt-secondary',      resolves: 'gradient-to',                varName: '--vmt-secondary' },
  { cls: 'fill-vmt-primary',      resolves: 'SVG fill + opacity',         varName: '--vmt-primary' },
  { cls: 'stroke-vmt-accent',     resolves: 'SVG stroke + opacity',       varName: '--vmt-accent' },
  { cls: 'outline-vmt-primary',   resolves: 'outline-color + opacity',    varName: '--vmt-primary' },
  { cls: 'shadow-vmt-primary/25', resolves: 'box-shadow color',           varName: '--vmt-primary' },
  { cls: 'caret-vmt-primary',     resolves: 'caret-color + opacity',      varName: '--vmt-primary' },
  { cls: 'accent-vmt-primary',    resolves: 'accent-color + opacity',     varName: '--vmt-primary' },
  { cls: 'divide-vmt-border',     resolves: 'divide-color + opacity',     varName: '--vmt-border' },
  { cls: 'placeholder-vmt-text-muted', resolves: 'placeholder-color + opacity', varName: '--vmt-text-muted' },
]
</script>

<template>
  <section class="space-y-6">
    <div>
      <h2 class="section-title">TailwindCSS Strategy</h2>
      <p class="section-desc">Wire CSS vars to Tailwind colors — use <code>strategy: 'both'</code> to emit theme classes</p>
    </div>

    <div class="code-block">
      <div class="code-block-header">
        <span class="text-xs font-mono text-noir-500">tailwind.config.js</span>
      </div>
      <pre class="code-block-body"><code>export default {
  theme: {
    extend: {
      colors: {
        vmt: {
          primary:   'var(--vmt-primary)',
          secondary: 'var(--vmt-secondary)',
          text:      'var(--vmt-text)',
          bg:        'var(--vmt-background)',
        }
      }
    }
  }
}</code></pre>
    </div>

    <div class="code-block">
      <div class="code-block-header">
        <span class="text-xs font-mono text-noir-500">Available utility classes</span>
      </div>
      <div class="divide-y divide-noir-800">
        <div v-for="util in tailwindUtils" :key="util.cls"
          class="flex items-center gap-4 px-4 py-3 text-xs font-mono hover:bg-noir-900/50 transition-colors">
          <span class="w-44 flex-shrink-0 text-white font-medium">{{ util.cls }}</span>
          <span class="text-noir-700">&rarr;</span>
          <span class="flex-1 text-noir-500">{{ util.resolves }}</span>
          <span class="w-5 h-5 rounded-sm border border-noir-700 flex-shrink-0"
            :style="{ background: 'var(' + util.varName + ')' }" />
        </div>
      </div>
    </div>

    <div class="card-surface space-y-4">
      <p class="label-mono">Live preview — switch themes above</p>
      <div class="flex flex-wrap gap-3">
        <div class="px-4 py-2 rounded-md text-sm font-medium"
          style="background: var(--vmt-primary); color: var(--vmt-text-inverse)">bg-vmt-primary</div>
        <div class="px-4 py-2 rounded-md text-sm border border-noir-800"
          style="color: var(--vmt-primary)">text-vmt-primary</div>
        <div class="px-4 py-2 rounded-md text-sm font-medium border"
          style="background: var(--vmt-surface); color: var(--vmt-text); border-color: var(--vmt-border)">bg-vmt-surface</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const tailwindUtils = [
  { cls: 'bg-vmt-bg',         resolves: 'background-color', varName: '--vmt-background' },
  { cls: 'bg-vmt-surface',    resolves: 'background-color', varName: '--vmt-surface' },
  { cls: 'bg-vmt-primary',    resolves: 'background-color', varName: '--vmt-primary' },
  { cls: 'text-vmt-text',     resolves: 'color',            varName: '--vmt-text' },
  { cls: 'text-vmt-muted',    resolves: 'color',            varName: '--vmt-text-muted' },
  { cls: 'text-vmt-primary',  resolves: 'color',            varName: '--vmt-primary' },
  { cls: 'border-vmt-border', resolves: 'border-color',     varName: '--vmt-border' },
  { cls: 'ring-vmt-ring',     resolves: 'ring-color',       varName: '--vmt-ring' },
]
</script>

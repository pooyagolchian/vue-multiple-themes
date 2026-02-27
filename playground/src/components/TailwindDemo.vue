<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-lg font-semibold text-zinc-100 mb-1">TailwindCSS Strategy</h2>
      <p class="text-xs font-mono" style="color: var(--noir-muted)">
        Wire CSS vars to Tailwind colors. Use strategy both to emit theme classes.
      </p>
    </div>

    <div class="rounded-md border overflow-hidden" style="border-color: var(--noir-border)">
      <div class="px-4 py-2 border-b" style="background: var(--noir-surface); border-color: var(--noir-border)">
        <span class="text-xs font-mono text-zinc-500">tailwind.config.js</span>
      </div>
      <pre class="p-4 text-xs font-mono overflow-x-auto leading-relaxed"
        style="background: #09090b; color: #71717a"><code>export default {
  theme: { extend: { colors: {
    vmt: {
      primary:   'var(--vmt-primary)',
      secondary: 'var(--vmt-secondary)',
      text:      'var(--vmt-text)',
      bg:        'var(--vmt-background)',
    }
  }}}
}</code></pre>
    </div>

    <div class="rounded-md border overflow-hidden" style="border-color: var(--noir-border)">
      <div class="px-4 py-3 border-b" style="background: var(--noir-surface); border-color: var(--noir-border)">
        <p class="text-xs font-mono text-zinc-400">// available utility classes</p>
      </div>
      <div class="divide-y" style="background: #09090b; border-color: var(--noir-border)">
        <div v-for="util in tailwindUtils" :key="util.cls"
          class="flex items-center gap-3 px-4 py-2.5 text-xs font-mono hover:bg-zinc-900 transition-colors"
          style="border-color: var(--noir-border)">
          <span class="w-44 flex-shrink-0 text-zinc-100">{{ util.cls }}</span>
          <span class="text-zinc-600">→</span>
          <span class="flex-1 text-zinc-500">{{ util.resolves }}</span>
          <span class="w-5 h-5 rounded border flex-shrink-0"
            :style="{ background: 'var(' + util.varName + ')', borderColor: '#27272a' }" />
        </div>
      </div>
    </div>

    <div class="rounded-md border p-5 space-y-3"
      style="background: var(--noir-surface); border-color: var(--noir-border)">
      <p class="text-xs font-mono text-zinc-400">// live — switch themes above</p>
      <div class="flex flex-wrap gap-3">
        <div class="px-4 py-2 rounded-md text-sm font-medium"
          style="background: var(--vmt-primary); color: var(--vmt-text-inverse)">bg-vmt-primary</div>
        <div class="px-4 py-2 rounded-md text-sm border"
          style="border-color: var(--vmt-border); color: var(--vmt-primary)">text-vmt-primary</div>
        <div class="px-4 py-2 rounded-md text-sm font-medium border"
          style="background: var(--vmt-surface); color: var(--vmt-text); border-color: var(--vmt-border)">bg-vmt-surface</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const tailwindUtils = [
  { cls: 'bg-vmt-bg',        resolves: 'background-color', varName: '--vmt-background' },
  { cls: 'bg-vmt-surface',   resolves: 'background-color', varName: '--vmt-surface' },
  { cls: 'bg-vmt-primary',   resolves: 'background-color', varName: '--vmt-primary' },
  { cls: 'text-vmt-text',    resolves: 'color',            varName: '--vmt-text' },
  { cls: 'text-vmt-muted',   resolves: 'color',            varName: '--vmt-text-muted' },
  { cls: 'text-vmt-primary', resolves: 'color',            varName: '--vmt-primary' },
  { cls: 'border-vmt-border', resolves: 'border-color',    varName: '--vmt-border' },
  { cls: 'ring-vmt-ring',    resolves: 'ring-color',       varName: '--vmt-ring' },
]
</script>

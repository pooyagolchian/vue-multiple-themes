<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-lg font-semibold text-zinc-100 mb-1">CSS Variables Strategy</h2>
      <p class="text-xs font-mono" style="color: var(--noir-muted)">
        The library injects a style tag. Reference vars directly in your CSS.
      </p>
    </div>

    <div class="rounded-md border overflow-hidden" style="border-color: var(--noir-border)">
      <div class="flex items-center justify-between px-4 py-2 border-b"
        style="background: var(--noir-surface); border-color: var(--noir-border)">
        <span class="text-xs font-mono text-zinc-500">styles.css</span>
        <button class="text-xs font-mono transition-colors" style="color: var(--noir-muted)" @click="copyCss">
          {{ cssCopied ? 'copied' : 'copy' }}
        </button>
      </div>
      <pre class="p-4 text-xs font-mono overflow-x-auto leading-relaxed"
        style="background: #09090b; color: #71717a"><code>/* Pure CSS — no JS conditional logic */
.my-card {
  background: var(--vmt-surface);
  color: var(--vmt-text);
  border: 1px solid var(--vmt-border);
}
.cta-button {
  background: var(--vmt-primary);
  color: var(--vmt-text-inverse);
}</code></pre>
    </div>

    <div class="grid xs:grid-cols-2 lg:grid-cols-3 gap-2">
      <div v-for="(varName, label) in cssVarMap" :key="label"
        class="flex items-center gap-2.5 p-3 rounded-md border text-xs font-mono hover:border-zinc-600 transition-all"
        style="background: var(--noir-surface); border-color: var(--noir-border)">
        <span class="w-4 h-4 rounded flex-shrink-0 border"
          :style="{ background: 'var(' + varName + ')', borderColor: 'var(--noir-border-strong)' }" />
        <code class="text-zinc-400 truncate">{{ varName }}</code>
      </div>
    </div>

    <div class="rounded-md border p-4 flex items-center gap-3"
      style="background: var(--noir-surface); border-color: var(--noir-border)">
      <div class="w-2 h-2 rounded-full bg-zinc-300 animate-pulse flex-shrink-0" />
      <span class="text-xs font-mono" style="color: var(--noir-muted)">
        vars update live as you switch themes — no page reload required
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cssCopied = ref(false)
async function copyCss() {
  try {
    await navigator.clipboard.writeText('.my-card { background: var(--vmt-surface); color: var(--vmt-text); }')
    cssCopied.value = true
    setTimeout(() => { cssCopied.value = false }, 1500)
  } catch {}
}

const cssVarMap: Record<string, string> = {
  Primary:          '--vmt-primary',
  Secondary:        '--vmt-secondary',
  Accent:           '--vmt-accent',
  Background:       '--vmt-background',
  Surface:          '--vmt-surface',
  'Surface raised': '--vmt-surface-elevated',
  Text:             '--vmt-text',
  'Text muted':     '--vmt-text-muted',
  'Text inverse':   '--vmt-text-inverse',
  Border:           '--vmt-border',
  Ring:             '--vmt-ring',
  Success:          '--vmt-success',
  Warning:          '--vmt-warning',
  Error:            '--vmt-error',
}
</script>

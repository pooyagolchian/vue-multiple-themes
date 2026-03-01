<template>
  <section class="space-y-6">
    <div>
      <h2 class="section-title">CSS Variables</h2>
      <p class="section-desc">The library injects custom properties — reference them directly in CSS</p>
    </div>

    <div class="code-block">
      <div class="code-block-header">
        <span class="text-xs font-mono text-noir-500">styles.css</span>
        <button class="text-xs font-mono text-noir-600 hover:text-noir-400 transition-colors" @click="copyCss">
          {{ cssCopied ? 'copied' : 'copy' }}
        </button>
      </div>
      <pre class="code-block-body"><code>.my-card {
  background: var(--vmt-surface-color);
  color: var(--vmt-text-color);
  border: 1px solid var(--vmt-border-color);
}

.cta-button {
  background: var(--vmt-primary-color);
  color: var(--vmt-text-inverse-color);
}

/* Or use RGB channels for opacity: */
.overlay {
  background: rgb(var(--vmt-primary) / 0.5);
}</code></pre>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-3 gap-2">
      <div v-for="(varName, label) in cssVarMap" :key="label"
        class="flex items-center gap-3 rounded-md border border-noir-800 bg-noir-950 px-3.5 py-3 text-xs hover:border-noir-600 transition-colors">
        <span class="w-4 h-4 rounded-sm flex-shrink-0 border border-noir-700"
          :style="{ background: 'var(' + varName + '-color)' }" />
        <code class="text-noir-400 truncate font-mono text-xs">{{ varName }}</code>
      </div>
    </div>

    <div class="flex items-center gap-3 rounded-md border border-noir-800 bg-noir-900/50 px-4 py-3">
      <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
      <span class="text-xs text-noir-500">
        Variables update live as you switch themes — no page reload required
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cssCopied = ref(false)
async function copyCss() {
  try {
    await navigator.clipboard.writeText(`.my-card {
  background: var(--vmt-surface-color);
  color: var(--vmt-text-color);
  border: 1px solid var(--vmt-border-color);
}

.cta-button {
  background: var(--vmt-primary-color);
  color: var(--vmt-text-inverse-color);
}

/* Or use RGB channels for opacity: */
.overlay {
  background: rgb(var(--vmt-primary) / 0.5);
}`)
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

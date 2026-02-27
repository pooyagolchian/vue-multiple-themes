<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-lg font-semibold text-zinc-100 mb-1">Color Palette</h2>
      <p class="text-xs font-mono" style="color: var(--noir-muted)">
        Theme "{{ theme?.label ?? theme?.name }}" — {{ colorEntries.length }} tokens
      </p>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      <div v-for="[key, value] in colorEntries" :key="key"
        class="rounded-md overflow-hidden border cursor-pointer transition-all hover:border-zinc-600"
        style="border-color: var(--noir-border)"
        @click="copyColor(value, key)">
        <div class="h-16 w-full" :style="{ background: value }" />
        <div class="p-2.5" style="background: var(--noir-surface)">
          <p class="text-xs font-mono font-medium text-zinc-300 truncate">{{ key }}</p>
          <p class="text-xs font-mono mt-0.5 flex items-center gap-1" style="color: var(--noir-muted)">
            {{ value }}
            <span v-if="copied === key" class="text-zinc-400">&#10003;</span>
          </p>
        </div>
      </div>
    </div>

    <div class="rounded-md border p-4 space-y-3"
      style="background: var(--noir-surface); border-color: var(--noir-border)">
      <h3 class="text-sm font-mono text-zinc-400">// WCAG contrast ratios</h3>
      <div class="grid sm:grid-cols-2 gap-2">
        <div v-for="pair in contrastPairs" :key="pair.label"
          class="flex items-center justify-between rounded border px-3 py-2 text-xs font-mono"
          style="border-color: var(--noir-border); background: #09090b">
          <span style="color: var(--noir-muted)">{{ pair.label }}</span>
          <span :class="pair.ratio >= 4.5 ? 'text-zinc-200' : 'text-zinc-500'" class="tabular-nums">
            {{ pair.ratio.toFixed(2) }}:1
            <span class="ml-1" :class="pair.ratio >= 4.5 ? 'text-zinc-400' : 'text-zinc-600'">
              {{ pair.ratio >= 7 ? 'AAA' : pair.ratio >= 4.5 ? 'AA' : 'FAIL' }}
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ThemeDefinition } from 'vue-multiple-themes'
import { contrastRatio } from 'vue-multiple-themes'

const props = defineProps<{ theme: ThemeDefinition | undefined }>()
const copied = ref<string>('')

const colorEntries = computed(() =>
  Object.entries(props.theme?.colors ?? {}).filter(([, v]) => v && typeof v === 'string') as [string, string][],
)

async function copyColor(value: string, key: string) {
  try {
    await navigator.clipboard.writeText(value)
    copied.value = key
    setTimeout(() => { copied.value = '' }, 1200)
  } catch {}
}

const contrastPairs = computed(() => {
  const c = props.theme?.colors
  if (!c) return []
  return [
    { label: 'primary / bg',    a: c.primary,   b: c.background },
    { label: 'text / bg',       a: c.text,      b: c.background },
    { label: 'text / surface',  a: c.text,      b: c.surface },
    { label: 'secondary / bg',  a: c.secondary, b: c.background },
  ].filter(p => p.a && p.b).map(p => ({ label: p.label, ratio: contrastRatio(p.a!, p.b!) }))
})
</script>

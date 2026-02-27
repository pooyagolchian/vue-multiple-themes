<template>
  <section class="space-y-6">
    <div>
      <h2 class="section-title">Color Palette</h2>
      <p class="section-desc font-mono">
        {{ theme?.label ?? theme?.name }} — {{ colorEntries.length }} design tokens
      </p>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      <button v-for="[key, value] in colorEntries" :key="key"
        class="group rounded-lg border border-noir-800 overflow-hidden transition-all hover:border-noir-600 focus-ring text-left"
        @click="copyColor(value, key)">
        <div class="h-14 w-full transition-transform group-hover:scale-[1.02]" :style="{ background: value }" />
        <div class="p-3 bg-noir-950">
          <p class="text-xs font-medium text-noir-300 truncate tracking-tight">{{ key }}</p>
          <p class="text-xs font-mono text-noir-600 mt-0.5 flex items-center gap-1">
            {{ value }}
            <span v-if="copied === key" class="text-noir-400 text-[10px]">&#10003;</span>
          </p>
        </div>
      </button>
    </div>

    <div class="card-surface space-y-4">
      <p class="label-mono">WCAG 2.1 contrast ratios</p>
      <div class="grid sm:grid-cols-2 gap-2">
        <div v-for="pair in contrastPairs" :key="pair.label"
          class="flex items-center justify-between rounded-md border border-noir-800 bg-noir-950 px-3.5 py-2.5">
          <span class="text-xs text-noir-500">{{ pair.label }}</span>
          <span class="flex items-center gap-2">
            <span class="text-xs font-mono tabular-nums"
              :class="pair.ratio >= 4.5 ? 'text-white' : 'text-noir-600'">
              {{ pair.ratio.toFixed(2) }}:1
            </span>
            <span class="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
              :class="pair.ratio >= 7 ? 'bg-white text-noir-950' : pair.ratio >= 4.5 ? 'bg-noir-700 text-noir-200' : 'bg-noir-800 text-noir-600'">
              {{ pair.ratio >= 7 ? 'AAA' : pair.ratio >= 4.5 ? 'AA' : 'FAIL' }}
            </span>
          </span>
        </div>
      </div>
    </div>
  </section>
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

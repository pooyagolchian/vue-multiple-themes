<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-lg font-semibold text-zinc-100 mb-1">Theme Generator</h2>
      <p class="text-xs font-mono" style="color: var(--noir-muted)">
        Generate a full WCAG-compliant theme pair from a single brand color.
      </p>
    </div>

    <div class="rounded-md border p-5 space-y-4"
      style="background: var(--noir-surface); border-color: var(--noir-border)">
      <p class="text-xs font-mono text-zinc-400">// pick a brand color</p>
      <div class="flex items-center gap-3">
        <input type="color" v-model="brandColor"
          class="w-12 h-10 rounded cursor-pointer border p-0.5"
          style="background: #09090b; border-color: var(--noir-border)" />
        <input type="text" v-model="brandColor" maxlength="7"
          class="px-3 py-2 rounded-md border text-sm font-mono outline-none w-36 focus:border-zinc-400 uppercase"
          style="background: #09090b; color: var(--noir-text); border-color: var(--noir-border)" />
      </div>
      <div class="flex flex-wrap gap-2">
        <button v-for="p in presets" :key="p.color"
          class="flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-mono transition-all hover:border-zinc-500"
          :style="{
            borderColor: brandColor === p.color ? '#fafafa' : 'var(--noir-border)',
            background:  brandColor === p.color ? '#fafafa10' : 'transparent',
            color:       brandColor === p.color ? '#fafafa' : 'var(--noir-muted)',
          }"
          @click="brandColor = p.color">
          <span class="w-3 h-3 rounded-full" :style="{ background: p.color }" />
          {{ p.name }}
        </button>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-4" v-if="lightTheme && darkTheme">
      <div class="rounded-md border overflow-hidden" style="border-color: var(--noir-border)">
        <div class="px-4 py-2.5 border-b flex items-center justify-between"
          style="background: var(--noir-surface); border-color: var(--noir-border)">
          <span class="text-xs font-mono text-zinc-400">light theme</span>
          <span class="text-xs font-mono text-zinc-600">WCAG AA</span>
        </div>
        <div class="p-3 grid grid-cols-3 gap-2" style="background: #f4f4f5">
          <div v-for="[k, v] in lightEntries.slice(0, 9)" :key="k"
            class="rounded overflow-hidden border" style="border-color: #e4e4e7">
            <div class="h-7" :style="{ background: v }" />
            <div class="p-1 bg-white">
              <p class="text-xs font-mono text-zinc-500 truncate">{{ k }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="rounded-md border overflow-hidden" style="border-color: var(--noir-border)">
        <div class="px-4 py-2.5 border-b flex items-center justify-between"
          style="background: var(--noir-surface); border-color: var(--noir-border)">
          <span class="text-xs font-mono text-zinc-400">dark theme</span>
          <span class="text-xs font-mono text-zinc-600">WCAG AA</span>
        </div>
        <div class="p-3 grid grid-cols-3 gap-2" style="background: #18181b">
          <div v-for="[k, v] in darkEntries.slice(0, 9)" :key="k"
            class="rounded overflow-hidden border" style="border-color: #27272a">
            <div class="h-7" :style="{ background: v }" />
            <div class="p-1" style="background: #09090b">
              <p class="text-xs font-mono text-zinc-600 truncate">{{ k }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="rounded-md border overflow-hidden" style="border-color: var(--noir-border)">
      <div class="flex items-center justify-between px-4 py-2 border-b"
        style="background: var(--noir-surface); border-color: var(--noir-border)">
        <span class="text-xs font-mono text-zinc-500">generated code</span>
        <button class="text-xs font-mono transition-colors" style="color: var(--noir-muted)" @click="copyGenerated">
          {{ genCopied ? 'copied' : 'copy' }}
        </button>
      </div>
      <pre class="p-4 text-xs font-mono overflow-x-auto leading-relaxed max-h-64"
        style="background: #09090b; color: #a1a1aa">{{ generatedCode }}</pre>
    </div>

    <div v-if="contrastReports.length" class="rounded-md border p-5 space-y-3"
      style="background: var(--noir-surface); border-color: var(--noir-border)">
      <p class="text-xs font-mono text-zinc-400">// contrast report (light theme)</p>
      <div class="grid sm:grid-cols-2 gap-2">
        <div v-for="r in contrastReports" :key="r.pair"
          class="flex items-center justify-between rounded border px-3 py-2 text-xs font-mono"
          style="border-color: var(--noir-border); background: #09090b">
          <span style="color: var(--noir-muted)">{{ r.pair }}</span>
          <span class="flex items-center gap-2">
            <span class="tabular-nums text-zinc-200">{{ r.ratio.toFixed(2) }}:1</span>
            <span class="px-1.5 rounded text-xs font-bold"
              :style="{ background: r.aa ? '#a1a1aa' : '#3f3f46', color: r.aa ? '#09090b' : '#71717a' }">
              {{ r.aa ? 'AA' : 'fail' }}
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { generateThemePair, checkContrast } from 'vue-multiple-themes'

const brandColor = ref('#6366f1')

const presets = [
  { name: 'indigo',  color: '#6366f1' },
  { name: 'emerald', color: '#10b981' },
  { name: 'rose',    color: '#f43f5e' },
  { name: 'amber',   color: '#f59e0b' },
  { name: 'sky',     color: '#0ea5e9' },
  { name: 'violet',  color: '#8b5cf6' },
]

const themePair = computed(() => {
  try { return generateThemePair(brandColor.value) } catch { return null }
})

const lightTheme = computed(() => themePair.value?.[0] ?? null)
const darkTheme  = computed(() => themePair.value?.[1] ?? null)

const lightEntries = computed(() =>
  Object.entries(lightTheme.value?.colors ?? {}).filter(([, v]) => v) as [string, string][],
)
const darkEntries = computed(() =>
  Object.entries(darkTheme.value?.colors ?? {}).filter(([, v]) => v) as [string, string][],
)

const generatedCode = computed(() => {
  if (!lightTheme.value) return '// invalid color'
  return "import { generateThemePair } from 'vue-multiple-themes'\n\nconst [light, dark] = generateThemePair('" + brandColor.value + "')\n\n// Use with VueMultipleThemes:\n// <VueMultipleThemes :themes='[light, dark]' />"
})

const contrastReports = computed(() => {
  const c = lightTheme.value?.colors
  if (!c) return []
  return [
    { pair: 'primary / bg',   a: c.primary,   b: c.background },
    { pair: 'text / bg',      a: c.text,      b: c.background },
    { pair: 'text / surface', a: c.text,      b: c.surface },
  ].filter(p => p.a && p.b).map(p => {
    const r = checkContrast(p.a!, p.b!)
    return { pair: p.pair, ratio: r.ratio, aa: r.aa }
  })
})

const genCopied = ref(false)
async function copyGenerated() {
  try {
    await navigator.clipboard.writeText(generatedCode.value)
    genCopied.value = true
    setTimeout(() => { genCopied.value = false }, 1500)
  } catch {}
}
</script>

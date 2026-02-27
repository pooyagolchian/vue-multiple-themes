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

    <!-- Seasonal Themes -->
    <div class="rounded-md border p-5 space-y-4"
      style="background: var(--noir-surface); border-color: var(--noir-border)">
      <p class="text-xs font-mono text-zinc-400">// generateSeasonalThemes(season)</p>
      <p class="text-xs font-mono" style="color: var(--noir-muted)">
        Curated mood-based theme pairs with hand-picked brand colors
      </p>
      <div class="flex flex-wrap gap-2">
        <button v-for="s in seasons" :key="s"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-mono transition-all hover:border-zinc-500"
          :style="{
            borderColor: selectedSeason === s ? '#fafafa' : 'var(--noir-border)',
            background: selectedSeason === s ? '#fafafa10' : 'transparent',
            color: selectedSeason === s ? '#fafafa' : 'var(--noir-muted)',
          }"
          @click="selectedSeason = s">
          <span class="w-3 h-3 rounded-full" :style="{ background: seasonColors[s] }" />
          {{ s }}
        </button>
      </div>
      <div v-if="seasonalPair" class="grid md:grid-cols-2 gap-3">
        <div v-for="(theme, idx) in seasonalPair" :key="idx"
          class="rounded-md border overflow-hidden" style="border-color: var(--noir-border)">
          <div class="px-3 py-2 border-b text-xs font-mono"
            :style="{ background: 'var(--noir-surface)', borderColor: 'var(--noir-border)', color: 'var(--noir-muted)' }">
            {{ theme.label }} ({{ theme.name }})
          </div>
          <div class="p-2 grid grid-cols-4 gap-1"
            :style="{ background: theme.colors.background }">
            <div v-for="[k, v] in Object.entries(theme.colors).filter(([,v]) => v).slice(0, 8)" :key="k"
              class="rounded overflow-hidden">
              <div class="h-6" :style="{ background: v as string }" />
              <p class="text-xs font-mono px-1 py-0.5 truncate"
                :style="{ color: theme.colors.textMuted, background: theme.colors.surface, fontSize: '9px' }">{{ k }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Palette-based Generation -->
    <div class="rounded-md border p-5 space-y-4"
      style="background: var(--noir-surface); border-color: var(--noir-border)">
      <p class="text-xs font-mono text-zinc-400">// generateThemeFromPalette(palette, variant)</p>
      <p class="text-xs font-mono" style="color: var(--noir-muted)">
        Generate from a full brand palette — primary + secondary + accent
      </p>
      <div class="flex flex-wrap items-end gap-4">
        <div class="space-y-1">
          <label class="text-xs font-mono" style="color: var(--noir-muted)">primary</label>
          <div class="flex gap-2">
            <input type="color" v-model="palettePrimary"
              class="w-10 h-9 rounded cursor-pointer border p-0.5"
              style="background: #09090b; border-color: var(--noir-border)" />
            <span class="text-xs font-mono text-zinc-500 self-center">{{ palettePrimary }}</span>
          </div>
        </div>
        <div class="space-y-1">
          <label class="text-xs font-mono" style="color: var(--noir-muted)">secondary</label>
          <div class="flex gap-2">
            <input type="color" v-model="paletteSecondary"
              class="w-10 h-9 rounded cursor-pointer border p-0.5"
              style="background: #09090b; border-color: var(--noir-border)" />
            <span class="text-xs font-mono text-zinc-500 self-center">{{ paletteSecondary }}</span>
          </div>
        </div>
        <div class="space-y-1">
          <label class="text-xs font-mono" style="color: var(--noir-muted)">accent</label>
          <div class="flex gap-2">
            <input type="color" v-model="paletteAccent"
              class="w-10 h-9 rounded cursor-pointer border p-0.5"
              style="background: #09090b; border-color: var(--noir-border)" />
            <span class="text-xs font-mono text-zinc-500 self-center">{{ paletteAccent }}</span>
          </div>
        </div>
        <div class="flex gap-2">
          <button v-for="v in (['light', 'dark'] as const)" :key="v"
            class="px-3 py-1.5 rounded-md text-xs font-mono border transition-all hover:border-zinc-500"
            :style="{
              borderColor: paletteVariant === v ? '#fafafa' : 'var(--noir-border)',
              background: paletteVariant === v ? '#fafafa10' : 'transparent',
              color: paletteVariant === v ? '#fafafa' : 'var(--noir-muted)',
            }"
            @click="paletteVariant = v">
            {{ v }}
          </button>
        </div>
      </div>
      <div v-if="paletteTheme" class="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
        <div v-for="[k, v] in Object.entries(paletteTheme.colors).filter(([,v]) => v)" :key="k"
          class="rounded overflow-hidden border" style="border-color: var(--noir-border)">
          <div class="h-8" :style="{ background: v as string }" />
          <div class="p-1" style="background: #09090b">
            <p class="text-xs font-mono truncate" style="color: var(--noir-muted); font-size: 9px">{{ k }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CSS color-mix() -->
    <div class="rounded-md border p-5 space-y-4"
      style="background: var(--noir-surface); border-color: var(--noir-border)">
      <p class="text-xs font-mono text-zinc-400">// buildCssMixTheme(color, name, variant)</p>
      <p class="text-xs font-mono" style="color: var(--noir-muted)">
        Generate CSS using color-mix() for runtime theme generation (Chrome 111+)
      </p>
      <div class="flex gap-2 mb-2">
        <button v-for="v in (['light', 'dark'] as const)" :key="'mix-' + v"
          class="px-3 py-1.5 rounded-md text-xs font-mono border transition-all hover:border-zinc-500"
          :style="{
            borderColor: cssMixVariant === v ? '#fafafa' : 'var(--noir-border)',
            background: cssMixVariant === v ? '#fafafa10' : 'transparent',
            color: cssMixVariant === v ? '#fafafa' : 'var(--noir-muted)',
          }"
          @click="cssMixVariant = v">
          {{ v }}
        </button>
      </div>
      <div class="rounded-md border overflow-hidden" style="border-color: var(--noir-border)">
        <div class="flex items-center justify-between px-4 py-2 border-b"
          style="background: var(--noir-surface); border-color: var(--noir-border)">
          <span class="text-xs font-mono text-zinc-500">output CSS</span>
          <button class="text-xs font-mono transition-colors" style="color: var(--noir-muted)" @click="copyCssMix">
            {{ cssMixCopied ? 'copied' : 'copy' }}
          </button>
        </div>
        <pre class="p-4 text-xs font-mono overflow-x-auto leading-relaxed max-h-48"
          style="background: #09090b; color: #a1a1aa">{{ cssMixOutput }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  generateThemePair,
  generateSeasonalThemes,
  generateThemeFromPalette,
  buildCssMixTheme,
  checkContrast,
} from 'vue-multiple-themes'

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

// ── Seasonal themes ───────────────────────────────────────────────────────────
const seasons = ['spring', 'summer', 'autumn', 'winter', 'midnight', 'neon', 'pastel'] as const
const seasonColors: Record<string, string> = {
  spring: '#34d399', summer: '#f59e0b', autumn: '#b45309',
  winter: '#7dd3fc', midnight: '#6366f1', neon: '#22d3ee', pastel: '#f9a8d4',
}
const selectedSeason = ref<typeof seasons[number]>('midnight')
const seasonalPair = computed(() => {
  try { return generateSeasonalThemes(selectedSeason.value) } catch { return null }
})

// ── Palette-based generation ──────────────────────────────────────────────────
const palettePrimary = ref('#7c3aed')
const paletteSecondary = ref('#ec4899')
const paletteAccent = ref('#f59e0b')
const paletteVariant = ref<'light' | 'dark'>('light')
const paletteTheme = computed(() => {
  try {
    return generateThemeFromPalette(
      { primary: palettePrimary.value, secondary: paletteSecondary.value, accent: paletteAccent.value },
      paletteVariant.value,
      { name: `palette-${paletteVariant.value}`, label: `Palette ${paletteVariant.value}` },
    )
  } catch { return null }
})

// ── CSS color-mix() ───────────────────────────────────────────────────────────
const cssMixVariant = ref<'light' | 'dark'>('light')
const cssMixOutput = computed(() => {
  try { return buildCssMixTheme(brandColor.value, 'brand', cssMixVariant.value) }
  catch { return '// error generating CSS' }
})
const cssMixCopied = ref(false)
async function copyCssMix() {
  try {
    await navigator.clipboard.writeText(cssMixOutput.value)
    cssMixCopied.value = true
    setTimeout(() => { cssMixCopied.value = false }, 1500)
  } catch {}
}
</script>

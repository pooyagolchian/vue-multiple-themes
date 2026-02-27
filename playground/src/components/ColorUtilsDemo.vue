<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-lg font-semibold text-zinc-100 mb-1">Color Utilities</h2>
      <p class="text-xs font-mono" style="color: var(--noir-muted)">
        Pure functions for color manipulation, harmony, and accessibility — all SSR-safe
      </p>
    </div>

    <!-- Base color picker -->
    <div class="rounded-md border p-5 space-y-4"
      style="background: var(--noir-surface); border-color: var(--noir-border)">
      <p class="text-xs font-mono text-zinc-400">// pick a base color</p>
      <div class="flex items-center gap-3">
        <input type="color" v-model="baseColor"
          class="w-12 h-10 rounded cursor-pointer border p-0.5"
          style="background: #09090b; border-color: var(--noir-border)" />
        <input type="text" v-model="baseColor" maxlength="7"
          class="px-3 py-2 rounded-md border text-sm font-mono outline-none w-36 focus:border-zinc-400 uppercase"
          style="background: #09090b; color: var(--noir-text); border-color: var(--noir-border)" />
        <span class="text-xs font-mono" style="color: var(--noir-muted)">
          HSL({{ hslValues[0] }}, {{ hslValues[1] }}%, {{ hslValues[2] }}%)
        </span>
      </div>
    </div>

    <!-- Lighten / Darken -->
    <div class="rounded-md border p-5 space-y-4"
      style="background: var(--noir-surface); border-color: var(--noir-border)">
      <p class="text-xs font-mono text-zinc-400">// lighten() &amp; darken()</p>
      <div class="space-y-3">
        <div>
          <p class="text-xs font-mono mb-2" style="color: var(--noir-muted)">lighten(color, amount)</p>
          <div class="flex gap-1">
            <div v-for="amt in lightenAmounts" :key="'l' + amt"
              class="flex-1 h-12 rounded-md border flex items-end justify-center pb-1 transition-all"
              :style="{ background: lightenResult(amt), borderColor: '#27272a' }">
              <span class="text-xs font-mono px-1 rounded"
                :style="{ color: autoContrastColor(lightenResult(amt)) }">+{{ amt }}</span>
            </div>
          </div>
        </div>
        <div>
          <p class="text-xs font-mono mb-2" style="color: var(--noir-muted)">darken(color, amount)</p>
          <div class="flex gap-1">
            <div v-for="amt in lightenAmounts" :key="'d' + amt"
              class="flex-1 h-12 rounded-md border flex items-end justify-center pb-1 transition-all"
              :style="{ background: darkenResult(amt), borderColor: '#27272a' }">
              <span class="text-xs font-mono px-1 rounded"
                :style="{ color: autoContrastColor(darkenResult(amt)) }">-{{ amt }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Saturate / Rotate Hue -->
    <div class="rounded-md border p-5 space-y-4"
      style="background: var(--noir-surface); border-color: var(--noir-border)">
      <p class="text-xs font-mono text-zinc-400">// saturate() &amp; rotateHue()</p>
      <div class="space-y-3">
        <div>
          <p class="text-xs font-mono mb-2" style="color: var(--noir-muted)">saturate(color, amount) — negative desaturates</p>
          <div class="flex gap-1">
            <div v-for="amt in saturateAmounts" :key="'s' + amt"
              class="flex-1 h-12 rounded-md border flex items-end justify-center pb-1 transition-all"
              :style="{ background: saturateResult(amt), borderColor: '#27272a' }">
              <span class="text-xs font-mono px-1 rounded"
                :style="{ color: autoContrastColor(saturateResult(amt)) }">{{ amt > 0 ? '+' : '' }}{{ amt }}</span>
            </div>
          </div>
        </div>
        <div>
          <p class="text-xs font-mono mb-2" style="color: var(--noir-muted)">rotateHue(color, degrees)</p>
          <div class="flex gap-1">
            <div v-for="deg in hueRotations" :key="'h' + deg"
              class="flex-1 h-12 rounded-md border flex items-end justify-center pb-1 transition-all"
              :style="{ background: rotateResult(deg), borderColor: '#27272a' }">
              <span class="text-xs font-mono px-1 rounded"
                :style="{ color: autoContrastColor(rotateResult(deg)) }">{{ deg }}°</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mix -->
    <div class="rounded-md border p-5 space-y-4"
      style="background: var(--noir-surface); border-color: var(--noir-border)">
      <p class="text-xs font-mono text-zinc-400">// mix(colorA, colorB, weight)</p>
      <div class="flex items-center gap-3 mb-3">
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono" style="color: var(--noir-muted)">mix with</span>
          <input type="color" v-model="mixTarget"
            class="w-8 h-8 rounded cursor-pointer border p-0.5"
            style="background: #09090b; border-color: var(--noir-border)" />
          <span class="text-xs font-mono text-zinc-500">{{ mixTarget }}</span>
        </div>
      </div>
      <div class="flex gap-1">
        <div v-for="w in mixWeights" :key="'m' + w"
          class="flex-1 h-12 rounded-md border flex items-end justify-center pb-1 transition-all"
          :style="{ background: mixResult(w), borderColor: '#27272a' }">
          <span class="text-xs font-mono px-1 rounded"
            :style="{ color: autoContrastColor(mixResult(w)) }">{{ Math.round(w * 100) }}%</span>
        </div>
      </div>
    </div>

    <!-- withAlpha -->
    <div class="rounded-md border p-5 space-y-4"
      style="background: var(--noir-surface); border-color: var(--noir-border)">
      <p class="text-xs font-mono text-zinc-400">// withAlpha(color, alpha)</p>
      <div class="flex gap-1"
        style="background-image: linear-gradient(45deg, #27272a 25%, transparent 25%), linear-gradient(-45deg, #27272a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #27272a 75%), linear-gradient(-45deg, transparent 75%, #27272a 75%); background-size: 16px 16px; background-position: 0 0, 0 8px, 8px -8px, -8px 0px; border-radius: 0.375rem; padding: 2px;">
        <div v-for="a in alphaValues" :key="'a' + a"
          class="flex-1 h-12 rounded flex items-end justify-center pb-1 transition-all"
          :style="{ background: alphaResult(a) }">
          <span class="text-xs font-mono px-1 rounded bg-black/50 text-zinc-200">{{ a }}</span>
        </div>
      </div>
      <p class="text-xs font-mono" style="color: var(--noir-muted)">
        {{ alphaResult(0.5) }}
      </p>
    </div>

    <!-- Color Scale -->
    <div class="rounded-md border p-5 space-y-4"
      style="background: var(--noir-surface); border-color: var(--noir-border)">
      <p class="text-xs font-mono text-zinc-400">// generateColorScale(color) — Tailwind-style 50–950</p>
      <div class="flex gap-0.5">
        <div v-for="[stop, hex] in scaleEntries" :key="stop"
          class="flex-1 overflow-hidden rounded transition-all"
          :style="{ background: hex }">
          <div class="h-16 flex items-end justify-center pb-1">
            <span class="text-xs font-mono px-0.5 rounded"
              :style="{ color: autoContrastColor(hex) }">{{ stop }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <span v-for="[stop, hex] in scaleEntries" :key="'t' + stop"
          class="text-xs font-mono px-1.5 py-0.5 rounded border"
          style="border-color: var(--noir-border); background: #09090b; color: var(--noir-muted)">
          {{ stop }}: {{ hex }}
        </span>
      </div>
    </div>

    <!-- Color Harmonies -->
    <div class="rounded-md border p-5 space-y-4"
      style="background: var(--noir-surface); border-color: var(--noir-border)">
      <p class="text-xs font-mono text-zinc-400">// color harmonies</p>
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="space-y-2">
          <p class="text-xs font-mono" style="color: var(--noir-muted)">complementary()</p>
          <div class="flex gap-2">
            <div class="flex-1 h-14 rounded-md border flex items-center justify-center"
              :style="{ background: baseColor, borderColor: '#27272a' }">
              <span class="text-xs font-mono px-1 rounded" :style="{ color: autoContrastColor(baseColor) }">base</span>
            </div>
            <div class="flex-1 h-14 rounded-md border flex items-center justify-center"
              :style="{ background: comp, borderColor: '#27272a' }">
              <span class="text-xs font-mono px-1 rounded" :style="{ color: autoContrastColor(comp) }">{{ comp }}</span>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-mono" style="color: var(--noir-muted)">splitComplementary()</p>
          <div class="flex gap-2">
            <div v-for="(c, i) in splitComp" :key="'sc' + i"
              class="flex-1 h-14 rounded-md border flex items-center justify-center"
              :style="{ background: c, borderColor: '#27272a' }">
              <span class="text-xs font-mono px-1 rounded" :style="{ color: autoContrastColor(c) }">{{ c }}</span>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-mono" style="color: var(--noir-muted)">triadic()</p>
          <div class="flex gap-2">
            <div v-for="(c, i) in triad" :key="'tr' + i"
              class="flex-1 h-14 rounded-md border flex items-center justify-center"
              :style="{ background: c, borderColor: '#27272a' }">
              <span class="text-xs font-mono px-1 rounded" :style="{ color: autoContrastColor(c) }">{{ c }}</span>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-mono" style="color: var(--noir-muted)">analogous()</p>
          <div class="flex gap-2">
            <div v-for="(c, i) in analog" :key="'an' + i"
              class="flex-1 h-14 rounded-md border flex items-center justify-center"
              :style="{ background: c, borderColor: '#27272a' }">
              <span class="text-xs font-mono px-1 rounded" :style="{ color: autoContrastColor(c) }">{{ c }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contrast Checker -->
    <div class="rounded-md border p-5 space-y-4"
      style="background: var(--noir-surface); border-color: var(--noir-border)">
      <p class="text-xs font-mono text-zinc-400">// contrastRatio() &amp; autoContrast()</p>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-xs font-mono" style="color: var(--noir-muted)">check against</span>
        <input type="color" v-model="contrastBg"
          class="w-8 h-8 rounded cursor-pointer border p-0.5"
          style="background: #09090b; border-color: var(--noir-border)" />
        <span class="text-xs font-mono text-zinc-500">{{ contrastBg }}</span>
      </div>

      <div class="rounded-md border overflow-hidden" style="border-color: var(--noir-border); background: #09090b">
        <div class="p-4 flex items-center gap-4" :style="{ background: contrastBg }">
          <span class="text-lg font-bold" :style="{ color: baseColor }">Sample Text</span>
          <span class="text-sm" :style="{ color: baseColor }">body copy</span>
        </div>
        <div class="p-3 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
          <div class="rounded border p-2 text-center" style="border-color: var(--noir-border)">
            <p style="color: var(--noir-muted)">ratio</p>
            <p class="text-zinc-200 font-semibold">{{ contrastReport.ratio.toFixed(2) }}:1</p>
          </div>
          <div v-for="level in contrastLevels" :key="level.key"
            class="rounded border p-2 text-center" style="border-color: var(--noir-border)">
            <p style="color: var(--noir-muted)">{{ level.label }}</p>
            <p class="font-semibold" :class="level.pass ? 'text-green-400' : 'text-zinc-600'">
              {{ level.pass ? 'PASS' : 'FAIL' }}
            </p>
          </div>
          <div class="rounded border p-2 text-center" style="border-color: var(--noir-border)">
            <p style="color: var(--noir-muted)">auto</p>
            <div class="w-5 h-5 rounded mx-auto mt-1 border"
              :style="{ background: autoContrastResult, borderColor: '#27272a' }" />
          </div>
        </div>
      </div>
    </div>

    <!-- Code reference -->
    <div class="rounded-md border overflow-hidden" style="border-color: var(--noir-border)">
      <div class="px-4 py-2 border-b" style="background: var(--noir-surface); border-color: var(--noir-border)">
        <span class="text-xs font-mono text-zinc-500">Available imports</span>
      </div>
      <pre class="p-4 text-xs font-mono overflow-x-auto leading-relaxed"
        style="background: #09090b; color: #71717a"><code>import {
  // Parsing
  hexToRgb, rgbToHex, rgbToHsl, hslToRgb, hexToHsl, hslToHex, parseColor,
  // Manipulation
  lighten, darken, saturate, rotateHue, mix, withAlpha,
  // Contrast &amp; accessibility
  luminance, contrastRatio, autoContrast, ensureContrast,
  // Color scale &amp; harmony
  generateColorScale, complementary, splitComplementary, triadic, analogous,
} from 'vue-multiple-themes'</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  hexToHsl,
  lighten,
  darken,
  saturate,
  rotateHue,
  mix,
  withAlpha,
  autoContrast,
  generateColorScale,
  complementary,
  splitComplementary,
  triadic,
  analogous,
  checkContrast,
} from 'vue-multiple-themes'

const baseColor = ref('#6366f1')
const mixTarget = ref('#10b981')
const contrastBg = ref('#ffffff')

const hslValues = computed(() => hexToHsl(baseColor.value))

const lightenAmounts = [0, 5, 10, 15, 20, 25, 30, 35]
const saturateAmounts = [-40, -30, -20, -10, 0, 10, 20, 30]
const hueRotations = [0, 30, 60, 90, 120, 180, 240, 300]
const mixWeights = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1]
const alphaValues = [1, 0.85, 0.7, 0.55, 0.4, 0.25, 0.1, 0.05]

function lightenResult(amt: number) { return lighten(baseColor.value, amt) }
function darkenResult(amt: number) { return darken(baseColor.value, amt) }
function saturateResult(amt: number) { return saturate(baseColor.value, amt) }
function rotateResult(deg: number) { return rotateHue(baseColor.value, deg) }
function mixResult(w: number) { return mix(baseColor.value, mixTarget.value, w) }
function alphaResult(a: number) { return withAlpha(baseColor.value, a) }
function autoContrastColor(bg: string) {
  try { return autoContrast(bg) } catch { return '#ffffff' }
}

const scaleEntries = computed<[string, string][]>(() => {
  try {
    return Object.entries(generateColorScale(baseColor.value)) as [string, string][]
  } catch { return [] }
})

const comp = computed(() => { try { return complementary(baseColor.value) } catch { return baseColor.value } })
const splitComp = computed(() => { try { return splitComplementary(baseColor.value) } catch { return [baseColor.value, baseColor.value, baseColor.value] } })
const triad = computed(() => { try { return triadic(baseColor.value) } catch { return [baseColor.value, baseColor.value, baseColor.value] } })
const analog = computed(() => { try { return analogous(baseColor.value) } catch { return [baseColor.value, baseColor.value, baseColor.value] } })

const contrastReport = computed(() => {
  try { return checkContrast(baseColor.value, contrastBg.value) }
  catch { return { ratio: 0, aa: false, aaLarge: false, aaa: false, aaaLarge: false } }
})

const contrastLevels = computed(() => [
  { key: 'aa', label: 'AA', pass: contrastReport.value.aa },
  { key: 'aaLarge', label: 'AA Large', pass: contrastReport.value.aaLarge },
  { key: 'aaa', label: 'AAA', pass: contrastReport.value.aaa },
  { key: 'aaaLarge', label: 'AAA Large', pass: contrastReport.value.aaaLarge },
])

const autoContrastResult = computed(() => {
  try { return autoContrast(contrastBg.value) } catch { return '#ffffff' }
})
</script>

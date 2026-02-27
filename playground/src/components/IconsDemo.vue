<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-lg font-semibold text-zinc-100 mb-1">Built-in Icons</h2>
      <p class="text-xs font-mono" style="color: var(--noir-muted)">
        VmtIcon component + iconToSvg() utility — {{ iconNames.length }} Lucide icons included
      </p>
    </div>

    <div class="rounded-md border overflow-hidden" style="border-color: var(--noir-border)">
      <div class="px-4 py-2 border-b" style="background: var(--noir-surface); border-color: var(--noir-border)">
        <span class="text-xs font-mono text-zinc-500">Usage.vue</span>
      </div>
      <pre class="p-4 text-xs font-mono overflow-x-auto leading-relaxed"
        style="background: #09090b; color: #71717a"><code>import { VmtIcon } from 'vue-multiple-themes'

&lt;VmtIcon name="sun" :size="24" color="currentColor" /&gt;
&lt;VmtIcon name="moon" :size="20" :stroke-width="1.5" /&gt;

// Or as raw SVG string:
import { iconToSvg } from 'vue-multiple-themes'
const svg = iconToSvg('palette', 32, '#3b82f6')</code></pre>
    </div>

    <div class="rounded-md border p-5 space-y-4"
      style="background: var(--noir-surface); border-color: var(--noir-border)">
      <div class="flex items-center justify-between">
        <p class="text-xs font-mono text-zinc-400">// all available icons</p>
        <div class="flex items-center gap-2">
          <label class="text-xs font-mono" style="color: var(--noir-muted)">size</label>
          <input type="range" v-model.number="iconSize" min="14" max="40" step="2"
            class="w-20 accent-zinc-400" />
          <span class="text-xs font-mono text-zinc-500 w-6 text-right">{{ iconSize }}</span>
        </div>
      </div>

      <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
        <div v-for="name in iconNames" :key="name"
          class="flex flex-col items-center gap-2 p-3 rounded-md border cursor-pointer transition-all hover:border-zinc-500"
          :style="{
            borderColor: selectedIcon === name ? '#fafafa' : 'var(--noir-border)',
            background: selectedIcon === name ? '#fafafa08' : '#09090b',
          }"
          @click="selectIcon(name)">
          <VmtIcon :name="name" :size="iconSize" :color="iconColor" :stroke-width="strokeWidth" />
          <span class="text-xs font-mono truncate w-full text-center" style="color: var(--noir-muted)">{{ name }}</span>
        </div>
      </div>
    </div>

    <div class="rounded-md border p-5 space-y-4"
      style="background: var(--noir-surface); border-color: var(--noir-border)">
      <p class="text-xs font-mono text-zinc-400">// customize</p>
      <div class="flex flex-wrap items-end gap-4">
        <div class="space-y-1">
          <label class="text-xs font-mono" style="color: var(--noir-muted)">color</label>
          <div class="flex gap-2">
            <input type="color" v-model="iconColor"
              class="w-10 h-9 rounded cursor-pointer border p-0.5"
              style="background: #09090b; border-color: var(--noir-border)" />
            <input type="text" v-model="iconColor" maxlength="7"
              class="px-2 py-1.5 rounded-md border text-xs font-mono outline-none w-24 uppercase focus:border-zinc-400"
              style="background: #09090b; color: var(--noir-text); border-color: var(--noir-border)" />
          </div>
        </div>
        <div class="space-y-1">
          <label class="text-xs font-mono" style="color: var(--noir-muted)">stroke</label>
          <input type="range" v-model.number="strokeWidth" min="1" max="4" step="0.5"
            class="w-24 accent-zinc-400 block h-9" />
        </div>
        <div class="space-y-1">
          <label class="text-xs font-mono" style="color: var(--noir-muted)">theme colors</label>
          <div class="flex gap-1.5">
            <button v-for="tc in themeColors" :key="tc.label"
              class="px-2 py-1.5 text-xs font-mono rounded border transition-all hover:border-zinc-500"
              style="border-color: var(--noir-border)"
              @click="iconColor = tc.var">
              <span class="w-3 h-3 rounded-full inline-block mr-1" :style="{ background: tc.var }" />
              {{ tc.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-6 p-4 rounded-md border"
        style="border-color: var(--noir-border); background: #09090b">
        <VmtIcon :name="selectedIcon" :size="40" :color="iconColor" :stroke-width="strokeWidth" />
        <div class="space-y-1">
          <p class="text-sm font-mono text-zinc-200">{{ selectedIcon }}</p>
          <p class="text-xs font-mono" style="color: var(--noir-muted)">
            size={{ iconSize }} stroke={{ strokeWidth }} color={{ iconColor }}
          </p>
        </div>
      </div>
    </div>

    <div class="rounded-md border overflow-hidden" style="border-color: var(--noir-border)">
      <div class="flex items-center justify-between px-4 py-2 border-b"
        style="background: var(--noir-surface); border-color: var(--noir-border)">
        <span class="text-xs font-mono text-zinc-500">iconToSvg() output</span>
        <button class="text-xs font-mono transition-colors" style="color: var(--noir-muted)" @click="copySvg">
          {{ svgCopied ? 'copied' : 'copy' }}
        </button>
      </div>
      <pre class="p-4 text-xs font-mono overflow-x-auto leading-relaxed"
        style="background: #09090b; color: #a1a1aa">{{ svgOutput }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { VmtIcon, LUCIDE_ICONS, iconToSvg } from 'vue-multiple-themes'

const iconNames = Object.keys(LUCIDE_ICONS)
const iconSize = ref(24)
const iconColor = ref('#fafafa')
const strokeWidth = ref(2)
const selectedIcon = ref('palette')

const themeColors = [
  { label: 'primary', var: 'var(--vmt-primary)' },
  { label: 'text', var: 'var(--vmt-text)' },
  { label: 'accent', var: 'var(--vmt-accent)' },
]

function selectIcon(name: string) {
  selectedIcon.value = name
}

const svgOutput = computed(() => iconToSvg(selectedIcon.value, iconSize.value, iconColor.value, strokeWidth.value))

const svgCopied = ref(false)
async function copySvg() {
  try {
    await navigator.clipboard.writeText(svgOutput.value)
    svgCopied.value = true
    setTimeout(() => { svgCopied.value = false }, 1500)
  } catch {}
}
</script>

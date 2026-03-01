<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-lg font-semibold text-zinc-100 mb-1">Icon System</h2>
      <p class="text-xs font-mono" style="color: var(--noir-muted)">
        VmtIcon forwards to any Vue component — {{ icons.length }} examples from
        <code class="text-zinc-400">lucide-vue-next</code>
      </p>
    </div>

    <!-- Usage code block -->
    <div class="rounded-md border overflow-hidden" style="border-color: var(--noir-border)">
      <div class="px-4 py-2 border-b" style="background: var(--noir-surface); border-color: var(--noir-border)">
        <span class="text-xs font-mono text-zinc-500">Usage.vue</span>
      </div>
      <pre class="p-4 text-xs font-mono overflow-x-auto leading-relaxed"
        style="background: #09090b; color: #71717a"><code>import { Sun, Moon, Palette } from 'lucide-vue-next'
import { VmtIcon } from 'vue-multiple-themes'

&lt;!-- via VmtIcon wrapper (unified size / stroke / color) --&gt;
&lt;VmtIcon :as="Sun"  :size="24" color="currentColor" /&gt;
&lt;VmtIcon :as="Moon" :size="20" :stroke-width="1.5" /&gt;

&lt;!-- or use the component directly --&gt;
&lt;Sun :size="24" /&gt;

&lt;!-- assign to ThemeDefinition.icon --&gt;
const themes = [
  { name: 'light', label: 'Light', icon: Sun,  colors: { ... } },
  { name: 'dark',  label: 'Dark',  icon: Moon, colors: { ... } },
]</code></pre>
    </div>

    <!-- Icon grid -->
    <div class="rounded-md border p-5 space-y-4"
      style="background: var(--noir-surface); border-color: var(--noir-border)">
      <div class="flex items-center justify-between">
        <p class="text-xs font-mono text-zinc-400">// lucide-vue-next components via VmtIcon :as</p>
        <div class="flex items-center gap-2">
          <label class="text-xs font-mono" style="color: var(--noir-muted)">size</label>
          <input type="range" v-model.number="iconSize" min="14" max="40" step="2"
            class="w-20 accent-zinc-400" />
          <span class="text-xs font-mono text-zinc-500 w-6 text-right">{{ iconSize }}</span>
        </div>
      </div>

      <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
        <div v-for="entry in icons" :key="entry.name"
          class="flex flex-col items-center gap-2 p-3 rounded-md border cursor-pointer transition-all hover:border-zinc-500"
          :style="{
            borderColor: selectedEntry?.name === entry.name ? '#fafafa' : 'var(--noir-border)',
            background: selectedEntry?.name === entry.name ? '#fafafa08' : '#09090b',
          }"
          @click="selectedEntry = entry">
          <VmtIcon :as="entry.component" :size="iconSize" :color="iconColor" :stroke-width="strokeWidth" />
          <span class="text-xs font-mono truncate w-full text-center" style="color: var(--noir-muted)">{{ entry.name }}</span>
        </div>
      </div>
    </div>

    <!-- Customize panel -->
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
            <button v-for="tc in themeColorButtons" :key="tc.label"
              class="px-2 py-1.5 text-xs font-mono rounded border transition-all hover:border-zinc-500"
              style="border-color: var(--noir-border)"
              @click="iconColor = tc.val">
              <span class="w-3 h-3 rounded-full inline-block mr-1" :style="{ background: tc.val }" />
              {{ tc.label }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="selectedEntry" class="flex items-center gap-6 p-4 rounded-md border"
        style="border-color: var(--noir-border); background: #09090b">
        <VmtIcon :as="selectedEntry.component" :size="40" :color="iconColor" :stroke-width="strokeWidth" />
        <div class="space-y-1">
          <p class="text-sm font-mono text-zinc-200">{{ selectedEntry.name }}</p>
          <p class="text-xs font-mono" style="color: var(--noir-muted)">
            size={{ iconSize }} stroke={{ strokeWidth }} color={{ iconColor }}
          </p>
          <p class="text-xs font-mono text-zinc-600">
            import &#123; {{ selectedEntry.name }} &#125; from 'lucide-vue-next'
          </p>
        </div>
      </div>
    </div>

    <!-- PRESET_THEMES pattern -->
    <div class="rounded-md border overflow-hidden" style="border-color: var(--noir-border)">
      <div class="px-4 py-2 border-b" style="background: var(--noir-surface); border-color: var(--noir-border)">
        <span class="text-xs font-mono text-zinc-500">Attach icons to PRESET_THEMES</span>
      </div>
      <pre class="p-4 text-xs font-mono overflow-x-auto leading-relaxed"
        style="background: #09090b; color: #71717a"><code>import { Sun, Moon, Monitor, Coffee, Leaf, Droplets, Flame, Snowflake } from 'lucide-vue-next'
import { PRESET_THEMES } from 'vue-multiple-themes'

const presetIcons: Record&lt;string, Component&gt; = {
  light: Sun, dark: Moon, system: Monitor,
  cafe: Coffee, nature: Leaf, ocean: Droplets,
  flame: Flame, nord: Snowflake,
}

const themes = PRESET_THEMES.map(t =&gt; ({
  ...t,
  icon: presetIcons[t.name],
}))</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Component } from 'vue'
import {
  Sun, Moon, Monitor, Coffee, Leaf, Droplets, Flame, Snowflake,
  Palette, Eye, Star, Zap, Heart, Cloud, Wind, Sunset,
  Sunrise, Laptop, Globe, Layers, Sparkles, Brush, Rainbow,
} from 'lucide-vue-next'
import { VmtIcon } from 'vue-multiple-themes'

interface IconEntry { name: string; component: Component }

const icons: IconEntry[] = [
  { name: 'Sun',      component: Sun },
  { name: 'Moon',     component: Moon },
  { name: 'Monitor',  component: Monitor },
  { name: 'Coffee',   component: Coffee },
  { name: 'Leaf',     component: Leaf },
  { name: 'Droplets', component: Droplets },
  { name: 'Flame',    component: Flame },
  { name: 'Snowflake',component: Snowflake },
  { name: 'Palette',  component: Palette },
  { name: 'Eye',      component: Eye },
  { name: 'Star',     component: Star },
  { name: 'Zap',      component: Zap },
  { name: 'Heart',    component: Heart },
  { name: 'Cloud',    component: Cloud },
  { name: 'Wind',     component: Wind },
  { name: 'Sunset',   component: Sunset },
  { name: 'Sunrise',  component: Sunrise },
  { name: 'Laptop',   component: Laptop },
  { name: 'Globe',    component: Globe },
  { name: 'Layers',   component: Layers },
  { name: 'Sparkles', component: Sparkles },
  { name: 'Brush',    component: Brush },
  { name: 'Rainbow',  component: Rainbow },
]

const iconSize = ref(24)
const iconColor = ref('#fafafa')
const strokeWidth = ref(2)
const selectedEntry = ref<IconEntry>(icons.find(i => i.name === 'Palette')!)

const themeColorButtons = [
  { label: 'primary', val: 'var(--vmt-primary-color)' },
  { label: 'text',    val: 'var(--vmt-text-color)' },
  { label: 'accent',  val: 'var(--vmt-accent-color)' },
]
</script>

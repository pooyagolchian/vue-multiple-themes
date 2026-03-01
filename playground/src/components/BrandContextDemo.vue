<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-lg font-semibold text-zinc-100 mb-1">Brand Context</h2>
      <p class="text-xs font-mono" style="color: var(--noir-muted)">
        <code class="text-zinc-400">createBrandContext()</code> — isolated namespaced theme engines for white-label &amp; multi-tenant apps
      </p>
    </div>

    <!-- Usage code -->
    <div class="rounded-md border overflow-hidden" style="border-color: var(--noir-border)">
      <div class="px-4 py-2 border-b" style="background: var(--noir-surface); border-color: var(--noir-border)">
        <span class="text-xs font-mono text-zinc-500">brand-setup.ts</span>
      </div>
      <pre class="p-4 text-xs font-mono overflow-x-auto leading-relaxed"
        style="background: #09090b; color: #71717a"><code>import { createBrandContext } from 'vue-multiple-themes'

// ── Brand A (Acme) ────────────────────────────────────────────
export const acme = createBrandContext({
  namespace:     'acme',
  storageKey:    'acme-theme',
  cssVarPrefix:  '--acme-',
  themes:        acmeThemes,
  defaultTheme:  'acme-light',
  strategy:      'attribute',
})

// ── Brand B (Beta) ────────────────────────────────────────────
export const beta = createBrandContext({
  namespace:     'beta',
  storageKey:    'beta-theme',
  cssVarPrefix:  '--beta-',
  themes:        betaThemes,
  defaultTheme:  'beta-light',
  strategy:      'attribute',
})

// In main.ts — install both plugins:
app.use(acme.BrandPlugin)
app.use(beta.BrandPlugin)

// In a component — use each brand independently:
const acmeState = acme.useTheme()
const betaState = beta.useTheme()</code></pre>
    </div>

    <!-- Live demo - two brands side by side -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Acme brand card -->
      <div class="rounded-lg border overflow-hidden" style="border-color: var(--noir-border)">
        <div class="px-4 py-3 border-b flex items-center justify-between"
          style="background: var(--noir-surface); border-color: var(--noir-border)">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full" :style="{ background: acmeCurrent.primary }"/>
            <span class="text-xs font-mono text-zinc-400">acme</span>
            <span class="px-1.5 py-0.5 text-xs font-mono rounded"
              style="background: rgba(255,255,255,0.05); color: var(--noir-muted)">
              {{ acmeState.current }}
            </span>
          </div>
          <div class="flex gap-1">
            <button v-for="t in acmeState.themes" :key="t.name"
              class="w-5 h-5 rounded-full border-2 transition-all hover:scale-110"
              :style="{
                background: t.colors.primary ?? '#6366f1',
                borderColor: t.name === acmeState.current ? '#fafafa' : 'transparent',
              }"
              @click="acmeState.setTheme(t.name)"
              :title="t.label ?? t.name" />
          </div>
        </div>
        <div class="p-4 space-y-3" style="background: #09090b">
          <div class="h-2 rounded-full" :style="{ background: acmeCurrent.primary }"/>
          <div class="h-2 rounded-full w-3/4" :style="{ background: acmeCurrent.secondary ?? '#e5e7eb', opacity: 0.5 }"/>
          <div class="h-2 rounded-full w-1/2" :style="{ background: acmeCurrent.accent ?? '#a78bfa', opacity: 0.4 }"/>
          <div class="flex gap-2 pt-1">
            <div class="px-3 py-1.5 rounded text-xs font-mono"
              :style="{ background: acmeCurrent.primary, color: acmeCurrent.textInverse ?? '#fff' }">
              primary
            </div>
            <div class="px-3 py-1.5 rounded text-xs font-mono border"
              :style="{ borderColor: acmeCurrent.border ?? '#374151', color: acmeCurrent.text ?? '#f9fafb' }">
              {{ acmeState.isDark ? 'dark' : 'light' }}
            </div>
          </div>
          <p class="text-xs font-mono" style="color: #52525b">
            namespace: acme · storageKey: acme-theme · prefix: --acme-
          </p>
        </div>
      </div>

      <!-- Beta brand card -->
      <div class="rounded-lg border overflow-hidden" style="border-color: var(--noir-border)">
        <div class="px-4 py-3 border-b flex items-center justify-between"
          style="background: var(--noir-surface); border-color: var(--noir-border)">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full" :style="{ background: betaCurrent.primary }"/>
            <span class="text-xs font-mono text-zinc-400">beta</span>
            <span class="px-1.5 py-0.5 text-xs font-mono rounded"
              style="background: rgba(255,255,255,0.05); color: var(--noir-muted)">
              {{ betaState.current }}
            </span>
          </div>
          <div class="flex gap-1">
            <button v-for="t in betaState.themes" :key="t.name"
              class="w-5 h-5 rounded-full border-2 transition-all hover:scale-110"
              :style="{
                background: t.colors.primary ?? '#ec4899',
                borderColor: t.name === betaState.current ? '#fafafa' : 'transparent',
              }"
              @click="betaState.setTheme(t.name)"
              :title="t.label ?? t.name" />
          </div>
        </div>
        <div class="p-4 space-y-3" style="background: #09090b">
          <div class="h-2 rounded-full" :style="{ background: betaCurrent.primary }"/>
          <div class="h-2 rounded-full w-3/4" :style="{ background: betaCurrent.secondary ?? '#e5e7eb', opacity: 0.5 }"/>
          <div class="h-2 rounded-full w-1/2" :style="{ background: betaCurrent.accent ?? '#f472b6', opacity: 0.4 }"/>
          <div class="flex gap-2 pt-1">
            <div class="px-3 py-1.5 rounded text-xs font-mono"
              :style="{ background: betaCurrent.primary, color: betaCurrent.textInverse ?? '#fff' }">
              primary
            </div>
            <div class="px-3 py-1.5 rounded text-xs font-mono border"
              :style="{ borderColor: betaCurrent.border ?? '#374151', color: betaCurrent.text ?? '#f9fafb' }">
              {{ betaState.isDark ? 'dark' : 'light' }}
            </div>
          </div>
          <p class="text-xs font-mono" style="color: #52525b">
            namespace: beta · storageKey: beta-theme · prefix: --beta-
          </p>
        </div>
      </div>
    </div>

    <!-- Isolation notice -->
    <div class="rounded-md border p-4" style="background: var(--noir-surface); border-color: var(--noir-border)">
      <p class="text-xs font-mono text-zinc-400 mb-2">// what gets isolated per namespace</p>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div class="space-y-1">
          <p class="text-zinc-300">&lt;style&gt; tag</p>
          <p style="color: var(--noir-muted)">id="vmt-theme-styles-acme"</p>
          <p style="color: var(--noir-muted)">id="vmt-theme-styles-beta"</p>
        </div>
        <div class="space-y-1">
          <p class="text-zinc-300">singleton key</p>
          <p style="color: var(--noir-muted)">acme:acme-theme</p>
          <p style="color: var(--noir-muted)">beta:beta-theme</p>
        </div>
        <div class="space-y-1">
          <p class="text-zinc-300">provide key</p>
          <p style="color: var(--noir-muted)">vmt:options:acme</p>
          <p style="color: var(--noir-muted)">vmt:options:beta</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBrandContext } from 'vue-multiple-themes'
import type { ThemeDefinition } from 'vue-multiple-themes'

// ── Acme brand: indigo / violet palette ──────────────────────────────────────
const acmeThemes: ThemeDefinition[] = [
  {
    name: 'acme-light',
    label: 'Acme Light',
    colors: {
      primary:     '#6366f1',
      secondary:   '#8b5cf6',
      accent:      '#a78bfa',
      background:  '#fafaf9',
      surface:     '#ffffff',
      text:        '#18181b',
      textInverse: '#ffffff',
      border:      '#e4e4e7',
    },
  },
  {
    name: 'acme-dark',
    label: 'Acme Dark',
    colors: {
      primary:     '#818cf8',
      secondary:   '#a78bfa',
      accent:      '#c4b5fd',
      background:  '#0f0f13',
      surface:     '#18181b',
      text:        '#f4f4f5',
      textInverse: '#09090b',
      border:      '#27272a',
    },
  },
  {
    name: 'acme-ocean',
    label: 'Acme Ocean',
    colors: {
      primary:     '#06b6d4',
      secondary:   '#0891b2',
      accent:      '#67e8f9',
      background:  '#0c1320',
      surface:     '#0f172a',
      text:        '#e0f2fe',
      textInverse: '#0c4a6e',
      border:      '#1e3a5f',
    },
  },
]

// ── Beta brand: rose / pink palette ──────────────────────────────────────────
const betaThemes: ThemeDefinition[] = [
  {
    name: 'beta-light',
    label: 'Beta Light',
    colors: {
      primary:     '#ec4899',
      secondary:   '#f472b6',
      accent:      '#fb7185',
      background:  '#fffbfe',
      surface:     '#ffffff',
      text:        '#1c1917',
      textInverse: '#ffffff',
      border:      '#fce7f3',
    },
  },
  {
    name: 'beta-dark',
    label: 'Beta Dark',
    colors: {
      primary:     '#f472b6',
      secondary:   '#fb7185',
      accent:      '#fda4af',
      background:  '#120a10',
      surface:     '#1c0f1a',
      text:        '#fdf2f8',
      textInverse: '#120a10',
      border:      '#3b1030',
    },
  },
  {
    name: 'beta-coral',
    label: 'Beta Coral',
    colors: {
      primary:     '#f97316',
      secondary:   '#fb923c',
      accent:      '#fdba74',
      background:  '#fefaf7',
      surface:     '#ffffff',
      text:        '#1c0a00',
      textInverse: '#ffffff',
      border:      '#fed7aa',
    },
  },
]

// ── Create isolated brand contexts ────────────────────────────────────────────
const acme = createBrandContext({
  namespace: 'acme',
  storageKey: 'acme-theme',
  cssVarPrefix: '--acme-',
  themes: acmeThemes,
  defaultTheme: 'acme-light',
  strategy: 'attribute',
  // Use a non-html target so the demo doesn't overwrite the page themes
  target: '#vmt-demo-acme',
  injectCssVars: false,  // demo: skip injecting to avoid conflicts
})

const beta = createBrandContext({
  namespace: 'beta',
  storageKey: 'beta-theme',
  cssVarPrefix: '--beta-',
  themes: betaThemes,
  defaultTheme: 'beta-light',
  strategy: 'attribute',
  target: '#vmt-demo-beta',
  injectCssVars: false,
})

const acmeState = acme.useTheme()
const betaState = beta.useTheme()

// Convenient color accessors (reads from the reactive theme definition)
const acmeCurrent = computed(() => acmeState.theme.colors)
const betaCurrent = computed(() => betaState.theme.colors)
</script>

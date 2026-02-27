<template>
    <div class="min-h-screen" style="background: var(--vmt-background); color: var(--vmt-text)">
        <!-- ── Header ─────────────────────────────────────────────────────────── -->
        <header class="sticky top-0 z-50 border-b px-6 py-3 flex items-center justify-between"
            style="background: var(--vmt-surface); border-color: var(--vmt-border)">
            <div class="flex items-center gap-3">
                <span class="text-xl font-bold" style="color: var(--vmt-primary)">🎨</span>
                <span class="font-semibold text-sm">vue-multiple-themes</span>
                <span class="text-xs px-2 py-0.5 rounded-full font-mono"
                    style="background: var(--vmt-surface-elevated); color: var(--vmt-text-muted)">
                    v4.0
                </span>
            </div>

            <!-- Theme switcher component with custom picker slot -->
            <VueMultipleThemes :themes="themes" strategy="both" storage-key="pg-theme" :show-toggle="false"
                @change="handleThemeChange">
                <template #default="{ theme, themes: allThemes, setTheme }">
                    <div class="flex items-center gap-1">
                        <button v-for="t in allThemes" :key="t.name" :title="t.label ?? t.name"
                            class="w-8 h-8 rounded-full border-2 transition-all duration-200 flex items-center justify-center text-xs"
                            :style="{
                                background: t.colors.primary ?? '#3b82f6',
                                borderColor: t.name === theme.name ? 'var(--vmt-text)' : 'transparent',
                                transform: t.name === theme.name ? 'scale(1.2)' : 'scale(1)',
                            }" @click="setTheme(t.name)">
                            <span class="sr-only">{{ t.label ?? t.name }}</span>
                        </button>
                    </div>
                </template>
            </VueMultipleThemes>
        </header>

        <!-- ── Main content ───────────────────────────────────────────────────── -->
        <main class="max-w-5xl mx-auto p-6 space-y-10">

            <!-- Active theme info -->
            <section class="rounded-2xl p-6 border"
                style="background: var(--vmt-surface); border-color: var(--vmt-border)">
                <h1 class="text-2xl font-bold mb-1" style="color: var(--vmt-primary)">
                    🎨 vue-multiple-themes Playground
                </h1>
                <p class="text-sm" style="color: var(--vmt-text-muted)">
                    Active theme: <strong style="color: var(--vmt-text)">{{ activeTheme?.label ?? activeTheme?.name
                        }}</strong>
                </p>

                <!-- Quick toggle -->
                <div class="mt-4 flex flex-wrap gap-2">
                    <button v-for="t in themes" :key="t.name"
                        class="px-4 py-1.5 rounded-lg text-sm font-medium border transition-all" :style="{
                            background: currentThemeName === t.name ? t.colors.primary : 'transparent',
                            color: currentThemeName === t.name ? (t.colors.textInverse ?? '#fff') : 'var(--vmt-text)',
                            borderColor: currentThemeName === t.name ? 'transparent' : 'var(--vmt-border)',
                        }" @click="switchTheme(t.name)">
                        {{ t.label ?? t.name }}
                    </button>
                </div>
            </section>

            <!-- Color palette preview -->
            <ColorPaletteDemo :theme="activeTheme" />

            <!-- Component demo -->
            <ComponentsDemo />

            <!-- CSS Variables demo -->
            <CssVarsDemo />

            <!-- Tailwind demo -->
            <TailwindDemo />

            <!-- Composable API demo -->
            <ComposableDemo />

        </main>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PRESET_THEMES } from 'vue-multiple-themes'
import type { ThemeDefinition } from 'vue-multiple-themes'
import ColorPaletteDemo from './components/ColorPaletteDemo.vue'
import ComponentsDemo from './components/ComponentsDemo.vue'
import ComposableDemo from './components/ComposableDemo.vue'
import CssVarsDemo from './components/CssVarsDemo.vue'
import TailwindDemo from './components/TailwindDemo.vue'

const themes = PRESET_THEMES
const currentThemeName = ref<string>('light')
const activeTheme = ref<ThemeDefinition>(themes[0])

function handleThemeChange(theme: ThemeDefinition) {
    currentThemeName.value = theme.name
    activeTheme.value = theme
}

function switchTheme(name: string) {
    const t = themes.find((t) => t.name === name)
    if (!t) return
    currentThemeName.value = name
    activeTheme.value = t
    // Apply directly
    document.documentElement.setAttribute('data-theme', name)
}
</script>

<template>
    <div class="min-h-screen bg-noir-950 text-white font-sans">
        <!-- ── Header ─────────────────────────────────────────────────────────── -->
        <header
            class="sticky top-0 z-50 border-b border-noir-800 backdrop-blur-md bg-noir-950/80">
            <div class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <img src="/favicon.png" alt="Logo" class="w-8 h-8 rounded-lg shadow-lg border border-white/10" />
                    <span class="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 tracking-tight">VMT</span>
                    <span class="badge border border-noir-800 bg-noir-900 text-noir-500 font-mono">v5.0.1</span>
                </div>

                <!-- Theme dot picker -->
                <VueMultipleThemes :themes="themes" strategy="both" storage-key="pg-theme" :show-toggle="false"
                    @change="handleThemeChange">
                    <template #default="{ theme, themes: allThemes, setTheme }">
                        <div class="flex items-center gap-1.5">
                            <button v-for="t in allThemes" :key="t.name" :title="t.label ?? t.name"
                                class="w-6 h-6 rounded-full border-2 transition-all duration-200 hover:scale-110 focus-ring"
                                :style="{
                                    background: t.colors.primary ?? '#3b82f6',
                                    borderColor: t.name === theme.name ? '#fafafa' : 'transparent',
                                    transform: t.name === theme.name ? 'scale(1.15)' : 'scale(1)',
                                }" @click="setTheme(t.name)">
                                <span class="sr-only">{{ t.label ?? t.name }}</span>
                            </button>
                        </div>
                    </template>
                </VueMultipleThemes>
            </div>
        </header>

        <!-- ── Main content ───────────────────────────────────────────────────── -->
        <main class="max-w-6xl mx-auto px-6 py-12 space-y-16">

            <!-- Hero section -->
            <section class="space-y-6">
                <div class="space-y-3">
                    <h1 class="text-3xl sm:text-4xl font-bold tracking-tight">
                        Playground
                    </h1>
                    <p class="text-noir-500 text-base max-w-2xl leading-relaxed">
                        Interactive showcase of every feature in vue-multiple-themes.
                        Switch themes using the dots above to see everything update live.
                    </p>
                </div>

                <!-- Theme pills -->
                <div class="flex flex-wrap gap-2">
                    <button v-for="t in themes" :key="t.name"
                        class="btn text-xs px-3 py-1.5 transition-all"
                        :class="currentThemeName === t.name
                            ? 'bg-white text-noir-950 hover:bg-noir-200'
                            : 'btn-secondary'"
                        @click="switchTheme(t.name)">
                        {{ t.label ?? t.name }}
                    </button>
                </div>

                <div class="flex items-center gap-3 text-xs text-noir-600 font-mono">
                    <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active: <span class="text-noir-400">{{ activeTheme?.label ?? activeTheme?.name }}</span>
                </div>
            </section>

            <!-- Separator -->
            <div class="border-t border-noir-800/50" />

            <!-- Demo sections -->
            <ColorPaletteDemo :theme="activeTheme" />
            <ComponentsDemo />
            <CssVarsDemo />
            <TailwindDemo />
            <ComposableDemo />
            <GeneratorDemo />
            <ColorUtilsDemo />
            <IconsDemo />

            <!-- Footer -->
            <footer class="border-t border-noir-800/50 pt-8 pb-12">
                <div class="flex items-center justify-between text-xs text-noir-600">
                    <span class="font-mono">vue-multiple-themes</span>
                    <span>MIT &middot; Pooya Golchian</span>
                </div>
            </footer>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PRESET_THEMES } from 'vue-multiple-themes'
import type { ThemeDefinition } from 'vue-multiple-themes'
import ColorPaletteDemo from './components/ColorPaletteDemo.vue'
import ColorUtilsDemo from './components/ColorUtilsDemo.vue'
import ComponentsDemo from './components/ComponentsDemo.vue'
import ComposableDemo from './components/ComposableDemo.vue'
import CssVarsDemo from './components/CssVarsDemo.vue'
import GeneratorDemo from './components/GeneratorDemo.vue'
import IconsDemo from './components/IconsDemo.vue'
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
    document.documentElement.setAttribute('data-theme', name)
}
</script>

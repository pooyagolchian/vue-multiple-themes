<template>
    <div class="vmt-demo-block">
        <!-- Live preview area -->
        <div class="vmt-demo-preview">
            <!-- Theme colour swatches -->
            <div v-if="showPicker" class="flex flex-wrap gap-2 mb-4">
                <button v-for="t in ts.themes" :key="t.name"
                    class="px-3 py-1 rounded-full text-xs font-medium border transition-all" :style="{
                        background: ts.current === t.name ? t.colors.primary : 'transparent',
                        color: ts.current === t.name ? (t.colors.textInverse ?? '#fff') : 'inherit',
                        borderColor: t.colors.primary ?? '#3b82f6',
                    }" @click="set(t.name)">
                    {{ t.label ?? t.name }}
                </button>
            </div>

            <!-- Slot for custom demo content -->
            <slot :theme="activeTheme" :current="ts.current" :isDark="ts.isDark" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PRESET_THEMES, useTheme } from 'vue-multiple-themes'
import type { ThemeDefinition } from 'vue-multiple-themes'

const props = withDefaults(
    defineProps<{
        showPicker?: boolean
        initialTheme?: string
    }>(),
    { showPicker: true, initialTheme: 'light' },
)

/**
 * IMPORTANT: Do NOT destructure `current` or `theme` — they are getters.
 * Access them via `ts.current` / `ts.theme` so Vue tracks the reactive
 * dependency (currentName.value) during render and re-renders on change.
 */
const ts = useTheme({
    themes: PRESET_THEMES,
    defaultTheme: props.initialTheme,
    storageKey: 'vmt-docs-demo',
    injectCssVars: false, // already injected by plugin
})

const activeTheme = computed<ThemeDefinition>(() => ts.theme)

function set(name: string) {
    ts.setTheme(name)
}
</script>

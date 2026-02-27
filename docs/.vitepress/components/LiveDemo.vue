<template>
    <div class="not-prose my-6 rounded-xl border p-6"
        style="border-color: var(--vmt-border, #e5e7eb); background: var(--vmt-surface, #f8fafc)">
        <!-- Theme switcher -->
        <div class="flex items-center gap-3 mb-4">
            <VueMultipleThemes :themes="PRESET_THEMES" default-theme="light" storage-key="vmt-docs-theme"
                :inject-css-vars="false" :show-toggle="false">
                <template #default="{ themes: allThemes, setTheme }">
                    <div class="flex flex-wrap gap-2">
                        <button v-for="t in allThemes" :key="t.name"
                            class="px-3 py-1 rounded-full text-xs font-medium border transition-all" :style="{
                                background: current === t.name ? (t.colors.primary ?? '#3b82f6') : 'transparent',
                                color: current === t.name ? '#fff' : 'var(--vmt-text, #111827)',
                                borderColor: t.colors.primary ?? '#3b82f6',
                            }" @click="setTheme(t.name)">
                            {{ t.label ?? t.name }}
                        </button>
                    </div>
                </template>
            </VueMultipleThemes>
        </div>

        <!-- Current theme info -->
        <div class="mb-4">
            <div class="flex items-center gap-2 mb-2">
                <span class="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold text-white"
                    :style="{ background: theme.colors.primary ?? '#3b82f6' }">
                    {{ currentInitial }}
                </span>
                <span class="font-semibold text-sm" style="color: var(--vmt-text)">{{ currentLabel }}</span>
            </div>
        </div>

        <!-- Color swatches -->
        <div class="grid grid-cols-3 sm:grid-cols-6 gap-2">
            <div v-for="[name, color] in Object.entries(previewColors)" :key="name" class="flex flex-col items-center">
                <div class="w-full h-10 rounded-lg border"
                    :style="{ background: color, borderColor: 'var(--vmt-border, #e5e7eb)' }" />
                <span class="text-xs mt-1 font-mono" :style="{ color: 'var(--vmt-text-muted, #6b7280)' }">
                    {{ name }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
    PRESET_THEMES,
    VueMultipleThemes,
    useTheme,
} from "vue-multiple-themes";

const { current, theme } = useTheme({
    themes: PRESET_THEMES,
    defaultTheme: "light",
    storageKey: "vmt-docs-theme",
    injectCssVars: false,
});

const currentLabel = computed(() => theme.label ?? theme.name);
const currentInitial = computed(() =>
    (theme.label ?? theme.name).charAt(0).toUpperCase(),
);

const previewColors = computed(() => ({
    primary: theme.colors.primary ?? "",
    secondary: theme.colors.secondary ?? "",
    accent: theme.colors.accent ?? "",
    success: theme.colors.success ?? "",
    warning: theme.colors.warning ?? "",
    error: theme.colors.error ?? "",
}));
</script>

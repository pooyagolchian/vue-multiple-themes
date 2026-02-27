<template>
    <div class="not-prose my-6 rounded-xl border p-6"
        style="border-color: var(--vmt-border, #e5e7eb); background: var(--vmt-surface, #f8fafc)">
        <!-- Theme switcher: buttons wired directly to useTheme so active state stays in sync -->
        <div class="flex items-center gap-3 mb-4">
            <div class="flex flex-wrap gap-2">
                <button
                    v-for="t in ts.themes"
                    :key="t.name"
                    class="px-3 py-1 rounded-full text-xs font-medium border transition-all"
                    :style="{
                        background: ts.current === t.name ? (t.colors.primary ?? '#3b82f6') : 'transparent',
                        color: ts.current === t.name ? '#fff' : 'var(--vmt-text, #111827)',
                        borderColor: t.colors.primary ?? '#3b82f6',
                    }"
                    @click="ts.setTheme(t.name)"
                >
                    {{ t.label ?? t.name }}
                </button>
            </div>
        </div>

        <!-- Current theme info -->
        <div class="mb-4">
            <div class="flex items-center gap-2 mb-2">
                <span
                    class="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold text-white"
                    :style="{ background: ts.theme.colors.primary ?? '#3b82f6' }"
                >
                    {{ currentInitial }}
                </span>
                <span class="font-semibold text-sm" style="color: var(--vmt-text)">
                    {{ currentLabel }}
                </span>
            </div>
        </div>

        <!-- Color swatches -->
        <div class="grid grid-cols-3 sm:grid-cols-6 gap-2">
            <div v-for="[name, color] in Object.entries(previewColors)" :key="name" class="flex flex-col items-center">
                <div
                    class="w-full h-10 rounded-lg border"
                    :style="{ background: color, borderColor: 'var(--vmt-border, #e5e7eb)' }"
                />
                <span class="text-xs mt-1 font-mono" :style="{ color: 'var(--vmt-text-muted, #6b7280)' }">
                    {{ name }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { PRESET_THEMES, useTheme } from "vue-multiple-themes";

/**
 * IMPORTANT: Do NOT destructure `current` or `theme` from useTheme().
 * They are getters on the return object — Vue tracks the reactive dependency
 * (currentName.value inside the getter) only when the getter is called during
 * render. Destructuring captures a one-time snapshot, breaking reactivity.
 */
const ts = useTheme({
    themes: PRESET_THEMES,
    defaultTheme: "light",
    storageKey: "vmt-docs-theme",
    injectCssVars: false,
});

const currentLabel = computed(() => ts.theme.label ?? ts.theme.name);
const currentInitial = computed(() =>
    (ts.theme.label ?? ts.theme.name).charAt(0).toUpperCase(),
);

const previewColors = computed(() => ({
    primary: ts.theme.colors.primary ?? "",
    secondary: ts.theme.colors.secondary ?? "",
    accent: ts.theme.colors.accent ?? "",
    success: ts.theme.colors.success ?? "",
    warning: ts.theme.colors.warning ?? "",
    error: ts.theme.colors.error ?? "",
}));
</script>

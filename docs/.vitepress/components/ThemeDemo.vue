<template>
    <div class="vmt-theme-demo">
        <!-- ── Picker ─────────────────────────────────────────────────────── -->
        <div v-if="showPicker" class="vmt-theme-demo__picker">
            <button
                v-for="t in ts.themes"
                :key="t.name"
                class="vmt-td-btn"
                :class="{ 'is-active': ts.current === t.name }"
                :style="ts.current === t.name ? {
                    background: t.colors.primary,
                    borderColor: t.colors.primary,
                    color: t.colors.textInverse ?? '#fff',
                    boxShadow: '0 2px 8px ' + t.colors.primary + '55',
                } : {}"
                @click="ts.setTheme(t.name)"
            >
                <component :is="iconFor(t)" :size="12" />
                {{ t.label ?? t.name }}
            </button>
        </div>

        <!-- ── Content slot ───────────────────────────────────────────────── -->
        <div class="vmt-theme-demo__content">
            <slot :theme="activeTheme" :current="ts.current" :is-dark="ts.isDark" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
    Coffee,
    Moon,
    Palette,
    Snowflake,
    Sun,
    Sunset,
    TreePine,
    Waves,
} from "lucide-vue-next";
import { PRESET_THEMES, useTheme } from "vue-multiple-themes";
import type { ThemeDefinition } from "vue-multiple-themes";

const props = withDefaults(
    defineProps<{ showPicker?: boolean; initialTheme?: string }>(),
    { showPicker: true, initialTheme: "light" },
);

const ICON_MAP: Record<string, unknown> = {
    sun: Sun,
    moon: Moon,
    coffee: Coffee,
    waves: Waves,
    "tree-pine": TreePine,
    sunset: Sunset,
    snowflake: Snowflake,
};
function iconFor(t: ThemeDefinition) {
    return ICON_MAP[t.icon ?? ""] ?? Palette;
}

/** Do NOT destructure — current/theme are getters; must be read via ts.x */
const ts = useTheme({
    themes: PRESET_THEMES,
    defaultTheme: props.initialTheme,
    storageKey: "vmt-docs-demo",
    injectCssVars: false,
});

const activeTheme = computed<ThemeDefinition>(() => ts.theme);
</script>

<style scoped>
.vmt-theme-demo {
    border: 1px solid var(--vp-c-divider);
    border-radius: 14px;
    overflow: hidden;
    margin: 1.75rem 0;
    background: var(--vp-c-bg);
}

/* ── Picker strip ─────────────────────────────────────────────────────────── */
.vmt-theme-demo__picker {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0.875rem 1.1rem;
    background: var(--vp-c-bg-soft);
    border-bottom: 1px solid var(--vp-c-divider);
}
.vmt-td-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.3rem 0.7rem;
    border-radius: 99px;
    border: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg);
    color: var(--vp-c-text-2);
    font-size: 0.75rem;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, color 0.15s, box-shadow 0.15s;
}
.vmt-td-btn:hover:not(.is-active) {
    background: var(--vp-c-bg-mute);
    border-color: var(--vp-c-text-3);
    color: var(--vp-c-text-1);
}

/* ── Content ──────────────────────────────────────────────────────────────── */
.vmt-theme-demo__content {
    padding: 1.5rem;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    min-height: 100px;
}
</style>

<template>
    <!-- Flat icon-pill row — no dropdown, always visible in nav bar -->
    <div class="vmt-ns" role="group" aria-label="Switch theme">
        <button
            v-for="t in ts.themes"
            :key="t.name"
            class="vmt-ns__pill"
            :class="{ 'is-active': ts.current === t.name }"
            :title="t.label ?? t.name"
            :aria-pressed="ts.current === t.name"
            :style="ts.current === t.name
                ? { background: t.colors.primary, color: t.colors.textInverse ?? '#fff', borderColor: t.colors.primary }
                : {}"
            @click="ts.setTheme(t.name)"
        >
            <component :is="iconFor(t)" :size="13" />
        </button>
    </div>
</template>

<script setup lang="ts">
import {
    Coffee,
    Moon,
    Palette,
    Snowflake,
    Sun,
    Sunset,
    TreePine,
    Waves,
} from 'lucide-vue-next'
import { PRESET_THEMES, useTheme } from 'vue-multiple-themes'
import type { ThemeDefinition } from 'vue-multiple-themes'

/** Do NOT destructure — current/theme are getters; always read via ts.x */
const ts = useTheme({
    themes: PRESET_THEMES,
    defaultTheme: 'light',
    storageKey: 'vmt-docs-theme',
    injectCssVars: true,
})

const ICON_MAP: Record<string, unknown> = {
    sun:         Sun,
    moon:        Moon,
    coffee:      Coffee,
    droplets:    Waves,
    leaf:        TreePine,
    flame:       Sunset,
    snowflake:   Snowflake,
}

function iconFor(t: ThemeDefinition) {
    return ICON_MAP[t.icon ?? ''] ?? Palette
}
</script>

<style scoped>
/* ── Wrapper: horizontal pill strip ──────────────────────────────────────── */
.vmt-ns {
    display: flex;
    align-items: center;
    gap: 3px;
    margin-left: 0.5rem;
    padding: 3px;
    border-radius: 10px;
    border: 1px solid var(--vmt-border, var(--vp-c-divider));
    background: var(--vmt-surface, var(--vp-c-bg-soft));
}

/* ── Individual icon pill ─────────────────────────────────────────────────── */
.vmt-ns__pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 7px;
    border: 1px solid transparent;
    background: transparent;
    color: var(--vmt-text-muted, var(--vp-c-text-2));
    cursor: pointer;
    outline: none;
    transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.1s;
    flex-shrink: 0;
}
.vmt-ns__pill:hover:not(.is-active) {
    background: var(--vmt-surface-elevated, var(--vp-c-bg-mute));
    color: var(--vmt-text, var(--vp-c-text-1));
    transform: scale(1.1);
}
.vmt-ns__pill:focus-visible {
    outline: 2px solid var(--vmt-primary, var(--vp-c-brand-1));
    outline-offset: 1px;
}
.vmt-ns__pill.is-active {
    /* colour applied via inline :style — primary bg + inverse text */
    transform: scale(1.05);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
}

/* On small screens only show the active pill + neighbours to save space */
@media (max-width: 640px) {
    .vmt-ns__pill:not(.is-active) {
        display: none;
    }
}
@media (min-width: 641px) and (max-width: 767px) {
    .vmt-ns {
        gap: 2px;
        padding: 2px;
    }
    .vmt-ns__pill {
        width: 24px;
        height: 24px;
    }
}
</style>

<template>
    <!-- Flat icon-pill row — always visible in nav bar -->
    <div class="vmt-ns" role="group" aria-label="Switch theme">
        <button
            v-for="t in ts.themes"
            :key="t.name"
            class="vmt-ns__pill"
            :class="{ 'is-active': current === t.name }"
            :title="t.label ?? t.name"
            :aria-pressed="current === t.name"
            @click="ts.setTheme(t.name)"
        >
            <component :is="iconFor(t)" :size="13" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PRESET_THEMES, useTheme } from 'vue-multiple-themes'
import { DOCS_THEME_OPTIONS, iconFor } from '../composables/themeIcons'

/** Global docs theme — same singleton as LiveDemo (same storageKey). */
const ts = useTheme({
    themes: PRESET_THEMES,
    ...DOCS_THEME_OPTIONS,
    injectCssVars: true,
})

/**
 * Explicit computed for the active theme name.
 * Ensures Vue re-renders the pill row on every theme change, including rapid
 * successive clicks, without any stale-cache artefacts.
 */
const current = computed(() => ts.current)
</script>

<style scoped>
/* ── Wrapper ─────────────────────────────────────────────────────────────── */
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

/* ── Individual icon pill ────────────────────────────────────────────────── */
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
    flex-shrink: 0;
    /*
     * KEY FIX: background animating is what causes the "stuck" visual when
     * switching themes rapidly. Remove background from transition — the
     * active-state colour `var(--vmt-primary)` is always correct instantly.
     */
    transition: color 0.15s, border-color 0.15s, transform 0.1s;
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
/*
 * Active pill: background = current theme's primary colour via CSS variable.
 * No inline :style needed — CSS variables cascade instantly when data-theme
 * changes, so this colour is always in sync even on rapid clicks.
 */
.vmt-ns__pill.is-active {
    background: var(--vmt-primary);
    color: var(--vmt-text-inverse, #fff);
    border-color: var(--vmt-primary);
    transform: scale(1.05);
    box-shadow: 0 2px 6px rgba(0,0,0,.18);
}

@media (max-width: 640px) {
    .vmt-ns__pill:not(.is-active) { display: none; }
}
@media (min-width: 641px) and (max-width: 767px) {
    .vmt-ns { gap: 2px; padding: 2px; }
    .vmt-ns__pill { width: 24px; height: 24px; }
}
</style>

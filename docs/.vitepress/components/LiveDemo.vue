<template>
    <div class="vmt-live-demo not-prose">
        <!-- ── Header ──────────────────────────────────────────────────── -->
        <div class="vmt-live-demo__header">
            <div class="vmt-live-demo__header-left">
                <span class="vmt-live-demo__badge">
                    <Palette :size="12" />
                    Live Preview
                </span>
                <span class="vmt-live-demo__title">
                    <component :is="iconFor(ts.theme)" :size="16" />
                    {{ ts.theme.label ?? ts.theme.name }}
                </span>
            </div>
            <div class="vmt-live-demo__nav">
                <button class="vmt-icon-btn" title="Previous theme" @click="ts.prevTheme()">
                    <ChevronLeft :size="14" />
                </button>
                <button class="vmt-icon-btn" title="Next theme" @click="ts.nextTheme()">
                    <ChevronRight :size="14" />
                </button>
            </div>
        </div>

        <!-- ── Theme picker ──────────────────────────────────────────────── -->
        <!--
          BUG FIX: active-button colour is driven by the CSS variable
          `var(--vmt-primary)` via the `.is-active` CSS rule below, NOT via
          inline :style.  This means the colour updates INSTANTLY when the
          data-theme attribute changes — no 0.2 s transition stall on rapid
          clicks — and there is no mismatch between JS state and DOM state.
        -->
        <div class="vmt-live-demo__picker">
            <button
                v-for="t in ts.themes"
                :key="t.name"
                class="vmt-theme-btn"
                :class="{ 'is-active': current === t.name }"
                @click="ts.setTheme(t.name)"
            >
                <component :is="iconFor(t)" :size="12" />
                {{ t.label ?? t.name }}
                <Check v-if="current === t.name" :size="11" class="vmt-theme-btn__check" />
            </button>
        </div>

        <div class="vmt-live-demo__divider" />

        <!-- ── Swatch grid ───────────────────────────────────────────────── -->
        <div class="vmt-live-demo__swatches">
            <div
                v-for="[token, color] in swatches"
                :key="token"
                class="vmt-swatch"
                :title="color"
            >
                <div class="vmt-swatch__color" :style="{ background: color }" />
                <span class="vmt-swatch__token">{{ token }}</span>
                <span class="vmt-swatch__hex">{{ color }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Check, ChevronLeft, ChevronRight, Palette } from 'lucide-vue-next'
import { PRESET_THEMES, useTheme } from 'vue-multiple-themes'
import { DOCS_THEME_OPTIONS, iconFor } from '../composables/themeIcons'

/**
 * Share the global docs-theme singleton (same storageKey as NavThemeSwitcher).
 * `injectCssVars: false` — the plugin / NavThemeSwitcher already injected the
 * `<style id="vmt-theme-styles">` tag; LiveDemo only needs the reactive state.
 */
const ts = useTheme({
    themes: PRESET_THEMES,
    ...DOCS_THEME_OPTIONS,
    injectCssVars: false,
})

/**
 * Explicit computed so Vue's dependency-tracker definitely re-renders the
 * picker when the active theme changes, even on rapid successive clicks.
 */
const current = computed(() => ts.current)

const SWATCH_TOKENS = [
    'primary', 'secondary', 'accent', 'success', 'warning', 'error',
] as const

const swatches = computed(() =>
    SWATCH_TOKENS
        .map((k) => [k, ts.theme.colors[k] ?? ''] as const)
        .filter(([, v]) => v),
)
</script>

<style scoped>
/* ── Shell ──────────────────────────────────────────────────────────────── */
.vmt-live-demo {
    margin: 1.75rem 0;
    border: 1px solid var(--vp-c-divider);
    border-radius: 14px;
    overflow: hidden;
    background: var(--vp-c-bg);
    box-shadow: 0 1px 4px rgba(0,0,0,.04);
}

/* ── Header ─────────────────────────────────────────────────────────────── */
.vmt-live-demo__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.25rem;
    background: var(--vp-c-bg-soft);
    border-bottom: 1px solid var(--vp-c-divider);
}
.vmt-live-demo__header-left {
    display: flex;
    align-items: center;
    gap: 0.875rem;
}
.vmt-live-demo__badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--vp-c-text-3);
    background: var(--vp-c-bg-mute);
    border: 1px solid var(--vp-c-divider);
    padding: 0.2rem 0.55rem;
    border-radius: 99px;
}
.vmt-live-demo__title {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--vp-c-text-1);
    letter-spacing: -0.01em;
}
.vmt-live-demo__nav {
    display: flex;
    gap: 0.25rem;
}
.vmt-icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 7px;
    border: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg);
    color: var(--vp-c-text-2);
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
}
.vmt-icon-btn:hover {
    background: var(--vp-c-bg-mute);
    border-color: var(--vp-c-text-3);
    color: var(--vp-c-text-1);
}

/* ── Picker ─────────────────────────────────────────────────────────────── */
.vmt-live-demo__picker {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 1rem 1.25rem;
}
.vmt-theme-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.3rem 0.75rem;
    border-radius: 99px;
    border: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-2);
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
    /*
     * KEY FIX: exclude background-color from transition on theme buttons.
     * The background of the active button is driven by var(--vmt-primary)
     * which updates synchronously with the data-theme attribute change.
     * Animating it causes a visible lag / stuck state on rapid clicks.
     */
    transition: border-color 0.15s, color 0.15s, box-shadow 0.15s;
}
.vmt-theme-btn:hover:not(.is-active) {
    background: var(--vp-c-bg-mute);
    border-color: var(--vp-c-text-3);
    color: var(--vp-c-text-1);
}
/*
 * Active state: colour is dictated purely by CSS — the current
 * --vmt-primary variable value —  so it is always in sync with the real
 * active theme and can never show a stale / intermediate colour.
 */
.vmt-theme-btn.is-active {
    background: var(--vmt-primary);
    border-color: var(--vmt-primary);
    color: var(--vmt-text-inverse, #fff);
    box-shadow: 0 1px 6px rgba(0,0,0,.18);
}
.vmt-theme-btn__check {
    margin-left: 0.1rem;
    opacity: 0.8;
}

/* ── Divider ─────────────────────────────────────────────────────────────── */
.vmt-live-demo__divider {
    height: 1px;
    background: var(--vp-c-divider);
}

/* ── Swatch grid ─────────────────────────────────────────────────────────── */
.vmt-live-demo__swatches {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    padding: 1.25rem;
}
@media (min-width: 640px) {
    .vmt-live-demo__swatches { grid-template-columns: repeat(6, 1fr); }
}
.vmt-swatch {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
}
.vmt-swatch__color {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 10px;
    border: 1px solid rgba(0,0,0,0.08);
    box-shadow: inset 0 1px 2px rgba(255,255,255,.25), 0 1px 3px rgba(0,0,0,.12);
    transition: transform 0.15s, box-shadow 0.15s;
}
.vmt-swatch:hover .vmt-swatch__color {
    transform: translateY(-2px);
    box-shadow: inset 0 1px 2px rgba(255,255,255,.25), 0 4px 10px rgba(0,0,0,.18);
}
.vmt-swatch__token {
    font-size: 0.6875rem;
    font-weight: 500;
    color: var(--vp-c-text-2);
    font-family: var(--vp-font-family-base);
}
.vmt-swatch__hex {
    font-size: 0.625rem;
    font-family: var(--vp-font-family-mono);
    color: var(--vp-c-text-3);
    letter-spacing: 0.02em;
}
</style>

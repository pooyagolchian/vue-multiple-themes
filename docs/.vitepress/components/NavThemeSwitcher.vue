<template>
    <div class="vmt-nav-switcher" @keydown.esc="open = false">
        <!-- Trigger -->
        <button
            class="vmt-nav-switcher__trigger"
            :aria-expanded="open"
            aria-haspopup="listbox"
            @click="open = !open"
        >
            <component :is="currentIcon" :size="15" />
            <span class="vmt-nav-switcher__label">{{ ts.theme.label }}</span>
            <ChevronDown
                :size="11"
                class="vmt-nav-switcher__chevron"
                :style="{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }"
            />
        </button>

        <!-- Backdrop + dropdown rendered at body level via Teleport -->
        <Teleport to="body">
            <div v-if="open" class="vmt-nav-backdrop" @click="open = false" />
            <div v-if="open" class="vmt-nav-dropdown" role="listbox">
                <button
                    v-for="t in ts.themes"
                    :key="t.name"
                    class="vmt-nav-dropdown__item"
                    :class="{ 'is-active': ts.current === t.name }"
                    role="option"
                    :aria-selected="ts.current === t.name"
                    @click="select(t.name)"
                >
                    <span
                        class="vmt-nav-dropdown__dot"
                        :style="{ background: t.colors.primary ?? '#888' }"
                    />
                    <component :is="iconFor(t)" :size="13" />
                    <span class="vmt-nav-dropdown__name">{{ t.label ?? t.name }}</span>
                    <Check v-if="ts.current === t.name" :size="11" class="vmt-nav-dropdown__check" />
                </button>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
    Check,
    ChevronDown,
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

/** Do NOT destructure — current/theme are getters; read via ts.x */
const ts = useTheme({
    themes: PRESET_THEMES,
    defaultTheme: 'light',
    storageKey: 'vmt-docs-theme',
    injectCssVars: true,
})

const open = ref(false)

const ICON_MAP: Record<string, unknown> = {
    sun: Sun,
    moon: Moon,
    coffee: Coffee,
    waves: Waves,
    'tree-pine': TreePine,
    sunset: Sunset,
    snowflake: Snowflake,
}

function iconFor(t: ThemeDefinition) {
    return ICON_MAP[t.icon ?? ''] ?? Palette
}

const currentIcon = computed(() => iconFor(ts.theme))

function select(name: string) {
    ts.setTheme(name)
    open.value = false
}
</script>

<style scoped>
.vmt-nav-switcher {
    position: relative;
    display: flex;
    align-items: center;
}
.vmt-nav-switcher__trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    height: 32px;
    padding: 0 0.65rem;
    border-radius: 8px;
    border: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
    font-family: var(--vp-font-family-base);
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    white-space: nowrap;
    outline: none;
}
.vmt-nav-switcher__trigger:hover {
    background: var(--vp-c-bg-mute);
    border-color: var(--vp-c-text-3);
}
.vmt-nav-switcher__trigger:focus-visible {
    outline: 2px solid var(--vp-c-brand-1);
    outline-offset: 2px;
}
.vmt-nav-switcher__label {
    display: none;
}
@media (min-width: 768px) {
    .vmt-nav-switcher__label { display: inline; }
}
.vmt-nav-switcher__chevron {
    opacity: 0.45;
    transition: transform 0.18s;
}
</style>

<style>
/* Not scoped — lives in <body> via Teleport */
.vmt-nav-backdrop {
    position: fixed;
    inset: 0;
    z-index: 199;
}
.vmt-nav-dropdown {
    position: fixed;
    top: 56px;
    right: 16px;
    z-index: 200;
    min-width: 172px;
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
    padding: 0.3rem;
    box-shadow: 0 12px 40px rgba(0,0,0,.14), 0 2px 8px rgba(0,0,0,.08);
    display: flex;
    flex-direction: column;
    gap: 1px;
    animation: vmt-drop-in 0.15s ease;
}
@keyframes vmt-drop-in {
    from { opacity: 0; transform: translateY(-6px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
}
.vmt-nav-dropdown__item {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    width: 100%;
    padding: 0.45rem 0.65rem;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: var(--vp-c-text-2);
    font-family: var(--vp-font-family-base);
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    text-align: left;
    transition: background 0.12s, color 0.12s;
}
.vmt-nav-dropdown__item:hover:not(.is-active) {
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
}
.vmt-nav-dropdown__item.is-active {
    color: var(--vp-c-text-1);
    font-weight: 600;
}
.vmt-nav-dropdown__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    border: 1.5px solid rgba(0,0,0,0.08);
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
}
.vmt-nav-dropdown__name { flex: 1; }
.vmt-nav-dropdown__check {
    margin-left: auto;
    flex-shrink: 0;
    opacity: 0.6;
}
</style>

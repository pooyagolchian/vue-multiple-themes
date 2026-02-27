<template>
    <div v-click-outside="() => (open = false)" class="vmt-ns">
        <!-- ── Trigger ──────────────────────────────────────────────────── -->
        <button
            class="vmt-ns__trigger"
            :aria-expanded="open"
            aria-haspopup="listbox"
            @click="open = !open"
        >
            <component :is="currentIcon" :size="14" />
            <span class="vmt-ns__label">{{ ts.theme.label }}</span>
            <ChevronDown
                :size="10"
                class="vmt-ns__chevron"
                :style="{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }"
            />
        </button>

        <!-- ── Dropdown ─────────────────────────────────────────────────── -->
        <Transition name="vmt-ns-drop">
            <div v-if="open" class="vmt-ns__dropdown" role="listbox">
                <!-- Header label -->
                <div class="vmt-ns__heading">Theme</div>

                <button
                    v-for="t in ts.themes"
                    :key="t.name"
                    class="vmt-ns__item"
                    :class="{ 'is-active': ts.current === t.name }"
                    role="option"
                    :aria-selected="ts.current === t.name"
                    @click="select(t.name)"
                >
                    <!-- Icon badge tinted to theme primary -->
                    <span
                        class="vmt-ns__icon-badge"
                        :style="{
                            background: t.colors.primary + '22',
                            color: t.colors.primary,
                        }"
                    >
                        <component :is="iconFor(t)" :size="12" />
                    </span>

                    <span class="vmt-ns__item-name">{{ t.label ?? t.name }}</span>

                    <!-- Active indicator: filled dot in primary color -->
                    <span
                        v-if="ts.current === t.name"
                        class="vmt-ns__active-dot"
                        :style="{ background: t.colors.primary }"
                    />
                </button>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
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

const open = ref(false)

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
    waves:       Waves,
    'tree-pine': TreePine,
    sunset:      Sunset,
    snowflake:   Snowflake,
}

function iconFor(t: ThemeDefinition) {
    return ICON_MAP[t.icon ?? ''] ?? Palette
}

const currentIcon = computed(() => iconFor(ts.theme))

function select(name: string) {
    ts.setTheme(name)
    open.value = false
}

// ── v-click-outside directive ────────────────────────────────────────────
const vClickOutside = {
    mounted(el: HTMLElement, binding: { value: () => void }) {
        el._clickOutside = (e: MouseEvent) => {
            if (!el.contains(e.target as Node)) binding.value()
        }
        document.addEventListener('click', el._clickOutside, true)
    },
    unmounted(el: HTMLElement) {
        document.removeEventListener('click', el._clickOutside, true)
    },
}
</script>

<style scoped>
/* ── Wrapper ──────────────────────────────────────────────────────────────── */
.vmt-ns {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 0.25rem;
}

/* ── Trigger ──────────────────────────────────────────────────────────────── */
.vmt-ns__trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    height: 30px;
    padding: 0 0.6rem;
    border-radius: 7px;
    border: 1px solid var(--vmt-border, var(--vp-c-divider));
    background: var(--vmt-surface, var(--vp-c-bg-soft));
    color: var(--vmt-text, var(--vp-c-text-1));
    font-family: var(--vp-font-family-base);
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    outline: none;
    white-space: nowrap;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
}
.vmt-ns__trigger:hover {
    background: var(--vmt-surface-elevated, var(--vp-c-bg-mute));
    border-color: var(--vmt-text-muted, var(--vp-c-text-3));
}
.vmt-ns__trigger:focus-visible {
    outline: 2px solid var(--vmt-primary, var(--vp-c-brand-1));
    outline-offset: 2px;
}
.vmt-ns__label {
    display: none;
}
@media (min-width: 768px) {
    .vmt-ns__label { display: inline; }
}
.vmt-ns__chevron {
    opacity: 0.5;
    flex-shrink: 0;
    transition: transform 0.18s ease;
}

/* ── Dropdown ─────────────────────────────────────────────────────────────── */
.vmt-ns__dropdown {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    z-index: 100;
    width: 186px;
    background: var(--vmt-surface, var(--vp-c-bg));
    border: 1px solid var(--vmt-border, var(--vp-c-divider));
    border-radius: 12px;
    padding: 0.4rem;
    box-shadow:
        0 0 0 1px var(--vmt-border, transparent),
        0 8px 24px rgba(0, 0, 0, 0.12),
        0 2px 6px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    gap: 1px;
}

/* Section label */
.vmt-ns__heading {
    padding: 0.2rem 0.65rem 0.45rem;
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--vmt-text-muted, var(--vp-c-text-3));
}

/* ── Item ─────────────────────────────────────────────────────────────────── */
.vmt-ns__item {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    width: 100%;
    padding: 0.4rem 0.55rem;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: var(--vmt-text-muted, var(--vp-c-text-2));
    font-family: var(--vp-font-family-base);
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    text-align: left;
    transition: background 0.12s, color 0.12s;
}
.vmt-ns__item:hover:not(.is-active) {
    background: var(--vmt-surface-elevated, var(--vp-c-bg-soft));
    color: var(--vmt-text, var(--vp-c-text-1));
}
.vmt-ns__item.is-active {
    background: var(--vmt-surface-elevated, var(--vp-c-bg-soft));
    color: var(--vmt-text, var(--vp-c-text-1));
    font-weight: 600;
}

/* Icon badge */
.vmt-ns__icon-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 6px;
    flex-shrink: 0;
}

.vmt-ns__item-name {
    flex: 1;
    line-height: 1;
}

/* Active dot */
.vmt-ns__active-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-left: auto;
}

/* ── Transition ───────────────────────────────────────────────────────────── */
.vmt-ns-drop-enter-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}
.vmt-ns-drop-leave-active {
    transition: opacity 0.1s ease, transform 0.1s ease;
}
.vmt-ns-drop-enter-from,
.vmt-ns-drop-leave-to {
    opacity: 0;
    transform: translateY(-6px) scale(0.97);
}
</style>

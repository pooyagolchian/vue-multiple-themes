<template>
    <div class="not-prose vmt-color-grid">
        <div class="vmt-color-grid__grid">
            <div
                v-for="t in PRESET_THEMES"
                :key="t.name"
                class="vmt-color-card"
            >
                <!-- Color band -->
                <div class="vmt-color-card__band">
                    <div
                        v-for="[k, v] in bandColors(t)"
                        :key="k"
                        class="vmt-color-card__band-strip"
                        :style="{ background: v }"
                        :title="k"
                    />
                </div>

                <!-- Body -->
                <div class="vmt-color-card__body">
                    <div class="vmt-color-card__name-row">
                        <span
                            class="vmt-color-card__icon-wrap"
                            :style="{ background: t.colors.primary + '22', color: t.colors.primary }"
                        >
                            <component :is="iconFor(t)" :size="13" />
                        </span>
                        <span class="vmt-color-card__name">{{ t.label ?? t.name }}</span>
                    </div>
                    <code class="vmt-color-card__attr">data-theme="{{ t.name }}"</code>
                    <div class="vmt-color-card__mini-swatches">
                        <div
                            v-for="[k, v] in miniSwatches(t)"
                            :key="k"
                            class="vmt-color-card__mini-dot"
                            :style="{ background: v }"
                            :title="k + ': ' + v"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PRESET_THEMES } from 'vue-multiple-themes'
import type { ThemeDefinition } from 'vue-multiple-themes'
import { iconFor } from '../composables/themeIcons'

const BAND_KEYS = ['primary', 'secondary', 'accent', 'background', 'surface'] as const
const MINI_KEYS = ['primary', 'secondary', 'accent', 'success', 'warning', 'error'] as const

function bandColors(t: ThemeDefinition) {
    return BAND_KEYS.map((k) => [k, t.colors[k]]).filter(([, v]) => v)
}
function miniSwatches(t: ThemeDefinition) {
    return MINI_KEYS.map((k) => [k, t.colors[k]]).filter(([, v]) => v)
}
</script>

<style scoped>
.vmt-color-grid { margin: 1.75rem 0; }
.vmt-color-grid__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
}
@media (min-width: 540px) { .vmt-color-grid__grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 768px) { .vmt-color-grid__grid { grid-template-columns: repeat(4, 1fr); } }

.vmt-color-card {
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
    overflow: hidden;
    background: var(--vp-c-bg);
    transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s;
}
.vmt-color-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,.08);
    border-color: var(--vp-c-text-3);
}

.vmt-color-card__band { display: flex; height: 44px; }
.vmt-color-card__band-strip { flex: 1; transition: flex 0.2s; }
.vmt-color-card:hover .vmt-color-card__band-strip:first-child { flex: 2; }

.vmt-color-card__body {
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background: var(--vp-c-bg-soft);
}
.vmt-color-card__name-row { display: flex; align-items: center; gap: 0.5rem; }
.vmt-color-card__icon-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 7px;
    flex-shrink: 0;
}
.vmt-color-card__name {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--vp-c-text-1);
    letter-spacing: -0.01em;
}
.vmt-color-card__attr {
    display: block;
    font-size: 0.625rem;
    font-family: var(--vp-font-family-mono);
    color: var(--vp-c-text-3);
    background: var(--vp-c-bg-mute);
    border: 1px solid var(--vp-c-divider);
    border-radius: 5px;
    padding: 0.15rem 0.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0;
}
.vmt-color-card__mini-swatches { display: flex; gap: 0.3rem; }
.vmt-color-card__mini-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1.5px solid rgba(0,0,0,0.06);
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
    cursor: default;
    transition: transform 0.15s;
}
.vmt-color-card__mini-dot:hover { transform: scale(1.3); }
</style>

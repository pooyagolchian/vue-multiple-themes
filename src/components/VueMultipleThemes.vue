<script setup lang="ts">
import {
    computed,
    onBeforeUnmount,
    onMounted,
    ref,
    watch,
} from "vue";
import type {
	ThemeDefinition,
	ThemeStrategy,
	ThemeTarget,
} from "../types";
import {
	buildCssVars,
	injectStyles,
	removeStyles,
} from "../utils/css-injector";
import {
	applyThemeToDom,
    getSystemPreference,
	readStorage,
    writeStorage,
} from "../utils/dom";
import VmtIcon from "./VmtIcon.vue";

// ── Ref-counted instance tracking (keyed by storageKey) ────────────────────
// Prevents a navigating-away component from wiping the shared <style> tag
// while other components (e.g. NavThemeSwitcher) are still mounted.
const _componentCounts = new Map<string, number>()

const props = withDefaults(defineProps<{
    /** All available theme definitions */
    themes?: ThemeDefinition[];
    /** Active theme on first render (default: first in `themes`) */
    defaultTheme?: string;
    /** How to stamp the theme on the DOM */
    strategy?: ThemeStrategy;
    /** Attribute name (default: `data-theme`) */
    attribute?: string;
    /** Class prefix (default: `theme-`) */
    classPrefix?: string;
    /** DOM element that receives the attribute / class */
    target?: ThemeTarget;
    /** CSS variable prefix (default: `--vmt-`) */
    cssVarPrefix?: string;
    /** Inject CSS variables automatically */
    injectCssVars?: boolean;
    /** Persist theme in storage */
    storage?: "localStorage" | "sessionStorage" | "none";
    /** Storage key for persistence */
    storageKey?: string;
    /** Respect OS dark/light preference on first load */
    respectSystemPreference?: boolean;
    /** Show the built-in toggle button */
    showToggle?: boolean;
    /** Show the label next to the icon */
    showLabel?: boolean;
    /** Size (px) of the toggle icon */
    iconSize?: number;
    /** Extra CSS classes on the root wrapper */
    extraClass?: string;
}>(), {
    themes: () => [
        {
            name: "light",
            label: "Light",
            icon: "sun",
            colors: {
                primary: "#3b82f6",
                secondary: "#8b5cf6",
                accent: "#f59e0b",
                background: "#ffffff",
                surface: "#f8fafc",
                surfaceElevated: "#f1f5f9",
                text: "#111827",
                textMuted: "#6b7280",
                textInverse: "#ffffff",
                border: "#e5e7eb",
                ring: "#3b82f6",
                success: "#10b981",
                warning: "#f59e0b",
                error: "#ef4444",
                info: "#3b82f6",
            },
        },
        {
            name: "dark",
            label: "Dark",
            icon: "moon",
            colors: {
                primary: "#60a5fa",
                secondary: "#a78bfa",
                accent: "#fbbf24",
                background: "#0f172a",
                surface: "#1e293b",
                surfaceElevated: "#334155",
                text: "#f8fafc",
                textMuted: "#94a3b8",
                textInverse: "#0f172a",
                border: "#334155",
                ring: "#60a5fa",
                success: "#34d399",
                warning: "#fbbf24",
                error: "#f87171",
                info: "#60a5fa",
            },
        },
        {
            name: "sepia",
            label: "Sepia",
            icon: "coffee",
            colors: {
                primary: "#92400e",
                secondary: "#78350f",
                accent: "#d97706",
                background: "#fdf6e3",
                surface: "#f5e9c9",
                surfaceElevated: "#ede0b5",
                text: "#3c2415",
                textMuted: "#78583d",
                textInverse: "#fdf6e3",
                border: "#d6b896",
                ring: "#92400e",
                success: "#166534",
                warning: "#92400e",
                error: "#991b1b",
                info: "#1e40af",
            },
        },
    ],
    strategy: "attribute",
    attribute: "data-theme",
    classPrefix: "theme-",
    target: "html",
    cssVarPrefix: "--vmt-",
    injectCssVars: true,
    storage: "localStorage",
    storageKey: "vmt-theme",
    respectSystemPreference: false,
    showToggle: true,
    showLabel: false,
    iconSize: 20,
    extraClass: "",
});

const emit = defineEmits<{
    (e: "change", theme: ThemeDefinition): void;
}>();

// ── Resolve initial theme ───────────────────────────────────────────
function getInitial(): string {
    if (props.storage !== "none") {
        const stored = readStorage(
            props.storageKey,
            props.storage as "localStorage" | "sessionStorage",
        );
        if (
            stored &&
            props.themes.some((t: ThemeDefinition) => t.name === stored)
        )
            return stored;
    }

    if (props.respectSystemPreference) {
        const pref = getSystemPreference();
        const match = props.themes.find(
            (t: ThemeDefinition) => t.name === pref,
        );
        if (match) return match.name;
    }

    if (
        props.defaultTheme &&
        props.themes.some((t: ThemeDefinition) => t.name === props.defaultTheme)
    ) {
        return props.defaultTheme;
    }

    return props.themes[0]?.name ?? "light";
}

const currentName = ref<string>(getInitial());
let previousName: string | null = null;

const currentTheme = computed<ThemeDefinition>(
    () =>
        props.themes.find(
            (t: ThemeDefinition) => t.name === currentName.value,
        ) ?? props.themes[0],
);

const isDark = computed<boolean>(() =>
    currentName.value.toLowerCase().includes("dark"),
);

const currentIconName = computed<string>(
    () => currentTheme.value.icon ?? "palette",
);

// ── Apply to DOM ────────────────────────────────────────────────────
function applyTheme(name: string) {
    applyThemeToDom(name, previousName, {
        strategy: props.strategy,
        attribute: props.attribute,
        classPrefix: props.classPrefix,
        target: props.target,
    });
    previousName = name;

    if (props.storage !== "none") {
        writeStorage(
            props.storageKey,
            name,
            props.storage as "localStorage" | "sessionStorage",
        );
    }

    emit("change", currentTheme.value);
}

// ── Actions ─────────────────────────────────────────────────────────
function setTheme(name: string) {
    if (!props.themes.some((t: ThemeDefinition) => t.name === name)) {
        console.warn(`[VueMultipleThemes] Unknown theme: "${name}"`);
        return;
    }
    currentName.value = name;
}

function nextTheme() {
    const idx = props.themes.findIndex(
        (t: ThemeDefinition) => t.name === currentName.value,
    );
    currentName.value = props.themes[(idx + 1) % props.themes.length].name;
}

function prevTheme() {
    const idx = props.themes.findIndex(
        (t: ThemeDefinition) => t.name === currentName.value,
    );
    currentName.value =
        props.themes[
            (idx - 1 + props.themes.length) % props.themes.length
        ].name;
}

function toggleTheme() {
    if (props.themes.length < 2) return;
    if (props.themes.length === 2) {
        // Classic two-theme toggle
        const other = props.themes.find(
            (t: ThemeDefinition) => t.name !== currentName.value,
        );
        if (other) currentName.value = other.name;
    } else {
        // 3+ themes: cycle to next
        nextTheme();
    }
}

// ── Lifecycle ────────────────────────────────────────────────────────
// Apply immediately in browser context to prevent flash of wrong theme on refresh.
function ensureStylesAndApply() {
    if (props.injectCssVars) {
        const css = buildCssVars(props.themes, {
            strategy: props.strategy,
            attribute: props.attribute,
            classPrefix: props.classPrefix,
            cssVarPrefix: props.cssVarPrefix,
            target: props.target,
        });
        injectStyles(css);
    }
    applyTheme(currentName.value);
}

let appliedInSetup = false;
if (typeof document !== "undefined") {
    ensureStylesAndApply();
    appliedInSetup = true;
}

onMounted(() => {
    if (!appliedInSetup) {
        ensureStylesAndApply();
    }
});

watch(currentName, (name) => {
    applyTheme(name);
});

// ── Ref-counted cleanup ─────────────────────────────────────────────
// Only remove the shared <style> tag when ALL instances using this
// storageKey are unmounted. Mirrors the pattern in useTheme.ts.
const _key = props.storageKey;
_componentCounts.set(_key, (_componentCounts.get(_key) ?? 0) + 1);

onBeforeUnmount(() => {
    const count = (_componentCounts.get(_key) ?? 1) - 1;
    _componentCounts.set(_key, count);
    if (count <= 0) {
        _componentCounts.delete(_key);
        removeStyles();
    }
});
</script>

<template>
    <div class="vmt-root" :class="[extraClass, isDark ? 'vmt-dark' : 'vmt-light']">
        <!-- Default slot: completely custom UI -->
        <slot :current="currentTheme" :themes="themes" :set-theme="setTheme" :next-theme="nextTheme"
            :prev-theme="prevTheme" :toggle-theme="toggleTheme" :is-dark="isDark">
            <!-- Built-in toggle button (shown when no default slot is provided) -->
            <button v-if="showToggle" class="vmt-toggle"
                :aria-label="'Current theme: ' + currentTheme.label + '. Click to switch theme.'"
                :title="currentTheme.label" @click="nextTheme">
                <!-- icon (use #icon slot for custom icons, or built-in VmtIcon) -->
                <span class="vmt-icon">
                    <slot name="icon" :icon="currentIconName" :size="iconSize" :theme="currentTheme">
                        <VmtIcon :name="currentIconName" :size="iconSize" />
                    </slot>
                </span>
                <!-- label -->
                <span v-if="showLabel" class="vmt-label">
                    {{ currentTheme.label }}
                </span>
            </button>
        </slot>

        <!-- Picker slot: list of all themes -->
        <slot name="picker" :current="currentTheme" :themes="themes" :set-theme="setTheme" />
    </div>
</template>

<style>
.vmt-root {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
}

.vmt-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.6rem;
    border-radius: 0.5rem;
    border: 1px solid var(--vmt-border, #e5e7eb);
    background: var(--vmt-surface, transparent);
    color: var(--vmt-foreground, inherit);
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
    outline: none;
}

.vmt-toggle:hover {
    background: var(--vmt-surface-elevated, rgba(0, 0, 0, 0.05));
}

.vmt-toggle:focus-visible {
    outline: 2px solid var(--vmt-ring, #4f46e5);
    outline-offset: 2px;
}

.vmt-icon {
    display: inline-flex;
    align-items: center;
    color: var(--vmt-icon-color, var(--vmt-foreground, currentColor));
    flex-shrink: 0;
}

.vmt-label {
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
    color: var(--vmt-foreground, inherit);
}
</style>

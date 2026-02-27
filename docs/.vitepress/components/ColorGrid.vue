<template>
    <div class="not-prose my-6">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <div v-for="theme in PRESET_THEMES" :key="theme.name" class="rounded-xl overflow-hidden border"
                style="border-color: var(--vmt-border, #e5e7eb)">
                <!-- Swatch row -->
                <div class="flex h-8">
                    <div v-for="[key, value] in mainColors(theme)" :key="key"
                        :style="{ background: value ?? '', flex: 1 }" />
                </div>
                <!-- Label -->
                <div class="px-3 py-2" style="background: var(--vmt-surface, #f8fafc)">
                    <p class="text-xs font-semibold" style="color: var(--vmt-text)">
                        {{ theme.label ?? theme.name }}
                    </p>
                    <p class="text-xs font-mono" style="color: var(--vmt-text-muted)">
                        data-theme="{{ theme.name }}"
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PRESET_THEMES } from 'vue-multiple-themes'
import type { ThemeDefinition } from 'vue-multiple-themes'

function mainColors(theme: ThemeDefinition) {
    const keys = ['primary', 'secondary', 'accent', 'background', 'surface']
    return keys
        .map((k) => [k, theme.colors[k]])
        .filter(([, v]) => v)
}
</script>

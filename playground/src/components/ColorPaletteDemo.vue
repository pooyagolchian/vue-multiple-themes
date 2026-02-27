<template>
    <section class="rounded-2xl p-6 border" style="background: var(--vmt-surface); border-color: var(--vmt-border)">
        <h2 class="text-lg font-bold mb-4">Color Palette</h2>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div v-for="[key, value] in colorEntries" :key="key" class="rounded-xl overflow-hidden border"
                style="border-color: var(--vmt-border)">
                <div class="h-14 w-full" :style="{ background: value }" />
                <div class="p-2" style="background: var(--vmt-surface-elevated)">
                    <p class="text-xs font-mono font-medium" style="color: var(--vmt-text)">{{ key }}</p>
                    <p class="text-xs font-mono" style="color: var(--vmt-text-muted)">{{ value }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ThemeDefinition } from 'vue-multiple-themes'

const props = defineProps<{ theme: ThemeDefinition | undefined }>()

const colorEntries = computed(() =>
    Object.entries(props.theme?.colors ?? {}).filter(([, v]) => v),
)
</script>

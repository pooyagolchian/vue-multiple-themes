<script setup lang="ts">
/**
 * VmtIcon.vue
 *
 * A thin sizing/color wrapper for any Vue icon component.
 * Works with lucide-vue-next, @heroicons/vue, @phosphor-icons/vue, etc.
 *
 * @example
 * import { Sun } from 'lucide-vue-next'
 * <VmtIcon :as="Sun" :size="20" />
 */
import type { Component } from 'vue'

withDefaults(
    defineProps<{
        /** Any Vue icon component (Lucide, Heroicons, Phosphor, etc.) */
        as: Component
        /** Icon size in pixels */
        size?: number
        /** Stroke / fill color — defaults to `currentColor` */
        color?: string
        /** Stroke width */
        strokeWidth?: number
    }>(),
    {
        size: 20,
        color: 'currentColor',
        strokeWidth: 2,
    },
)
</script>

<template>
    <component
        :is="as"
        :size="size"
        :color="color"
        :stroke-width="strokeWidth"
    />
</template>

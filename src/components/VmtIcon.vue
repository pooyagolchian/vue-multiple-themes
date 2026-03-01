<script setup lang="ts">
/**
 * VmtIcon.vue
 *
 * A simple wrapper for Lucide icons.
 * Optimized for Vue 3 with <script setup>.
 */
import { computed, h } from 'vue'
import { getIcon } from '../icons'

const props = withDefaults(
    defineProps<{
        /** Lucide icon name (e.g. 'sun', 'moon', 'palette') */
        name: string
        /** Icon size in pixels */
        size?: number
        /** Stroke color (default: currentColor so it inherits CSS color) */
        color?: string
        /** SVG stroke width */
        strokeWidth?: number
    }>(),
    {
        size: 20,
        color: 'currentColor',
        strokeWidth: 2,
    },
)

const iconData = computed(() => getIcon(props.name))

const render = () =>
    h(
        'svg',
        {
            xmlns: 'http://www.w3.org/2000/svg',
            width: props.size,
            height: props.size,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: props.color,
            'stroke-width': props.strokeWidth,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            class: 'vmt-icon-svg',
            'aria-hidden': 'true',
        },
        [h('path', { d: iconData.value.path })],
    )
</script>

<template>
    <render />
</template>

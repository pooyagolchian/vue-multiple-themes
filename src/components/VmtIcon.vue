<script setup lang="ts">
/**
 * VmtIcon.vue
 *
 * A simple wrapper for Lucide icons.
 * Optimized for Vue 3 with <script setup>.
 * Supports icons with extra SVG elements (circles, rects, lines, etc.)
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

/**
 * Parse the `extra` string field into additional SVG child elements.
 * Supports common SVG elements: circle, rect, line, polyline, polygon, ellipse.
 *
 * Expected format: HTML/SVG string like '<circle cx="12" cy="12" r="3" />'
 */
function parseExtra(extra: string): ReturnType<typeof h>[] {
    const elements: ReturnType<typeof h>[] = []
    // Match self-closing or opening tags: <tagName attr="val" ... />
    const tagRegex = /<(\w+)\s+([^>]*?)\/?\s*>/g
    let match: RegExpExecArray | null

    while ((match = tagRegex.exec(extra)) !== null) {
        const tagName = match[1]
        const attrString = match[2]
        const attrs: Record<string, string> = {}

        // Parse attributes
        const attrRegex = /(\w[\w-]*)="([^"]*)"/g
        let attrMatch: RegExpExecArray | null
        while ((attrMatch = attrRegex.exec(attrString)) !== null) {
            attrs[attrMatch[1]] = attrMatch[2]
        }

        elements.push(h(tagName, attrs))
    }

    return elements
}

const render = () => {
    const children: ReturnType<typeof h>[] = [h('path', { d: iconData.value.path })]

    // Render extra SVG elements (circles, lines, etc.) if present
    if (iconData.value.extra) {
        children.push(...parseExtra(iconData.value.extra))
    }

    return h(
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
        children,
    )
}
</script>

<template>
    <render />
</template>

<script lang="ts">
import { type PropType, computed, defineComponent, h } from 'vue-demi'
import { getIcon } from '../icons'

export default defineComponent({
    name: 'VmtIcon',

    props: {
        /** Lucide icon name (e.g. 'sun', 'moon', 'palette') */
        name: {
            type: String,
            required: true,
        },
        /** Icon size in pixels */
        size: {
            type: Number,
            default: 20,
        },
        /** Stroke color (default: currentColor so it inherits CSS color) */
        color: {
            type: String,
            default: 'currentColor',
        },
        /** SVG stroke width */
        strokeWidth: {
            type: Number,
            default: 2,
        },
    },

    setup(props) {
        const iconData = computed(() => getIcon(props.name))

        return () =>
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
    },
})
</script>

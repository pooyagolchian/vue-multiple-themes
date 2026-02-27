<template>
    <section class="rounded-2xl p-6 border space-y-4"
        style="background: var(--vmt-surface); border-color: var(--vmt-border)">
        <h2 class="text-lg font-bold">TailwindCSS Strategy</h2>
        <p class="text-sm" style="color: var(--vmt-text-muted)">
            Use <code>strategy: 'class'</code> or <code>'both'</code> to also add
            <code>theme-&lt;name&gt;</code> classes. Then configure Tailwind:
        </p>

        <!-- Code snippet -->
        <pre class="rounded-xl p-4 text-xs font-mono overflow-x-auto"
            style="background: var(--vmt-surface-elevated); color: var(--vmt-text)"><code>// tailwind.config.js
import { vmtTailwindPlugin } from 'vue-multiple-themes/tailwind'

export default {
  plugins: [
    vmtTailwindPlugin({
      themes: myThemes,
      strategy: 'both',
      generateUtils: true,
    }),
  ],
}</code></pre>

        <p class="text-sm" style="color: var(--vmt-text-muted)">
            With <code>generateUtils: true</code> you get semantic utility classes:
        </p>

        <!-- Generated utilities preview -->
        <div class="space-y-2">
            <div v-for="util in tailwindUtils" :key="util.class" class="flex items-center gap-3 p-2 rounded-lg text-xs"
                style="background: var(--vmt-surface-elevated)">
                <span class="font-mono w-48 flex-shrink-0" style="color: var(--vmt-primary)">
                    {{ util.class }}
                </span>
                <span style="color: var(--vmt-text-muted)">→ {{ util.resolves }}</span>
                <span class="ml-auto w-5 h-5 rounded border"
                    :style="{ background: `var(${util.varName})`, borderColor: 'var(--vmt-border)' }" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const tailwindUtils = [
    { class: 'bg-vmt-background', resolves: 'background-color', varName: '--vmt-background' },
    { class: 'bg-vmt-surface', resolves: 'background-color', varName: '--vmt-surface' },
    { class: 'bg-vmt-primary', resolves: 'background-color', varName: '--vmt-primary' },
    { class: 'text-vmt-text', resolves: 'color', varName: '--vmt-text' },
    { class: 'text-vmt-text-muted', resolves: 'color', varName: '--vmt-text-muted' },
    { class: 'text-vmt-primary', resolves: 'color', varName: '--vmt-primary' },
    { class: 'border-vmt-border', resolves: 'border-color', varName: '--vmt-border' },
    { class: 'ring-vmt-ring', resolves: '--tw-ring-color', varName: '--vmt-ring' },
]
</script>

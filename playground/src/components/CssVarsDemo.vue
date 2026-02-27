<template>
    <section class="rounded-2xl p-6 border space-y-4"
        style="background: var(--vmt-surface); border-color: var(--vmt-border)">
        <h2 class="text-lg font-bold">CSS Variables Strategy</h2>
        <p class="text-sm" style="color: var(--vmt-text-muted)">
            The library injects a <code>&lt;style&gt;</code> tag with all theme CSS vars.
            Your CSS can reference them directly:
        </p>

        <pre class="rounded-xl p-4 text-xs font-mono overflow-x-auto"
            style="background: var(--vmt-surface-elevated); color: var(--vmt-text)"><code>/* Pure CSS – no JS conditional logic needed */
.my-card {
  background: var(--vmt-surface);
  color: var(--vmt-text);
  border: 1px solid var(--vmt-border);
}

.cta-button {
  background: var(--vmt-primary);
  color: var(--vmt-text-inverse);
}</code></pre>

        <div class="grid xs:grid-cols-2 lg:grid-cols-3 gap-3">
            <div v-for="(varName, label) in cssVarMap" :key="label"
                class="text-xs p-3 rounded-lg flex items-center gap-2" style="background: var(--vmt-surface-elevated)">
                <span class="w-4 h-4 rounded-full flex-shrink-0 border"
                    :style="{ background: `var(${varName})`, borderColor: 'var(--vmt-border)' }" />
                <code style="color: var(--vmt-text-muted)">{{ varName }}</code>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const cssVarMap: Record<string, string> = {
    'Primary': '--vmt-primary',
    'Secondary': '--vmt-secondary',
    'Accent': '--vmt-accent',
    'Background': '--vmt-background',
    'Surface': '--vmt-surface',
    'Surface Elevated': '--vmt-surface-elevated',
    'Text': '--vmt-text',
    'Text Muted': '--vmt-text-muted',
    'Border': '--vmt-border',
    'Ring': '--vmt-ring',
    'Success': '--vmt-success',
    'Warning': '--vmt-warning',
    'Error': '--vmt-error',
}
</script>

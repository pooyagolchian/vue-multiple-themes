<template>
    <section class="rounded-2xl p-6 border space-y-6"
        style="background: var(--vmt-surface); border-color: var(--vmt-border)">
        <h2 class="text-lg font-bold">UI Components Preview</h2>

        <!-- Buttons -->
        <div class="space-y-2">
            <h3 class="text-sm font-semibold" style="color: var(--vmt-text-muted)">Buttons</h3>
            <div class="flex flex-wrap gap-3">
                <button class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style="background: var(--vmt-primary); color: var(--vmt-text-inverse)">Primary</button>
                <button class="px-4 py-2 rounded-lg text-sm font-medium transition-all border"
                    style="color: var(--vmt-primary); border-color: var(--vmt-primary); background: transparent">Outlined</button>
                <button class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style="background: var(--vmt-secondary); color: var(--vmt-text-inverse)">Secondary</button>
                <button class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style="background: var(--vmt-success); color: #fff">Success</button>
                <button class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style="background: var(--vmt-error); color: #fff">Error</button>
            </div>
        </div>

        <!-- Badges / Chips -->
        <div class="space-y-2">
            <h3 class="text-sm font-semibold" style="color: var(--vmt-text-muted)">Badges</h3>
            <div class="flex flex-wrap gap-2">
                <span v-for="(token, label) in badges" :key="label" class="px-3 py-1 rounded-full text-xs font-semibold"
                    :style="{ background: token, color: '#fff' }">{{ label }}</span>
            </div>
        </div>

        <!-- Cards -->
        <div class="grid sm:grid-cols-2 gap-4">
            <div class="rounded-xl p-4 border"
                style="background: var(--vmt-surface-elevated); border-color: var(--vmt-border)">
                <div class="w-10 h-10 rounded-lg mb-3 flex items-center justify-center"
                    style="background: var(--vmt-primary)">
                    <span class="text-white text-lg">✦</span>
                </div>
                <h4 class="font-semibold text-sm mb-1" style="color: var(--vmt-text)">Feature Card</h4>
                <p class="text-xs leading-relaxed" style="color: var(--vmt-text-muted)">
                    This card automatically inherits all CSS custom properties from the active theme.
                </p>
            </div>

            <div class="rounded-xl p-4 border"
                style="background: var(--vmt-surface-elevated); border-color: var(--vmt-border)">
                <div class="flex items-center gap-3 mb-3">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style="background: var(--vmt-secondary)">PG</div>
                    <div>
                        <p class="text-sm font-medium" style="color: var(--vmt-text)">Pooya Golchian</p>
                        <p class="text-xs" style="color: var(--vmt-text-muted)">Author</p>
                    </div>
                </div>
                <p class="text-xs" style="color: var(--vmt-text-muted)">
                    Adaptive design with zero manual color overrides.
                </p>
            </div>
        </div>

        <!-- Input -->
        <div class="space-y-2">
            <h3 class="text-sm font-semibold" style="color: var(--vmt-text-muted)">Form Inputs</h3>
            <input type="text" placeholder="Type something..."
                class="w-full max-w-xs px-3 py-2 rounded-lg border text-sm outline-none transition-all" style="
          background: var(--vmt-surface-elevated);
          color: var(--vmt-text);
          border-color: var(--vmt-border);
        " />
        </div>
    </section>
</template>

<script setup lang="ts">
// Badge token map
const badges = {
    Primary: 'var(--vmt-primary)',
    Secondary: 'var(--vmt-secondary)',
    Accent: 'var(--vmt-accent)',
    Success: 'var(--vmt-success)',
    Warning: 'var(--vmt-warning)',
    Error: 'var(--vmt-error)',
    Info: 'var(--vmt-info)',
}
</script>

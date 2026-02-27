<template>
  <section class="space-y-8">
    <div>
      <h2 class="section-title">UI Components</h2>
      <p class="section-desc">shadcn-inspired, styled via CSS custom properties</p>
    </div>

    <!-- Buttons -->
    <div class="card-surface space-y-5">
      <p class="label-mono">Buttons</p>
      <div class="flex flex-wrap gap-2.5">
        <button class="btn-primary">Primary</button>
        <button class="btn-secondary">Secondary</button>
        <button class="btn-ghost">Ghost</button>
        <button class="btn-destructive">Destructive</button>
        <button class="btn text-noir-700 cursor-not-allowed opacity-50" disabled>Disabled</button>
      </div>
      <div class="border-t border-noir-800 pt-4">
        <p class="label-mono mb-3">Live theme vars</p>
        <div class="flex flex-wrap gap-2.5">
          <button class="btn rounded-md text-sm font-medium active:scale-[0.97]"
            style="background: var(--vmt-primary); color: var(--vmt-text-inverse)">vmt-primary</button>
          <button class="btn rounded-md text-sm font-medium active:scale-[0.97]"
            style="background: var(--vmt-secondary); color: var(--vmt-text-inverse)">vmt-secondary</button>
          <button class="btn rounded-md text-sm font-medium active:scale-[0.97]"
            style="background: var(--vmt-accent); color: var(--vmt-text-inverse)">vmt-accent</button>
        </div>
      </div>
    </div>

    <!-- Badges -->
    <div class="card-surface space-y-4">
      <p class="label-mono">Badges</p>
      <div class="flex flex-wrap gap-2.5">
        <span class="badge border border-noir-800 bg-noir-900 text-noir-400">default</span>
        <span class="badge bg-white text-noir-950">solid</span>
        <span class="badge border text-vmt-primary" style="border-color: var(--vmt-primary)">outline</span>
        <span class="badge text-white" style="background: var(--vmt-success)">success</span>
        <span class="badge text-noir-950" style="background: var(--vmt-warning)">warning</span>
        <span class="badge text-white" style="background: var(--vmt-error)">error</span>
      </div>
    </div>

    <!-- Cards -->
    <div class="grid sm:grid-cols-2 gap-4">
      <div class="card-surface group hover:border-noir-600 transition-all space-y-3">
        <div class="w-9 h-9 rounded-md border border-noir-700 grid place-content-center text-noir-400">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
        </div>
        <h4 class="text-sm font-semibold text-white tracking-tight">Feature Card</h4>
        <p class="text-xs text-noir-500 leading-relaxed">
          Automatically inherits all CSS custom properties from the active theme.
        </p>
      </div>
      <div class="card-surface group hover:border-noir-600 transition-all space-y-3">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-noir-800 border border-noir-700 grid place-content-center text-xs font-mono text-noir-400">
            PG
          </div>
          <div>
            <p class="text-sm font-medium text-white tracking-tight">Pooya Golchian</p>
            <p class="text-xs text-noir-600 font-mono">Author</p>
          </div>
        </div>
        <p class="text-xs text-noir-500 leading-relaxed">
          Adaptive design. Works seamlessly with Vue 2 and Vue 3.
        </p>
      </div>
    </div>

    <!-- Form inputs -->
    <div class="card-surface space-y-4">
      <p class="label-mono">Form inputs</p>
      <div class="space-y-3 max-w-sm">
        <input type="text" placeholder="Enter your email..." class="input" />
        <select class="input">
          <option>light</option><option>dark</option><option>ocean</option><option>forest</option>
        </select>
        <div class="flex items-center gap-3">
          <div class="w-10 h-5 rounded-full bg-noir-800 border border-noir-700 relative cursor-pointer transition-colors hover:border-noir-600">
            <div class="w-3.5 h-3.5 rounded-full bg-noir-400 absolute left-0.5 top-0.5 transition-transform" />
          </div>
          <span class="text-xs text-noir-500">Toggle switch</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Pure template demo — all styles via Tailwind + CSS vars
</script>

<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-lg font-semibold text-zinc-100 mb-1">UI Components</h2>
      <p class="text-xs font-mono" style="color: var(--noir-muted)">shadcn-style, driven by CSS custom properties</p>
    </div>

    <div class="rounded-md border p-5 space-y-4" style="background: var(--noir-surface); border-color: var(--noir-border)">
      <p class="text-xs font-mono text-zinc-400">// buttons</p>
      <div class="flex flex-wrap gap-2">
        <button class="px-4 py-2 rounded-md text-sm font-medium bg-white text-zinc-950 hover:bg-zinc-200 transition-all active:scale-95">Primary</button>
        <button class="px-4 py-2 rounded-md text-sm font-medium border text-zinc-100 hover:bg-zinc-800 transition-all"
          style="border-color: var(--noir-border-strong)">Secondary</button>
        <button class="px-4 py-2 rounded-md text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all">Ghost</button>
        <button class="px-4 py-2 rounded-md text-sm font-medium border text-red-400 hover:bg-red-950 transition-all" style="border-color: #7f1d1d">Destructive</button>
        <button class="px-4 py-2 rounded-md text-sm font-medium text-zinc-600 cursor-not-allowed opacity-50" disabled>Disabled</button>
      </div>
      <div class="flex flex-wrap gap-2 pt-3 border-t" style="border-color: var(--noir-border)">
        <p class="w-full text-xs font-mono text-zinc-600">// live theme vars</p>
        <button class="px-4 py-2 rounded-md text-sm font-medium" style="background: var(--vmt-primary); color: var(--vmt-text-inverse)">vmt-primary</button>
        <button class="px-4 py-2 rounded-md text-sm font-medium" style="background: var(--vmt-secondary); color: var(--vmt-text-inverse)">vmt-secondary</button>
        <button class="px-4 py-2 rounded-md text-sm font-medium" style="background: var(--vmt-accent); color: var(--vmt-text-inverse)">vmt-accent</button>
      </div>
    </div>

    <div class="rounded-md border p-5 space-y-3" style="background: var(--noir-surface); border-color: var(--noir-border)">
      <p class="text-xs font-mono text-zinc-400">// badges</p>
      <div class="flex flex-wrap gap-2">
        <span class="text-xs px-2.5 py-0.5 rounded-full border font-mono text-zinc-300"
          style="border-color: var(--noir-border-strong); background: var(--noir-surface-raised)">default</span>
        <span class="text-xs px-2.5 py-0.5 rounded-full bg-white text-zinc-950 font-mono">solid</span>
        <span class="text-xs px-2.5 py-0.5 rounded-full border font-mono"
          style="border-color: var(--vmt-primary); color: var(--vmt-primary)">outline</span>
        <span class="text-xs px-2.5 py-0.5 rounded-full font-mono" style="background: var(--vmt-success); color: #fff">success</span>
        <span class="text-xs px-2.5 py-0.5 rounded-full font-mono" style="background: var(--vmt-warning); color: #000">warning</span>
        <span class="text-xs px-2.5 py-0.5 rounded-full font-mono" style="background: var(--vmt-error); color: #fff">error</span>
      </div>
    </div>

    <div class="grid sm:grid-cols-2 gap-4">
      <div class="rounded-md border p-5 space-y-3 hover:border-zinc-600 transition-all"
        style="background: var(--noir-surface); border-color: var(--noir-border)">
        <div class="w-9 h-9 rounded-md border grid place-content-center text-base"
          style="border-color: var(--noir-border-strong)">&#10022;</div>
        <h4 class="text-sm font-semibold text-zinc-100">Feature Card</h4>
        <p class="text-xs leading-relaxed" style="color: var(--noir-muted)">
          Automatically inherits all CSS custom properties from the active theme.
        </p>
      </div>
      <div class="rounded-md border p-5 space-y-3 hover:border-zinc-600 transition-all"
        style="background: var(--noir-surface); border-color: var(--noir-border)">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-zinc-700 grid place-content-center text-xs font-mono text-zinc-300 border"
            style="border-color: var(--noir-border-strong)">PG</div>
          <div>
            <p class="text-sm font-medium text-zinc-100">Pooya Golchian</p>
            <p class="text-xs font-mono" style="color: var(--noir-muted)">Author</p>
          </div>
        </div>
        <p class="text-xs leading-relaxed" style="color: var(--noir-muted)">Adaptive design. Works with Vue 2 and Vue 3.</p>
      </div>
    </div>

    <div class="rounded-md border p-5 space-y-3" style="background: var(--noir-surface); border-color: var(--noir-border)">
      <p class="text-xs font-mono text-zinc-400">// form inputs</p>
      <div class="space-y-3 max-w-sm">
        <input type="text" placeholder="Enter your email..."
          class="w-full px-3 py-2 rounded-md border text-sm font-mono outline-none transition-all focus:border-zinc-400 placeholder:text-zinc-600"
          style="background: #09090b; color: var(--noir-text); border-color: var(--noir-border)" />
        <select class="w-full px-3 py-2 rounded-md border text-sm font-mono outline-none"
          style="background: #09090b; color: var(--noir-text); border-color: var(--noir-border)">
          <option>light theme</option><option>dark theme</option><option>midnight</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Pure template demo
</script>

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
            style="background: var(--vmt-primary-color); color: var(--vmt-text-inverse-color)">vmt-primary</button>
          <button class="btn rounded-md text-sm font-medium active:scale-[0.97]"
            style="background: var(--vmt-secondary-color); color: var(--vmt-text-inverse-color)">vmt-secondary</button>
          <button class="btn rounded-md text-sm font-medium active:scale-[0.97]"
            style="background: var(--vmt-accent-color); color: var(--vmt-text-inverse-color)">vmt-accent</button>
        </div>
      </div>
    </div>

    <!-- Badges -->
    <div class="card-surface space-y-4">
      <p class="label-mono">Badges</p>
      <div class="flex flex-wrap gap-2.5">
        <span class="badge border border-noir-800 bg-noir-900 text-noir-400">default</span>
        <span class="badge bg-white text-noir-950">solid</span>
        <span class="badge border text-vmt-primary" style="border-color: var(--vmt-primary-color)">outline</span>
        <span class="badge text-white" style="background: var(--vmt-success-color)">success</span>
        <span class="badge text-noir-950" style="background: var(--vmt-warning-color)">warning</span>
        <span class="badge text-white" style="background: var(--vmt-error-color)">error</span>
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
    <div class="card-surface space-y-6">
      <p class="label-mono">Form inputs</p>

      <div class="grid sm:grid-cols-2 gap-5">

        <!-- Email — with leading icon -->
        <div class="space-y-1.5">
          <label class="block text-xs font-medium text-noir-400 tracking-wide uppercase">Email</label>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-noir-600 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <input type="email" placeholder="you@example.com"
              class="input pl-9 focus:border-vmt-primary"
              style="--tw-ring-color: var(--vmt-primary-color)" />
          </div>
          <p class="text-xs text-noir-600 font-mono">We'll never share your email.</p>
        </div>

        <!-- Password — with trailing toggle -->
        <div class="space-y-1.5">
          <label class="block text-xs font-medium text-noir-400 tracking-wide uppercase">Password</label>
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
              class="input pr-10" />
            <button type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-noir-600 hover:text-noir-400 transition-colors"
              @click="showPassword = !showPassword">
              <svg v-if="!showPassword" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
            </button>
          </div>
        </div>

        <!-- Select — custom chevron -->
        <div class="space-y-1.5">
          <label class="block text-xs font-medium text-noir-400 tracking-wide uppercase">Theme</label>
          <div class="relative">
            <select class="input appearance-none pr-9 cursor-pointer">
              <option>light</option><option>dark</option><option selected>ocean</option><option>forest</option><option>sepia</option>
            </select>
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 text-noir-600 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>

        <!-- Error state -->
        <div class="space-y-1.5">
          <label class="block text-xs font-medium text-noir-400 tracking-wide uppercase">Username</label>
          <div class="relative">
            <input type="text" value="pooya@" placeholder="username"
              class="input border-red-800/60 focus:border-red-600 text-red-300 placeholder:text-red-900" />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
          </div>
          <p class="text-xs text-red-500/80 font-mono">Special characters not allowed.</p>
        </div>

      </div>

      <!-- Textarea with char count -->
      <div class="space-y-1.5">
        <div class="flex items-center justify-between">
          <label class="block text-xs font-medium text-noir-400 tracking-wide uppercase">Notes</label>
          <span class="text-xs font-mono" :class="noteText.length > 120 ? 'text-red-500' : 'text-noir-600'">
            {{ noteText.length }} / 140
          </span>
        </div>
        <textarea v-model="noteText" rows="3" placeholder="Add a note…"
          class="input resize-none leading-relaxed"
          maxlength="140" />
      </div>

      <!-- Toggles & checkboxes -->
      <div class="border-t border-noir-800 pt-5 grid sm:grid-cols-2 gap-5">

        <!-- Toggle switches -->
        <div class="space-y-3">
          <p class="text-xs font-mono text-noir-600 mb-1">Toggles</p>
          <label v-for="tog in toggles" :key="tog.label"
            class="flex items-center justify-between gap-3 cursor-pointer group">
            <span class="text-sm text-noir-400 group-hover:text-noir-200 transition-colors select-none">{{ tog.label }}</span>
            <button type="button" role="switch" :aria-checked="tog.value"
              class="relative inline-flex h-5 w-9 shrink-0 rounded-full border transition-colors duration-200 focus-ring"
              :class="tog.value
                ? 'border-transparent'
                : 'border-noir-700 bg-noir-900'"
              :style="tog.value ? 'background: var(--vmt-primary-color)' : ''"
              @click="tog.value = !tog.value">
              <span class="pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 mt-0.5"
                :class="tog.value ? 'translate-x-4' : 'translate-x-0.5'" />
            </button>
          </label>
        </div>

        <!-- Checkboxes -->
        <div class="space-y-3">
          <p class="text-xs font-mono text-noir-600 mb-1">Checkboxes</p>
          <label v-for="cb in checkboxes" :key="cb.label"
            class="flex items-center gap-3 cursor-pointer group">
            <span class="relative flex h-4 w-4 shrink-0 rounded border transition-colors"
              :class="cb.checked ? 'border-transparent' : 'border-noir-700 bg-noir-950'"
              :style="cb.checked ? 'background: var(--vmt-primary-color)' : ''"
              @click="cb.checked = !cb.checked">
              <svg v-if="cb.checked" class="absolute inset-0 m-auto" width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6l3 3 5-5"/></svg>
            </span>
            <span class="text-sm select-none transition-colors"
              :class="cb.checked ? 'text-noir-200' : 'text-noir-500 group-hover:text-noir-400'">{{ cb.label }}</span>
          </label>
        </div>

      </div>

      <!-- Submit row -->
      <div class="border-t border-noir-800 pt-4 flex items-center justify-between gap-3">
        <span class="text-xs font-mono text-noir-600">{{ toggles.filter(t=>t.value).length }} of {{ toggles.length }} features enabled</span>
        <div class="flex gap-2">
          <button type="button" class="btn-ghost text-xs px-3 py-1.5">Reset</button>
          <button type="button" class="btn rounded-md text-xs px-4 py-1.5 font-semibold transition-all active:scale-[0.97]"
            style="background: var(--vmt-primary-color); color: var(--vmt-text-inverse-color)">
            Save settings
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const showPassword = ref(false)
const noteText = ref('')

const toggles = reactive([
  { label: 'Email notifications', value: true },
  { label: 'Dark mode sync',      value: false },
  { label: 'Analytics',           value: true },
])

const checkboxes = reactive([
  { label: 'Remember me',          checked: true },
  { label: 'Subscribe to updates', checked: false },
  { label: 'Accept terms',         checked: false },
])
</script>

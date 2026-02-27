import { createApp } from 'vue'
import { VueMultipleThemesPlugin } from 'vue-multiple-themes'
import { PRESET_THEMES } from 'vue-multiple-themes'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(VueMultipleThemesPlugin, {
  themes: PRESET_THEMES,
  defaultTheme: 'light',
  strategy: 'both',       // attribute + class
  storageKey: 'pg-theme',
  injectCssVars: true,
  respectSystemPreference: true,
})

app.mount('#app')

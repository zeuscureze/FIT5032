import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'

import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import App from './App.vue'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')

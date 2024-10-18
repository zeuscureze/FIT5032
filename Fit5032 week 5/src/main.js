import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'

import router from './router/router'

import PrimeVue from 'primevue/config'
import Aura from '../node_modules/@primevue/themes/aura'

import App from './App.vue'

import './firebase' // Assuming you have Firebase setup
const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')
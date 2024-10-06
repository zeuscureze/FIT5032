import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'

import router from './router/router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import App from './App.vue'
import {firebaseApp} from './FBCONfit'
const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')
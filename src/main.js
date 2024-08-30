import { createApp } from 'vue';
import App from './App.vue';
import router from './components/router/router.js'; 
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Aura from '@primevue/themes/Aura'
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);


app.use(PrimeVue, {
    theme: {
      preset: Aura
    }
  })
app.use(ToastService);

app.use(router);


app.mount('#app');
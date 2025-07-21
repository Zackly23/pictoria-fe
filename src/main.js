import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import App from './App.vue'
import router from './router'
import Aura from '@primeuix/themes/aura'

if (import.meta.env.MODE === 'production') {
  console.log = () => {}
  console.warn = () => {}
  console.error = () => {}
}

const app = createApp(App)

app.use(createPinia())
// app.use(PrimeVue)
app.use(ToastService)

app.component('Toast', Toast)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(router)

app.mount('#app')

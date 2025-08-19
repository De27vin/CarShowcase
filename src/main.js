import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useCarStore } from './stores/cars'

import './style.css'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)

const carStore = useCarStore(pinia)
carStore.loadFromLocalStorage()

app.mount('#app')

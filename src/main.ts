import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import UI from '@cmmv/ui'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(UI)

app.mount('#app')

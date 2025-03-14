import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import UI from '@cmmv/ui'

import App from './App.vue'
import router from './router.ts'

const app = createApp(App)

app.use(createPinia())
app.use(VueReCaptcha, {
    siteKey: import.meta.env.VITE_RECAPTCHA_KEY,
    loaderOptions: {
        autoHideBadge: true,
        explicitRenderParameters: {
            badge: 'bottomright',
            size: 'invisible',
        },
    },
})
app.use(router)
app.use(UI)

app.mount('#app')

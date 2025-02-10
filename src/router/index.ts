import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import IndexView from '../views/IndexView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/admin',
            name: 'admin',
            component: IndexView,
        },
    ],
})

export default router

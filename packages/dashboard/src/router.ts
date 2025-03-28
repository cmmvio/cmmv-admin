import { createRouter, createWebHistory } from 'vue-router'

import AdminLayout from './layouts/AdminLayout.vue'
import AuthenticationLayout from './layouts/AuthenticationLayout.vue'

import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
import AdminView from './views/AdminView.vue'
import OptView from './views/OptView.vue'
import OptActiveView from './views/OptActiveView.vue'
import AuthGroupsView from "./views/auth/AuthGroupsView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminLayout,
            children: [{
                path: '',
                component: AdminView
            }],
        },
        {
            path: '/opt-validate',
            name: 'opt-validate',
            component: OptView,
        },
        {
            path: '/opt-active',
            name: 'opt-active',
            component: OptActiveView,
        },
        {
            path: "/authentication",
            component: AdminLayout,
            children: [{
                path: '',
                component: AuthenticationLayout,
                children: [{
                    path: '',
                    component: AuthGroupsView
                }]
            }],
        }
    ],
})

export default router

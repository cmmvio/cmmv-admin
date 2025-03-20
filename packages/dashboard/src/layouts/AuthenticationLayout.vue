<template>
    <div class="flex">
        <c-navbar
            mode="vertical"
            :items="navbarAuthentication"
            :useRouter="true"
            :fixed="true"
            fixedHeader="Authentication"
            height="h-[calc(100%-3rem)]"
            iconClass="text-neutral-500 dark:text-neutral-400"
            class="absolute flex bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 w-56"
        />

        <div class="flex-1 ml-56 flex-col p-4">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useApi } from '@cmmv/client'
const api = useApi()
onBeforeMount(async () => await api.checkSession())

const navbarAuthentication = ref([
    {
        subheader: 'ACCESS CONTROL',
        children: [
            { text: 'Groups', href: '/groups' },
            { text: 'Users', href: '/users' },
        ],
    },

    {
        subheader: 'CONFIGURATION',
        children: [
            { text: 'Sign In / Up', href: '/auth/providers' },
            { text: 'Sessions', href: '/auth/sessions' },
            { text: 'Rate Limits', href: '/auth/rate-limits' },
            { text: 'Emails', href: '/auth/emails' },
            { text: 'Multi-Factor', href: '/auth/mfa' },
        ],
    },
])
</script>

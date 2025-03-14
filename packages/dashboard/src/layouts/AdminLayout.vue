<template>
    <c-toolbar
        class="bg-white dark:bg-neutral-900 text-white border-b border-neutral-200 dark:border-neutral-800 fixed"
        minified
    >
        <c-toolbar-title>
            <a href="/projects" target="_blank">
                <img
                    src="/assets/android-chrome-192x192.png"
                    class="w-6 cursor-pointer rounded"
                    alt="CMMV"
                />
            </a>
        </c-toolbar-title>

        <c-spacer />

        <div class="flex items-center gap-x-3 justify-center py-2">
            <c-dropdown position="bottom-right">
                <template #activator>
                    <c-button
                        bgColor="bg-white dark:bg-neutral-900"
                        textColor="text-neutral-600 dark:text-neutral-200"
                        class="border border-neutral-200 dark:border-neutral-800"
                        >Feedback</c-button
                    >
                </template>
            </c-dropdown>

            <c-dropdown position="bottom-right">
                <template #activator>
                    <icon-inbox
                        class="h-5 w-5 text-neutral-600 dark:text-white"
                        aria-hidden="true"
                        size="sm"
                    />
                </template>
            </c-dropdown>

            <c-dropdown position="bottom-right">
                <template #activator>
                    <icon-question-mark-circle
                        class="h-5 w-5 text-neutral-600 dark:text-white"
                        aria-hidden="true"
                        size="sm"
                    />
                </template>
            </c-dropdown>

            <SwitchTheme />
        </div>
    </c-toolbar>

    <div class="flex h-screen">
        <!-- Navbar (sidebar) -->
        <c-navbar
            mode="vertical"
            :items="items"
            :showIcons="true"
            :collapsed="true"
            :expandOnHover="true"
            iconClass="text-blue-500 dark:text-blue-400"
            class="fixed bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 h-full mt-12"
        />

        <div class="flex-1 flex flex-col ml-16 mt-12">
            <div class="p-4 dark:text-neutral-400">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import * as ui from '@cmmv/ui'
import SwitchTheme from '../components/SwitchTheme.vue'

const items = ref([
    {
        text: 'API',
        href: '/api',
        icon: ui.components.IconLink,
    },
    {
        text: 'Contracts',
        href: '/contracts',
        icon: ui.components.IconCircleStack,
    },
    {
        text: 'Authentication',
        href: '/authentication',
        icon: ui.components.IconFingerPrint,
    },
    {
        text: 'Integration',
        href: '/integration',
        icon: ui.components.IconPuzzlePiece,
    },
])
</script>

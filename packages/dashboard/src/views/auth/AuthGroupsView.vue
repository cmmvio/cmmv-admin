<template>
    <div class="max-w-[1200px] px-4 md:px-6 lg:px-14 xl:px-24 2xl:px-28 w-full mx-auto pt-12">
        <h1 class="text-2xl pb-3">Groups</h1>

        <p class="text-sm text-foreground-light">Configure group options and access permissions</p>

        <div class="pt-6">
            <c-data-table
                apiUrl="/api/auth/group-get-all"
                :apiHeaders="apiHeaders"
                :card="false"
                :headers="headers"
                :selectable="true"
                :enable-api-sort="true"
            >
                <template #caption>
                    <div class="flex">
                        <c-button
                            bgColor="bg-neutral-200 dark:bg-neutral-700 mr-2"
                            textColor="text-neutral-600 dark:text-white"
                            size="sm"
                        >
                            <icon-refresh
                                class="w-4 text-neutral-600 dark:text-white mr-1"
                                aria-hidden="true"
                                size="sm"
                            />
                            Refresh
                        </c-button>

                        <c-button
                            bgColor="bg-green-600 dark:bg-green-800"
                            size="sm"
                            @click="addGroup()"
                        >
                            <icon-plus class="w-4 text-white mr-1" aria-hidden="true" size="sm" />
                            Add Group
                        </c-button>
                    </div>
                </template>

                <template #roles="{ item }">
                    {{ `${item.roles.length} Access Rules` }}
                </template>

                <template #actions="{ item }">
                    <c-button
                        class="bg-transparent hover:bg-neutral-300 dark:hover:bg-neutral-700 py-2"
                        size="md"
                        title="Edit"
                    >
                        <icon-pencil
                            class="h-4 w-4 text-neutral-600 dark:text-white"
                            aria-hidden="true"
                            size="xs"
                        />
                    </c-button>

                    <c-tooltip content="Remove">
                        <c-button
                            class="bg-transparent hover:bg-neutral-300 dark:hover:bg-neutral-700 py-2"
                            size="md"
                            title="Remove"
                        >
                            <icon-x-mark
                                class="h-4 w-4 text-neutral-600 dark:text-white"
                                aria-hidden="true"
                                size="xs"
                            />
                        </c-button>
                    </c-tooltip>
                </template>
            </c-data-table>
        </div>

        <c-dialog
            cardMaxWidth="600px"
            cardBgColor="bg-white dark:bg-neutral-800"
            v-model="insertDialog"
            closable
        >
            <template #header>
                <h3 class="font-bold">Groups</h3>
            </template>

            <template #content>
                <div class="p-2">
                    <c-form-builder v-model="formData" :schema="schema">
                        <template #table-header>
                            <div
                                class="flex items-center py-1 border-b border-neutral-200 dark:border-neutral-900 mb-2 w-[55 0px]"
                            >
                                <div class="w-1/5 font-medium text-sm text-primary-600">Module</div>
                                <div class="w-4/5 grid grid-cols-6 gap-2">
                                    <div class="text-center font-medium text-xs text-primary-600">
                                        View
                                    </div>
                                    <div class="text-center font-medium text-xs text-primary-600">
                                        Insert
                                    </div>
                                    <div class="text-center font-medium text-xs text-primary-600">
                                        Update
                                    </div>
                                    <div class="text-center font-medium text-xs text-primary-600">
                                        Delete
                                    </div>
                                    <div class="text-center font-medium text-xs text-primary-600">
                                        Import
                                    </div>
                                    <div class="text-center font-medium text-xs text-primary-600">
                                        Export
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template #permissions="slotProps">
                            <div
                                class="flex items-center border-b border-neutral-200 dark:border-neutral-900 py-1.5"
                            >
                                <div class="w-1/5 font-medium text-sm">
                                    {{
                                        slotProps.key
                                            ? slotProps.key.charAt(0).toUpperCase() +
                                              slotProps.key.slice(1)
                                            : slotProps.formData.roles[slotProps.key]
                                              ? Object.keys(
                                                    slotProps.formData.roles[slotProps.key],
                                                )[0]
                                              : 'Module'
                                    }}
                                </div>
                                <div class="w-4/5 grid grid-cols-6 gap-2">
                                    <div
                                        v-for="perm in [
                                            'view',
                                            'insert',
                                            'update',
                                            'delete',
                                            'import',
                                            'export',
                                        ]"
                                        :key="perm"
                                        class="text-center"
                                    >
                                        <c-toggle
                                            v-if="slotProps.key && formData.roles[slotProps.key]"
                                            v-model="formData.roles[slotProps.key][perm]"
                                            size="sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template #captionGroups>
                            <div class="col-span-12">
                                <p class="text-sm dark:text-neutral-500 text-justify">
                                    Please note that any changes to group permissions will take
                                    effect for existing users upon their next login. For non-root
                                    users, the token refresh interval is 15 minutes, after which new
                                    access rules will automatically apply. If immediate application
                                    of the new permissions is required, users should log out and log
                                    back in.
                                </p>
                            </div>
                        </template>
                    </c-form-builder>
                </div>
            </template>
        </c-dialog>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useApi } from '@cmmv/client'

const api = useApi()
const apiHeaders = ref(api.getHeaders())
const insertDialog = ref(false)
const rolesToObejct = ref({})
const assignRoles = ref({})

const formData = ref({
    name: '',
    roles: rolesToObejct,
})

const formDataDefault = ref({
    name: '',
    roles: rolesToObejct,
})

onBeforeMount(async () => {
    const roles = (await api.authRequest('/auth/roles', 'GET')).contracts

    for (let key in roles) {
        roles[key].roles.map((role) => {
            const [roleName, permission] = role.split(':')
            if (!rolesToObejct.value[roleName]) rolesToObejct.value[roleName] = {}
            rolesToObejct.value[roleName][permission] = false
        })
    }

    formData.value.roles = rolesToObejct.value

    for (let key in roles) {
        roles[key].roles.map((role) => {
            const [roleName, permission] = role.split(':')
            assignRoles.value[roleName] = formData.value.roles[roleName]
        })
    }
})

const headers = ref([
    { key: 'id', label: 'ID', width: '100px' },
    { key: 'name', label: 'Name' },
    { key: 'roles', label: 'Roles' },
    { key: 'actions', label: 'Actions', width: '90px' },
])

const schema = ref({
    name: {
        type: 'input',
        label: 'Group name',
        placeholder: 'Enter group name',
        required: true,
        size: 12,
    },
    tableHeader: {
        type: 'custom',
        size: 12,
    },
    roles: {
        type: 'custom-object',
        size: 12,
        props: {
            templateName: 'permissions',
            items: assignRoles.value,
        },
    },
    captionGroups: {
        type: 'custom',
        size: 12,
    },
    submit: {
        type: 'submit',
        label: 'Create group',
        size: 12,
        props: {
            size: 'sm',
        },
    },
})

const addGroup = () => {
    formData.value = formDataDefault.value
    insertDialog.value = true
}
</script>

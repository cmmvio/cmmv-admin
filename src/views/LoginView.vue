<template>
    <div class="w-6/12 m-auto">
        <c-card class="bg-white dark:bg-zinc-800 w-10/12 m-auto p-8 container">
            <h1 class="mb-4">Login</h1>

            <c-form v-model="form" @submit.prevent="handleSubmit">
                <div class="m-auto">
                    <c-input
                        v-model="data.username"
                        label="Email"
                        type="text"
                        placeholder="Enter your email"
                        :rules="[(value) => !value && 'Email is required']"
                        clearable
                    />

                    <c-input
                        v-model="data.password"
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        :rules="[(value) => !value && 'Password is required']"
                    />

                    <c-button
                        class="w-full pb-4 pt-4"
                        type="submit"
                        buttonType="button"
                        size="2xl"
                        :disabled="!form"
                        >Login</c-button
                    >
                </div>
            </c-form>
        </c-card>

        <c-notification ref="notification" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '../composable/useApi'
import IconCheck from '@cmmv/ui'
const api = useApi()
const router = useRouter()

const notification = ref(null)

const data = ref({
    username: '',
    password: '',
})

const handleSubmit = async () => {
    try {
        const result = await api.login(data.value)
        console.log(result)
        //router.push('/admin');
    } catch (err) {
        console.log(err)
        notification.value.showNotification({
            newTitle: 'Error!',
            newContent: 'Your operation was successful.',
            newIcon: IconCheck,
            newDuration: 3000,
        })
    }
}
</script>

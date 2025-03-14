<template>
    <div class="main w-full h-screen z-0 select-none">
        <div class="w-full h-screen z-50" style="backdrop-filter: blur(12px)">
            <div
                class="flex items-center justify-center h-screen w-full md:w-6/12 max-w-lg m-auto p-4 z-50 animate-fade-in"
            >
                <c-card class="login-box bg-white dark:bg-zinc-800 p-8 relative">
                    <div
                        class="absolute w-full h-full top-0 left-0 right-0 bottom-0 bg-black opacity-60 flex items-center justify-center"
                        style="z-index: 9999"
                        v-if="loading"
                    >
                        <div class="flex flex-col items-center justify-center">
                            <Loader270Ring
                                width="56"
                                height="56"
                                color="text-zinc-200"
                            ></Loader270Ring>
                            <div class="mt-2 text-white text-sm">Loading...</div>
                        </div>
                    </div>

                    <div class="m-auto mb-6">
                        <a href="https://cmmv.io/" target="blank">
                            <img
                                src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png"
                                width="150"
                                alt="CMMV Logo"
                                class="m-auto"
                            />
                        </a>
                    </div>

                    <div class="w-full">
                        <c-otp-input
                            v-model="data.secret"
                            type="text"
                            placeholder="Enter your email"
                            :disabled="loading"
                            class="mb-4 select-text"
                        />

                        <p class="m-6 text-xs text-center">
                            To complete the authentication, enter the code from your configured
                            authentication software.
                        </p>

                        <c-button
                            class="w-full pb-4 pt-4"
                            type="submit"
                            buttonType="button"
                            size="2xl"
                            :disabled="data.secret.toString().length < 6 || loading"
                            @click="handleSubmit"
                        >
                            Authorize
                        </c-button>
                    </div>
                </c-card>

                <c-notification ref="notification" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useReCaptcha } from 'vue-recaptcha-v3'
import { useApi } from '@cmmv/client'

const api = useApi()
const router = useRouter()
const loading = ref(false)
const data = ref({
    secret: '',
    token: '',
})

const notification = ref(null)
const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()
onBeforeMount(async () => await api.checkSession())

const recaptcha = async () => {
    await recaptchaLoaded()
    const token = await executeRecaptcha('login')
    return token
}

const handleSubmit = async () => {
    try {
        loading.value = true
        data.value.token = await recaptcha()
        const result = await api.authRequest('auth/opt-validate', 'POST', data.value)
        loading.value = false

        if (result.success) router.push('/admin')
        else throw new Error(result.message)
    } catch (err) {
        loading.value = false

        notification.value.showNotification({
            newTitle: 'Error!',
            newContent: err.message,
            newDuration: 3000,
        })
    }
}
</script>

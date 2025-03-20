<template>
    <div class="main w-full h-screen z-0 select-none">
        <div class="w-full h-screen z-50" style="backdrop-filter: blur(12px)">
            <div
                class="flex items-center justify-center h-screen w-full md:w-6/12 max-w-lg m-auto p-4 z-50 animate-fade-in"
            >
                <c-card bgColor="bg-white dark:bg-neutral-800" class="login-box p-8 relative">
                    <div class="right-2 top-2 absolute">
                        <SwitchTheme />
                    </div>

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

                    <c-form v-model="form" @submit.prevent="handleSubmit">
                        <div class="w-full">
                            <c-input
                                v-model="data.username"
                                label="Email"
                                type="text"
                                placeholder="Enter your email"
                                :disabled="loading"
                                :rules="[(value) => !value && 'Email is required']"
                                class="mb-4 select-text"
                                clearable
                            />

                            <c-input
                                v-model="data.password"
                                type="password"
                                label="Password"
                                placeholder="Enter your password"
                                :loading="loading"
                                :disabled="loading"
                                :rules="[(value) => !value && 'Password is required']"
                                class="mb-4 select-text"
                            />

                            <div class="mb-4 text-right">
                                <a
                                    href="/forgot-password"
                                    class="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                    aria-label="Recover your password"
                                >
                                    Forgot Password?
                                </a>
                            </div>

                            <c-button
                                class="w-full pb-4 pt-4"
                                type="submit"
                                buttonType="button"
                                size="2xl"
                                :disabled="!form || loading"
                            >
                                Login
                            </c-button>

                            <div class="relative flex py-5 items-center">
                                <div class="flex-grow border-t border-zinc-600"></div>
                                <span class="flex-shrink mx-4 text-zinc-600">Social</span>
                                <div class="flex-grow border-t border-zinc-600"></div>
                            </div>

                            <div class="space-y-3">
                                <!-- Facebook Login -->
                                <c-button
                                    class="w-full pb-4 pt-4 text-white"
                                    type="button"
                                    buttonType="button"
                                    size="2xl"
                                    bgColor="bg-[#1877F2]"
                                    aria-label="Login With Facebook"
                                    role="button"
                                    title="Login With Facebook"
                                >
                                    <div class="flex w-full gap-2 items-center justify-center">
                                        <icon-facebook
                                            class="w-5 h-5 text-white"
                                            aria-hidden="true"
                                        />
                                        Login With Facebook
                                    </div>
                                </c-button>

                                <!-- Google Login -->
                                <c-button
                                    class="w-full pb-4 pt-4 text-white"
                                    type="button"
                                    buttonType="button"
                                    size="2xl"
                                    bgColor="bg-[#DB4437]"
                                    aria-label="Login With Google"
                                    role="button"
                                    title="Login With Google"
                                >
                                    <div class="flex w-full gap-2 items-center justify-center">
                                        <icon-google
                                            class="w-5 h-5 text-white"
                                            aria-hidden="true"
                                        />
                                        Login With Google
                                    </div>
                                </c-button>

                                <!-- GitHub Login -->
                                <c-button
                                    class="w-full pb-4 pt-4 text-white"
                                    type="button"
                                    buttonType="button"
                                    size="2xl"
                                    bgColor="bg-[#24292E]"
                                    aria-label="Login With GitHub"
                                    role="button"
                                    title="Login With GitHub"
                                >
                                    <div class="flex w-full gap-2 items-center justify-center">
                                        <icon-github
                                            class="w-5 h-5 text-white"
                                            aria-hidden="true"
                                        />
                                        Login With GitHub
                                    </div>
                                </c-button>
                            </div>
                        </div>
                    </c-form>
                </c-card>

                <c-notification ref="notification" />
            </div>
        </div>
    </div>
</template>

<style>
body {
    border: 0px;
    margin: 0px;
}

.main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to bottom, #000000, #00172d);
    overflow: hidden;
    position: relative;
}

.main::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 255, 150, 0.4), transparent 70%);
    filter: blur(150px);
    animation: auroraGreen 8s infinite alternate ease-in-out;
    z-index: 0;
}

.main::after {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(128, 0, 255, 0.4), transparent 70%);
    filter: blur(150px);
    animation: auroraPurple 10s infinite alternate-reverse ease-in-out;
    z-index: 0;
}

@keyframes auroraGreen {
    0% {
        transform: translate(-10%, -20%) rotate(0deg);
    }
    50% {
        transform: translate(15%, 25%) rotate(60deg);
    }
    100% {
        transform: translate(-10%, -20%) rotate(120deg);
    }
}

@keyframes auroraPurple {
    0% {
        transform: translate(10%, 20%) rotate(0deg);
    }
    50% {
        transform: translate(-15%, -25%) rotate(-60deg);
    }
    100% {
        transform: translate(10%, 20%) rotate(-120deg);
    }
}

@keyframes float {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0);
    }
}

@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.animate-fade-in {
    animation: fade-in 0.8s ease-in-out;
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useReCaptcha } from 'vue-recaptcha-v3'
import { useApi } from '@cmmv/client'
import SwitchTheme from '../components/SwitchTheme.vue'
import IconCheck from '@cmmv/ui'

const api = useApi()
const router = useRouter()

const notification = ref(null)
const loading = ref(false)

const data = ref({
    username: '',
    password: '',
})

const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()

const recaptcha = async () => {
    await recaptchaLoaded()
    const token = await executeRecaptcha('login')
    return token
}

const handleSubmit = async () => {
    try {
        loading.value = true
        data.value.token = await recaptcha()
        const result = await api.login(data.value)
        loading.value = false

        if (result.token) {
            loading.value = false
            router.push('/admin')
        }
    } catch (err) {
        loading.value = false

        notification.value.showNotification({
            newTitle: 'Error!',
            newContent: 'Unable to login',
            newIcon: IconCheck,
            newDuration: 3000,
        })
    }
}
</script>

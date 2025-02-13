/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export function useApi() {
    const router = useRouter()
    const user = ref<any>(null)
    const token = ref<string | null>(localStorage.getItem('token') || null)
    const isAuthenticated = computed(() => !!token.value)

    const authRequest = async (path: string, method: string, payload: any) => {
        try {
            const response = await fetch(`api/${path}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            })

            const data = await response.json()
            return data
        } catch (error) {
            return { success: false, message: error }
        }
    }

    const login = async (credentials: { username: string; password: string; token?: string }) => {
        const response = await fetch(`api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })

        const data = await response.json()

        if (response.ok && data.result.token) {
            localStorage.setItem('token', data.result.token)
            token.value = data.result.token
            return data.result
        } else {
            throw new Error(data.result.message || 'Login failed')
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        token.value = null
        user.value = null
        router.push('/login')
    }

    const checkSession = async () => {}

    const methods = {}

    return {
        user,
        token,
        isAuthenticated,
        login,
        logout,
        ...methods,
    }
}

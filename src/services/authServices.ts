import api from '@/lib/axios'
import { isAxiosError } from 'axios'

export async function loginService(data: {
    email: string,
    password: string,
    rememberMe: boolean | string,
}) {
    try {
        const response = await api.post('/auth/login', data)
        return response.data
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'فشل تسجيل الدخول بسبب خطأ في الخادم')
        }
        throw new Error('فشل تسجيل الدخول بسبب خطأ غير متوقع')
    }
}

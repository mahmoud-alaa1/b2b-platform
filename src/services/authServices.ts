import api from '@/lib/axios'
import { handleApiError } from '@/utils/handleApiError'

export async function loginService(data: {
    email: string;
    password: string;
    rememberMe: boolean | string;
}) {
    try {
        const response = await api.post<{ accessToken: string }>("/auth/login", data);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
}


export async function registerService(data: FormData) {
    try {
        const res = await api.post<IApiResponse<IRegisterResponse>>("/register", data);
        return res.data;
    } catch (error) {
        throw handleApiError(error);
    }
}
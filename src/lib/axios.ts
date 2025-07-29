import axios from "axios"
import Cookies from 'js-cookie'
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})


api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = Cookies.get('token')
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
    }

    return config
})
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (typeof window !== "undefined") {

            if (error.response.status === 401) {
                Cookies.remove("token")
                window.location.href = "/login"
            }
        }
        return Promise.reject(error)
    }
)
export default api
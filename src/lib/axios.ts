import { refreshTokenService } from "@/services/authServices";
import useAuth from "@/store/authStore";
import { navigateTo } from "@/utils/navigationHelper";
import axios, { AxiosError, InternalAxiosRequestConfig, } from "axios";
import Cookies from "js-cookie";


interface ICustomAxiosInternalConfig extends InternalAxiosRequestConfig {

    _retry?: boolean;
}

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});



api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = Cookies.get("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
    }
    return config;
});





api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {


        const originalRequest: ICustomAxiosInternalConfig | undefined = error.config;
        if (
            originalRequest?.url?.includes("/login")
        ) {
            return Promise.reject(error);
        }
        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await refreshTokenService();
                const accessToken = response.data.accessToken;

                api.defaults.headers.common["Authorization"] =
                    `Bearer ${accessToken}`;

                Cookies.set("token", accessToken);

                return api(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                useAuth.getState().logout();
                navigateTo("/login");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export default api;
import { refreshTokenService } from "@/services/authServices";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import useAuth from "@/store/authStore";

interface ICustomAxiosInternalConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
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
    const originalRequest: ICustomAxiosInternalConfig | undefined =
      error.config;

    if (
      originalRequest?.url?.includes("/login") ||
      originalRequest?.url?.includes("/refresh")
    ) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const accessToken = await refreshTokenService();

        Cookies.set("token", accessToken);

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        useAuth.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

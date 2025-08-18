import api from "@/lib/axios";
import { handleApiError } from "@/utils/handleApiError";
import axios from "axios";

export async function loginService(data: {
  email: string;
  password: string;
  rememberMe: boolean | string;
}) {
  try {
    const response = await api.post<ILoginResponse>("/login", data);
    return response.data;
  } catch (err) {
    throw handleApiError(err);
  }
}
export async function resetPasswordService(data: {
  newPassword: string;
  token: string;
}) {
  try {
    const response = await api.post<IApiResponse<IForgotPasswordResponse>>(
      `/reset-password`,
      data,
    );
    return response.data;
  } catch (err) {
    throw handleApiError(err);
  }
}

export async function forgotPasswordService(data: { email: string }) {
  try {
    const response = await api.get<IApiResponse<IForgotPasswordResponse>>(
      `/reset-password/${data.email}`,
    );
    return response.data;
  } catch (err) {
    throw handleApiError(err);
  }
}

export async function registerService(data: FormData) {
  try {
    const res = await api.post<IApiResponse<IRegisterResponse>>(
      "/register",
      data,
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function refreshTokenService() {
  try {
    const response = await axios.post<IApiResponse<IRefreshResponse>>(
      `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
      {},
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

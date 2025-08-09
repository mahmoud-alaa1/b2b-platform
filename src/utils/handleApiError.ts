// src/utils/handleApiError.ts
import { isAxiosError } from "axios";


export function handleApiError(error: unknown): IErrorResponse {
    if (isAxiosError(error)) {

        return {
            data: {
                message: error.response?.data?.data?.message || "حدث خطأ في الخادم",
                details: error.response?.data?.details || [],
            },
        };
    }

    return {
        data: {
            message: "حدث خطأ غير متوقع",
            details: [],
        },
    };
}

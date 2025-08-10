import { isAxiosError } from "axios";
export class ApiError extends Error {
    details?: Record<string, string>;

    constructor(message: string, details?: Record<string, string>) {
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
        this.details = details;
    }
}

export function handleApiError(error: unknown): ApiError {
    if (isAxiosError<IErrorResponse>(error)) {
        const message =
            error.response?.data?.data.message || "حدث خطأ غير متوقع في الخادم";
        const details = error.response?.data.data.details || {};
        return new ApiError(message, details);
    }

    return new ApiError("حدث خطأ غير متوقع", {});
}

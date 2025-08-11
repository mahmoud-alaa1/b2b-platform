import api from "@/lib/axios";
import { handleApiError } from "@/utils/handleApiError";

// post file funcation
export async function postFile({
  formFile,
  onProgress,
}: {
  formFile: FormData;
  onProgress?: (progress: number) => void;
}) {
  try {
    const response = await api.post("/upload", formFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const total = progressEvent.total || 0;
        const current = progressEvent.loaded || 0;
        const progress = Math.round((current / total) * 100);
        onProgress?.(progress);
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

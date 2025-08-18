import { fetchData } from "@/lib/fetchApi";
import { handleApiError } from "@/utils/handleApiError";

export async function fetchAdvertisements() {
  try {
    const response = await fetchData<IApiResponse<IAdvertisement[]>>(
      "/advertisment-client",
      {
        next: {
          revalidate: 3600,
          tags: ["advertisements"],
        },
        cache: "force-cache",
      }
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

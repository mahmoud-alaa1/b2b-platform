import { fetchData } from "@/lib/fetchApi";
import { handleApiError } from "@/utils/handleApiError";

export async function fetchPlans() {
  try {
    const res = await fetchData<IApiResponse<IPlan[]>>("/plans", {
      method: "GET",
      next: {
        revalidate: 3600,
        tags: ["plans"],
      },
      cache: "force-cache",
    });
    return res;
  } catch (error) {
    throw handleApiError(error);
  }
}

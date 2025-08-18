import { advertisementSchema } from "@/schemas/advertisementSchema";
import { postAdvertisements } from "@/services/advertisementsServices";
import { ApiError } from "@/utils/handleApiError";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function usePostAdvertisement() {
  return useMutation<
    IApiResponse<IPostAdvertisement>,
    ApiError,
    advertisementSchema
  >({
    mutationFn: (data: advertisementSchema) => {
      const formData = new FormData();
      formData.append("Title", data.Title);
      formData.append("ImageFile", data.ImageFile);
      formData.append("TargetUrl", data.TargetUrl || "");
      return postAdvertisements(formData);
    },
    onSuccess: () => {
      toast.success(
        "تم إرسال طلب الإعلان بنجاح, سيتم المراجعة من قبل المسؤولين والتواصل معك",
        {
          position: "top-center",
        }
      );
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-center",
      });
    },
  });
}

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { orderSchema } from "@/schemas/orderSchema";

interface OrderFormState {
  formData: orderSchema | null;
}

interface OrderFormActions {
  setFormData: (data: orderSchema) => void;
  clearFormData: () => void;
}

export const useOrderForm = create<OrderFormState & OrderFormActions>()(
  persist(
    (set) => ({
      formData: null,
      setFormData: (data) => set({ formData: data }),
      clearFormData: () => set({ formData: null }),
    }),
    {
      name: "order-form-storage",
    }
  )
);

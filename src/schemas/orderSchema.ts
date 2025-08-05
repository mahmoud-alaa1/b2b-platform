import z from "zod";

export const orderSchema = z.object({
  contactPersonName: z
    .string()
    .min(3, {
      message: "من فضلك أدخل الاسم الكامل",
    })
    .max(100, {
      message: "الاسم يجب ألا يتجاوز 100 حرف.",
    })
    .trim(),
  contactPersonPhone: z
    .string()
    .min(11, " الهاتف غير صالح")
    .max(11, "رقم الهاتف غير صالح")
    .trim(),
  quantity: z
    .number()
    .int({
      message: "الكمية يجب أن تكون رقمًا صحيحًا (بدون كسور).",
    })
    .min(1, {
      message: "الكمية يجب أن تكون على الأقل 1.",
    })
    .max(10000, {
      message: "الكمية يجب ألا تتجاوز 10000.",
    }),
  deadline: z.string().min(2).max(100),
  description: z
    .string()
    .min(10, {
      message: "الوصف يجب أن يتكون من 10 أحرف على الأقل.",
    })
    .max(1000, {
      message: "الوصف يجب ألا يتجاوز 1000 حرف.",
    })
    .trim(),
  requiredLocation: z
    .string()
    .min(3, "   من فضلك قم بادخال الموقع بالكامل")
    .trim(),
  categoryId: z
    .number()
    .int({
      message: "معرف الفئة يجب أن يكون رقمًا صحيحًا.",
    })
    .min(1, {
      message: "يجب اختيار فئة من القائمة",
    }),
  numSuppliersDesired: z
    .number()
    .int({
      message: "عدد الموردين يجب أن يكون رقمًا صحيحًا (بدون كسور).",
    })
    .min(1, {
      message: "عدد الموردين يجب أن يكون على الأقل 1.",
    })
    .max(40, {
      message: "عدد الموردين يجب ألا يتجاوز 40.",
    }),
});

export type orderSchema = z.infer<typeof orderSchema>;

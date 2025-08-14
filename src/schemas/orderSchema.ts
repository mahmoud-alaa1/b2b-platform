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
    .min(10, {
      message: "رقم الهاتف غير صالح.",
    })
    .regex(/^01[0-2]\d{8}$/, {
      message: "رقم الهاتف يجب أن يبدأ بـ 010 أو 011 أو 012 ويحتوي على 11 رقمًا.",
    })
    .trim(),
  quantity: z.coerce
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
  deadline: z.coerce.date().min(new Date(), {
    message: "موعد التسليم يجب أن يكون في المستقبل.",
  }),
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
    .min(3, {
      message: "من فضلك قم بإدخال الموقع بالكامل.",
    })
    .trim(),
  categoryId: z
    .number()
    .int({
      message: "معرف الفئة يجب أن يكون رقمًا صحيحًا.",
    })
    .min(1, {
      message: "يجب اختيار فئة من القائمة.",
    }),
  numSuppliersDesired: z.coerce
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

export type orderSchemaInput = z.input<typeof orderSchema>;  
export type orderSchemaOutput = z.output<typeof orderSchema>; 
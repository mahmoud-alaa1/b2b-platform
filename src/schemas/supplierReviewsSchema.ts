import z from "zod";

export const supplierReviewSchema = z.object({
  dealDoneAt: z
    .string({
      error: "يجب ادخال مكان إتمام الصفقة",
    })
    .min(10, "يجب أن يتكون مكان إتمام الصفقة من 10 أحرف على الأقل")
    .max(100, "يجب أن يتكون مكان إتمام الصفقة من 100 حرف كحد أقصى"),
  quantity: z.coerce.number().min(1, "يجب ادخال الكمية").max(2147483647),
  price: z.coerce.number().min(0, "يجب ادخال السعر").max(2147483647),
  dateOfDelivered: z.coerce.date().transform((d) => d.toISOString()),
  rating: z.coerce.number().min(1).max(5),
  comment: z
    .string({
      error: "يجب ادخال تعليق",
    })
    .min(10, "يجب أن يتكون التعليق من 10 أحرف على الأقل")
    .max(500, "يجب أن يتكون التعليق من 500 حرف كحد أقصى"),
});

export type supplierReviewSchemaInput = z.input<typeof supplierReviewSchema>;
export type supplierReviewSchemaOutput = z.output<typeof supplierReviewSchema>;

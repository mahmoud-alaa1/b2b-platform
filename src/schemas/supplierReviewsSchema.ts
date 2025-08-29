import z from "zod";

export const supplierReviewSchema = z.object({
  dealDoneAt: z.coerce
    .date()
    .min(new Date(), {
      message: "موعد إتمام الصفقة يجب أن يكون في المستقبل.",
    })
    .refine((val) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return val >= today;
    }),
  quantity: z.coerce.number().min(1, "يجب ادخال الكمية").max(2147483647),
  price: z.coerce.number().min(0, "يجب ادخال السعر").max(2147483647),
  dateOfDelivered: z.coerce
    .date()
    .min(new Date(), {
      message: "موعد التسليم يجب أن يكون في المستقبل.",
    })
    .refine((val) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return val >= today;
    }),
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

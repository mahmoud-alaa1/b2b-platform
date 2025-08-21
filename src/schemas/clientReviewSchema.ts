import z from "zod";

export const clientReviewSchema = z.object({
  dealDoneAt: z.coerce
    .date({
      error: "يجب ادخال تاريخ اتمام الصفقة",
    })
    .transform((d) => d.toISOString()),
  quantity: z.coerce.number().min(1, "يجب ادخال الكمية").max(2147483647),
  price: z.coerce.number().min(0, "يجب ادخال السعر").max(2147483647),
  dateOfDelivered: z.coerce
    .date({
      error: "يجب ادخال تاريخ اتمام الصفقة",
    })
    .transform((d) => d.toISOString()),
  rating: z.coerce.number().min(1).max(5),
  comment: z
    .string({
      error: "يجب ادخال تعليق",
    })
    .min(10, "يجب أن يتكون التعليق من 10 أحرف على الأقل")
    .max(500, "يجب أن يتكون التعليق من 500 حرف كحد أقصى"),
  supplierId: z.string({
    error: "يجب ادخال المورد",
  }),
});

export type clientReviewSchemaInput = z.input<typeof clientReviewSchema>;
export type clientReviewSchemaOutput = z.output<typeof clientReviewSchema>;

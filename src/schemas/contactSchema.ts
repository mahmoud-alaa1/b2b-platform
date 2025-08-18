import z from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().optional(),
  subject: z.string().min(5, "الموضوع مطلوب"),
  message: z.string().min(10, "الرسالة قصيرة جداً"),
});

export type contactSchema = z.infer<typeof contactSchema>;

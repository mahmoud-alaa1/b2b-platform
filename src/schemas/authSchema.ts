import z from 'zod'

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6).max(100),
    rememberMe: z.boolean(),
})

export type loginSchema = z.infer<typeof loginSchema>




// Registration Schema ******************

const step1Schema = z.object({
    accountType: z.enum(["Suppliers", "Clients"], {
        message: "من فضلك اختر نوع الحساب",
    }),
});

const step2Schema = z.object({
    fullName: z.string().min(2, {
        message: "من فضلك أدخل الاسم الكامل",
    }).max(100, {
        message: "من فضلك أدخل اسمًا لا يزيد عن 100 حرف",
    }),
    email: z.email("من فضلك أدخل بريدًا إلكترونيًا صالحًا"),
    password: z.string().min(6, {
        message: "من فضلك أدخل كلمة مرور لا تقل عن 6 أحرف",
    }).max(100, {
        message: "من فضلك أدخل كلمة مرور لا تزيد عن 100 حرف",
    }),
    phoneNumber: z
        .string()
        .min(10, {
            message: "من فضلك أدخل رقم هاتف صالح",
        })
        .max(15)
        .regex(/^\d+$/, {
            message: "من فضلك أدخل رقم هاتف صالح",
        }),
});

const step3Schema = z.object({
    location: z.string().min(2, {
        message: "من فضلك أدخل موقعًا صالحًا",
    }).max(100, {
        message: "من فضلك أدخل الموقع",
    }),
    documents: z.array(z.string()).min(1, {
        message: "من فضلك قم بتحميل مستند واحد على الأقل",
    }),
    categories: z.union([
        z.array(z.string()).min(1, {
            message: "من فضلك اختر فئة واحدة على الأقل",
        }),
        z.string().min(1, {
            message: "من فضلك اختر نوع الشركة",
        })
    ]),
});

export const fullRegisterSchema = step1Schema
    .extend(step2Schema.shape)
    .extend(step3Schema.shape);

export const stepSchemas = [step1Schema, step2Schema, step3Schema];




export type registerSchemaType = z.infer<typeof fullRegisterSchema>;
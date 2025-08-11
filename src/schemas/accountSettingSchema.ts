import { z } from "zod";

export const editSupplierInfoSchema = z.object({
  description: z.string().max(500).optional().nullable(),
  logoUrl: z.string().optional().nullable(),
  locations: z.array(z.string().nullable()).optional(),
});

export type editSupplierInfoSchema = z.infer<typeof editSupplierInfoSchema>;

import { z } from "zod";

export const orderSchema = z.object({
    id: z.string().trim().min(1),
    customer_name: z.string().trim().min(2).max(100),
    customer_email: z.string().trim().min(10).max(1000),
    product: z.string().trim().min(2).max(100),
    quantity: z.coerce.number().min(1).max(20),
    order_value: z.coerce.number().min(1),
  });
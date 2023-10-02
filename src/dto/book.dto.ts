import { z } from "zod";

export const BookDTO = z
    .object({
        name: z.string(),
        author: z.string(),
        description: z.string().default("").optional(),
        price: z.number().min(50),
        publisher: z.string().optional(),
        inventory: z
            .number({
                required_error: "Iventory is required",
                invalid_type_error: "inventory should be positive number",
            })
            .min(0),
        rented: z.number().min(0),
    })
    .refine((data) => data.rented <= data.inventory, {
        message: "Books rented cannot be greater than inventory",
        path: ["rented"],
    });

export type BookType = z.infer<typeof BookDTO>;

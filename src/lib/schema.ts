import { z } from "zod";

export const ListingSummarySchema = z.object({
    id: z.string(),
    thumbnail: z.string(), // more strict type?
    title: z.string(),
    moveInDate: z.date(),
    domicile: z.boolean(),
    housemates: z.number().int(),
    ageRange: z.tuple([z.number().int(), z.number().int()]),
    price: z.number()
})

export type ListingSummaryType = z.infer<typeof ListingSummarySchema>
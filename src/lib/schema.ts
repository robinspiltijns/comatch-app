import { Timestamp } from "firebase/firestore";
import { z } from "zod";

export const docToListingSummary = z
  .object({
    id: z.string(),
    thumbnail: z.string(), // more strict type?
    title: z.string(),
    moveInDate: z.instanceof(Timestamp),
    domicile: z.boolean(),
    housemates: z.number().int(),
    ageRange: z.tuple([z.number().int(), z.number().int()]),
    price: z.number(),
  })
  .transform((data) => ({
    ...data,
    moveInDate: data.moveInDate.toDate(),
  }));

export type ListingSummaryType = z.output<typeof docToListingSummary>;

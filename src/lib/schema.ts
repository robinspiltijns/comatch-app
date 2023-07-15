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

const houseType = z.enum(["APPARTMENT", "HOUSE"]);
const epcRating = z.enum(["A", "B", "C", "D", "E", "F"]);

const houseProps = z.object({
  type: houseType,
  roomSize: z.bigint(),
  epcRating: epcRating,
  cleaningStaff: z.boolean(),
  garden: z.boolean(),
  terrace: z.boolean(),
  furnished: z.boolean(),
  bathRoomAmount: z.bigint().optional(),
  toiletAmount: z.bigint().optional(),
  dishwasher: z.boolean(),
  washingMachine: z.boolean(),
  dryer: z.boolean(),
  houseSize: z.bigint().optional(),
  garage: z.boolean(),
  pool: z.boolean(),
  basement: z.boolean(),
});

export const docToListingDetails = z
  .object({
    images: z.array(z.string()),
    price: z.number(),
    moveInDate: z.instanceof(Timestamp),
    title: z.string(),
    street: z.string(),
    description: z.string(),
    houseProperties: houseProps,
  })
  .transform((data) => ({
    ...data,
    moveInDate: data.moveInDate.toDate(),
  }));

export type ListingSummaryType = z.output<typeof docToListingSummary>;
export type ListingDetailsType = z.output<typeof docToListingDetails>;

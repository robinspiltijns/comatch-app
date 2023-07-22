import { Timestamp } from "firebase/firestore";
import { z } from "zod";

const epcRating = z.enum(["A", "B", "C", "D", "E", "F"]);

const houseAttributes = z.object({
  petsAllowed: z.boolean(),
  petsPresent: z.boolean(),
  roomSize: z.number().int(),
  personalShower: z.boolean(),
  roomSink: z.boolean(),
  roomFurnished: z.boolean(),
  forCouples: z.boolean(),
  garden: z.boolean(),
  terrace: z.boolean(),
  bathrooms: z.number(),
  toilets: z.number().int(),
  basementStorage: z.boolean(),
  kitchens: z.number().int(),
  workingSpace: z.boolean(),
  washingMachine: z.boolean(),
  dishWasher: z.boolean(),
  wifi: z.boolean(),
  netflix: z.boolean(),
  bbq: z.boolean(),
  cleaningHelp: z.boolean(),
  bikeStorage: z.boolean(),
  carParking: z.boolean(),
  garage: z.boolean(),
  dryingMachine: z.boolean(),
  epcRating: epcRating,
});

const peopleAttributes = z.object({
  housematesAmount: z.number(),
  genderAmounts: z.object({
    male: z.number(),
    female: z.number(),
    other: z.number(),
  }),
  workingOut: z.boolean(),
  goingForDrinks: z.boolean(),
  movieNights: z.boolean(),
  boardGames: z.boolean(),
  partying: z.boolean(),
  hikes: z.boolean(),
  cooking: z.boolean(),
  karaoke: z.boolean(),
  reading: z.boolean(),
  gardening: z.boolean(),
  coffee: z.boolean(),
});

export const docToListing = z
  .object({
    title: z.string(),
    imageUrl: z.string(),
    moveInDate: z.instanceof(Timestamp),
    domicile: z.boolean(),
    housemates: z.number().int(),
    ageRange: z.tuple([z.number().int(), z.number().int()]),
    price: z.number(),
    city: z.string(),
    street: z.string(),
    description: z.string(),
    houseAttributes: houseAttributes,
    peopleAttributes: peopleAttributes,
  })
  .transform((data) => ({
    ...data,
    moveInDate: data.moveInDate.toDate(),
  }));

export const docToListingSummary = z
  .object({
    listingId: z.string(),
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
export type ListingType = z.output<typeof docToListing>;
export type HouseAttributesType = z.infer<typeof houseAttributes>;
export type PeopleAttributes = z.infer<typeof peopleAttributes>;

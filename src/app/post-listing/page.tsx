"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import Authenticate from "@/components/Authenticate";
import { AuthContext } from "@/lib/AuthProvider";
import { useContext } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { nlBE } from "date-fns/locale";
import { uploadImage, uploadListingSummary } from "@/lib/firebase";
import { Timestamp } from "@firebase/firestore";

const cohousingFormSchema = z.object({
  title: z.string().min(1, "Geef een titel in."),
  description: z.string().min(1, "Geef een bescrhijving in."),
  domicile: z.boolean(),
  amountOfCohousers: z.union(
    [
      z.literal("1"),
      z.literal("2"),
      z.literal("3"),
      z.literal("4"),
      z.literal("5"),
      z.literal("6"),
      z.literal("7"),
      z.literal("8"),
      z.literal("8+"),
    ],
    { required_error: "Geef het aantal kamers in." }
  ),
  moveIndate: z.date(),
  price: z
    .number()
    .min(100, "Huurprijs moet groter dan 100 zijn.")
    .max(10000, "Geef een realistische huurprijs in."),
  picture: z.any(),
});

type CohousingFormSchema = z.infer<typeof cohousingFormSchema>;

function PostCohousingForm() {
  const form = useForm<CohousingFormSchema>({
    resolver: zodResolver(cohousingFormSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      domicile: true,
    },
  });

  const onSubmit: SubmitHandler<CohousingFormSchema> = async (
    cohousingFormPayload
  ) => {
    const listingId = crypto.randomUUID();
    const downloadURL = await uploadImage(cohousingFormPayload.picture![0]);
    await uploadListingSummary({
      title: cohousingFormPayload.title,
      domicile: cohousingFormPayload.domicile,
      price: cohousingFormPayload.price,
      amountOfCohousers: cohousingFormPayload.amountOfCohousers,
      listingId,
      thumbnail: downloadURL,
      moveInDate: Timestamp.fromDate(cohousingFormPayload.moveIndate),
      creationDate: Timestamp.fromDate(new Date()),
      ageRange: [1, 3],
    });
  };

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const fileRef = form.register("picture");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-5 mb-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Titel</FormLabel>
                <FormControl>
                  <Input placeholder="Titel" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.title && (
                    <p>{form.formState.errors.title.message}</p>
                  )}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bescrhijving</FormLabel>
                <FormControl>
                  <Input placeholder="Bescrhijving" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.description && (
                    <p>{form.formState.errors.description.message}</p>
                  )}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="domicile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domicile verplicht</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value === "yes")}
                    defaultValue={field.value ? "yes" : "no"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Domicilie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={"yes"}>Ja</SelectItem>
                        <SelectItem value={"no"}>Nee</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amountOfCohousers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aantal huisgenoten</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Aantal huisgenoten" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={"1"}>1</SelectItem>
                        <SelectItem value={"2"}>2</SelectItem>
                        <SelectItem value={"3"}>3</SelectItem>
                        <SelectItem value={"4"}>4</SelectItem>
                        <SelectItem value={"5"}>5</SelectItem>
                        <SelectItem value={"6"}>6</SelectItem>
                        <SelectItem value={"7"}>7</SelectItem>
                        <SelectItem value={"8"}>8</SelectItem>
                        <SelectItem value={"8+"}>8+</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="moveIndate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inhuisdatum</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="flex h-10 w-full items-center justify-between rounded-md border-2 bg-white px-3 py-2 text-sm">
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Kies inhuisdatum</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="border-2 w-auto p-0"
                      align="center"
                    >
                      <Calendar
                        mode="single"
                        locale={nlBE}
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < currentDate}
                        showOutsideDays={false}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maandelijkse huurprijs (€)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Huurprijs"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.price && (
                    <p>{form.formState.errors.price.message}</p>
                  )}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="picture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Foto&apos;s</FormLabel>
                <FormControl>
                  <Input type="file" accept=",jpg, .jpeg, .png" {...fileRef} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button disabled={!form.formState.isValid} type="submit">
          Klaar
        </Button>
      </form>
    </Form>
  );
}

export default function PostListing() {
  const authState = useContext(AuthContext);

  let body: JSX.Element;

  switch (authState.type) {
    case "LOADING":
      body = (
        <div className="flex flex-row justify-center">
          <LoadingSpinner />
        </div>
      );
      break;
    case "UNAUTHENTICATED":
      body = (
        <div className="flex flex-row justify-center">
          <Authenticate />
        </div>
      );
      break;
    case "AUTHENTICATED":
      body = <PostCohousingForm />;
      break;
    default:
      body = <div>Error: Unknown state</div>; // Or any error state
  }

  return (
    <div>
      <h2 className="font-mono text-2xl py-3 px-5 lg:px-20 border-b-2 border-dotted">
        Zoekertje plaatsen
      </h2>
      <div className="p-5 lg:px-20">{body}</div>
    </div>
  );
}

"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import Authenticate from "@/components/Authenticate";
import { AuthContext } from "@/lib/AuthProvider";
import { useContext } from "react";
import {
  Form,
  FormControl,
  FormDescription,
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
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const cohousingFormSchema = z.object({
  title: z.string().min(1, "Geef een titel in."),
  description: z.string().min(1, "Geef een bescrhijving in."),
  domicile: z.union([z.literal("yes"), z.literal("no")]),
  roomsAmount: z.union(
    [
      z.literal("one"),
      z.literal("two"),
      z.literal("three"),
      z.literal("four"),
      z.literal("five"),
      z.literal("six"),
      z.literal("seven"),
      z.literal("eight"),
      z.literal("eightPlus"),
    ],
    { required_error: "Geef het aantal kamers in." }
  ),
  moveIndate: z.date(),
});

type CohousingFormSchema = z.infer<typeof cohousingFormSchema>;

function PostCohousingForm() {
  const form = useForm<CohousingFormSchema>({
    resolver: zodResolver(cohousingFormSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      domicile: "yes",
    },
  });

  const onSubmit: SubmitHandler<CohousingFormSchema> = (
    cohousingFormPayload
  ) => {
    console.log(cohousingFormPayload);
  };

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
                <FormLabel className="font-semibold">Bescrhijving</FormLabel>
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
                <FormLabel className="font-semibold">
                  Domicile verplicht
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
            name="roomsAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Aantal kamers</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Aantal kamers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={"one"}>1</SelectItem>
                        <SelectItem value={"two"}>2</SelectItem>
                        <SelectItem value={"three"}>3</SelectItem>
                        <SelectItem value={"four"}>4</SelectItem>
                        <SelectItem value={"five"}>5</SelectItem>
                        <SelectItem value={"six"}>6</SelectItem>
                        <SelectItem value={"seven"}>7</SelectItem>
                        <SelectItem value={"eight"}>8</SelectItem>
                        <SelectItem value={"eightPlus"}>8+</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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

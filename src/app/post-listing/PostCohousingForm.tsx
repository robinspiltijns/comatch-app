import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Timestamp } from "@firebase/firestore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../_components/ui/form";
import { Input } from "../_components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../_components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../_components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../_components/ui/calendar";
import { nlBE } from "date-fns/locale";
import { Button } from "../_components/ui/button";
import { uploadThumbnail } from "@/lib/firebase/storage";
import { uploadListingSummary } from "@/lib/firebase/firestore/queries";
import { Textarea } from "@/components/ui/textarea";

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

export default function PostCohousingForm() {
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
    const uploadImageResult = await uploadThumbnail(
      listingId,
      cohousingFormPayload.picture![0]
    );

    if (!uploadImageResult.isSuccess) {
      console.error("Something went wrong in uploading thumbnail.");
      return;
    }

    await uploadListingSummary({
      title: cohousingFormPayload.title,
      domicile: cohousingFormPayload.domicile,
      price: cohousingFormPayload.price,
      amountOfCohousers: cohousingFormPayload.amountOfCohousers,
      listingId,
      thumbnail: uploadImageResult.value,
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
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bescrhijving</FormLabel>
                <FormControl>
                  <Textarea placeholder="Bescrhijving" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.description && (
                    <p>{form.formState.errors.description.message}</p>
                  )}
                </FormMessage>
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

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";

const formSchema = z.object({
  poNumber: z.string().min(1, {
    message: "PO number is required.",
  }),
  poDate: z.date({
    required_error: "PO date is required.",
  }),
  poAmount: z.string().min(1, {
    message: "PO amount is required.",
  }),
  poDescription: z.string().optional(),
  poTerms: z.string().optional(),
});

interface PODetailsFormProps {
  defaultValues?: {
    poNumber: string;
    poDate: Date;
    poAmount: string;
    poDescription?: string;
    poTerms?: string;
  };
  isEditing?: boolean;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
}

export function PODetailsForm({ defaultValues, isEditing, onSubmit }: PODetailsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      poNumber: defaultValues?.poNumber || "",
      poDate: defaultValues?.poDate || new Date(),
      poAmount: defaultValues?.poAmount || "",
      poDescription: defaultValues?.poDescription || "",
      poTerms: defaultValues?.poTerms || "",
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit?.(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="poNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PO Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter PO number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="poDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PO Date</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="poAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PO Amount</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter PO amount" 
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="poDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter PO description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="poTerms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Terms & Conditions (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter PO terms and conditions" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {isEditing ? "Update PO Details" : "Save PO Details"}
        </Button>
      </form>
    </Form>
  );
}
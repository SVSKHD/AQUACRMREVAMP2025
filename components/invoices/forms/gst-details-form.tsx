"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GSTDetails } from "@/lib/types/invoice";

const formSchema = z.object({
  gstName: z.string().min(2, {
    message: "GST name must be at least 2 characters.",
  }),
  gstNo: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, {
    message: "Please enter a valid GST number.",
  }),
  gstPhone: z.string().regex(/^\d{10}$/, {
    message: "Please enter a valid 10-digit phone number.",
  }).optional().or(z.literal("")),
  gstEmail: z.string().email({
    message: "Please enter a valid email address.",
  }).optional().or(z.literal("")),
  gstAddress: z.string().min(10, {
    message: "Address must be at least 10 characters.",
  }),
});

interface GSTDetailsFormProps {
  defaultValues?: GSTDetails;
  isEditing?: boolean;
  form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
  customerDetails?: {
    name: string;
    phone: number | null;
    email: string;
    address: string;
  };
}

export function GSTDetailsForm({ 
  defaultValues, 
  isEditing, 
  form,
  customerDetails 
}: GSTDetailsFormProps) {
  const copyFromCustomer = () => {
    if (customerDetails) {
      form.setValue("gstName", customerDetails.name);
      form.setValue("gstPhone", customerDetails.phone?.toString() || "");
      form.setValue("gstEmail", customerDetails.email);
      form.setValue("gstAddress", customerDetails.address);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={copyFromCustomer}
        >
          Copy from Customer Details
        </Button>
      </div>
      <FormField
        control={form.control}
        name="gstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>GST Registered Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter GST registered name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="gstNo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>GST Number</FormLabel>
            <FormControl>
              <Input placeholder="Enter GST number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="gstPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gstEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="gstAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>GST Registered Address</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter GST registered address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
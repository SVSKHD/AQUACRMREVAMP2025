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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { GSTDetailsForm } from "./gst-details-form";
import { PODetailsForm } from "./po-details-form";
import { useState } from "react";

const gstFormSchema = z.object({
  gstName: z.string().min(2),
  gstNo: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/),
  gstPhone: z.string().regex(/^\d{10}$/).optional().or(z.literal("")),
  gstEmail: z.string().email().optional().or(z.literal("")),
  gstAddress: z.string().min(10),
});

const formSchema = z.object({
  paymentType: z.string().min(1, "Payment type is required"),
  paidStatus: z.string().min(1, "Payment status is required"),
  gst: z.boolean().default(false),
  gstDetails: z.object(gstFormSchema.shape).optional(),
  po: z.boolean().default(false),
  quotation: z.boolean().default(false),
  aquakartOnlineUser: z.boolean().default(false),
  aquakartInvoice: z.boolean().default(false),
});

interface PaymentFormProps {
  defaultValues?: z.infer<typeof formSchema>;
  isEditing?: boolean;
  customerDetails?: {
    name: string;
    phone: number | null;
    email: string;
    address: string;
  };
}

export function PaymentForm({ defaultValues, isEditing, customerDetails }: PaymentFormProps) {
  const [showGSTForm, setShowGSTForm] = useState(defaultValues?.gst || false);
  const [showPOForm, setShowPOForm] = useState(defaultValues?.po || false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      paymentType: "",
      paidStatus: "",
      gst: false,
      po: false,
      quotation: false,
      aquakartOnlineUser: false,
      aquakartInvoice: false,
    },
  });

  const gstForm = useForm<z.infer<typeof gstFormSchema>>({
    resolver: zodResolver(gstFormSchema),
    defaultValues: {
      gstName: defaultValues?.gstDetails?.gstName || customerDetails?.name || "",
      gstNo: defaultValues?.gstDetails?.gstNo || "",
      gstPhone: defaultValues?.gstDetails?.gstPhone?.toString() || customerDetails?.phone?.toString() || "",
      gstEmail: defaultValues?.gstDetails?.gstEmail || customerDetails?.email || "",
      gstAddress: defaultValues?.gstDetails?.gstAddress || customerDetails?.address || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (showGSTForm) {
      const gstValues = gstForm.getValues();
      values.gstDetails = gstValues;
    }
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="paymentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="netbanking">Net Banking</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paidStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Partial">Partial</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="gst"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>GST Invoice</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      setShowGSTForm(checked);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {showGSTForm && (
            <div className="rounded-lg border p-4">
              <GSTDetailsForm 
                isEditing={isEditing} 
                customerDetails={customerDetails}
                form={gstForm}
              />
            </div>
          )}

          <FormField
            control={form.control}
            name="po"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Purchase Order</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      setShowPOForm(checked);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {showPOForm && (
            <div className="rounded-lg border p-4">
              <PODetailsForm isEditing={isEditing} />
            </div>
          )}

          <FormField
            control={form.control}
            name="quotation"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Quotation</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            {isEditing ? "Update Invoice" : "Create Invoice"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
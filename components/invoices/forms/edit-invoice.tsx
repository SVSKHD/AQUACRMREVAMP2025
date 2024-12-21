"use client";

import { useState } from "react";
import { Invoice } from "@/lib/types/invoice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerForm } from "./customer-form";
import { ProductsForm } from "./products-form";
import { PaymentForm } from "./payment-form";

interface EditInvoiceProps {
  invoice: Invoice;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditInvoice({ invoice, open, onOpenChange }: EditInvoiceProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Invoice</DialogTitle>
          <DialogDescription>
            Update the invoice information below.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="customer" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="customer">Customer Details</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
          </TabsList>
          <TabsContent value="customer">
            <CustomerForm defaultValues={invoice.customerDetails} isEditing />
          </TabsContent>
          <TabsContent value="products">
            <ProductsForm defaultValues={invoice.products} isEditing />
          </TabsContent>
          <TabsContent value="payment">
            <PaymentForm
              defaultValues={{
                paymentType: invoice.paymentType,
                paidStatus: invoice.paidStatus,
                gst: invoice.gst,
                po: invoice.po,
                quotation: invoice.quotation,
                aquakartOnlineUser: invoice.aquakartOnlineUser,
                aquakartInvoice: invoice.aquakartInvoice,
              }}
              isEditing
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
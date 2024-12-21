"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerForm } from "./customer-form";
import { ProductsForm } from "./products-form";
import { PaymentForm } from "./payment-form";
import { CustomerDetails } from "@/lib/types/invoice";

export function CreateInvoice() {
  const [open, setOpen] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>();

  const handleCustomerSubmit = (values: CustomerDetails) => {
    setCustomerDetails(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Invoice</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
          <DialogDescription>
            Create a new invoice by filling out the information below.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="customer" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="customer">Customer Details</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
          </TabsList>
          <TabsContent value="customer">
            <CustomerForm onSubmit={handleCustomerSubmit} />
          </TabsContent>
          <TabsContent value="products">
            <ProductsForm />
          </TabsContent>
          <TabsContent value="payment">
            <PaymentForm customerDetails={customerDetails} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
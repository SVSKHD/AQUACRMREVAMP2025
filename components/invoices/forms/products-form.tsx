"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Plus, Trash2 } from "lucide-react";
import { Product } from "@/lib/types/invoice";

const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productQuantity: z.coerce
    .number()
    .min(1, "Quantity must be at least 1"),
  productPrice: z.coerce
    .number()
    .min(0, "Price must be greater than or equal to 0"),
  productSerialNo: z.string().optional(),
});

const formSchema = z.object({
  products: z.array(productSchema).min(1, "At least one product is required"),
});

interface ProductsFormProps {
  defaultValues?: Product[];
  isEditing?: boolean;
}

export function ProductsForm({ defaultValues, isEditing }: ProductsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      products: defaultValues || [
        {
          productName: "",
          productQuantity: 1,
          productPrice: 0,
          productSerialNo: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 gap-4 p-4 border rounded-lg md:grid-cols-4"
            >
              <FormField
                control={form.control}
                name={`products.${index}.productName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`products.${index}.productQuantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`products.${index}.productPrice`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`products.${index}.productSerialNo`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serial Number</FormLabel>
                    <div className="flex space-x-2">
                      <FormControl>
                        <Input placeholder="Serial number" {...field} />
                      </FormControl>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() =>
            append({
              productName: "",
              productQuantity: 1,
              productPrice: 0,
              productSerialNo: "",
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
        <div className="flex justify-end">
          <Button type="submit">
            {isEditing ? "Update & Continue" : "Save & Continue"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
import { Invoice } from "@/lib/types/invoice";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

export function calculateTotalAmount(products: Invoice["products"]): number {
  return products.reduce(
    (acc, product) => acc + product.productPrice * product.productQuantity,
    0
  );
}

export const PAYMENT_STATUSES = {
  PAID: "Paid",
  PENDING: "Pending",
  PARTIAL: "Partial",
} as const;
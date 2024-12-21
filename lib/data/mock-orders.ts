import { Order } from "@/lib/types/order";

export const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    customerName: "John Smith",
    orderDate: "2024-03-15",
    status: "processing",
    totalAmount: 2499.99,
    paymentStatus: "paid",
    paymentMethod: "credit_card",
    shippingAddress: {
      street: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      country: "India"
    },
    items: [
      {
        id: "1-1",
        productName: "KENT Grand Plus",
        quantity: 1,
        unitPrice: 2499.99,
        totalPrice: 2499.99,
        sku: "KGP-001"
      }
    ],
    trackingNumber: "TRK123456789",
    notes: "Priority shipping requested"
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    customerName: "Priya Patel",
    orderDate: "2024-03-14",
    status: "pending",
    totalAmount: 4999.98,
    paymentStatus: "pending",
    paymentMethod: "upi",
    shippingAddress: {
      street: "456 Park Avenue",
      city: "Bangalore",
      state: "Karnataka",
      postalCode: "560001",
      country: "India"
    },
    items: [
      {
        id: "2-1",
        productName: "KENT Ace Plus",
        quantity: 2,
        unitPrice: 2499.99,
        totalPrice: 4999.98,
        sku: "KAP-002"
      }
    ]
  }
];
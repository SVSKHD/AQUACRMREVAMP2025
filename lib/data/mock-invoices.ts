import { Invoice } from "@/lib/types/invoice";

export const mockInvoices: Invoice[] = [
  {
    customerDetails: {
      name: "Sirisha New",
      phone: 9949817848,
      email: "",
      address: "flat-3409, aspl spire , kokapet , HYD-065",
    },
    gstDetails: {
      gstName: "",
      gstNo: "",
      gstPhone: null,
      gstEmail: "",
      gstAddress: "",
    },
    transport: {
      deliveredBy: "",
      deliveryDate: "Invalid date",
    },
    date: "2024-12-18",
    gst: false,
    po: false,
    quotation: false,
    products: [
      {
        productName: "KENT AUTO 8L",
        productQuantity: 2,
        productPrice: 61000,
        productSerialNo: "",
        _id: "66f138d171a5f78595fc29b5",
      },
    ],
    paidStatus: "Pending",
    aquakartOnlineUser: false,
    aquakartInvoice: false,
    paymentType: "",
  },
];
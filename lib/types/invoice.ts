export interface CustomerDetails {
  name: string;
  phone: number | null;
  email: string;
  address: string;
}

export interface GSTDetails {
  gstName: string;
  gstNo: string;
  gstPhone: number | null;
  gstEmail: string;
  gstAddress: string;
}

export interface Transport {
  deliveredBy: string;
  deliveryDate: string;
}

export interface Product {
  productName: string;
  productQuantity: number;
  productPrice: number;
  productSerialNo: string;
  _id: string;
}

export interface Invoice {
  customerDetails: CustomerDetails;
  gstDetails: GSTDetails;
  transport: Transport;
  date: string;
  gst: boolean;
  po: boolean;
  quotation: boolean;
  products: Product[];
  paidStatus: string;
  aquakartOnlineUser: boolean;
  aquakartInvoice: boolean;
  paymentType: string;
}
"use client";

import { Invoice } from "@/lib/types/invoice";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, calculateTotalAmount } from "@/lib/utils/table";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

// Tooltip imports (shadcn/ui or similar):
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface InvoiceViewProps {
  invoice: Invoice;
}

// Example helper to get base price & GST for a product
function getGstBreakdown(price: number) {
  const basePrice = Math.floor(price * 0.8474594);
  const totalGst = Math.floor(basePrice * 0.18); // 18% of base
  return { basePrice, totalGst };
}

export function InvoiceView({ invoice }: InvoiceViewProps) {
  const totalAmount = calculateTotalAmount(invoice.products);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">Invoice Details</h2>
            <p className="text-muted-foreground">
              Date: {format(new Date(invoice.createdAt), "PPP")}
            </p>
          </div>
          <Badge
            variant={invoice.paidStatus === "Paid" ? "success" : "destructive"}
          >
            {invoice.paidStatus || "Pending"}
          </Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Customer Details */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Customer Details</h3>
            <div className="space-y-2">
              <div>
                <span className="text-muted-foreground">Name:</span>
                <p className="font-medium">{invoice.customerDetails.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Phone:</span>
                <p className="font-medium">{invoice.customerDetails.phone}</p>
              </div>
              {invoice.customerDetails.email && (
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <p className="font-medium">{invoice.customerDetails.email}</p>
                </div>
              )}
              <div>
                <span className="text-muted-foreground">Address:</span>
                <p className="font-medium">{invoice.customerDetails.address}</p>
              </div>
            </div>
          </Card>

          {/* GST Details */}
          {invoice.gst && invoice.gstDetails && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">GST Details</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-muted-foreground">Registered Name:</span>
                  <p className="font-medium">{invoice.gstDetails.gstName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">GST Number:</span>
                  <p className="font-medium">{invoice.gstDetails.gstNo}</p>
                </div>
                {invoice.gstDetails.gstPhone && (
                  <div>
                    <span className="text-muted-foreground">Phone:</span>
                    <p className="font-medium">{invoice.gstDetails.gstPhone}</p>
                  </div>
                )}
                {invoice.gstDetails.gstEmail && (
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p className="font-medium">{invoice.gstDetails.gstEmail}</p>
                  </div>
                )}
                {invoice.gstDetails.gstAddress && (
                  <div>
                    <span className="text-muted-foreground">Address:</span>
                    <p className="font-medium">
                      {invoice.gstDetails.gstAddress}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Products Table */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Products</h3>
          <div className="overflow-x-auto"> 
            {/* Main Table */}
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-sm font-medium text-muted-foreground">
                  <th className="py-2 text-left">Serial</th>
                  <th className="py-2 text-left">Product Name</th>
                  <th className="py-2 text-right">Quantity</th>
                  <th className="py-2 text-right">Base Price</th>
                  <th className="py-2 text-right">GST (18%)</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>

              <tbody>
                {invoice.products.map((product, index) => {
                  const serialNo = index + 1;
                  const { basePrice, totalGst } = getGstBreakdown(
                    product.productPrice
                  );
                  const rowTotal = product.productPrice * product.productQuantity;

                  return (
                    <Tooltip key={index}>
                      {/* 
                        We use asChild so the tooltip triggers on the <tr> itself.
                        Alternatively, you can wrap only certain cells. 
                      */}
                      <TooltipTrigger asChild>
                        <tr className="hover:bg-accent/50 transition-colors cursor-pointer">
                          <td className="py-2 text-sm">{serialNo}</td>
                          <td className="py-2 text-sm">
                            {product.productName}
                            {product.productSerialNo && (
                              <div className="text-xs text-muted-foreground">
                                S/N: {product.productSerialNo}
                              </div>
                            )}
                          </td>
                          <td className="py-2 text-sm text-right">
                            {product.productQuantity}
                          </td>
                          <td className="py-2 text-sm text-right">
                            {formatCurrency(basePrice)}
                          </td>
                          <td className="py-2 text-sm text-right">
                            {formatCurrency(totalGst)}
                          </td>
                          <td className="py-2 text-sm text-right">
                            {formatCurrency(rowTotal)}
                          </td>
                        </tr>
                      </TooltipTrigger>

                      {/* Tooltip displays the same data or extended details */}
                      <TooltipContent className="p-2 shadow-lg">
                        <div className="text-xs space-y-1">
                          <p><strong>Serial:</strong> {serialNo}</p>
                          <p><strong>Product Name:</strong> {product.productName}</p>
                          <p><strong>Quantity:</strong> {product.productQuantity}</p>
                          <p><strong>Base Price:</strong> {formatCurrency(basePrice)}</p>
                          <p><strong>GST (18%):</strong> {formatCurrency(totalGst)}</p>
                          <p><strong>Total:</strong> {formatCurrency(rowTotal)}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </tbody>

              <tfoot>
                <tr className="border-t">
                  <td colSpan={5} className="py-2 text-right font-medium">
                    Total Amount:
                  </td>
                  <td className="py-2 text-right font-medium">
                    {formatCurrency(totalAmount)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>

        {/* Additional Details */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Payment Details */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
            <div className="space-y-2">
              <div>
                <span className="text-muted-foreground">Payment Type:</span>
                <p className="font-medium capitalize">
                  {invoice.paymentType || "Not specified"}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <p className="font-medium">{invoice.paidStatus || "Pending"}</p>
              </div>
            </div>
          </Card>

          {/* Transport Details */}
          {(invoice.transport.deliveredBy ||
            invoice.transport.deliveryDate !== "Invalid date") && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Transport Details</h3>
              <div className="space-y-2">
                {invoice.transport.deliveredBy && (
                  <div>
                    <span className="text-muted-foreground">Delivered By:</span>
                    <p className="font-medium">
                      {invoice.transport.deliveredBy}
                    </p>
                  </div>
                )}
                {invoice.transport.deliveryDate !== "Invalid date" && (
                  <div>
                    <span className="text-muted-foreground">Delivery Date:</span>
                    <p className="font-medium">
                      {format(
                        new Date(invoice.transport.deliveryDate),
                        "PPP"
                      )}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}

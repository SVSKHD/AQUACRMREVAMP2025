"use client";

import { Order } from "@/lib/types/order";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils/table";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

interface OrderViewProps {
  order: Order;
}

export function OrderView({ order }: OrderViewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Order #{order.orderNumber}</h2>
          <p className="text-muted-foreground">
            Placed on {format(new Date(order.orderDate), "PPP")}
          </p>
        </div>
        <div className="space-y-1 text-right">
          <Badge
            variant={
              order.status === "delivered"
                ? "success"
                : order.status === "cancelled"
                ? "destructive"
                : "secondary"
            }
          >
            {order.status}
          </Badge>
          <p className="text-sm text-muted-foreground">
            Payment: {order.paymentStatus}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer Details */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Customer Details</h3>
          <div className="space-y-2">
            <div>
              <span className="text-muted-foreground">Name:</span>
              <p className="font-medium">{order.customerName}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Shipping Address:</span>
              <p className="font-medium">
                {order.shippingAddress.street}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state}
                <br />
                {order.shippingAddress.postalCode}
                <br />
                {order.shippingAddress.country}
              </p>
            </div>
          </div>
        </Card>

        {/* Payment Details */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
          <div className="space-y-2">
            <div>
              <span className="text-muted-foreground">Payment Method:</span>
              <p className="font-medium capitalize">
                {order.paymentMethod.replace("_", " ")}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Payment Status:</span>
              <p className="font-medium capitalize">{order.paymentStatus}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Total Amount:</span>
              <p className="font-medium">{formatCurrency(order.totalAmount)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Order Items */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Order Items</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-right">Quantity</div>
            <div className="col-span-2 text-right">Unit Price</div>
            <div className="col-span-2 text-right">Total</div>
          </div>
          <Separator />
          {order.items.map((item) => (
            <div key={item.id} className="grid grid-cols-12 text-sm">
              <div className="col-span-6">
                <p className="font-medium">{item.productName}</p>
                {item.sku && (
                  <p className="text-muted-foreground text-xs">
                    SKU: {item.sku}
                  </p>
                )}
              </div>
              <div className="col-span-2 text-right">{item.quantity}</div>
              <div className="col-span-2 text-right">
                {formatCurrency(item.unitPrice)}
              </div>
              <div className="col-span-2 text-right">
                {formatCurrency(item.totalPrice)}
              </div>
            </div>
          ))}
          <Separator />
          <div className="grid grid-cols-12 text-sm font-medium">
            <div className="col-span-10 text-right">Total Amount:</div>
            <div className="col-span-2 text-right">
              {formatCurrency(order.totalAmount)}
            </div>
          </div>
        </div>
      </Card>

      {/* Additional Information */}
      {(order.trackingNumber || order.notes) && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
          <div className="space-y-2">
            {order.trackingNumber && (
              <div>
                <span className="text-muted-foreground">Tracking Number:</span>
                <p className="font-medium">{order.trackingNumber}</p>
              </div>
            )}
            {order.notes && (
              <div>
                <span className="text-muted-foreground">Notes:</span>
                <p className="font-medium">{order.notes}</p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
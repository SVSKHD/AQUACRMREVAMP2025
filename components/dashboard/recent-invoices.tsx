"use client";

import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    customer: {
      name: "Alex Thompson",
      email: "alex@example.com",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
    }
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    customer: {
      name: "Sarah Wilson",
      email: "sarah@example.com",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face"
    }
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    customer: {
      name: "Michael Chen",
      email: "michael@example.com",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face"
    }
  }
];

interface RecentInvoicesProps {
  fullWidth?: boolean;
}

export function RecentInvoices({ fullWidth = false }: RecentInvoicesProps) {
  return (
    <Card className={`p-6 ${fullWidth ? 'col-span-7' : 'col-span-3'}`}>
      <div className="flex flex-col space-y-4">
        <h3 className="text-xl font-semibold">Recent Invoices</h3>
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div
              key={invoice.invoice}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <img
                    src={invoice.customer.image}
                    alt={invoice.customer.name}
                    className="aspect-square h-full w-full"
                  />
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{invoice.customer.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {invoice.customer.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm font-medium">{invoice.totalAmount}</p>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    invoice.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-800"
                      : invoice.paymentStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {invoice.paymentStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
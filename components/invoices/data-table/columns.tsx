"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Invoice } from "@/lib/types/invoice";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { calculateTotalAmount, formatCurrency } from "@/lib/utils/table";
import { ContactButtons } from "./contact-buttons";

export const columns: ColumnDef<Invoice>[] = [
  {
    id: "customerName",
    accessorFn: (row) => row.customerDetails.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
  },
  {
    id: "customerPhone",
    accessorFn: (row) => row.customerDetails.phone,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      const phone = row.original.customerDetails.phone;
      const email = row.original.customerDetails.email;
      return (
        <div className="flex items-center justify-between">
          <span>{phone}</span>
          <ContactButtons phone={phone} email={email} />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt", // Use the createdAt key directly
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const createdAt = row?.getValue("createdAt") as string;
      try {
        // Parse and format the createdAt date
        const formattedDate = format(new Date(createdAt), "dd/MM/yyyy");
        return formattedDate;
      } catch (error) {
        // Handle invalid dates
        console.error("Invalid createdAt value:", createdAt, error);
        return "Invalid Date";
      }
    },
  },  
  {
    accessorKey: "paidStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Mehtod" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("paidStatus") as string;
      return (
        <Badge variant={status === "Paid" || "" ? "success" : "destructive"}>
          {status || "Pending"}
        </Badge>
      );
    },
  },
  {
    id: "totalAmount",
    accessorFn: (row) => calculateTotalAmount(row.products),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Amount" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("totalAmount") as number;
      return formatCurrency(amount);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
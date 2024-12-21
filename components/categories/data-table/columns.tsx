"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/lib/types/category";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    id: "subCategories",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sub-Categories" />
    ),
    cell: ({ row }) => {
      const subCategories = row.original.subCategories;
      return (
        <div className="flex flex-wrap gap-2">
          {subCategories.map((sub) => (
            <Badge key={sub.id} variant="secondary">
              {sub.name}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "totalProjects",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Projects" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "active" ? "default" : "secondary"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return format(new Date(date), "MMM d, yyyy");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
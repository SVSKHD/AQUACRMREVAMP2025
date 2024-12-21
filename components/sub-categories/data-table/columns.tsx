"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SubCategory } from "@/lib/types/category";
import { DataTableColumnHeader } from "@/components/categories/data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<SubCategory & { parentCategoryName: string }>[] = [
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
    accessorKey: "parentCategoryName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Parent Category" />
    ),
  },
  {
    accessorKey: "projectCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Projects" />
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
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
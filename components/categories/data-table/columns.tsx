"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/lib/types/category";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { string } from "zod";
import Image from "next/image";


export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="title" />
    ),
  },
  {
    accessorKey: "photos",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Images" />
    ),
    cell: ({ row }) => {
       const image=row.original.photos[0].secure_url
       if (image){
        return <Image src={image} width={300} height={300} alt="image" className="w-50 h-50 rounded-full" /> 
      } else {
        "No Image"
      }
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    id: "keywords",
    accessorKey: "keywords",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Keywords" />
    ),
    // cell: ({ row }) => {
    //   const subCategories = row.original.subCategories;
    //   return (
    //     <div className="flex flex-wrap gap-2">
    //       {subCategories.map((sub) => (
    //         <Badge key={sub.id} variant="secondary">
    //           {sub.name}
    //         </Badge>
    //       ))}
    //     </div>
    //   );
    // },
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
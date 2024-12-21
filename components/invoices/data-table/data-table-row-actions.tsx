"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Trash2, FileText, ExternalLink } from "lucide-react";
import { EditInvoice } from "../forms/edit-invoice";
import { ViewInvoiceDialog } from "../view-invoice-dialog";
import { Invoice } from "@/lib/types/invoice";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const invoice = row.original as Invoice;

  const handleViewInNewTab = () => {
    // Open invoice in new tab
    router.push(`/invoice/${invoice._id}`, '_blank');
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onSelect={() => setViewDialogOpen(true)}>
            <FileText className="mr-2 h-4 w-4" />
            Quick View
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleViewInNewTab}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Open in New Tab
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setEditDialogOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditInvoice
        invoice={invoice}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
      <ViewInvoiceDialog
        invoice={invoice}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
      />
    </>
  );
}
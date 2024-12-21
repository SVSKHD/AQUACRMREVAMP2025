"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Invoice } from "@/lib/types/invoice";
import { InvoiceView } from "./invoice-view";

interface ViewInvoiceDialogProps {
  invoice: Invoice;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewInvoiceDialog({
  invoice,
  open,
  onOpenChange,
}: ViewInvoiceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Invoice</DialogTitle>
        </DialogHeader>
        <InvoiceView invoice={invoice} />
      </DialogContent>
    </Dialog>
  );
}
// app/invoice/[id]/page.tsx
"use client";
import { useParams } from "next/navigation";
import { InvoiceView } from "@/components/invoices/invoice-view";
import { NotFound } from "@/components/shared/not-found";
import { invoiceService } from "@/lib/services/invoice.service";
import { useEffect, useState } from "react";
import { Invoice } from "@/lib/types/invoice";

export default function InvoicePage() {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      invoiceService
        .getById(id)
        .then((data) => {
          setInvoice(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching invoice:", err);
          setError("Failed to load invoice.");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <NotFound message={error} />;
  }

  if (!invoice) {
    return <NotFound message="Invoice not found" />;
  }

  return (
    <div className="container mx-auto py-8">
      <InvoiceView invoice={invoice} />
    </div>
  );
}

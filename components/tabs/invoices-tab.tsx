"use client";
import { columns } from "@/components/invoices/data-table/columns";
import { DataTable } from "@/components/invoices/data-table/data-table";
import { mockInvoices } from "@/lib/data/mock-invoices";
import { invoiceService } from "@/lib/services";
import { useEffect, useState } from "react";

export function InvoicesTab() {
  const { getAll } = invoiceService;
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    getAll().then((data) => {
      setInvoices(data?.data);
      console.log(data?.data);
    });
  }, [getAll]);

  return (
  <>
  <DataTable columns={columns} data={invoices} />
  </>
);
}

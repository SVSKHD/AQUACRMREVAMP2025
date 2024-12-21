"use client";

import { Invoice } from "@/lib/types/invoice";
import { calculateTotalAmount } from "./table";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export function exportToExcel(data: Invoice[], filename: string) {
  const headers = [
    "Date",
    "Customer Name",
    "Phone",
    "Email",
    "Address",
    "GST Number",
    "Products",
    "Total Amount",
    "Payment Status",
    "Payment Type"
  ];

  const rows = data.map(invoice => [
    invoice.date,
    invoice.customerDetails.name,
    invoice.customerDetails.phone,
    invoice.customerDetails.email,
    invoice.customerDetails.address,
    invoice.gstDetails?.gstNo || "N/A",
    invoice.products.map(p => `${p.productName} (${p.productQuantity})`).join("; "),
    calculateTotalAmount(invoice.products).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR'
    }),
    invoice.paidStatus || "Pending",
    invoice.paymentType || "N/A"
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function exportToPdf(data: Invoice[], filename: string) {
  const doc = new jsPDF();

  const tableColumn = [
    "Date",
    "Customer",
    "Phone",
    "Products",
    "Amount",
    "Status"
  ];

  const tableRows = data.map(invoice => [
    invoice.date,
    invoice.customerDetails.name,
    invoice.customerDetails.phone,
    invoice.products.map(p => `${p.productName} (${p.productQuantity})`).join("\n"),
    calculateTotalAmount(invoice.products).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR'
    }),
    invoice.paidStatus || "Pending"
  ]);

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 3
    },
    headStyles: {
      fillColor: [51, 51, 51],
      textColor: 255,
      fontSize: 9,
      fontStyle: 'bold'
    },
    columnStyles: {
      3: { cellWidth: 50 }
    }
  });

  doc.save(`${filename}.pdf`);
}
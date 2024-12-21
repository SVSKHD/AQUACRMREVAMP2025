"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { CreateInvoice } from "../forms/create-invoice";
import { DateRangePicker } from "./date-range-picker";
import { MonthPicker } from "./month-picker";
import { FileText, Download, FileSpreadsheet } from "lucide-react";
import { exportToExcel, exportToPdf } from "@/lib/utils/export";
import { Invoice } from "@/lib/types/invoice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const totalInvoices = table.getFilteredRowModel().rows.length;

  const handleExport = (type: 'excel' | 'pdf') => {
    const filteredData = table.getFilteredRowModel().rows.map(row => row.original as Invoice);
    const filename = `invoices-${new Date().toISOString().split('T')[0]}`;
    
    if (type === 'excel') {
      exportToExcel(filteredData, filename);
    } else {
      exportToPdf(filteredData, filename);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Search by customer name..."
            value={(table.getColumn("customerName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("customerName")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
          <div className="text-sm text-muted-foreground">
            Total Invoices: {totalInvoices}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('excel')}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('pdf')}>
                <FileText className="mr-2 h-4 w-4" />
                PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <CreateInvoice />
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <MonthPicker
          onMonthChange={(month) => {
            table.getColumn("date")?.setFilterValue(month);
          }}
        />
        <DateRangePicker
          onDateRangeChange={(range) => {
            table.getColumn("date")?.setFilterValue(range);
          }}
        />
      </div>
    </div>
  );
}
"use client";

import { columns } from "@/components/categories/data-table/columns";
import { DataTable } from "@/components/categories/data-table/data-table";
import { mockCategories } from "@/lib/data/mock-categories";

export function CategoriesTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
      </div>
      <DataTable columns={columns} data={mockCategories} />
    </div>
  );
}
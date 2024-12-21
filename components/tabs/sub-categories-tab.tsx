"use client";

import { columns } from "@/components/sub-categories/data-table/columns";
import { DataTable } from "@/components/categories/data-table/data-table";
import { mockCategories } from "@/lib/data/mock-categories";

export function SubCategoriesTab() {
  // Flatten all sub-categories from all categories
  const subCategories = mockCategories.flatMap((category) =>
    category.subCategories.map((sub) => ({
      ...sub,
      parentCategoryId: category.id,
      parentCategoryName: category.name,
    }))
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Sub-Categories</h2>
      </div>
      <DataTable columns={columns} data={subCategories} />
    </div>
  );
}
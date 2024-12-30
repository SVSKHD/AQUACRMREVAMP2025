"use client";

import { columns } from "@/components/sub-categories/data-table/columns";
import { DataTable } from "@/components/categories/data-table/data-table";
import { mockCategories } from "@/lib/data/mock-categories";
import { useEffect, useState } from "react";
import { categoryService } from "@/lib/services";



export function SubCategoriesTab() {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
 useEffect(()=>{
    categoryService.getAllSubCategories().then((data)=>{
      setSubCategories(data.data)
    })
 },[])
  // // Flatten all sub-categories from all categories
  // const subCategories = mockCategories.flatMap((category) =>
  //   category.subCategories.map((sub) => ({
  //     ...sub,
  //     parentCategoryId: category.id,
  //     parentCategoryName: category.name,
  //   }))
  // );



  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Sub-Categories</h2>
      </div>
      <DataTable columns={columns} data={subCategories} />
    </div>
  );
}
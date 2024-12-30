"use client";
import { columns } from "@/components/categories/data-table/columns";
import { DataTable } from "@/components/categories/data-table/data-table";
import { mockCategories } from "@/lib/data/mock-categories";
import { categoryService } from "@/lib/services";
import { useEffect, useState } from "react";


export function CategoriesTab() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    categoryService.getAllCategories().then((data)=>{
      setCategories(data.data);
      console.log(data.data);
    })
  },[]);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
      </div>
      <DataTable columns={columns} data={categories} />
    </div>
  );
}
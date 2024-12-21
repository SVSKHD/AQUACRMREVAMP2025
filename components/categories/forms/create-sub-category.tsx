"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SubCategoryForm } from "./sub-category-form";
import { Category } from "@/lib/types/category";

interface CreateSubCategoryProps {
  parentCategory: Category;
}

export function CreateSubCategory({ parentCategory }: CreateSubCategoryProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Add Sub-Category
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Sub-Category</DialogTitle>
          <DialogDescription>
            Add a new sub-category to {parentCategory.name}.
          </DialogDescription>
        </DialogHeader>
        <SubCategoryForm 
          parentCategory={parentCategory} 
          onSuccess={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}
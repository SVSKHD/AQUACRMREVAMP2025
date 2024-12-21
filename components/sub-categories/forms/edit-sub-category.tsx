"use client";

import { SubCategory } from "@/lib/types/category";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SubCategoryForm } from "@/components/categories/forms/sub-category-form";
import { mockCategories } from "@/lib/data/mock-categories";

interface EditSubCategoryProps {
  subCategory: SubCategory;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditSubCategory({
  subCategory,
  open,
  onOpenChange,
}: EditSubCategoryProps) {
  // Find parent category
  const parentCategory = mockCategories.find(
    (cat) => cat.id === subCategory.parentCategoryId
  );

  if (!parentCategory) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Sub-Category</DialogTitle>
          <DialogDescription>
            Update the sub-category information and settings.
          </DialogDescription>
        </DialogHeader>
        <SubCategoryForm
          parentCategory={parentCategory}
          defaultValues={subCategory}
          isEditing
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
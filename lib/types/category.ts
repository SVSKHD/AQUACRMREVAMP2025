export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  subCategories: SubCategory[];
  status: "active" | "inactive";
  totalProjects: number;
  createdAt: string;
}

export interface SubCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  status: "active" | "inactive";
  projectCount: number;
  parentCategoryId: string;
}
export interface Category {
  photos: any;
  id: string;
  title: string;
  description: string;
  image: string;
  keywords:string;
  subCategories: SubCategory[];
  status: "active" | "inactive";
  totalProjects: number;
  createdAt: string;
}

export interface SubCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  status: "active" | "inactive";
  projectCount: number;
  parentCategoryId: string;
}
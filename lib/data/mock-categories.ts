import { Category } from "@/lib/types/category";

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Software Development",
    description: "Custom software solutions and development services",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    subCategories: [
      {
        id: "1-1",
        name: "Web Development",
        description: "Frontend and backend web development",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop",
        status: "active",
        projectCount: 45,
        parentCategoryId: "1"
      },
      {
        id: "1-2",
        name: "Mobile Apps",
        description: "iOS and Android app development",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
        status: "active",
        projectCount: 32,
        parentCategoryId: "1"
      },
      {
        id: "1-3",
        name: "Desktop Applications",
        description: "Cross-platform desktop applications",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
        status: "active",
        projectCount: 18,
        parentCategoryId: "1"
      },
    ],
    status: "active",
    totalProjects: 95,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Digital Marketing",
    description: "Comprehensive digital marketing services",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    subCategories: [
      {
        id: "2-1",
        name: "SEO",
        description: "Search engine optimization",
        image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=800&h=600&fit=crop",
        status: "active",
        projectCount: 28,
        parentCategoryId: "2"
      },
      {
        id: "2-2",
        name: "Social Media",
        description: "Social media marketing and management",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop",
        status: "active",
        projectCount: 35,
        parentCategoryId: "2"
      },
    ],
    status: "active",
    totalProjects: 63,
    createdAt: "2024-02-01",
  },
];
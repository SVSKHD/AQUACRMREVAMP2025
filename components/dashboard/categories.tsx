"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const categories = [
  {
    id: 1,
    name: "Software Development",
    subCategories: ["Web Development", "Mobile Apps", "Desktop Applications"],
    totalProjects: 145,
    status: "active"
  },
  {
    id: 2,
    name: "Digital Marketing",
    subCategories: ["SEO", "Social Media", "Content Marketing"],
    totalProjects: 89,
    status: "active"
  },
  {
    id: 3,
    name: "Design Services",
    subCategories: ["UI/UX Design", "Graphic Design", "Brand Identity"],
    totalProjects: 67,
    status: "active"
  },
  {
    id: 4,
    name: "Consulting",
    subCategories: ["Business Strategy", "IT Consulting", "Market Research"],
    totalProjects: 34,
    status: "inactive"
  }
];

export function Categories() {
  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-4">
        <h3 className="text-xl font-semibold">Categories</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Sub-Categories</TableHead>
              <TableHead>Total Projects</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {category.subCategories.map((sub) => (
                      <Badge key={sub} variant="secondary">
                        {sub}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{category.totalProjects}</TableCell>
                <TableCell>
                  <Badge
                    variant={category.status === "active" ? "default" : "secondary"}
                  >
                    {category.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
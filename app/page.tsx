"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvoicesTab } from "@/components/tabs/invoices-tab";
import { CategoriesTab } from "@/components/tabs/categories-tab";
import { SubCategoriesTab } from "@/components/tabs/sub-categories-tab";
import { OrdersTab } from "@/components/tabs/orders-tab";
import { CultureTab } from "@/components/tabs/culture-tab";
import { AuthCheck } from "@/components/auth/auth-check";

export default function Home() {
  return (
    <AuthCheck>
      <div className="container mx-auto py-10">
        <Tabs defaultValue="invoices" className="space-y-6">
          <TabsList>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="sub-categories">Sub-Categories</TabsTrigger>
            <TabsTrigger value="culture">Culture</TabsTrigger>
            <TabsTrigger value="online">Online Users</TabsTrigger>
          </TabsList>
          <TabsContent value="invoices">
            <InvoicesTab />
          </TabsContent>
          <TabsContent value="orders">
            <OrdersTab />
          </TabsContent>
          <TabsContent value="categories">
            <CategoriesTab />
          </TabsContent>
          <TabsContent value="sub-categories">
            <SubCategoriesTab />
          </TabsContent>
          <TabsContent value="culture">
            <CultureTab />
          </TabsContent>
        </Tabs>
      </div>
    </AuthCheck>
  );
}
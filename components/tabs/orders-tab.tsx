"use client";

import { columns } from "@/components/orders/data-table/columns";
import { DataTable } from "@/components/categories/data-table/data-table";
import { mockOrders } from "@/lib/data/mock-orders";

export function OrdersTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
      </div>
      <DataTable columns={columns} data={mockOrders} />
    </div>
  );
}
"use client";

import { DollarSign, Users, Package, LineChart } from "lucide-react";
import { StatCard } from "./stat-card";

export function StatsGrid() {
  const stats = [
    {
      icon: DollarSign,
      title: "Total Revenue",
      value: "$45,231.89",
      description: "+20.1% from last month"
    },
    {
      icon: Users,
      title: "Active Customers",
      value: "+2350",
      description: "+180 this week"
    },
    {
      icon: Package,
      title: "Categories",
      value: "12",
      description: "2 added this month"
    },
    {
      icon: LineChart,
      title: "Active Projects",
      value: "573",
      description: "+201 since last week"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
"use client";

import { TeamGrid } from "@/components/culture/team-grid";
import { mockTeamMembers } from "@/lib/data/mock-culture";

export function CultureTab() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Our Culture</h2>
        <p className="text-muted-foreground">
          Meet our amazing team and learn about our values.
        </p>
      </div>
      <TeamGrid members={mockTeamMembers} />
    </div>
  );
}
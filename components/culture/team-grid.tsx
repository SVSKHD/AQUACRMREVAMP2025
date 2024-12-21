"use client";

import { TeamMember } from "@/lib/types/culture";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface TeamGridProps {
  members: TeamMember[];
}

export function TeamGrid({ members }: TeamGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <Card key={member.id} className="p-6">
          <div className="flex items-start space-x-4">
            <img
              src={member.avatar}
              alt={member.name}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div className="space-y-1">
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
              <Badge variant="secondary">{member.department}</Badge>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-sm">{member.bio}</p>
            <div className="space-y-1">
              <p className="text-sm font-medium">Key Achievements:</p>
              <ul className="text-sm text-muted-foreground">
                {member.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-muted-foreground">
              Joined {format(new Date(member.joinDate), "MMMM yyyy")}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
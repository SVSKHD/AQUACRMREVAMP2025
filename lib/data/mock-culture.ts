import { TeamMember } from "@/lib/types/culture";

export const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Senior Software Engineer",
    department: "Engineering",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    bio: "Full-stack developer with a passion for clean code and scalable architecture.",
    achievements: [
      "Led the migration to microservices architecture",
      "Mentored 5 junior developers",
      "Implemented CI/CD pipeline",
    ],
    joinDate: "2022-03-15",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Product Manager",
    department: "Product",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    bio: "Product strategist focused on user-centric solutions and market fit.",
    achievements: [
      "Launched 3 successful product features",
      "Increased user engagement by 45%",
      "Established product analytics framework",
    ],
    joinDate: "2023-01-10",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "UX Designer",
    department: "Design",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    bio: "Creative designer passionate about accessible and intuitive user experiences.",
    achievements: [
      "Redesigned core product interface",
      "Reduced user friction by 30%",
      "Created company-wide design system",
    ],
    joinDate: "2023-06-20",
  },
];
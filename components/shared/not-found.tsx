"use client";

import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface NotFoundProps {
  message?: string;
}

export function NotFound({ message = "Page not found" }: NotFoundProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <FileQuestion className="w-16 h-16 text-muted-foreground" />
      <h1 className="text-2xl font-bold">{message}</h1>
      <Button onClick={() => router.back()}>Go Back</Button>
    </div>
  );
}
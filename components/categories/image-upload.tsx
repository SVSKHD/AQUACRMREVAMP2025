"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  onImageSelected: (url: string) => void;
}

export function ImageUpload({ value, onChange, onImageSelected }: ImageUploadProps) {
  const [preview, setPreview] = useState(value);

  return (
    <div className="space-y-4">
      <Input
        type="url"
        placeholder="Enter image URL"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setPreview(e.target.value);
          onImageSelected(e.target.value);
        }}
      />
      {preview && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
          <img
            src={preview}
            alt="Preview"
            className={cn(
              "h-full w-full object-cover transition-all",
              preview ? "opacity-100" : "opacity-0"
            )}
            onError={() => setPreview("")}
          />
        </div>
      )}
    </div>
  );
}
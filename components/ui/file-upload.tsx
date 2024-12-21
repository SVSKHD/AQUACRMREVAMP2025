"use client";

import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import { Button } from "./button";

interface FileUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  maxSize?: number;
}

export function FileUpload({
  value,
  onChange,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB
}: FileUploadProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { [accept]: [] },
    maxSize,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles?.[0]) {
        onChange(acceptedFiles[0]);
      }
    },
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <div className="text-sm">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </div>
          <div className="text-xs text-muted-foreground">
            {accept === "image/*"
              ? "PNG, JPG or GIF"
              : accept.split(",").join(", ")} up to {maxSize / 1024 / 1024}MB
          </div>
        </div>
      </div>

      {value && (
        <div className="flex items-center justify-between p-2 border rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="text-sm truncate">{value.name}</div>
            <div className="text-xs text-muted-foreground">
              {(value.size / 1024).toFixed(2)}KB
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
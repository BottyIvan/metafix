"use client";

import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

import { fileSupported } from "@/lib/file-supported";
import type { FileDropzoneProps } from "@/types/component-props";

export function FileDropzone({ onDrop }: FileDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const supportedFiles = acceptedFiles.filter(fileSupported);
      onDrop(supportedFiles);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition ${
        isDragActive
          ? "border-foreground bg-black/5"
          : "border-border bg-surface hover:border-foreground"
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto mb-3 h-10 w-10 text-muted" />
      <p className="text-base font-medium text-foreground">
        Drop files here or click to select
      </p>
      <p className="mt-1 text-sm text-muted">
        Inspect: PDF, JPEG, PNG, GIF, WEBP. Clean metadata: PDF, JPEG, PNG.
      </p>
    </div>
  );
}

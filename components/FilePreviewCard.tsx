"use client";

import {
  File as FileIcon,
  X,
  Trash2,
  ChevronDown,
  CheckCircle2,
  ShieldOff,
} from "lucide-react";
import { useState } from "react";
import type { FilePreviewCardProps } from "@/types/component-props";

const MetadataSection = ({ label, data }: { label: string; data: unknown }) => {
  const [open, setOpen] = useState(true);

  if (!data || typeof data !== "object") return null;

  const entries = Object.entries(data as Record<string, unknown>);
  if (entries.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-md border border-border bg-surface">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2 text-xs font-semibold text-muted transition-colors hover:bg-black/5"
        aria-expanded={open}
      >
        <span className="uppercase tracking-wide">{label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="space-y-1 border-t border-border p-2">
          {entries.map(([key, value]) => (
            <div key={key} className="flex justify-between gap-2 text-xs">
              <span className="shrink-0 font-medium text-muted">{key}:</span>
              <span className="max-w-[60%] break-all text-right text-foreground">
                {String(value)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const getFileExtension = (name: string) =>
  name.split(".").pop()?.toUpperCase() ?? "FILE";

export function FilePreviewCard({
  item,
  busy,
  onRemove,
  onClean,
}: FilePreviewCardProps) {
  const [cleaned, setCleaned] = useState(false);
  const fileSizeKB = (item.file.size / 1024).toFixed(2);
  const ext = getFileExtension(item.file.name);
  const canClean =
    item.file.type === "application/pdf" ||
    item.file.type === "image/jpeg" ||
    item.file.type === "image/png";
  const hasMetadata =
    (item.meta.exif && Object.keys(item.meta.exif).length > 0) ||
    (item.meta.pdf && Object.keys(item.meta.pdf).length > 0);

  const handleClean = async () => {
    const success = await onClean();
    if (success) {
      setCleaned(true);
    }
  };

  return (
    <div
      className={`mt-6 rounded-2xl border p-5 shadow-sm transition-all hover:shadow-md ${
        cleaned
          ? "border-foreground/20 bg-black/3"
          : "border-border bg-linear-to-br from-surface to-white"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div
            className={`shrink-0 rounded-lg p-2 ${cleaned ? "bg-black/10" : "bg-black/5"}`}
          >
            {cleaned ? (
              <CheckCircle2 className="h-5 w-5 text-foreground" />
            ) : (
              <FileIcon className="h-5 w-5 text-foreground" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">
              {item.file.name}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted">{fileSizeKB} KB</span>
              <span className="rounded bg-black/5 px-1.5 py-0.5 text-[10px] font-bold text-muted">
                {ext}
              </span>
              {cleaned && (
                <span className="flex items-center gap-1 rounded bg-black/10 px-1.5 py-0.5 text-[10px] font-semibold text-foreground">
                  <ShieldOff className="h-3 w-3" />
                  Cleaned
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="rounded-lg p-2 text-muted transition hover:bg-black hover:text-white"
          aria-label="Remove file"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-4">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Metadata</h3>

        {hasMetadata ? (
          <div className="space-y-2 mb-4">
            {item.meta.exif && (
              <MetadataSection label="EXIF" data={item.meta.exif} />
            )}
            {item.meta.pdf && (
              <MetadataSection label="PDF" data={item.meta.pdf} />
            )}
          </div>
        ) : (
          <div className="mb-4 flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-xs text-muted">
            <ShieldOff className="w-3.5 h-3.5" />
            No metadata detected
          </div>
        )}

        {hasMetadata && !canClean && (
          <div className="mb-4 flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-xs text-muted">
            <ShieldOff className="w-3.5 h-3.5" />
            Cleaning for GIF and WEBP is not available yet.
          </div>
        )}

        <button
          disabled={busy || cleaned || !hasMetadata || !canClean}
          onClick={handleClean}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
            bg-foreground text-background hover:opacity-90
            disabled:cursor-not-allowed disabled:opacity-50"
        >
          {cleaned ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Metadata removed
            </>
          ) : (
            <>
              <Trash2 className="w-4 h-4" />
              {busy ? "Cleaning metadata..." : "Clean Metadata"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

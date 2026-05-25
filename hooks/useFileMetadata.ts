"use client";

import { useCallback, useState } from "react";
import type { FileWithMetadata } from "@/types/metadata";
import { extractMetadata } from "@/lib/metadata/extract";
import { cleanMetadata } from "@/lib/metadata/clean";
import { downloadBlob } from "@/utils/downloadBlob";

export function useFileMetadata() {
  const [file, setFile] = useState<FileWithMetadata | null>(null);
  const [busy, setBusy] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: globalThis.File[]) => {
    if (!acceptedFiles.length) return;
    const uploaded = acceptedFiles[0];
    const meta = await extractMetadata(uploaded);
    setFile({ file: uploaded, meta });
  }, []);

  const removeFile = useCallback(() => setFile(null), []);

  const removeMeta = useCallback(async () => {
    if (!file) return false;
    setBusy(true);

    try {
      const cleaned = await cleanMetadata(file.file);
      downloadBlob(cleaned, `cleaned-${file.file.name}`);
      return true;
    } catch (error) {
      console.error("Error cleaning metadata:", error);
      const message =
        error instanceof Error ? error.message : "Failed to clean metadata";
      alert(message);
      return false;
    } finally {
      setBusy(false);
    }
  }, [file]);

  return { file, busy, onDrop, removeFile, removeMeta };
}

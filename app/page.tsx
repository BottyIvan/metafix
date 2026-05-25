"use client";

import { FileDropzone } from "@/components/FileDropzone";
import { FilePreviewCard } from "@/components/FilePreviewCard";
import { AdSlot } from "@/components/AdSlot";
import { useFileMetadata } from "@/hooks/useFileMetadata";

export default function Page() {
  const { file, busy, onDrop, removeFile, removeMeta } = useFileMetadata();
  const homeTopSlot = process.env.NEXT_PUBLIC_AD_SLOT_HOME_TOP || "";
  const homeBottomSlot = process.env.NEXT_PUBLIC_AD_SLOT_HOME_BOTTOM || "";

  return (
    <div className="px-6 py-12 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-3 text-3xl font-black uppercase tracking-[-0.03em] text-foreground sm:text-5xl">
          Upload a file. Keep control.
        </h1>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          Drop any supported file to inspect embedded metadata and remove what
          you do not want to share.
        </p>

        <AdSlot adName="home_top" slot={homeTopSlot} />

        <FileDropzone onDrop={onDrop} />

        <AdSlot adName="home_bottom" slot={homeBottomSlot} />

        {file && (
          <FilePreviewCard
            item={file}
            busy={busy}
            onRemove={removeFile}
            onClean={removeMeta}
          />
        )}
      </div>
    </div>
  );
}

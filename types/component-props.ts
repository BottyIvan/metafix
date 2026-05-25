import type { FileWithMetadata } from "@/types/metadata";

export interface FileDropzoneProps {
  onDrop: (files: globalThis.File[]) => void | Promise<void>;
}

export interface FilePreviewCardProps {
  item: FileWithMetadata;
  busy: boolean;
  onRemove: () => void;
  onClean: () => boolean | Promise<boolean>;
}

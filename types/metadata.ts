export interface PdfMetadata {
  title: string;
  author: string;
  subject: string;
}

export interface FileMetadata {
  exif?: Record<string, unknown> | null;
  pdf?: PdfMetadata;
}

export interface FileWithMetadata {
  file: globalThis.File;
  meta: FileMetadata;
}

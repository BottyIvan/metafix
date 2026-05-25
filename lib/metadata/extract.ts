import * as exifr from "exifr";
import { PDFDocument } from "pdf-lib";
import type { FileMetadata } from "@/types/metadata";

export async function extractMetadata(
  file: globalThis.File,
): Promise<FileMetadata> {
  const meta: FileMetadata = {};

  if (file.type.startsWith("image/")) {
    meta.exif = await exifr.parse(file).catch(() => null);
    return meta;
  }

  if (file.type === "application/pdf") {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer).catch(() => null);

    meta.pdf = {
      title: pdfDoc?.getTitle() || "",
      author: pdfDoc?.getAuthor() || "",
      subject: pdfDoc?.getSubject() || "",
    };
    return meta;
  }

  return meta;
}

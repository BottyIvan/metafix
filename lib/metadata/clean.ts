import { PDFDocument } from "pdf-lib";

const CLEANABLE_IMAGE_TYPES = ["image/jpeg", "image/png"] as const;

function canvasToBlob(canvas: HTMLCanvasElement, type: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Unable to generate blob"));
        return;
      }
      resolve(blob);
    }, type);
  });
}

export async function cleanMetadata(file: globalThis.File): Promise<Blob> {
  if (file.type.startsWith("image/")) {
    if (!CLEANABLE_IMAGE_TYPES.includes(file.type as (typeof CLEANABLE_IMAGE_TYPES)[number])) {
      throw new Error(
        "Metadata cleaning for GIF and WEBP is not available yet. Supported image formats: JPEG and PNG.",
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const url = URL.createObjectURL(
      new Blob([arrayBuffer], { type: file.type }),
    );

    try {
      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Unable to read image"));
        img.src = url;
      });

      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      ctx.drawImage(image, 0, 0);
      return await canvasToBlob(canvas, file.type);
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  if (file.type === "application/pdf") {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    pdfDoc.setTitle("");
    pdfDoc.setAuthor("");
    pdfDoc.setSubject("");

    const bytes = await pdfDoc.save();
    const normalizedBytes = Uint8Array.from(bytes);
    return new Blob([normalizedBytes], { type: file.type });
  }

  return new Blob([await file.arrayBuffer()], { type: file.type });
}

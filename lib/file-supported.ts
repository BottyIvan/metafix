export const fileSupported = (file: globalThis.File) => {
  const supportedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  return supportedTypes.includes(file.type);
};

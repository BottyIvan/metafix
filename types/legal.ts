import type { ComponentType } from "react";

export interface LegalMeta {
  title?: string;
  description?: string;
  create?: string;
  modify?: string;
  category?: string;
}

export interface LegalModule {
  default: ComponentType;
  meta?: LegalMeta;
}

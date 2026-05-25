import React from "react";
import type { Metadata } from "next";
import type { LegalModule } from "@/types/legal";

const LEGAL_FALLBACKS: Record<string, { title: string; description: string }> = {
  cookies: {
    title: "Cookie Policy",
    description:
      "Learn how MetaFix uses cookies and consent preferences for essential features and ad-related tools.",
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "Understand how MetaFix processes data, handles files locally, and protects user privacy.",
  },
  terms: {
    title: "Terms of Service",
    description:
      "Read the terms and conditions for using MetaFix and its file metadata tools.",
  },
};

const LEGAL_SLUGS = ["privacy", "terms", "cookies"] as const;

const toTitleCaseFromSlug = (slug: string) =>
  slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

async function loadLegal(slug: string): Promise<LegalModule | null> {
  try {
    return (await import(`@/content/${slug}.mdx`)) as LegalModule;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mod = await loadLegal(slug);

  const fallback = LEGAL_FALLBACKS[slug] || {
    title: toTitleCaseFromSlug(slug),
    description: `Read the ${toTitleCaseFromSlug(slug)} document for MetaFix.`,
  };

  const title = mod?.meta?.title || fallback.title;
  const description = mod?.meta?.description || fallback.description;

  return {
    title,
    description,
  };
}

export function generateStaticParams() {
  return LEGAL_SLUGS.map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const mod = await loadLegal(slug);
  const Legal = mod?.default || null;
  const meta = mod?.meta || {};

  const displayTitle = meta.title || toTitleCaseFromSlug(slug);
  const lastUpdated = meta.modify || meta.create || "N/A";

  return (
    <section className="max-w-7xl mx-auto my-8 p-4">
      <h1 className="text-xl font-bold mb-2">{displayTitle}</h1>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
        Last update: {lastUpdated}
      </p>
      {Legal ? (
        <Legal />
      ) : (
        <p className="text-red-600 dark:text-red-400">Document not found.</p>
      )}
    </section>
  );
}

export const dynamicParams = false;

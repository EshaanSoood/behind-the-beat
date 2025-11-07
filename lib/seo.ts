import type { Metadata } from "next";

// TODO: Replace with production domain before launch
export const CANONICAL_BASE = "https://YOUR-PROD-DOMAIN.com";
export const DEFAULT_OG = "/images/og-default.jpg";

export const siteDefaults = {
  title: "Behind the Beat",
  description: "A cozy, modern magazine experience for interviews and reviews.",
  url: process.env.NEXT_PUBLIC_SITE_URL || CANONICAL_BASE,
  ogImage: DEFAULT_OG,
};

type BuildEntryMetaProps = {
  title: string;
  description: string;
  pathname: string;
  image?: string;
  type?: "article" | "website";
  publishedTime?: string;
};

export function buildEntryMeta({
  title,
  description,
  pathname,
  image,
  type = "article",
  publishedTime,
}: BuildEntryMetaProps): Metadata {
  const fullTitle = `${title} | ${siteDefaults.title}`;
  const canonicalUrl = `${CANONICAL_BASE}${pathname}`;
  const ogImageUrl = image
    ? `${CANONICAL_BASE}${image}`
    : `${CANONICAL_BASE}${DEFAULT_OG}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type,
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: siteDefaults.title,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImageUrl],
    },
  };
}

export function generateMetadata({
  title,
  description,
  ogImage,
  path,
}: {
  title?: string;
  description?: string;
  ogImage?: string;
  path?: string;
} = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${siteDefaults.title}`
    : `${siteDefaults.title} — ${siteDefaults.description}`;
  const metaDescription = description || siteDefaults.description;
  const ogImageUrl = ogImage
    ? `${siteDefaults.url}${ogImage}`
    : `${siteDefaults.url}${siteDefaults.ogImage}`;
  const canonicalUrl = path ? `${siteDefaults.url}${path}` : siteDefaults.url;

  return {
    title: fullTitle,
    description: metaDescription,
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: siteDefaults.title,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title || siteDefaults.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}


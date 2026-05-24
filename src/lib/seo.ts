import type { Metadata } from "next";
import { listUseCases } from "@/lib/use-cases";

const fallbackSiteUrl = "http://localhost:3000";

function normalizedSiteUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_APP_URL ?? fallbackSiteUrl;

  try {
    const url = new URL(rawUrl);
    url.pathname = "";
    url.search = "";
    url.hash = "";
    return url;
  } catch {
    return new URL(fallbackSiteUrl);
  }
}

export const siteUrl = normalizedSiteUrl();

export const siteConfig = {
  name: "Prompt Library",
  defaultTitle:
    "Prompt Library | Practical AI Prompts for Work, Study and Everyday Use",
  titleTemplate: "%s | Prompt Library",
  description:
    "A curated AI prompt library with practical prompts for writing, planning, learning, meetings, brainstorming, decisions, communication, and better everyday work.",
  shortDescription:
    "A curated collection of practical prompts to help you think clearer, work smarter, and get better results with AI.",
  creator: "Prompt Library",
  locale: "en_US",
  themeColor: "#08152f",
  keywords: [
    "AI prompts",
    "prompt library",
    "ChatGPT prompts",
    "AI productivity",
    "prompt engineering",
    "writing prompts",
    "business prompts",
    "study prompts",
    "meeting preparation prompts",
    "brainstorming prompts"
  ]
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function canonicalUrl(path = "/") {
  const url = new URL(path, siteUrl);
  url.search = "";
  url.hash = "";
  return url.toString();
}

export function truncateDescription(description: string, maxLength = 155) {
  if (description.length <= maxLength) {
    return description;
  }

  return `${description.slice(0, maxLength - 1).trimEnd()}...`;
}

export function openGraphImage() {
  return {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: "Prompt Library - practical AI prompts for work, study, and everyday use"
  };
}

export function noIndexMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false
      }
    }
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: canonicalUrl("/"),
    description: siteConfig.description,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: canonicalUrl("/")
    }
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: canonicalUrl("/"),
    description: siteConfig.shortDescription
  };
}

export function useCaseItemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Prompt Library use cases",
    description: "Supported prompt-library paths by audience and workflow.",
    itemListElement: listUseCases().map((useCase, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: useCase.displayName,
      url: canonicalUrl(useCase.routePath)
    }))
  };
}

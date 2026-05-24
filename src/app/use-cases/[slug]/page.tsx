import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PromptCollection } from "@/components/prompt-collection";
import { JsonLd } from "@/components/json-ld";
import { getUseCaseDetail } from "@/lib/prompts";
import { listUseCases } from "@/lib/use-cases";
import {
  absoluteUrl,
  canonicalUrl,
  openGraphImage,
  siteConfig,
  truncateDescription
} from "@/lib/seo";

export default async function UseCaseDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = getUseCaseDetail(slug);

  if (!detail) {
    notFound();
  }

  return (
    <section className="page">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${detail.displayName} AI prompts`,
            url: canonicalUrl(detail.routePath),
            description: detail.description,
            isPartOf: {
              "@type": "WebSite",
              name: siteConfig.name,
              url: canonicalUrl("/")
            },
            about: detail.displayName,
            hasPart: detail.promptCollections.flatMap((collection) =>
              collection.prompts.map((prompt) => ({
                "@type": "CreativeWork",
                name: prompt.title,
                description: prompt.intendedOutcome,
                text: prompt.promptText,
                keywords: prompt.tags.join(", ")
              }))
            )
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Prompt Library",
                item: canonicalUrl("/")
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Use cases",
                item: canonicalUrl("/use-cases")
              },
              {
                "@type": "ListItem",
                position: 3,
                name: detail.displayName,
                item: canonicalUrl(detail.routePath)
              }
            ]
          }
        ]}
      />
      <div className="section-heading">
        <p className="eyebrow">Prompt library path</p>
        <h1 className="page-title">{detail.displayName}</h1>
        <p className="lead">{detail.description}</p>
      </div>

      {detail.responsibleUseMessage ? (
        <div className="notice warning" role="note">
          {detail.responsibleUseMessage}
        </div>
      ) : null}

      {detail.promptCollections.map((collection) => (
        <PromptCollection key={collection.id} collection={collection} />
      ))}
    </section>
  );
}

export function generateStaticParams() {
  return listUseCases().map((useCase) => ({
    slug: useCase.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = getUseCaseDetail(slug);

  if (!detail) {
    return {
      title: "Use case not found",
      robots: {
        index: false,
        follow: false
      }
    };
  }

  const title = `${detail.displayName} AI Prompts`;
  const description = truncateDescription(
    `Practical AI prompts for ${detail.displayName.toLowerCase()}. ${detail.description}`
  );

  return {
    title,
    description,
    keywords: [
      `${detail.displayName} prompts`,
      `${detail.displayName} AI prompts`,
      "AI prompt library",
      "practical AI prompts",
      ...detail.promptCollections.flatMap((collection) =>
        collection.prompts.flatMap((prompt) => prompt.tags)
      )
    ],
    alternates: {
      canonical: canonicalUrl(detail.routePath)
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: absoluteUrl(detail.routePath),
      images: [openGraphImage()]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"]
    }
  };
}

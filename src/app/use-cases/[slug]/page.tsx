import { notFound } from "next/navigation";
import { PromptCollection } from "@/components/prompt-collection";
import { getUseCaseDetail } from "@/lib/prompts";

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

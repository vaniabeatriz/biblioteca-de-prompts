import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PromptCollection } from "@/components/prompt-collection";
import {
  hasPromptLibraryAccess,
  registerPathForUseCase
} from "@/lib/access";
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

  const cookieStore = await cookies();
  const hasAccess = hasPromptLibraryAccess(cookieStore);
  const registerPath = registerPathForUseCase(detail.routePath);

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

      {hasAccess ? (
        detail.promptCollections.map((collection) => (
          <PromptCollection key={collection.id} collection={collection} />
        ))
      ) : (
        <div className="panel section">
          <h2>Register to unlock prompts</h2>
          <p>
            Preview this category now, then complete the short registration form
            to return directly to this prompt library.
          </p>
          <ul className="tag-list" aria-label="Available prompt groups">
            {detail.promptCollections.map((collection) => (
              <li key={collection.id}>{collection.title}</li>
            ))}
          </ul>
          <Link className="button" href={registerPath}>
            Register to unlock prompts
          </Link>
        </div>
      )}
    </section>
  );
}

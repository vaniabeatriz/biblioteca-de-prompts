import { PromptCard } from "@/components/prompt-card";
import type { PromptCollectionSeed } from "@/types/prompt-library";

export function PromptCollection({
  collection
}: {
  collection: PromptCollectionSeed;
}) {
  return (
    <section className="section" aria-labelledby={`${collection.id}-heading`}>
      <div className="section-heading compact">
        <h2 id={`${collection.id}-heading`}>{collection.title}</h2>
        <p>{collection.description}</p>
      </div>

      {collection.prompts.length > 0 ? (
        <div className="grid">
          {collection.prompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <div className="notice">
          Prompts for this workflow are being curated. Choose another use case
          or check back after the library is updated.
        </div>
      )}
    </section>
  );
}

import Link from "next/link";
import type { UseCaseSummary } from "@/types/prompt-library";

export function UseCaseCard({ useCase }: { useCase: UseCaseSummary }) {
  return (
    <article className="card use-case-card">
      <h2>{useCase.displayName}</h2>
      <p>{useCase.description}</p>
      <Link className="card-link" href={useCase.routePath}>
        Open prompt library <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

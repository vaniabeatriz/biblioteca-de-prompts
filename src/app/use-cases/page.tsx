import { UseCaseCard } from "@/components/use-case-card";
import { listUseCases } from "@/lib/use-cases";

export default function UseCasesPage() {
  const useCases = listUseCases();

  return (
    <section className="page">
      <div className="section-heading">
        <h1 className="page-title">Use cases</h1>
        <p className="lead">
          Choose the path that matches your context and open a focused prompt
          library for that work.
        </p>
      </div>
      <div className="grid" aria-label="Supported use cases">
        {useCases.map((useCase) => (
          <UseCaseCard key={useCase.slug} useCase={useCase} />
        ))}
      </div>
    </section>
  );
}

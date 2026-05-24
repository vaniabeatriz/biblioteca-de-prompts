"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export interface PromptSearchUseCase {
  displayName: string;
  description: string;
  routePath: string;
}

interface PromptSearchProps {
  useCases: PromptSearchUseCase[];
}

function normalizeSearchValue(value: string) {
  return value.trim().toLowerCase();
}

export function PromptSearch({ useCases }: PromptSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const suggestedUseCases = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(query);

    if (!normalizedQuery) {
      return useCases.slice(0, 4);
    }

    return useCases
      .filter((useCase) => {
        const searchableText = `${useCase.displayName} ${useCase.description}`.toLowerCase();
        return searchableText.includes(normalizedQuery);
      })
      .slice(0, 4);
  }, [query, useCases]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedQuery = normalizeSearchValue(query);
    const targetUseCase = normalizedQuery
      ? useCases.find((useCase) => {
          const searchableText = `${useCase.displayName} ${useCase.description}`.toLowerCase();
          return searchableText.includes(normalizedQuery);
        })
      : undefined;

    router.push(targetUseCase?.routePath ?? "/use-cases");
  }

  return (
    <div className="prompt-search">
      <form
        className="prompt-search-form"
        role="search"
        aria-label="Search prompt use cases"
        onSubmit={onSubmit}
      >
        <label className="visually-hidden" htmlFor="prompt-search-input">
          Search prompt use cases
        </label>
        <div className="prompt-search-shell">
          <input
            id="prompt-search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by role, task, or use case"
            autoComplete="off"
          />
          <button type="submit">Search</button>
        </div>
      </form>
      <p className="search-helper">
        Try marketing, students, meetings, salon, code, research, or content.
      </p>
      {suggestedUseCases.length ? (
        <div className="search-suggestions" aria-label="Search suggestions">
          {suggestedUseCases.map((useCase) => (
            <button
              key={useCase.routePath}
              type="button"
              onClick={() => router.push(useCase.routePath)}
            >
              {useCase.displayName}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

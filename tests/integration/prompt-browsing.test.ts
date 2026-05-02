import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PromptCollection } from "@/components/prompt-collection";
import { SEEDED_PROMPT_COLLECTIONS } from "@/data/prompt-seed";
import { USE_CASES } from "@/data/use-cases";
import { getUseCaseDetail } from "@/lib/prompts";

describe("prompt browsing data", () => {
  it("groups prompts by use case and workflow collection", () => {
    const detail = getUseCaseDetail("marketing");

    expect(detail?.promptCollections).toHaveLength(1);
    expect(detail?.promptCollections[0].title).toBe("Everyday workflow prompts");
    expect(detail?.promptCollections[0].prompts).toHaveLength(2);
  });

  it("provides required fields for every starter prompt", () => {
    for (const collection of SEEDED_PROMPT_COLLECTIONS) {
      for (const prompt of collection.prompts) {
        expect(prompt.title).toBeTruthy();
        expect(prompt.intendedOutcome).toBeTruthy();
        expect(prompt.promptText).toContain("[");
        expect(prompt.suggestedInputs).toBeTruthy();
        expect(prompt.usageNote).toBeTruthy();
      }
    }
  });

  it("has prompt coverage for every supported use case", () => {
    const coveredSlugs = new Set(
      SEEDED_PROMPT_COLLECTIONS.map((collection) => collection.useCaseSlug)
    );

    expect(coveredSlugs.size).toBe(18);
    expect(USE_CASES.every((useCase) => coveredSlugs.has(useCase.slug))).toBe(
      true
    );
  });

  it("renders a useful empty collection state", () => {
    const markup = renderToStaticMarkup(
      React.createElement(PromptCollection, {
        collection: {
          id: "empty",
          useCaseSlug: "marketing",
          title: "Empty workflow",
          description: "A workflow with no prompts yet.",
          sortOrder: 1,
          status: "empty",
          prompts: []
        }
      })
    );

    expect(markup).toContain("being curated");
  });
});

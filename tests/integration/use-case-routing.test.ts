import { describe, expect, it } from "vitest";
import { listUseCases } from "@/lib/use-cases";
import {
  isSupportedUseCasePath,
  isSupportedUseCaseSlug,
  getUseCaseRoutePath,
  registrationNextPath,
} from "@/lib/routing";

describe("use-case routing", () => {
  it("keeps canonical slugs, labels, and paths aligned", () => {
    const useCases = listUseCases();

    expect(useCases).toHaveLength(18);
    expect(useCases.every((useCase) => isSupportedUseCaseSlug(useCase.slug))).toBe(
      true
    );
    expect(
      useCases.every(
        (useCase) => useCase.routePath === getUseCaseRoutePath(useCase.slug)
      )
    ).toBe(true);
    expect(useCases.map((useCase) => useCase.displayName)).toContain(
      "Nutritionists"
    );
    expect(useCases.map((useCase) => useCase.displayName)).toContain(
      "Psychologists"
    );
  });

  it("rejects unsupported destinations and falls back to the directory", () => {
    expect(isSupportedUseCasePath("/use-cases/unknown")).toBe(false);
    expect(
      registrationNextPath({
        intendedDestination: "/use-cases/unknown",
        primaryUseCaseSlug: null
      })
    ).toBe("/use-cases");
  });

  it("preserves a valid intended destination ahead of the selected use case", () => {
    expect(
      registrationNextPath({
        intendedDestination: "/use-cases/web-designer",
        primaryUseCaseSlug: "marketing"
      })
    ).toBe("/use-cases/web-designer");
  });
});

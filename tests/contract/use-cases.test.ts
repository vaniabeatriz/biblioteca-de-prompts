import { describe, expect, it } from "vitest";
import { USE_CASE_SLUGS } from "@/types/prompt-library";

describe("GET /api/use-cases", () => {
  it("returns exactly the supported use cases in canonical order", async () => {
    const { GET } = await import("@/app/api/use-cases/route");
    const response = await GET();
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.useCases).toHaveLength(18);
    expect(payload.useCases.map((useCase: { slug: string }) => useCase.slug)).toEqual(
      USE_CASE_SLUGS
    );
    expect(payload.useCases[13]).toMatchObject({
      slug: "nutritionists",
      displayName: "Nutritionists",
      routePath: "/use-cases/nutritionists"
    });
    expect(payload.useCases[14]).toMatchObject({
      slug: "psychologists",
      displayName: "Psychologists",
      routePath: "/use-cases/psychologists"
    });
  });
});

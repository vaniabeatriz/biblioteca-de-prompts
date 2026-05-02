import { describe, expect, it } from "vitest";

describe("GET /api/use-cases/{slug}", () => {
  it("returns prompt collections for a supported use case", async () => {
    const { GET } = await import("@/app/api/use-cases/[slug]/route");
    const response = await GET(
      new Request("http://test.local/api/use-cases/data-analysts"),
      { params: Promise.resolve({ slug: "data-analysts" }) }
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toMatchObject({
      slug: "data-analysts",
      routePath: "/use-cases/data-analysts",
      promptCollections: expect.any(Array)
    });
    expect(payload.promptCollections[0].prompts[0]).toMatchObject({
      title: expect.any(String),
      intendedOutcome: expect.any(String),
      promptText: expect.any(String),
      suggestedInputs: expect.any(String),
      usageNote: expect.any(String)
    });
  });

  it("returns 404 for unsupported use-case slugs", async () => {
    const { GET } = await import("@/app/api/use-cases/[slug]/route");
    const response = await GET(
      new Request("http://test.local/api/use-cases/unknown"),
      { params: Promise.resolve({ slug: "unknown" }) }
    );

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toMatchObject({
      code: "use_case_not_found"
    });
  });

  it("includes responsible-use messaging for professional use cases", async () => {
    const { GET } = await import("@/app/api/use-cases/[slug]/route");
    const response = await GET(
      new Request("http://test.local/api/use-cases/doctors"),
      { params: Promise.resolve({ slug: "doctors" }) }
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.responsibleUseRequired).toBe(true);
    expect(payload.responsibleUseMessage).toContain(
      "do not replace licensed professional judgment"
    );
  });
});

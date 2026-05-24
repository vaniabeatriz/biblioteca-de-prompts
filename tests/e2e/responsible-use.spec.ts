import { expect, test } from "@playwright/test";

for (const slug of ["doctors", "nutritionists", "psychologists", "dentists"]) {
  test(`${slug} page shows responsible-use messaging`, async ({ page }) => {
    await page.goto(`/use-cases/${slug}`);

    await expect(page.getByRole("note")).toContainText(
      "do not replace licensed professional judgment"
    );
    await expect(
      page.getByRole("heading", { name: /task planner/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Register to unlock prompts" })
    ).toHaveCount(0);
  });
}

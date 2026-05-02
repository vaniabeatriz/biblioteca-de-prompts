import { expect, test } from "@playwright/test";

for (const slug of ["doctors", "nutritionists", "psychologists", "dentists"]) {
  test(`${slug} page shows responsible-use messaging`, async ({ page }) => {
    await page.goto(`/use-cases/${slug}`);

    await expect(
      page.getByText("do not replace licensed professional judgment")
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Register to unlock prompts" })
    ).toHaveAttribute("href", `/register?next=%2Fuse-cases%2F${slug}`);
  });
}

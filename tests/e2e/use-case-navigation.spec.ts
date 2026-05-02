import { expect, test } from "@playwright/test";

test("use-case directory links to canonical prompt paths", async ({ page }) => {
  await page.goto("/use-cases");

  await expect(page.getByRole("heading", { name: "Use cases" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Nutritionists" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Psychologists" })).toBeVisible();

  await page
    .getByRole("link", { name: "Open prompt library" })
    .nth(3)
    .click();
  await expect(page).toHaveURL(/\/use-cases\/data-analysts$/);
});

test("direct use-case registration preserves the intended destination", async ({
  page
}) => {
  const email = `nav-${Date.now()}@example.com`;

  await page.goto("/use-cases/web-designer");
  const registerLink = page.getByRole("link", {
    name: "Register to unlock prompts"
  });
  await expect(registerLink).toHaveAttribute(
    "href",
    "/register?next=%2Fuse-cases%2Fweb-designer"
  );

  await page.goto(
    `/register?email=${encodeURIComponent(email)}&next=/use-cases/web-designer`
  );
  await page.getByLabel("Full name").fill("Navigation Tester");
  await page.getByLabel("Role or occupation").fill("Designer");
  await page.getByLabel("Primary use case").selectOption("marketing");
  await page.getByLabel(/GDPR data-processing notice/i).check();
  await page.getByRole("button", { name: "Complete registration" }).click();

  await expect(page).toHaveURL(/\/use-cases\/web-designer$/);
});

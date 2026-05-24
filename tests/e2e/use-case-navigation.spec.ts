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

test("direct use-case visits show prompts without registration", async ({ page }) => {
  await page.goto("/use-cases/web-designer");

  await expect(
    page.getByRole("heading", { name: "Everyday workflow prompts" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Web Designer task planner" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Register to unlock prompts" })
  ).toHaveCount(0);
});

test("manual registration can still preserve an intended destination", async ({
  page
}) => {
  const email = `nav-${Date.now()}@example.com`;

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

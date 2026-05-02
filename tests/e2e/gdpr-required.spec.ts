import { expect, test } from "@playwright/test";

test("registration requires explicit GDPR confirmation", async ({ page }) => {
  const email = `gdpr-${Date.now()}@example.com`;

  await page.goto(`/register?email=${encodeURIComponent(email)}`);

  await expect(page.getByLabel("Email address")).toHaveValue(email);
  await expect(
    page.getByLabel(/GDPR data-processing notice/i)
  ).not.toBeChecked();

  await page.getByLabel("Full name").fill("GDPR Tester");
  await page.getByLabel("Role or occupation").fill("Analyst");
  await page.getByLabel("Primary use case").selectOption("data-analysts");
  await page.getByRole("button", { name: "Complete registration" }).click();

  await expect(
    page.getByText("GDPR data-processing confirmation is required.")
  ).toBeVisible();

  await page.getByLabel(/GDPR data-processing notice/i).check();
  await page.getByRole("button", { name: "Complete registration" }).click();

  await expect(page).toHaveURL(/\/use-cases\/data-analysts$/);
});

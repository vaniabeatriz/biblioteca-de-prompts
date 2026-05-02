import { expect, test } from "@playwright/test";

test("core prompt-library pages meet smoke timing goals", async ({ page }) => {
  const landingStart = Date.now();
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Prompt Library" })).toBeVisible();
  expect(Date.now() - landingStart).toBeLessThan(10_000);

  const email = `perf-${Date.now()}@example.com`;
  const captureStart = Date.now();
  await page.getByLabel("Email address").fill(email);
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page).toHaveURL(new RegExp(`/register\\?email=${email.replace("@", "%40")}`));
  expect(Date.now() - captureStart).toBeLessThan(10_000);

  const registrationStart = Date.now();
  await page.getByLabel("Full name").fill("Performance Tester");
  await page.getByLabel("Role or occupation").fill("Marketer");
  await page.getByLabel("Primary use case").selectOption("marketing");
  await page.getByLabel(/GDPR data-processing notice/i).check();
  await page.getByRole("button", { name: "Complete registration" }).click();
  await expect(page).toHaveURL(/\/use-cases\/marketing$/);
  await expect(
    page.getByRole("heading", { name: "Marketing", exact: true })
  ).toBeVisible();
  expect(Date.now() - registrationStart).toBeLessThan(15_000);

  const detailStart = Date.now();
  await page.goto("/use-cases/doctors");
  await expect(
    page.getByRole("heading", { name: "Doctors", exact: true })
  ).toBeVisible();
  await expect(page.getByRole("note")).toContainText(
    "do not replace licensed professional judgment"
  );
  expect(Date.now() - detailStart).toBeLessThan(10_000);
});

import { expect, test } from "@playwright/test";

test("landing page rejects invalid email and routes valid email to registration", async ({
  page
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Prompt Library" })
  ).toBeVisible();

  await page.getByLabel("Email address").fill("invalid");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();

  await page.getByLabel("Email address").fill("person@example.com");
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page).toHaveURL(/\/register\?email=person%40example\.com/);
  await expect(page.getByLabel("Email address")).toHaveValue("person@example.com");
});

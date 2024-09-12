import { test, expect } from "@playwright/test";

test.describe("Basic Interactions, designed to show success", () => {
  test.beforeEach(
    async ({ page }) => await page.goto("http://localhost:3000/"),
  );

  test("Correct title", async ({ page }) => {
    await expect(page).toHaveTitle("Sched Track");
  });

  test("Nav menu links", async ({ page }) => {
    const featuresLink = page.locator('[data-testid="features"]');
    const pricingLink = page.locator('[data-testid="pricing"]');

    await page.getByRole("link", { name: "Sched Track" }).click();
    await expect(page).toHaveURL("http://localhost:3000/");

    await page.getByRole("link", { name: "Features" }).click();
    await expect(page).toHaveURL("http://localhost:3000/#features");
    await expect(featuresLink).toBeVisible();

    await page.getByRole("link", { name: "Pricing" }).click();
    await expect(page).toHaveURL("http://localhost:3000/#pricing");
    await expect(pricingLink).toBeVisible();
  });

  //stripe donation test
  test("test hero stripe donation integration", async ({ page }) => {
    await page.getByRole("link", { name: "Donate" }).click();
    await expect(page).toHaveURL("https://buy.stripe.com/7sIaFa7EQeJzbW8aEG");
  });

  test("test layout stripe donation integration", async ({ page }) => {
    await page
      .getByRole("link", { name: "Help Us Keep the Lights On 💡" })
      .click();
    await expect(page).toHaveURL("https://buy.stripe.com/7sIaFa7EQeJzbW8aEG");
  });

  // Working text skipped to stop spam
  test.skip("sign in and account creation", async ({ page }) => {
    const email = process.env.TEST_EMAIL as string;
    await page.getByRole("link", { name: "Sign In" }).click();
    await expect(page).toHaveURL("http:/localhost:3000/signin");
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill(email);
    await page.getByRole("button", { name: "Sign in with Email" }).click();
  });

  //after sign in verify account info is visible
  //Test fails google-side 400 error, manual test passes
  test.skip("Google sign in and generate schedule", async ({ page }) => {
    const email = process.env.TEST_EMAIL as string;
    const password = process.env.TEST_PASSWORD as string;
    await page.goto("https://www.schedtrack.com/");
    await page.getByRole("link", { name: "Sign In" }).click();
    await expect(page).toHaveURL("https://www.schedtrack.com/signin");
    await page.getByRole("button", { name: "Sign in with Google" }).click();
    await page.getByLabel("Email or phone").fill(email);
    await page.getByLabel("Email or phone").press("Enter");
    await page.getByLabel("Enter your password").fill(password);
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page).toHaveURL("https://www.schedtrack.com/dashboard");
    await expect(page.getByTestId("sign-out")).toBeVisible();
  });

  test("contact page allows for message send", async ({ page }) => {
    const contactLink = page.locator('[data-testid="contactLink"]');
    const links = await page.locator(`[id="links"]`);
    await contactLink.click();
    await expect(page).toHaveURL("http:/localhost:3000/contact");
    await expect(links).toBeVisible();
  });

  //TODO
  //add credetial log in to allow for deeper testing on the api
});

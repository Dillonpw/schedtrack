import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(
    async ({ page }) => await page.goto("http://localhost:3000/"),
  );

  test("Correct title", async ({ page }) => {
    await expect(page).toHaveTitle("Sched Track");
  });

  test("Nav menu links", async ({ page }) => {
    const featuresLink = page.locator('[data-testid="features"]');
    const pricingLink = page.locator('[data-testid="pricing"]');

    await page.getByRole("link", { name: "Dashboard" }).click();
    await expect(page).toHaveURL("http://localhost:3000/dashboard");

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

  //sign in with email testing waiting for domain approval from resend
  test("sign in and account creation", async ({ page }) => {
    await page.getByRole("link", { name: "Sign In" }).click();
    await expect(page).toHaveURL("http:/localhost:3000/signin");
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill("dillonpwalsh10@gmail.com");
    await page.getByRole("button", { name: "Sign in with Email" }).click();
  });

  test("sign in with Google", async ({ page }) => {
    const email = process.env.TEST_EMAIL as string;
    const pw = process.env.TEST_PW as string;
    const signOutBtn = page.locator(`[data-testid="sign-out"]`);

    await page.getByRole("link", { name: "Sign In" }).click();
    await page.getByRole("button", { name: "Sign in with Google" }).click();
    await page.getByLabel("Email or phone").click();
    await page.getByLabel("Email or phone").fill("dillonwtest@gmail.com");
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByLabel("Enter your password").fill("Fs-302121");
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page).toHaveURL("http:/localhost:3000/dashboard");
    await expect(signOutBtn).toBeVisible();
  });

  //after sign in verify account info is visible

  //populate data in db with test account and then view results on schedule page

  test("contact page allows for message send", async ({ page }) => {
    const contactLink = page.locator('[data-testid="contactLink"]');
    const result = page.locator(`[data-testid="contact"]`);

    await contactLink.click();
    await expect(page).toHaveURL("http:/localhost:3000/contact");
    await page.getByPlaceholder("Anonymous").click();
    await page.getByPlaceholder("Anonymous").fill("test");
    await page.getByPlaceholder("5gqoQ@example.com").click();
    await page.getByPlaceholder("5gqoQ@example.com").fill("dillonwtest0@gmail.com");
    await page.getByPlaceholder("Message").click();
    await page.getByPlaceholder("Message").fill("test message");
    await page.getByRole("button", { name: "Submit Form" }).click();
    await expect(result).toBeVisible();
    await expect(result).toHaveText("Form Submitted Successfully");
  });
});

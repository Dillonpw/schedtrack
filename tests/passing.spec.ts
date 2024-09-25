import { test, expect } from "@playwright/test";

test.describe("Basic Interactions, designed to show success", () => {
  test.beforeEach(
    async ({ page }) => await page.goto("https://www.schedtrack.com/"),
  );

  test("Correct title", async ({ page }) => {
    await expect(page).toHaveTitle("Sched Track");
  });

  test("Nav menu links", async ({ page }) => {
    await page.getByTestId('favicon-link').click();
    await expect(page).toHaveURL("https://www.schedtrack.com/");

    await page.getByRole("link", { name: "Features" }).click();
    await expect(page).toHaveURL("https://www.schedtrack.com/#features");
    await expect(page.getByTestId("features")).toBeVisible();

    await page.getByRole("link", { name: "Pricing" }).click();
    await expect(page).toHaveURL("https://www.schedtrack.com/#pricing");
    await expect(page.getByTestId("pricing")).toBeVisible();
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

  //faq section tests
  test("should display the FAQ section", async ({ page }) => {
    //locators
    const firstAccordion = page.locator(
      "text=Sched Track helps professionals manage their schedules more efficiently and conveniently.",
    );
    const secondAccordion = page.locator(
      "text=Sched Track allows professionals to create personalized schedules that fit their unique shift patterns and have those schedules saved for reference at a momnets notice.",
    );
    const thirdAccordion = page.locator(
      "text=Sched Track has one job, and it does it perfectly",
    );
    const fourthAccordion = page.locator(
      "text=Sched Track is free, although we do accept donations, the app is kept running out of appreciation for the people who need it.",
    );
    const fifthAccordion = page.locator(
      "text=Yes, Sched Track is designed to work seamlessly on desktop, mobile devices and everything in between.",
    );
    const sixthAccordion = page.locator(
      "text=We regularly update Sched Track to improve performance and add useful features based on user feedback.",
    );
    //first accordion
    await page
      .getByRole("button", {
        name: "What are the benefits of using Sched Track?",
      })
      .click();
    await expect(firstAccordion).toBeVisible();
    //second accordion
    await page
      .getByRole("button", { name: "How does Sched Track work?" })
      .click();
    await expect(firstAccordion).toBeHidden();
    await expect(secondAccordion).toBeVisible();
    //third accordion
    await page
      .getByRole("button", {
        name: "Is this app cluttered with features I won't use?",
      })
      .click();
    await expect(secondAccordion).toBeHidden();
    await expect(thirdAccordion).toBeVisible();
    //fourth accordion
    await page
      .getByRole("button", {
        name: "Does it cost an arm and a leg?",
      })
      .click();
    await expect(thirdAccordion).toBeHidden();
    await expect(fourthAccordion).toBeVisible();
    //fifth accordion
    await page
      .getByRole("button", {
        name: "Can I use Sched Track on any device?",
      })
      .click();
    await expect(fourthAccordion).toBeHidden();
    await expect(fifthAccordion).toBeVisible();
    //sixth accordion
    await page
      .getByRole("button", {
        name: "How often does Sched Track update its features?",
      })
      .click();
    await expect(fifthAccordion).toBeHidden();
    await expect(sixthAccordion).toBeVisible();
    //first accordion to close sixth
    await page
      .getByRole("button", {
        name: "What are the benefits of using Sched Track?",
      })
      .click();
    await expect(firstAccordion).toBeVisible();
    await expect(sixthAccordion).toBeHidden();
    //closing all accordions
    await page
      .getByRole("button", {
        name: "What are the benefits of using Sched Track?",
      })
      .click();
    await expect(firstAccordion).toBeHidden();
  });

  // Working text skipped to stop spam
  test.skip("sign in and account creation", async ({ page }) => {
    const email = process.env.TEST_EMAIL as string;
    await page.getByRole("link", { name: "Sign In" }).click();
    await expect(page).toHaveURL("https://www.schedtrack.com/signin");
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
    const links = await page.locator(`[id="links"]`);
    await page.getByTestId("contactLink").click();
    await expect(page).toHaveURL("https://www.schedtrack.com/contact");
    await expect(links).toBeVisible();
  });

  test("contact page has feedback component", async ({ page }) => {
    await page.goto("https://www.schedtrack.com/contact");
    await expect(
      page.getByPlaceholder("Enter your feedback here."),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
  });

  test("privacy policy page", async ({ page }) => {
    await page.goto("https://www.schedtrack.com/privacy");
    await expect(
      page.getByText("Your privacy is important to us."),
    ).toBeVisible();
  });

  //TODO
  //add credetial log in to allow for deeper testing on the api
});

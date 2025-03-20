import { test, expect } from "@playwright/test";

test.describe("Basic Interactions, designed to show success", () => {
  test.beforeEach(
    async ({ page }) => await page.goto("https://www.schedtrack.com/"),
  );

  test("Correct title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Rotating Schedule Builder for First Responders",
    );
  });

  test("Nav menu links", async ({ page }) => {
    await page.getByTestId("favicon-link").click();
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
      .getByRole("link", { name: "Help Us Keep The Lights On 💡" })
      .click();
    await expect(page).toHaveURL("https://buy.stripe.com/7sIaFa7EQeJzbW8aEG");
  });

  // FAQ section tests
  test("should display the FAQ section", async ({ page }) => {
    // Locators for each accordion answer text
    const firstAccordion = page.locator(
      "text=Sched Track offers numerous benefits for professionals managing complex schedules. It simplifies the process of creating and maintaining rotating schedules, reduces the time spent on manual scheduling, and minimizes errors. With features like custom rotation patterns, easy sharing, and mobile accessibility, Sched Track helps you stay organized, improves work-life balance, and ensures you never miss a shift. It's particularly beneficial for shift workers, healthcare professionals, emergency responders, and anyone with non-standard work hours.",
    );
    const secondAccordion = page.locator(
      "text=Sched Track allows professionals to create personalized schedules that fit their unique shift patterns. You start by inputting your specific rotation (e.g., 2 days on, 3 days off), and Sched Track generates a long-term schedule based on this pattern. You can then view your schedule at any time, make adjustments as needed, and even share it with colleagues or family members. The app saves your schedule for quick reference, allowing you to plan your work and personal life with ease. It also offers features like notifications for upcoming shifts and the ability to export your schedule to other calendar applications.",
    );
    const thirdAccordion = page.locator(
      "text=No, Sched Track is designed with simplicity and efficiency in mind. We focus on providing essential scheduling features without unnecessary complexity. Our philosophy is 'do one thing and do it well.' While we offer a range of useful features like custom rotations, sharing capabilities, and mobile access, each feature is carefully considered to ensure it adds value for our users. We continuously refine our app based on user feedback to maintain its simplicity while meeting the diverse needs of our user base.",
    );
    const fourthAccordion = page.locator(
      "text=Not at all! Sched Track is primarily free to use. We believe in providing value to our users, especially those in critical professions who rely on accurate scheduling. While the core features of Sched Track are free, we do accept donations from users who find the app particularly helpful. These donations help us maintain the service, develop new features, and keep the app running smoothly. We also offer some premium features for a small fee, but these are entirely optional and the free version remains fully functional for most users' needs.",
    );
    const fifthAccordion = page.locator(
      "text=Yes, Sched Track is designed to work seamlessly across a wide range of devices. Our responsive web application works great on desktop computers, laptops, tablets, and smartphones. Whether you're using Windows, macOS, iOS, or Android, you can access Sched Track through your web browser.",
    );
    const sixthAccordion = page.locator(
      "text=We regularly update Sched Track to improve performance and add useful features based on user feedback. Our development team works on a continuous improvement model, releasing minor updates and bug fixes every few weeks. Larger feature updates typically occur every few months. We always announce major updates to our users and provide guidance on how to use new features. Our goal is to keep Sched Track current with the latest technology while maintaining its ease of use. We also encourage our users to provide feedback and suggestions for new features, which helps shape our development roadmap.",
    );

    // First accordion
    await page
      .getByRole("button", {
        name: "What are the benefits of using Sched Track?",
      })
      .click();
    await expect(firstAccordion).toBeVisible();

    // Second accordion
    await page
      .getByRole("button", { name: "How does Sched Track work?" })
      .click();
    await expect(firstAccordion).toBeHidden();
    await expect(secondAccordion).toBeVisible();

    // Third accordion
    await page
      .getByRole("button", {
        name: "Is this app cluttered with features I won't use?",
      })
      .click();
    await expect(secondAccordion).toBeHidden();
    await expect(thirdAccordion).toBeVisible();

    // Fourth accordion
    await page
      .getByRole("button", {
        name: "Does it cost an arm and a leg?",
      })
      .click();
    await expect(thirdAccordion).toBeHidden();
    await expect(fourthAccordion).toBeVisible();

    // Fifth accordion
    await page
      .getByRole("button", {
        name: "Can I use Sched Track on any device?",
      })
      .click();
    await expect(fourthAccordion).toBeHidden();
    await expect(fifthAccordion).toBeVisible();

    // Sixth accordion
    await page
      .getByRole("button", {
        name: "How often does Sched Track update its features?",
      })
      .click();
    await expect(fifthAccordion).toBeHidden();
    await expect(sixthAccordion).toBeVisible();

    // Return to first accordion and verify it closes the sixth one
    await page
      .getByRole("button", {
        name: "What are the benefits of using Sched Track?",
      })
      .click();
    await expect(firstAccordion).toBeVisible();
    await expect(sixthAccordion).toBeHidden();

    // Close all accordions
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

  test("privacy policy page", async ({ page }) => {
    await page.goto("https://www.schedtrack.com/privacy");
    await expect(
      page.getByText("Your privacy is important to us."),
    ).toBeVisible();
  });

  //TODO
  //add credetial log in to allow for deeper testing on the api
});

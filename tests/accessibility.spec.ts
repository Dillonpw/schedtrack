import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("homepage", () => {
  test.skip("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("https://www.schedtrack.com/");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

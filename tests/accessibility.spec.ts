import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("homepage", () => {
  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("https://www.schedtrack.com/");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules([
        "color-contrast",
        "document-title",
        "html-has-lang",
        "landmark-one-main",
        "page-has-heading-one",
        "region",
      ])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

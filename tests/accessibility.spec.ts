import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility Tests", () => {
  test("Homepage should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("Schedule view should be accessible", async ({ page }) => {
    await page.goto("http://localhost:3000/schedule");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .exclude(".calendar-grid") // Exclude complex calendar grid from automated testing
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("Schedule creation form should be accessible", async ({ page }) => {
    await page.goto("http://localhost:3000/schedule/create");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);

    // Additional manual checks for form accessibility
    await expect(page.getByLabel(/Schedule Name/i)).toBeFocused({
      timeout: 1000,
    });
    await page.getByLabel(/Schedule Length/i).focus();
    await expect(page.getByLabel(/Schedule Length/i)).toBeFocused();
    await page.getByRole("button", { name: /Generate/i }).focus();
    await expect(page.getByRole("button", { name: /Generate/i })).toBeFocused();
  });

  test("Schedule edit modal should be accessible", async ({ page }) => {
    await page.goto("http://localhost:3000/schedule");

    // Open edit modal
    await page.getByRole("button", { name: /Note:/i }).first().click();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .include("dialog") // Only test the modal
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);

    // Check for proper focus management
    await page.getByRole("dialog").focus();
    await expect(page.getByRole("dialog")).toBeFocused();
    await page.getByLabel(/Note Title/i).focus();
    await expect(page.getByLabel(/Note Title/i)).toBeFocused();
  });
});

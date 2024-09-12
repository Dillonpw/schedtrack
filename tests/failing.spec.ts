import { test, expect } from "@playwright/test";

test.describe("Basic Interactions, designed to show error handling", () => {
  test.beforeEach(
    async ({ page }) => await page.goto("http://localhost:3000/"),
  );
});

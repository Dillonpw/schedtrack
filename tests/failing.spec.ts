import { test, expect } from "@playwright/test";

test.describe("Basic Interactions, designed to show failure", () => {
  test.beforeEach(
    async ({ page }) => await page.goto("http://localhost:3000/"),
  );
});

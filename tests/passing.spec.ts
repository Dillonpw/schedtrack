import { test, expect } from "@playwright/test";
import type { ScheduleEntry } from "../types";

test.describe("Schedule Application Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Use local development URL
    await page.goto("http://localhost:3000");
  });

  test("Homepage loads correctly", async ({ page }) => {
    await expect(page).toHaveTitle(/Schedule/);
  });

  test("Create new schedule flow", async ({ page }) => {
    // Navigate to schedule creation
    await page.getByRole("link", { name: /create/i }).click();

    // Fill in schedule details
    await page.getByLabel(/Schedule Name/i).fill("Test Schedule");

    // Add segments
    await page.getByRole("button", { name: /Add Segment/i }).click();
    await page.getByLabel(/days/i).fill("2");
    await page.getByLabel(/note/i).fill("Day Shift");

    // Set schedule length
    await page.getByLabel(/Schedule Length/i).fill("7");

    // Generate schedule
    await page.getByRole("button", { name: /Generate/i }).click();

    // Verify schedule was created
    await expect(page.getByText(/Test Schedule/)).toBeVisible();
  });

  test("View and filter schedule", async ({ page }) => {
    // Navigate to schedule view
    await page.goto("http://localhost:3000/schedule");

    // Check calendar view is visible
    await expect(page.getByRole("grid")).toBeVisible();

    // Test schedule filtering
    await page.getByRole("button", { name: /Schedules/i }).click();
    await page.getByLabel(/All Schedules/i).click();

    // Verify filter works
    await expect(page.getByRole("grid")).toBeVisible();
  });

  test("Edit schedule entry", async ({ page }) => {
    await page.goto("http://localhost:3000/schedule");

    // Click on a schedule entry
    await page.getByRole("button", { name: /Note:/i }).first().click();

    // Edit the entry
    await page.getByLabel(/Note Title/i).fill("Updated Note");
    await page.getByRole("button", { name: /Save Changes/i }).click();

    // Verify changes
    await expect(page.getByText(/Updated Note/i)).toBeVisible();
  });

  test("Download schedule data", async ({ page }) => {
    await page.goto("http://localhost:3000/schedule");

    // Click download button
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: /Download/i }).click();
    const download = await downloadPromise;

    // Verify download started
    expect(download.suggestedFilename()).toMatch(/schedule.*\.csv$/);
  });
});

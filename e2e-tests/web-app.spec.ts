import { test, expect } from "@playwright/test";

test.describe("HuiTu Web Application E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("should load home page successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/奥斯本检核表法/);
    await expect(page.locator("h1")).toContainText(/奥斯本检核表法/);
  });

  test("should navigate to analysis page", async ({ page }) => {
    await page.click("text=分析工具");
    await expect(page).toHaveURL(/.*analysis/);
    await expect(page.locator("h1")).toContainText(/奥斯本九问分析/);
  });

  test("should perform complete analysis flow", async ({ page }) => {
    // Navigate to analysis page
    await page.click("text=分析工具");
    
    // Fill analysis form
    await page.fill("input[placeholder*=\"分析主题\"]", "智能手机应用");
    await page.fill("textarea[placeholder*=\"详细描述\"]", "开发一款新的智能手机应用");
    
    // Submit form
    await page.click("button:has-text(\"开始分析\")");
    
    // Wait for analysis to complete
    await expect(page.locator("text=分析完成")).toBeVisible({ timeout: 10000 });
    
    // Verify results are displayed
    await expect(page.locator(".analysis-results")).toBeVisible();
  });

  test("should navigate to case library", async ({ page }) => {
    await page.click("text=案例库");
    await expect(page).toHaveURL(/.*cases/);
    await expect(page.locator("h1")).toContainText(/案例库/);
  });

  test("should navigate to settings", async ({ page }) => {
    await page.click("text=设置");
    await expect(page).toHaveURL(/.*settings/);
    await expect(page.locator("h1")).toContainText(/设置/);
  });
});

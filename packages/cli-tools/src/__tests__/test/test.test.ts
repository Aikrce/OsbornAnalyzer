import { describe, it, expect, vi } from "vitest";
import { runTests } from "../../test/index";

// Mock dependencies
vi.mock("child_process");

describe("Test Module", () => {
  it("should run tests successfully", async () => {
    const mockExecSync = vi.mocked(require("child_process").execSync);
    mockExecSync.mockReturnValue("Tests passed");
    
    const result = await runTests({
      testPath: "./src",
      coverage: true,
    });
    
    expect(result.success).toBe(true);
    expect(result.coverage).toBeDefined();
  });

  it("should handle test failures", async () => {
    const mockExecSync = vi.mocked(require("child_process").execSync);
    mockExecSync.mockImplementation(() => {
      throw new Error("Tests failed");
    });
    
    const result = await runTests({
      testPath: "./src",
      coverage: false,
    });
    
    expect(result.success).toBe(false);
    expect(result.error).toContain("Tests failed");
  });

  it("should run tests with different options", async () => {
    const mockExecSync = vi.mocked(require("child_process").execSync);
    mockExecSync.mockReturnValue("Tests completed");
    
    const result = await runTests({
      testPath: "./tests",
      coverage: true,
      watch: true,
    });
    
    expect(result.success).toBe(true);
    expect(mockExecSync).toHaveBeenCalledWith(
      expect.stringContaining("--coverage"),
      expect.any(Object)
    );
  });
});

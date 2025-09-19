import { describe, it, expect, vi } from "vitest";
import { runTests } from "../../test/index";

// Mock dependencies
vi.mock("child_process");

describe("Test Module", () => {
  it("should run tests successfully", () => {
    const mockExecSync = vi.mocked(require("child_process").execSync);
    mockExecSync.mockReturnValue("Tests passed");
    
    // runTests is a void function, so we just test it doesn't throw
    expect(() => runTests()).not.toThrow();
  });

  it("should handle test failures", () => {
    const mockExecSync = vi.mocked(require("child_process").execSync);
    mockExecSync.mockImplementation(() => {
      throw new Error("Tests failed");
    });
    
    // Should exit with code 1 on error
    const mockExit = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit called');
    });
    
    expect(() => runTests()).toThrow('process.exit called');
    expect(mockExit).toHaveBeenCalledWith(1);
    
    mockExit.mockRestore();
  });

  it("should execute test commands", () => {
    const mockExecSync = vi.mocked(require("child_process").execSync);
    mockExecSync.mockReturnValue("Tests completed");
    
    runTests();
    
    expect(mockExecSync).toHaveBeenCalledWith(
      'pnpm --filter "@huitu/shared" run test',
      { stdio: 'inherit' }
    );
  });
});

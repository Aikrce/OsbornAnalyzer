import { describe, it, expect, vi } from "vitest";
import { deployProject } from "../../deploy/index";

// Mock dependencies
vi.mock("fs");
vi.mock("child_process");

describe("Deploy Module", () => {
  it("should deploy project successfully", () => {
    const mockExecSync = vi.mocked(require("child_process").execSync);
    mockExecSync.mockReturnValue("Deployment successful");
    
    // deployProject is a void function, so we just test it doesn't throw
    expect(() => deployProject()).not.toThrow();
  });

  it("should handle deployment errors", () => {
    const mockExecSync = vi.mocked(require("child_process").execSync);
    mockExecSync.mockImplementation(() => {
      throw new Error("Deployment failed");
    });
    
    // Should exit with code 1 on error
    const mockExit = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit called');
    });
    
    expect(() => deployProject()).toThrow('process.exit called');
    expect(mockExit).toHaveBeenCalledWith(1);
    
    mockExit.mockRestore();
  });

  it("should execute deploy commands", () => {
    const mockExecSync = vi.mocked(require("child_process").execSync);
    mockExecSync.mockReturnValue("Deployment successful");
    
    deployProject();
    
    expect(mockExecSync).toHaveBeenCalledWith(
      'pnpm --filter "@huitu/web" run dev',
      { stdio: 'inherit' }
    );
  });
});

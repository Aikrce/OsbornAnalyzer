import { describe, it, expect, vi } from "vitest";
import { analyzeTopic } from "../../services/analysis-service";

// Mock the shared package
vi.mock("@huitu/shared", () => ({
  osbornAnalyzer: {
    analyze: vi.fn().mockResolvedValue({
      id: "test-id",
      topic: "Test Topic",
      results: [
        {
          category: "用途",
          suggestions: ["新用途1", "新用途2"],
        },
      ],
      createdAt: new Date().toISOString(),
    }),
  },
}));

describe("Analysis Service", () => {
  it("should analyze topic successfully", async () => {
    const result = await analyzeTopic("Test Topic", "Test Description");
    
    expect(result).toBeDefined();
    expect(result.id).toBe("test-id");
    expect(result.topic).toBe("Test Topic");
    expect(result.results).toHaveLength(1);
  });

  it("should handle analysis errors", async () => {
    // Mock error
    vi.mocked(require("@huitu/shared").osbornAnalyzer.analyze).mockRejectedValueOnce(
      new Error("Analysis failed")
    );
    
    await expect(analyzeTopic("Test Topic", "Test Description")).rejects.toThrow("Analysis failed");
  });

  it("should validate input parameters", async () => {
    await expect(analyzeTopic("", "Description")).rejects.toThrow();
    await expect(analyzeTopic("Topic", "")).rejects.toThrow();
  });
});

import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAnalysis } from "../../hooks/use-analysis";

// Mock the analysis service
vi.mock("../services/analysis-service", () => ({
  analyzeTopic: vi.fn().mockResolvedValue({
    id: "test-id",
    topic: "Test Topic",
    results: [],
    createdAt: new Date().toISOString(),
  }),
}));

describe("useAnalysis Hook", () => {
  it("should initialize with default state", () => {
    const { result } = renderHook(() => useAnalysis());
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.analysis).toBeNull();
  });

  it("should handle analysis start", async () => {
    const { result } = renderHook(() => useAnalysis());
    
    act(() => {
      result.current.startAnalysis("Test Topic", "Test Description");
    });
    
    expect(result.current.isLoading).toBe(true);
  });

  it("should handle analysis success", async () => {
    const { result } = renderHook(() => useAnalysis());
    
    await act(async () => {
      await result.current.startAnalysis("Test Topic", "Test Description");
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.analysis).toBeDefined();
    expect(result.current.error).toBeNull();
  });

  it("should handle analysis error", async () => {
    const { result } = renderHook(() => useAnalysis());
    
    // Mock error
    vi.mocked(require("../../services/analysis-service").analyzeTopic).mockRejectedValueOnce(
      new Error("Analysis failed")
    );
    
    await act(async () => {
      await result.current.startAnalysis("Test Topic", "Test Description");
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe("Analysis failed");
    expect(result.current.analysis).toBeNull();
  });
});

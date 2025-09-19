import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useAnalysis from "../../hooks/useAnalysis";

// Mock the shared analysis function
vi.mock("@huitu/shared", () => ({
  performOsbornAnalysis: vi.fn().mockResolvedValue({
    id: "test-id",
    title: "Test Topic",
    description: "Test Description",
    summary: "Test Summary",
    questions: {},
    answers: {},
    totalScore: 85,
    quality: "high" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    timestamp: new Date(),
    question: "Test Question",
    analysis: "Test Analysis",
  }),
}));

describe("useAnalysis Hook", () => {
  it("should initialize with default state", () => {
    const { result } = renderHook(() => useAnalysis());
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.results).toEqual([]);
  });

  it("should handle analysis start", async () => {
    const { result } = renderHook(() => useAnalysis());
    
    act(() => {
      result.current.analyze("Test Topic");
    });
    
    expect(result.current.isLoading).toBe(true);
  });

  it("should handle analysis success", async () => {
    const { result } = renderHook(() => useAnalysis());
    
    await act(async () => {
      await result.current.analyze("Test Topic");
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.results).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it("should handle analysis error", async () => {
    const { result } = renderHook(() => useAnalysis());
    
    // Mock error
    vi.mocked(require("@huitu/shared").performOsbornAnalysis).mockRejectedValueOnce(
      new Error("Analysis failed")
    );
    
    await act(async () => {
      await result.current.analyze("Test Topic");
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe("Analysis failed");
    expect(result.current.results).toEqual([]);
  });

  it("should clear results", () => {
    const { result } = renderHook(() => useAnalysis());
    
    act(() => {
      result.current.clearResults();
    });
    
    expect(result.current.results).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});

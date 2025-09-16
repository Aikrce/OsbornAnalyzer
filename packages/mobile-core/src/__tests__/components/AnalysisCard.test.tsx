import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react-native";
import { AnalysisCard } from "../../components/AnalysisCard";

describe("AnalysisCard Component", () => {
  it("should render analysis card with title", () => {
    const mockAnalysis = {
      id: "test-id",
      topic: "Test Topic",
      results: [],
      createdAt: new Date().toISOString(),
    };
    
    const { getByText } = render(
      <AnalysisCard analysis={mockAnalysis} />
    );
    
    expect(getByText("Test Topic")).toBeTruthy();
  });

  it("should render analysis results", () => {
    const mockAnalysis = {
      id: "test-id",
      topic: "Test Topic",
      results: [
        {
          category: "用途",
          suggestions: ["新用途1", "新用途2"],
        },
      ],
      createdAt: new Date().toISOString(),
    };
    
    const { getByText } = render(
      <AnalysisCard analysis={mockAnalysis} />
    );
    
    expect(getByText("用途")).toBeTruthy();
    expect(getByText("新用途1")).toBeTruthy();
  });

  it("should handle empty results", () => {
    const mockAnalysis = {
      id: "test-id",
      topic: "Test Topic",
      results: [],
      createdAt: new Date().toISOString(),
    };
    
    const { getByText } = render(
      <AnalysisCard analysis={mockAnalysis} />
    );
    
    expect(getByText("Test Topic")).toBeTruthy();
  });
});

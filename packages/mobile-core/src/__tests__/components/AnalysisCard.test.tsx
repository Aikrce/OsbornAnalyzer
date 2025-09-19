import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react-native";
import AnalysisCard from "../../components/AnalysisCard";

describe("AnalysisCard Component", () => {
  it("should render analysis card with title", () => {
    const mockAnalysis = {
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
    };
    
    const { getByText } = render(
      <AnalysisCard result={mockAnalysis} />
    );
    
    expect(getByText("Test Topic")).toBeTruthy();
  });

  it("should render analysis results", () => {
    const mockAnalysis = {
      id: "test-id",
      title: "Test Topic",
      description: "Test Description",
      summary: "Test Summary",
      questions: {
        "用途": ["新用途1", "新用途2"]
      },
      answers: {},
      totalScore: 85,
      quality: "high" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      timestamp: new Date(),
      question: "Test Question",
      analysis: "Test Analysis",
    };
    
    const { getByText } = render(
      <AnalysisCard result={mockAnalysis} />
    );
    
    expect(getByText("Test Topic")).toBeTruthy();
    expect(getByText("新用途1")).toBeTruthy();
  });

  it("should handle empty results", () => {
    const mockAnalysis = {
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
    };
    
    const { getByText } = render(
      <AnalysisCard result={mockAnalysis} />
    );
    
    expect(getByText("Test Topic")).toBeTruthy();
  });
});

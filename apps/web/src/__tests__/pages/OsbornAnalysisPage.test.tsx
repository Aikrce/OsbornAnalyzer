import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OsbornAnalysisPage from "../../pages/OsbornAnalysisPage";

const renderWithRouter = (component: React.ReactElement, initialEntries = ['/analysis']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {component}
    </MemoryRouter>
  );
};

describe("OsbornAnalysisPage Integration", () => {
  it("should render analysis page with topic parameter", () => {
    renderWithRouter(<OsbornAnalysisPage />, ['/analysis?topic=测试主题']);
    
    // 当有topic参数时，应该显示加载状态
    expect(screen.getByText(/正在分析中，请稍候/i)).toBeInTheDocument();
  });

  it("should render empty state without topic parameter", () => {
    renderWithRouter(<OsbornAnalysisPage />);
    
    // 当没有topic参数时，应该显示空状态
    expect(screen.getByText(/暂无分析结果/i)).toBeInTheDocument();
    expect(screen.getByText(/返回首页/i)).toBeInTheDocument();
  });

  it("should handle back navigation", () => {
    renderWithRouter(<OsbornAnalysisPage />);
    
    const backButton = screen.getByText(/返回首页/i);
    expect(backButton).toBeInTheDocument();
    
    fireEvent.click(backButton);
    // 这里可以添加导航验证
  });
});

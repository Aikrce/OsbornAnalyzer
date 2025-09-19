import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../../pages/HomePage";

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
};

describe("HomePage Integration", () => {
  it("should render home page with main elements", () => {
    renderWithRouter(<HomePage />);
    
    expect(screen.getByText(/奥斯本创新九问/i)).toBeInTheDocument();
    expect(screen.getAllByText(/奥斯本检核表法/i)).toHaveLength(2);
  });

  it("should display main action buttons", () => {
    renderWithRouter(<HomePage />);
    
    const startButton = screen.getByRole("button", { name: /开始本地分析/i });
    expect(startButton).toBeInTheDocument();
  });

  it("should have input field for analysis topic", () => {
    renderWithRouter(<HomePage />);
    
    const input = screen.getByPlaceholderText(/请输入要分析的主题/i);
    expect(input).toBeInTheDocument();
  });
});

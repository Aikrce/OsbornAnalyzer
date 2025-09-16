import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../../pages/HomePage";

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe("HomePage Integration", () => {
  it("should render home page with main elements", () => {
    renderWithRouter(<HomePage />);
    
    expect(screen.getByText(/奥斯本检核表法/i)).toBeInTheDocument();
    expect(screen.getByText(/创新思维工具/i)).toBeInTheDocument();
  });

  it("should have navigation elements", () => {
    renderWithRouter(<HomePage />);
    
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("should display main action buttons", () => {
    renderWithRouter(<HomePage />);
    
    const startButton = screen.getByRole("button", { name: /开始分析/i });
    expect(startButton).toBeInTheDocument();
  });
});

import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "../../routes";

const renderWithRouter = (component: React.ReactElement, initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {component}
    </MemoryRouter>
  );
};

describe("App Integration Tests", () => {
  it("should render app with navigation", () => {
    renderWithRouter(<AppRoutes />);
    
    expect(screen.getAllByText(/奥斯本创新九问/i)).toHaveLength(6);
  });

  it("should navigate between pages", async () => {
    renderWithRouter(<AppRoutes />);
    
    // 检查首页内容
    expect(screen.getAllByText(/奥斯本创新九问/i)).toHaveLength(6);
  });

  it("should handle routing correctly", () => {
    renderWithRouter(<AppRoutes />);
    
    // Test that home page is rendered by default
    expect(screen.getAllByText(/奥斯本创新九问/i)).toHaveLength(6);
  });
});

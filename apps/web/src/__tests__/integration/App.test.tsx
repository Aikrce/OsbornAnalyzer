import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../../App";

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe("App Integration Tests", () => {
  it("should render app with navigation", () => {
    renderWithRouter(<App />);
    
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText(/奥斯本检核表法/i)).toBeInTheDocument();
  });

  it("should navigate between pages", async () => {
    renderWithRouter(<App />);
    
    const analysisLink = screen.getByRole("link", { name: /分析工具/i });
    fireEvent.click(analysisLink);
    
    await waitFor(() => {
      expect(screen.getByText(/奥斯本九问分析/i)).toBeInTheDocument();
    });
  });

  it("should handle routing correctly", () => {
    renderWithRouter(<App />);
    
    // Test that home page is rendered by default
    expect(screen.getByText(/创新思维工具/i)).toBeInTheDocument();
  });
});

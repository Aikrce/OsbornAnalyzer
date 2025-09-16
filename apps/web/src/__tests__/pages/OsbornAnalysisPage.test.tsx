import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import OsbornAnalysisPage from "../../pages/OsbornAnalysisPage";

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe("OsbornAnalysisPage Integration", () => {
  it("should render analysis page with form", () => {
    renderWithRouter(<OsbornAnalysisPage />);
    
    expect(screen.getByLabelText(/分析主题/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/详细描述/i)).toBeInTheDocument();
  });

  it("should handle form submission", async () => {
    renderWithRouter(<OsbornAnalysisPage />);
    
    const topicInput = screen.getByLabelText(/分析主题/i);
    const descriptionInput = screen.getByLabelText(/详细描述/i);
    const submitButton = screen.getByRole("button", { name: /开始分析/i });
    
    fireEvent.change(topicInput, { target: { value: "测试主题" } });
    fireEvent.change(descriptionInput, { target: { value: "测试描述" } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/分析中/i)).toBeInTheDocument();
    });
  });

  it("should validate required fields", () => {
    renderWithRouter(<OsbornAnalysisPage />);
    
    const submitButton = screen.getByRole("button", { name: /开始分析/i });
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/请输入分析主题/i)).toBeInTheDocument();
  });
});

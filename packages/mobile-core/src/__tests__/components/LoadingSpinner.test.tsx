import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react-native";
import LoadingSpinner from "../../components/LoadingSpinner";

describe("LoadingSpinner Component", () => {
  it("should render loading spinner", () => {
    const { getByTestId } = render(<LoadingSpinner />);
    expect(getByTestId("loading-spinner")).toBeTruthy();
  });

  it("should render with custom message", () => {
    const { getByText } = render(
      <LoadingSpinner message="Loading analysis..." />
    );
    expect(getByText("Loading analysis...")).toBeTruthy();
  });

  it("should render with default message", () => {
    const { getByText } = render(<LoadingSpinner />);
    expect(getByText("加载中...")).toBeTruthy();
  });
});

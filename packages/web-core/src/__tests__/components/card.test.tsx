import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../components/ui/card";

describe("Card Components", () => {
  it("should render Card with content", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card content</p>
        </CardContent>
        <CardFooter>
          <p>Card footer</p>
        </CardFooter>
      </Card>
    );
    
    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.getByText("Card content")).toBeInTheDocument();
    expect(screen.getByText("Card footer")).toBeInTheDocument();
  });

  it("should render CardHeader with title", () => {
    render(
      <CardHeader>
        <CardTitle>Header Title</CardTitle>
      </CardHeader>
    );
    
    expect(screen.getByText("Header Title")).toBeInTheDocument();
  });

  it("should render CardContent", () => {
    render(
      <CardContent>
        <p>Content text</p>
      </CardContent>
    );
    
    expect(screen.getByText("Content text")).toBeInTheDocument();
  });
});

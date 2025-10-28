import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card Component", () => {
  it("should render children correctly", () => {
    render(
      <Card>
        <p>Test content</p>
      </Card>,
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("should render title when provided", () => {
    render(
      <Card title="Test Title">
        <p>Content</p>
      </Card>,
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should not render title when not provided", () => {
    render(
      <Card>
        <p>Content</p>
      </Card>,
    );

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("should apply correct CSS classes", () => {
    const { container } = render(
      <Card title="Test">
        <p>Content</p>
      </Card>,
    );

    const cardDiv = container.querySelector(".bg-white");
    expect(cardDiv).toBeInTheDocument();
    expect(cardDiv).toHaveClass("rounded-lg", "shadow", "p-4");
  });
});

import { describe, it, expect } from "vitest";
import { Skeleton } from "./Skeleton";
import { render } from "@testing-library/react";

describe("Skeleton", () => {
  it("renders 4 skeleton cards", () => {
    const { container } = render(<Skeleton />);

    const cards = container.querySelectorAll(".grid > div");
    expect(cards).toHaveLength(4);
  });

  it("renders with correct grid layout", () => {
    const { container } = render(<Skeleton />);

    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toHaveClass("grid-cols-2", "gap-4");
  });

  it("renders skeleton elements with animate-pulse class", () => {
    const { container } = render(<Skeleton />);

    const animatedElements = container.querySelectorAll(".animate-pulse");
    expect(animatedElements).toHaveLength(4);
  });

  it("renders skeleton placeholders with correct structure", () => {
    const { container } = render(<Skeleton />);

    const skeletonContainers = container.querySelectorAll(".animate-pulse");

    skeletonContainers.forEach((skeleton) => {
      const placeholders = skeleton.querySelectorAll("div");
      expect(placeholders).toHaveLength(4);
      expect(placeholders[0]).toHaveClass("h-6", "bg-gray-300", "rounded", "w-full");
      expect(placeholders[1]).toHaveClass("h-4", "bg-gray-300", "rounded", "w-full");
    });
  });
});

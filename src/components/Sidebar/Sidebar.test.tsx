import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "../../tests/test-utils";
import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
  it("renders all menu items", () => {
    render(<Sidebar open={true} onClose={vi.fn()} />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("List")).toBeInTheDocument();
  });

  it("renders Dashboard link with correct href", () => {
    render(<Sidebar open={true} onClose={vi.fn()} />);

    const dashboardLink = screen.getByRole("link", { name: "Dashboard" });
    expect(dashboardLink).toHaveAttribute("href", "/");
  });

  it("renders Filmes link with correct href", () => {
    render(<Sidebar open={true} onClose={vi.fn()} />);

    const filmesLink = screen.getByRole("link", { name: "List" });
    expect(filmesLink).toHaveAttribute("href", "/movies");
  });

  it("applies correct class when sidebar is open", () => {
    const { container } = render(<Sidebar open={true} onClose={vi.fn()} />);

    const sidebar = container.querySelector("aside");
    expect(sidebar).toHaveClass("translate-x-0");
  });

  it("applies correct class when sidebar is closed", () => {
    const { container } = render(<Sidebar open={false} onClose={vi.fn()} />);

    const sidebar = container.querySelector("aside");
    expect(sidebar).toHaveClass("-translate-x-full");
  });

  it("renders backdrop when sidebar is open", () => {
    const { container } = render(<Sidebar open={true} onClose={vi.fn()} />);

    const backdrop = container.querySelector(".fixed.inset-0.bg-black\\/50");
    expect(backdrop).toBeInTheDocument();
  });

  it("does not render backdrop when sidebar is closed", () => {
    const { container } = render(<Sidebar open={false} onClose={vi.fn()} />);

    const backdrop = container.querySelector(".fixed.inset-0.bg-black\\/50");
    expect(backdrop).not.toBeInTheDocument();
  });

  it("calls onClose when backdrop is clicked", () => {
    const onCloseMock = vi.fn();
    const { container } = render(<Sidebar open={true} onClose={onCloseMock} />);

    const backdrop = container.querySelector(".fixed.inset-0.bg-black\\/50");
    if (backdrop) {
      fireEvent.click(backdrop);
    }

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when a menu item is clicked", () => {
    const onCloseMock = vi.fn();
    render(<Sidebar open={true} onClose={onCloseMock} />);

    const dashboardLink = screen.getByRole("link", { name: "Dashboard" });
    fireEvent.click(dashboardLink);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("calls onClose for each menu item clicked", () => {
    const onCloseMock = vi.fn();
    render(<Sidebar open={true} onClose={onCloseMock} />);

    const dashboardLink = screen.getByRole("link", { name: "Dashboard" });
    const filmesLink = screen.getByRole("link", { name: "List" });

    fireEvent.click(dashboardLink);
    fireEvent.click(filmesLink);

    expect(onCloseMock).toHaveBeenCalledTimes(2);
  });

  it("applies hover styles to menu items", () => {
    render(<Sidebar open={true} onClose={vi.fn()} />);

    const dashboardLink = screen.getByRole("link", { name: "Dashboard" });
    expect(dashboardLink).toHaveClass("hover:bg-gray-100");
  });
});

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "../tests/test-utils";
import { Template } from "./Template";

vi.mock("../components/Header/Header", () => ({
  Header: ({ onMenuClick }: { onMenuClick: () => void }) => (
    <header data-testid="header">
      <button onClick={onMenuClick}>Menu</button>
    </header>
  ),
}));

vi.mock("../components/Sidebar/Sidebar", () => ({
  Sidebar: ({ open, onClose }: { open: boolean; onClose: () => void }) => (
    <aside data-testid="sidebar" data-open={open}>
      <button onClick={onClose}>Close</button>
    </aside>
  ),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet">Outlet Content</div>,
  };
});

describe("Template", () => {
  it("renders the template with Header, Sidebar and Outlet", () => {
    render(<Template />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
  });

  it("renders with sidebar closed by default", () => {
    render(<Template />);

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toHaveAttribute("data-open", "false");
  });

  it("opens sidebar when menu button is clicked", () => {
    render(<Template />);

    const menuButton = screen.getByText("Menu");
    const sidebar = screen.getByTestId("sidebar");

    expect(sidebar).toHaveAttribute("data-open", "false");

    fireEvent.click(menuButton);

    expect(sidebar).toHaveAttribute("data-open", "true");
  });

  it("closes sidebar when close button is clicked", () => {
    render(<Template />);

    const menuButton = screen.getByText("Menu");
    const closeButton = screen.getByText("Close");
    const sidebar = screen.getByTestId("sidebar");

    fireEvent.click(menuButton);
    expect(sidebar).toHaveAttribute("data-open", "true");

    fireEvent.click(closeButton);
    expect(sidebar).toHaveAttribute("data-open", "false");
  });

  it("toggles sidebar state correctly multiple times", () => {
    render(<Template />);

    const menuButton = screen.getByText("Menu");
    const closeButton = screen.getByText("Close");
    const sidebar = screen.getByTestId("sidebar");

    expect(sidebar).toHaveAttribute("data-open", "false");

    fireEvent.click(menuButton);
    expect(sidebar).toHaveAttribute("data-open", "true");

    fireEvent.click(closeButton);
    expect(sidebar).toHaveAttribute("data-open", "false");

    fireEvent.click(menuButton);
    expect(sidebar).toHaveAttribute("data-open", "true");
  });

  it("renders main content area with correct classes", () => {
    const { container } = render(<Template />);

    const mainElement = container.querySelector("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass("flex-1", "overflow-y-auto", "bg-gray-50", "p-4", "w-full");
  });

  it("renders the root container with correct layout classes", () => {
    const { container } = render(<Template />);

    const rootDiv = container.querySelector(".flex.flex-col.h-screen");
    expect(rootDiv).toBeInTheDocument();
    expect(rootDiv).toHaveClass("flex", "flex-col", "h-screen", "w-full", "overflow-hidden");
  });

  it("renders the content wrapper with correct flex classes", () => {
    const { container } = render(<Template />);

    const contentWrapper = container.querySelector(".flex.flex-1.overflow-hidden");
    expect(contentWrapper).toBeInTheDocument();
    expect(contentWrapper).toHaveClass("flex", "flex-1", "overflow-hidden", "w-full");
  });
});

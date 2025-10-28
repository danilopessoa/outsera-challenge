import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "../../tests/test-utils";
import { Header } from "./Header";

describe("Header", () => {
  it("renders the header with the correct title", () => {
    render(<Header onMenuClick={vi.fn()} />);
    expect(screen.getByText("Outsera App Challenge")).toBeInTheDocument();
  });

  it("renders the menu button and triggers onMenuClick when clicked", () => {
    const onMenuClickMock = vi.fn();
    render(<Header onMenuClick={onMenuClickMock} />);
    const menuButton = screen.getByRole("button");
    fireEvent.click(menuButton);
    expect(onMenuClickMock).toHaveBeenCalledTimes(1);
  });

  it("renders the Clapperboard icon with the correct link", () => {
    render(<Header onMenuClick={vi.fn()} />);
    const clapperboardLink = screen.getByRole("link");
    expect(clapperboardLink).toHaveAttribute("href", "/");
  });

  it("renders the menu button with appropriate mobile class", () => {
    render(<Header onMenuClick={vi.fn()} />);
    const menuButton = screen.getByRole("button");
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveClass("md:hidden");
  });
});

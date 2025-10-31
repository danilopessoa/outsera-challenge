import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../../../tests/test-utils";
import userEvent from "@testing-library/user-event";
import { WinnersByYears } from "./WinnersByYear";

const mockResult = [{ id: 1, year: 2000, title: "Movie A" }];

describe("WinnersByYears component", () => {
  it("renders title, input and button", () => {
    const mockFn = vi.fn();
    render(<WinnersByYears getListMoviesWinnersByYear={mockFn} />);

    expect(screen.getByText("List movie winners by year")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Filter by year")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /filter by year/i })).toBeInTheDocument();
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("fetches and displays winners when searching a year", async () => {
    const mockFn = vi.fn().mockResolvedValue(mockResult);
    render(<WinnersByYears getListMoviesWinnersByYear={mockFn} />);

    const input = screen.getByPlaceholderText("Filter by year");
    await userEvent.type(input, "2000");

    const button = screen.getByRole("button", { name: /filter by year/i });
    await userEvent.click(button);

    expect(await screen.findByText("Movie A")).toBeInTheDocument();
    expect(mockFn).toHaveBeenCalledWith(2000);
  });

  it("shows empty state when no results", async () => {
    const mockFn = vi.fn().mockResolvedValue([]);
    render(<WinnersByYears getListMoviesWinnersByYear={mockFn} />);

    const input = screen.getByPlaceholderText("Filter by year");
    await userEvent.type(input, "1999");

    const button = screen.getByRole("button", { name: /filter by year/i });
    await userEvent.click(button);

    expect(await screen.findByText("No data found.")).toBeInTheDocument();
  });
});

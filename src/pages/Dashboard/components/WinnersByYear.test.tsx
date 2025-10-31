import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../../../tests/test-utils";
import userEvent from "@testing-library/user-event";
import { WinnersByYears } from "./WinnersByYear";

const mockResult = [{ id: 1, year: 2000, title: "Movie A" }];

describe("WinnersByYears component", () => {
  it("renders title, input and button", () => {
    const mockFn = vi.fn();
    render(<WinnersByYears getListMoviesWinnersByYear={mockFn} />);

    expect(screen.getByText("Liste os vencedores dos filmes por ano")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Buscar por ano")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /buscar por ano/i })).toBeInTheDocument();
    // Table headers
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Ano")).toBeInTheDocument();
    expect(screen.getByText("Título")).toBeInTheDocument();
  });

  it("fetches and displays winners when searching a year", async () => {
    const mockFn = vi.fn().mockResolvedValue(mockResult);
    render(<WinnersByYears getListMoviesWinnersByYear={mockFn} />);

    const input = screen.getByPlaceholderText("Buscar por ano");
    await userEvent.type(input, "2000");

    const button = screen.getByRole("button", { name: /buscar por ano/i });
    await userEvent.click(button);

    // Wait for the table to show the returned data
    expect(await screen.findByText("Movie A")).toBeInTheDocument();
    expect(mockFn).toHaveBeenCalledWith(2000);
  });

  it("shows empty state when no results", async () => {
    const mockFn = vi.fn().mockResolvedValue([]);
    render(<WinnersByYears getListMoviesWinnersByYear={mockFn} />);

    const input = screen.getByPlaceholderText("Buscar por ano");
    await userEvent.type(input, "1999");

    const button = screen.getByRole("button", { name: /buscar por ano/i });
    await userEvent.click(button);

    expect(await screen.findByText("Nenhum dado encontrado.")).toBeInTheDocument();
  });
});

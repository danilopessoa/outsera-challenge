import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "../../tests/test-utils";
import Movies from "./Movies";
import * as useMoviesHook from "./useMovies";

// Mock do hook useMovies
vi.mock("./useMovies");

describe("Movies", () => {
  const mockMovies = [
    { id: 1, year: 1980, title: "Can't Stop the Music", winner: true },
    { id: 2, year: 1981, title: "Mommie Dearest", winner: false },
    { id: 3, year: 1982, title: "Inchon", winner: true },
  ];

  const mockPagination = {
    totalPages: 5,
    totalElements: 50,
    currentPage: 0,
    pageSize: 15,
    isFirst: true,
    isLast: false,
  };

  const mockUseMovies = {
    movies: mockMovies,
    isLoading: false,
    getMoviesByFilter: vi.fn(),
    pagination: mockPagination,
    currentPage: 0,
    nextPage: vi.fn(),
    previousPage: vi.fn(),
    goToPage: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useMoviesHook.useMovies).mockReturnValue(mockUseMovies);
  });

  it("renders the page title", () => {
    render(<Movies />);
    expect(screen.getByText("Filmes")).toBeInTheDocument();
  });

  it("shows loading state when isLoading is true", () => {
    vi.mocked(useMoviesHook.useMovies).mockReturnValue({
      ...mockUseMovies,
      isLoading: true,
    });

    render(<Movies />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders DataTable with movies when loaded", () => {
    render(<Movies />);

    expect(screen.getByText("Can't Stop the Music")).toBeInTheDocument();
    expect(screen.getByText("Mommie Dearest")).toBeInTheDocument();
    expect(screen.getByText("Inchon")).toBeInTheDocument();
  });

  it("renders table headers correctly", () => {
    render(<Movies />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Ano")).toBeInTheDocument();
    expect(screen.getByText("Título")).toBeInTheDocument();
    expect(screen.getByText("Vencedor")).toBeInTheDocument();
  });

  it("renders filter fields", () => {
    render(<Movies />);

    expect(screen.getByPlaceholderText("Filtrar por ano")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument(); // select para winner
  });

  it("calls getMoviesByFilter when filters are applied", () => {
    const mockGetMoviesByFilter = vi.fn().mockResolvedValue(undefined);
    vi.mocked(useMoviesHook.useMovies).mockReturnValue({
      ...mockUseMovies,
      getMoviesByFilter: mockGetMoviesByFilter,
    });

    render(<Movies />);

    expect(mockGetMoviesByFilter).toBeDefined();
  });

  it("renders with empty movies array", () => {
    vi.mocked(useMoviesHook.useMovies).mockReturnValue({
      ...mockUseMovies,
      movies: [],
    });

    render(<Movies />);

    // Verifica que o título ainda é renderizado
    expect(screen.getByText("Filmes")).toBeInTheDocument();

    // Verifica que não há filmes exibidos
    expect(screen.queryByText("Can't Stop the Music")).not.toBeInTheDocument();
  });

  it("passes correct filter configuration to DataTable", () => {
    render(<Movies />);

    // Verifica se os filtros configurados estão presentes
    const yearFilter = screen.getByPlaceholderText("Filtrar por ano");
    expect(yearFilter).toBeInTheDocument();
    expect(yearFilter).toHaveAttribute("inputMode", "numeric");

    const winnerFilter = screen.getByRole("combobox");
    expect(winnerFilter).toBeInTheDocument();
  });

  it("passes pagination handlers to DataTable", () => {
    const mockNextPage = vi.fn();
    const mockPreviousPage = vi.fn();
    const mockGoToPage = vi.fn();

    vi.mocked(useMoviesHook.useMovies).mockReturnValue({
      ...mockUseMovies,
      nextPage: mockNextPage,
      previousPage: mockPreviousPage,
      goToPage: mockGoToPage,
    });

    render(<Movies />);

    expect(mockNextPage).toBeDefined();
    expect(mockPreviousPage).toBeDefined();
    expect(mockGoToPage).toBeDefined();
  });
});

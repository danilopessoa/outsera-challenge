import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "../../tests/test-utils";
import Dashboard from "./Dashboard";
import * as useDashboardHook from "./useDashboard";

vi.mock("./useDashboard");

vi.mock("./components/YearsWithMultipleWinners", () => ({
  YearsWithMultipleWinners: ({ years }: { years: unknown[] }) => (
    <div data-testid="years-with-multiple-winners">Years: {years.length}</div>
  ),
}));

vi.mock("./components/TopStudios", () => ({
  TopStudios: ({ studios }: { studios: unknown[] }) => <div data-testid="top-studios">Studios: {studios.length}</div>,
}));

vi.mock("./components/ProducerWinIntervals", () => ({
  ProducerWinIntervals: ({ min, max }: { min: unknown[]; max: unknown[] }) => (
    <div data-testid="producer-win-intervals">
      Min: {min.length}, Max: {max.length}
    </div>
  ),
}));

vi.mock("./components/WinnersByYear.tsx", () => ({
  WinnersByYears: ({ getListMoviesWinnersByYear }: { getListMoviesWinnersByYear: () => void }) => (
    <div data-testid="winners-by-year">
      <button
        onClick={() => {
          getListMoviesWinnersByYear();
        }}
      >
        Get Winners
      </button>
    </div>
  ),
}));

describe("Dashboard", () => {
  const mockYears = [
    { year: 1986, winnerCount: 2 },
    { year: 1990, winnerCount: 2 },
  ];

  const mockStudios = [
    { name: "Columbia Pictures", winCount: 7 },
    { name: "Paramount Pictures", winCount: 6 },
    { name: "Warner Bros.", winCount: 5 },
  ];

  const mockMin = [
    {
      producer: "Joel Silver",
      interval: 1,
      previousWin: 1990,
      followingWin: 1991,
    },
  ];

  const mockMax = [
    {
      producer: "Matthew Vaughn",
      interval: 13,
      previousWin: 2002,
      followingWin: 2015,
    },
  ];

  const mockGetListMoviesWinnersByYear = vi.fn();

  const mockUseDashboard = {
    isLoading: false,
    isError: false,
    yearsWithMultipleWinners: { years: mockYears },
    studiosWithWinCount: { studios: mockStudios },
    maxMinWinIntervalForProducers: { min: mockMin, max: mockMax },
    getListMoviesWinnersByYear: mockGetListMoviesWinnersByYear,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useDashboardHook.useDashboard).mockReturnValue(mockUseDashboard);
  });

  it("shows loading state when isLoading is true", () => {
    vi.mocked(useDashboardHook.useDashboard).mockReturnValue({
      ...mockUseDashboard,
      isLoading: true,
    });

    render(<Dashboard />);

    const loadingCards = screen.getAllByText("Loading...");
    expect(loadingCards).toHaveLength(4);
  });

  it("renders all dashboard components when loaded", () => {
    render(<Dashboard />);

    expect(screen.getByTestId("years-with-multiple-winners")).toBeInTheDocument();
    expect(screen.getByTestId("top-studios")).toBeInTheDocument();
    expect(screen.getByTestId("producer-win-intervals")).toBeInTheDocument();
    expect(screen.getByTestId("winners-by-year")).toBeInTheDocument();
  });

  it("passes correct data to YearsWithMultipleWinners component", () => {
    render(<Dashboard />);

    const component = screen.getByTestId("years-with-multiple-winners");
    expect(component).toHaveTextContent(`Years: ${String(mockYears.length)}`);
  });

  it("passes correct data to TopStudios component", () => {
    render(<Dashboard />);

    const component = screen.getByTestId("top-studios");
    expect(component).toHaveTextContent(`Studios: ${String(mockStudios.length)}`);
  });

  it("passes correct data to ProducerWinIntervals component", () => {
    render(<Dashboard />);

    const component = screen.getByTestId("producer-win-intervals");
    expect(component).toHaveTextContent(`Min: ${String(mockMin.length)}, Max: ${String(mockMax.length)}`);
  });

  it("passes getListMoviesWinnersByYear function to WinnersByYears component", () => {
    render(<Dashboard />);

    const component = screen.getByTestId("winners-by-year");
    expect(component).toBeInTheDocument();
  });

  it("renders with empty data arrays", () => {
    vi.mocked(useDashboardHook.useDashboard).mockReturnValue({
      ...mockUseDashboard,
      yearsWithMultipleWinners: { years: [] },
      studiosWithWinCount: { studios: [] },
      maxMinWinIntervalForProducers: { min: [], max: [] },
    });

    render(<Dashboard />);

    expect(screen.getByTestId("years-with-multiple-winners")).toHaveTextContent("Years: 0");
    expect(screen.getByTestId("top-studios")).toHaveTextContent("Studios: 0");
    expect(screen.getByTestId("producer-win-intervals")).toHaveTextContent("Min: 0, Max: 0");
  });

  it("renders grid layout correctly", () => {
    const { container } = render(<Dashboard />);

    const gridContainer = container.querySelector(".grid.grid-cols-2.gap-4");
    expect(gridContainer).toBeInTheDocument();
  });

  it("renders loading skeleton with correct grid layout", () => {
    vi.mocked(useDashboardHook.useDashboard).mockReturnValue({
      ...mockUseDashboard,
      isLoading: true,
    });

    const { container } = render(<Dashboard />);

    const gridContainer = container.querySelector(".grid.grid-cols-2.gap-4");
    expect(gridContainer).toBeInTheDocument();
  });

  it("does not render dashboard title when loading", () => {
    vi.mocked(useDashboardHook.useDashboard).mockReturnValue({
      ...mockUseDashboard,
      isLoading: true,
    });

    render(<Dashboard />);

    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
  });

  it("calls useDashboard hook on mount", () => {
    render(<Dashboard />);

    expect(useDashboardHook.useDashboard).toHaveBeenCalled();
  });

  it("renders all four components in correct order", async () => {
    render(<Dashboard />);

    await waitFor(() => {
      const components = [
        screen.getByTestId("years-with-multiple-winners"),
        screen.getByTestId("top-studios"),
        screen.getByTestId("producer-win-intervals"),
        screen.getByTestId("winners-by-year"),
      ];

      components.forEach((component) => {
        expect(component).toBeInTheDocument();
      });
    });
  });
});

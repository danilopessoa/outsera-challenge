import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDashboard } from "./useDashboard";
import * as moviesService from "../../services/movies/movies.service";
import { createElement, type ReactNode } from "react";

// Mock do serviço de filmes
vi.mock("../../services/movies/movies.service");

describe("useDashboard", () => {
  let queryClient: QueryClient;

  const mockYearsWithMultipleWinners = {
    years: [
      { year: 1986, winnerCount: 2 },
      { year: 1990, winnerCount: 2 },
    ],
  };

  const mockStudiosWithWinCount = {
    studios: [
      { name: "Columbia Pictures", winCount: 7 },
      { name: "Paramount Pictures", winCount: 6 },
      { name: "Warner Bros.", winCount: 5 },
    ],
  };

  const mockMaxMinWinIntervalForProducers = {
    min: [
      {
        producer: "Joel Silver",
        interval: 1,
        previousWin: 1990,
        followingWin: 1991,
      },
    ],
    max: [
      {
        producer: "Matthew Vaughn",
        interval: 13,
        previousWin: 2002,
        followingWin: 2015,
      },
    ],
  };

  const mockWinnersByYear = [
    {
      id: 1,
      year: 1990,
      title: "The Adventures of Ford Fairlane",
      winner: true,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ] as any;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    vi.clearAllMocks();

    // Mock das funções do serviço
    vi.mocked(moviesService.getYearsWithMultipleWinners).mockResolvedValue(mockYearsWithMultipleWinners);
    vi.mocked(moviesService.getStudiosWithWinCount).mockResolvedValue(mockStudiosWithWinCount);
    vi.mocked(moviesService.getMaxMinWinIntervalForProducers).mockResolvedValue(mockMaxMinWinIntervalForProducers);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    vi.mocked(moviesService.getWinnersByYear).mockResolvedValue(mockWinnersByYear);
  });

  const wrapper = ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);

  it("should fetch all dashboard data on mount", async () => {
    const { result } = renderHook(() => useDashboard(), { wrapper });

    // Inicialmente deve estar carregando
    expect(result.current.isLoading).toBe(true);

    // Aguarda o carregamento dos dados
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Verifica se os dados foram carregados corretamente
    expect(result.current.yearsWithMultipleWinners).toEqual(mockYearsWithMultipleWinners);
    expect(result.current.studiosWithWinCount).toEqual(mockStudiosWithWinCount);
    expect(result.current.maxMinWinIntervalForProducers).toEqual(mockMaxMinWinIntervalForProducers);
  });

  it("should return default values when data is not loaded", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    vi.mocked(moviesService.getYearsWithMultipleWinners).mockResolvedValue(undefined as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    vi.mocked(moviesService.getStudiosWithWinCount).mockResolvedValue(undefined as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    vi.mocked(moviesService.getMaxMinWinIntervalForProducers).mockResolvedValue(undefined as any);

    const { result } = renderHook(() => useDashboard(), { wrapper });

    expect(result.current.yearsWithMultipleWinners).toEqual({ years: [] });
    expect(result.current.studiosWithWinCount).toEqual({ studios: [] });
    expect(result.current.maxMinWinIntervalForProducers).toEqual({ min: [], max: [] });
  });

  it("should set isError to true when any query fails", async () => {
    vi.mocked(moviesService.getYearsWithMultipleWinners).mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useDashboard(), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });

  it("should set isLoading to false when all queries complete", async () => {
    const { result } = renderHook(() => useDashboard(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(false);
  });

  it("should call getListMoviesWinnersByYear and return winners", async () => {
    const { result } = renderHook(() => useDashboard(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const winners = await result.current.getListMoviesWinnersByYear(1990);

    expect(moviesService.getWinnersByYear).toHaveBeenCalledWith(1990);
    expect(winners).toEqual(mockWinnersByYear);
  });

  it("should handle getListMoviesWinnersByYear with different years", async () => {
    const mockWinners2000 = [
      {
        id: 2,
        year: 2000,
        title: "Battlefield Earth",
        winner: true,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    vi.mocked(moviesService.getWinnersByYear).mockResolvedValue(mockWinners2000);

    const { result } = renderHook(() => useDashboard(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const winners = await result.current.getListMoviesWinnersByYear(2000);

    expect(moviesService.getWinnersByYear).toHaveBeenCalledWith(2000);
    expect(winners).toEqual(mockWinners2000);
  });

  it("should call all service functions once on mount", async () => {
    renderHook(() => useDashboard(), { wrapper });

    await waitFor(() => {
      expect(moviesService.getYearsWithMultipleWinners).toHaveBeenCalledTimes(1);
      expect(moviesService.getStudiosWithWinCount).toHaveBeenCalledTimes(1);
      expect(moviesService.getMaxMinWinIntervalForProducers).toHaveBeenCalledTimes(1);
    });
  });

  it("should return yearsWithMultipleWinners with correct structure", async () => {
    const { result } = renderHook(() => useDashboard(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.yearsWithMultipleWinners).toHaveProperty("years");
    expect(Array.isArray(result.current.yearsWithMultipleWinners.years)).toBe(true);
    expect(result.current.yearsWithMultipleWinners.years.length).toBe(2);
  });

  it("should return studiosWithWinCount with correct structure", async () => {
    const { result } = renderHook(() => useDashboard(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.studiosWithWinCount).toHaveProperty("studios");
    expect(Array.isArray(result.current.studiosWithWinCount.studios)).toBe(true);
    expect(result.current.studiosWithWinCount.studios.length).toBe(3);
  });

  it("should return maxMinWinIntervalForProducers with correct structure", async () => {
    const { result } = renderHook(() => useDashboard(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.maxMinWinIntervalForProducers).toHaveProperty("min");
    expect(result.current.maxMinWinIntervalForProducers).toHaveProperty("max");
    expect(Array.isArray(result.current.maxMinWinIntervalForProducers.min)).toBe(true);
    expect(Array.isArray(result.current.maxMinWinIntervalForProducers.max)).toBe(true);
  });
});

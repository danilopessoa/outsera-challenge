import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useMovies } from "./useMovies";
import * as moviesService from "../../services/movies/movies.service";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe("useMovies Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    vi.spyOn(moviesService, "getMovies").mockResolvedValue({
      content: [],
      pageable: {
        pageNumber: 0,
        pageSize: 15,
        sort: { sorted: false, unsorted: true, empty: true },
        offset: 0,
        unpaged: false,
        paged: true,
      },
      totalPages: 0,
      totalElements: 0,
      last: true,
      numberOfElements: 0,
      size: 15,
      number: 0,
      sort: { sorted: false, unsorted: true, empty: true },
      first: true,
      empty: true,
    });

    const { result } = renderHook(() => useMovies(), {
      wrapper: createWrapper(),
    });

    expect(result.current.movies).toEqual([]);
    expect(result.current.isLoading).toBe(true);
  });

  it("should fetch movies successfully", async () => {
    const mockMoviesData = {
      content: [
        {
          id: 1,
          year: 1980,
          title: "Test Movie",
          studios: ["Test Studio"],
          producers: ["Test Producer"],
          winner: true,
        },
      ],
      pageable: {
        pageNumber: 0,
        pageSize: 15,
        sort: { sorted: false, unsorted: true, empty: true },
        offset: 0,
        unpaged: false,
        paged: true,
      },
      totalPages: 1,
      totalElements: 1,
      last: true,
      numberOfElements: 1,
      size: 15,
      number: 0,
      sort: { sorted: false, unsorted: true, empty: true },
      first: true,
      empty: false,
    };

    vi.spyOn(moviesService, "getMovies").mockResolvedValue(mockMoviesData);

    const { result } = renderHook(() => useMovies(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.movies).toHaveLength(1);
    expect(result.current.movies[0].title).toBe("Test Movie");
  });

  it("should handle pagination", async () => {
    const mockMoviesData = {
      content: [],
      pageable: {
        pageNumber: 0,
        pageSize: 15,
        sort: { sorted: false, unsorted: true, empty: true },
        offset: 0,
        unpaged: false,
        paged: true,
      },
      totalPages: 4,
      totalElements: 50,
      last: false,
      numberOfElements: 0,
      size: 15,
      number: 0,
      sort: { sorted: false, unsorted: true, empty: true },
      first: true,
      empty: true,
    };

    vi.spyOn(moviesService, "getMovies").mockResolvedValue(mockMoviesData);

    const { result } = renderHook(() => useMovies(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.pagination.totalPages).toBe(4);
    expect(result.current.pagination.currentPage).toBe(0);
  });

  it("should apply filters correctly", async () => {
    const mockMoviesData = {
      content: [],
      pageable: {
        pageNumber: 0,
        pageSize: 15,
        sort: { sorted: false, unsorted: true, empty: true },
        offset: 0,
        unpaged: false,
        paged: true,
      },
      totalPages: 0,
      totalElements: 0,
      last: true,
      numberOfElements: 0,
      size: 15,
      number: 0,
      sort: { sorted: false, unsorted: true, empty: true },
      first: true,
      empty: true,
    };

    const getMoviesSpy = vi.spyOn(moviesService, "getMovies").mockResolvedValue(mockMoviesData);

    const { result } = renderHook(() => useMovies(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.getMoviesByFilter({ year: "1990" });
    });

    await waitFor(() => {
      expect(getMoviesSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          year: 1990,
        }),
      );
    });
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type {
  MoviesPage,
  Movie,
  YearsWithMultipleWinners,
  WinnersByYear,
  StudiosWithWinCount,
  MaxMinWinIntervalForProducers,
} from "../../interfaces/movies.interface";

// Mock do httpClient usando vi.hoisted
const { mockGet } = vi.hoisted(() => {
  return {
    mockGet: vi.fn(),
  };
});

vi.mock("../api", () => ({
  httpClient: () => ({
    get: mockGet,
  }),
}));

import {
  getMovies,
  getMovieById,
  getYearsWithMultipleWinners,
  getWinnersByYear,
  getStudiosWithWinCount,
  getMaxMinWinIntervalForProducers,
} from "./movies.service";

describe("Movies Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("getMovies", () => {
    const mockMoviesPage: MoviesPage = {
      content: [
        {
          id: 1,
          year: 1980,
          title: "Can't Stop the Music",
          studios: ["Associated Film Distribution"],
          producers: ["Allan Carr"],
          winner: true,
        },
        {
          id: 2,
          year: 1980,
          title: "Cruising",
          studios: ["Lorimar Productions"],
          producers: ["Jerry Weintraub"],
          winner: false,
        },
      ],
      pageable: {
        pageNumber: 0,
        pageSize: 10,
        sort: { sorted: false, unsorted: true, empty: true },
        offset: 0,
        unpaged: false,
        paged: true,
      },
      totalPages: 1,
      totalElements: 2,
      last: true,
      numberOfElements: 2,
      size: 10,
      number: 0,
      sort: { sorted: false, unsorted: true, empty: true },
      first: true,
      empty: false,
    };

    it("should fetch movies with required parameters", async () => {
      mockGet.mockResolvedValue(mockMoviesPage);

      const result = await getMovies({ page: 1, size: 10 });

      expect(mockGet).toHaveBeenCalledWith("/movies", {
        page: "1",
        size: "10",
      });
      expect(result).toEqual(mockMoviesPage);
    });

    it("should fetch movies with winner filter", async () => {
      mockGet.mockResolvedValue(mockMoviesPage);

      await getMovies({ page: 1, size: 10, winner: true });

      expect(mockGet).toHaveBeenCalledWith("/movies", {
        page: "1",
        size: "10",
        winner: "true",
      });
    });

    it("should fetch movies with year filter", async () => {
      mockGet.mockResolvedValue(mockMoviesPage);

      await getMovies({ page: 1, size: 10, year: 1980 });

      expect(mockGet).toHaveBeenCalledWith("/movies", {
        page: "1",
        size: "10",
        year: "1980",
      });
    });

    it("should fetch movies with all filters", async () => {
      mockGet.mockResolvedValue(mockMoviesPage);

      await getMovies({ page: 2, size: 20, winner: false, year: 1990 });

      expect(mockGet).toHaveBeenCalledWith("/movies", {
        page: "2",
        size: "20",
        winner: "false",
        year: "1990",
      });
    });

    it("should throw error if page is not an integer", async () => {
      await expect(getMovies({ page: 1.5, size: 10 })).rejects.toThrow("`page` must be an integer >= 1");
    });

    it("should throw error if page is less than 1", async () => {
      await expect(getMovies({ page: 0, size: 10 })).rejects.toThrow("`page` must be an integer >= 1");
    });

    it("should throw error if size is not an integer", async () => {
      await expect(getMovies({ page: 1, size: 5.5 })).rejects.toThrow("`size` must be an integer >= 1");
    });

    it("should throw error if size is less than 1", async () => {
      await expect(getMovies({ page: 1, size: 0 })).rejects.toThrow("`size` must be an integer >= 1");
    });

    it("should throw error if year is not an integer", async () => {
      await expect(getMovies({ page: 1, size: 10, year: 1980.5 })).rejects.toThrow(
        "`year` must be an integer when provided",
      );
    });
  });

  describe("getMovieById", () => {
    const mockMovie: Movie = {
      id: 1,
      year: 1980,
      title: "Can't Stop the Music",
      studios: ["Associated Film Distribution"],
      producers: ["Allan Carr"],
      winner: true,
    };

    it("should fetch a movie by id", async () => {
      mockGet.mockResolvedValue(mockMovie);

      const result = await getMovieById("1");

      expect(mockGet).toHaveBeenCalledWith("/movies/1");
      expect(result).toEqual(mockMovie);
    });

    it("should handle different id formats", async () => {
      mockGet.mockResolvedValue(mockMovie);

      await getMovieById("123");

      expect(mockGet).toHaveBeenCalledWith("/movies/123");
    });
  });

  describe("getYearsWithMultipleWinners", () => {
    const mockYearsData: YearsWithMultipleWinners = {
      years: [
        { year: 1986, winnerCount: 2 },
        { year: 1990, winnerCount: 2 },
        { year: 2015, winnerCount: 2 },
      ],
    };

    it("should fetch years with multiple winners", async () => {
      mockGet.mockResolvedValue(mockYearsData);

      const result = await getYearsWithMultipleWinners();

      expect(mockGet).toHaveBeenCalledWith("/movies/yearsWithMultipleWinners");
      expect(result).toEqual(mockYearsData);
    });

    it("should return empty array when no years have multiple winners", async () => {
      const emptyData: YearsWithMultipleWinners = { years: [] };
      mockGet.mockResolvedValue(emptyData);

      const result = await getYearsWithMultipleWinners();

      expect(result.years).toEqual([]);
    });
  });

  describe("getWinnersByYear", () => {
    const mockWinnersData: WinnersByYear = {
      id: 1,
      year: 1980,
      title: "Can't Stop the Music",
      studios: ["Associated Film Distribution"],
      producers: ["Allan Carr"],
      winner: true,
    };

    it("should fetch winners by year", async () => {
      mockGet.mockResolvedValue(mockWinnersData);

      const result = await getWinnersByYear(1980);

      expect(mockGet).toHaveBeenCalledWith("/movies/winnersByYear", { year: "1980" });
      expect(result).toEqual(mockWinnersData);
    });

    it("should handle different years", async () => {
      mockGet.mockResolvedValue(mockWinnersData);

      await getWinnersByYear(2020);

      expect(mockGet).toHaveBeenCalledWith("/movies/winnersByYear", { year: "2020" });
    });
  });

  describe("getStudiosWithWinCount", () => {
    const mockStudiosData: StudiosWithWinCount = {
      studios: [
        { name: "Columbia Pictures", winCount: 7 },
        { name: "Paramount Pictures", winCount: 6 },
        { name: "Warner Bros.", winCount: 5 },
      ],
    };

    it("should fetch studios with win count", async () => {
      mockGet.mockResolvedValue(mockStudiosData);

      const result = await getStudiosWithWinCount();

      expect(mockGet).toHaveBeenCalledWith("/movies/studiosWithWinCount");
      expect(result).toEqual(mockStudiosData);
    });

    it("should return studios sorted by win count", async () => {
      mockGet.mockResolvedValue(mockStudiosData);

      const result = await getStudiosWithWinCount();

      expect(result.studios[0].winCount).toBeGreaterThanOrEqual(result.studios[1].winCount);
      expect(result.studios[1].winCount).toBeGreaterThanOrEqual(result.studios[2].winCount);
    });
  });

  describe("getMaxMinWinIntervalForProducers", () => {
    const mockIntervalData: MaxMinWinIntervalForProducers = {
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

    it("should fetch max and min win intervals for producers", async () => {
      mockGet.mockResolvedValue(mockIntervalData);

      const result = await getMaxMinWinIntervalForProducers();

      expect(mockGet).toHaveBeenCalledWith("/movies/maxMinWinIntervalForProducers");
      expect(result).toEqual(mockIntervalData);
    });

    it("should return data with min and max arrays", async () => {
      mockGet.mockResolvedValue(mockIntervalData);

      const result = await getMaxMinWinIntervalForProducers();

      expect(result).toHaveProperty("min");
      expect(result).toHaveProperty("max");
      expect(Array.isArray(result.min)).toBe(true);
      expect(Array.isArray(result.max)).toBe(true);
    });

    it("should have correct interval data structure", async () => {
      mockGet.mockResolvedValue(mockIntervalData);

      const result = await getMaxMinWinIntervalForProducers();

      expect(result.min[0]).toHaveProperty("producer");
      expect(result.min[0]).toHaveProperty("interval");
      expect(result.min[0]).toHaveProperty("previousWin");
      expect(result.min[0]).toHaveProperty("followingWin");

      expect(result.max[0]).toHaveProperty("producer");
      expect(result.max[0]).toHaveProperty("interval");
      expect(result.max[0]).toHaveProperty("previousWin");
      expect(result.max[0]).toHaveProperty("followingWin");
    });
  });

  describe("Error Handling", () => {
    it("should handle network errors in getMovies", async () => {
      mockGet.mockRejectedValue(new Error("Network error"));

      await expect(getMovies({ page: 1, size: 10 })).rejects.toThrow("Network error");
    });

    it("should handle network errors in getMovieById", async () => {
      mockGet.mockRejectedValue(new Error("Movie not found"));

      await expect(getMovieById("999")).rejects.toThrow("Movie not found");
    });

    it("should handle network errors in getYearsWithMultipleWinners", async () => {
      mockGet.mockRejectedValue(new Error("Server error"));

      await expect(getYearsWithMultipleWinners()).rejects.toThrow("Server error");
    });

    it("should handle network errors in getWinnersByYear", async () => {
      mockGet.mockRejectedValue(new Error("No data available"));

      await expect(getWinnersByYear(2020)).rejects.toThrow("No data available");
    });

    it("should handle network errors in getStudiosWithWinCount", async () => {
      mockGet.mockRejectedValue(new Error("API error"));

      await expect(getStudiosWithWinCount()).rejects.toThrow("API error");
    });

    it("should handle network errors in getMaxMinWinIntervalForProducers", async () => {
      mockGet.mockRejectedValue(new Error("Timeout"));

      await expect(getMaxMinWinIntervalForProducers()).rejects.toThrow("Timeout");
    });
  });
});

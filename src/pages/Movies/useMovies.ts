import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../services/movies/movies.service.ts";
import { useCallback, useState } from "react";
import type { Movie } from "../../interfaces/movies.interface.ts";

interface PaginationData {
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
  isFirst: boolean;
  isLast: boolean;
}

export const useMovies = () => {
  const DEFAULT_PAGE_SIZE = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string | number>>({});

  const queryMovies = useQuery({
    queryKey: ["movies", "movies", currentPage, DEFAULT_PAGE_SIZE, filters],
    queryFn: () =>
      getMovies({
        page: currentPage,
        size: DEFAULT_PAGE_SIZE,
        ...filters,
      }),
  });

  const movies: Movie[] = queryMovies.data?.content ?? [];
  const isLoading = queryMovies.isLoading;

  const pagination: PaginationData = {
    totalPages: queryMovies.data?.totalPages ?? 0,
    totalElements: queryMovies.data?.totalElements ?? 0,
    currentPage: queryMovies.data?.number ?? currentPage,
    pageSize: queryMovies.data?.size ?? DEFAULT_PAGE_SIZE,
    isFirst: queryMovies.data?.first ?? true,
    isLast: queryMovies.data?.last ?? false,
  };

  const getMoviesByFilter = useCallback((newFilters: Record<string, string | number>) => {
    const params = { ...newFilters };

    if (params.year && typeof params.year === "string") {
      params.year = parseInt(params.year, 10);
    }

    setFilters(params);
    setCurrentPage(1);
  }, []);

  const goToPage = useCallback((page: number) => {
    console.info("Going to page:", page);
    setCurrentPage(page);
  }, []);

  const nextPage = useCallback(() => {
    if (!pagination.isLast) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [pagination.isLast]);

  const previousPage = useCallback(() => {
    if (!pagination.isFirst) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [pagination.isFirst]);

  return {
    isLoading,
    movies,
    pagination,
    getMoviesByFilter,
    goToPage,
    nextPage,
    previousPage,
  };
};

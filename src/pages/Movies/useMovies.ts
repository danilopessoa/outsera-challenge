import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../services/movies/movies.service.ts";
import { useCallback, useEffect, useState } from "react";
import type { GetMoviesParams, Movie } from "../../interfaces/movies.interface.ts";
import type { PaginationData } from "../../interfaces/data-table.interface.ts";

export const useMovies = () => {
  const DEFAULT_PAGE_SIZE = 15;
  const DEFAULT_PAGE_NUMBER = 0;

  const [currentPage, setCurrentPage] = useState(0);
  const [currentFilters, setCurrentFilters] = useState<Record<string, string | number>>({});
  const [pagination, setPagination] = useState<PaginationData>({
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
    pageSize: DEFAULT_PAGE_SIZE,
    isFirst: true,
    isLast: false,
  });
  const [movies, setMovies] = useState<Movie[]>([]);

  const queryMovies = useQuery({
    queryKey: ["movies", "movies", DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE],
    queryFn: () => getMovies({ page: DEFAULT_PAGE_NUMBER, size: DEFAULT_PAGE_SIZE }),
  });

  const isLoading = queryMovies.isLoading;

  useEffect(() => {
    if (queryMovies.data) {
      setMovies(queryMovies.data.content);
      setCurrentPage(DEFAULT_PAGE_NUMBER);
      setPagination({
        totalPages: queryMovies.data.totalPages || 0,
        totalElements: queryMovies.data.totalElements || 0,
        currentPage: DEFAULT_PAGE_NUMBER,
        pageSize: queryMovies.data.size || DEFAULT_PAGE_SIZE,
        isFirst: queryMovies.data.first,
        isLast: queryMovies.data.last,
      });
    }
  }, [queryMovies.data]);

  const getMoviesByFilter = useCallback(
    async (filters?: Record<string, string | number>, pageIndex = 0) => {
      const appliedFilters = filters ? { ...filters } : { ...currentFilters };
      if (appliedFilters.year) {
        appliedFilters.year = Number(appliedFilters.year);
      }

      setCurrentFilters(appliedFilters);

      const params: GetMoviesParams = {
        page: pageIndex,
        size: pagination.pageSize || DEFAULT_PAGE_SIZE,
        ...appliedFilters,
      };

      const r = await getMovies(params);
      setMovies(r.content);
      setCurrentPage(pageIndex);
      setPagination({
        totalPages: r.totalPages || 0,
        totalElements: r.totalElements || 0,
        currentPage: r.number ?? 0,
        pageSize: r.size || DEFAULT_PAGE_SIZE,
        isFirst: r.first,
        isLast: r.last,
      });
    },
    [currentFilters, pagination.pageSize],
  );

  const goToPage = useCallback(
    (pageIndex: number) => {
      getMoviesByFilter(undefined, pageIndex).catch(console.error);
    },
    [getMoviesByFilter],
  );

  const nextPage = useCallback(() => {
    if (!pagination.isLast) {
      const nextIndex = currentPage + 1;
      getMoviesByFilter(undefined, nextIndex).catch(console.error);
    }
  }, [pagination.isLast, currentPage, getMoviesByFilter]);

  const previousPage = useCallback(() => {
    if (!pagination.isFirst && currentPage > 0) {
      const prevIndex = currentPage - 1;
      getMoviesByFilter(undefined, prevIndex).catch(console.error);
    }
  }, [pagination.isFirst, currentPage, getMoviesByFilter]);

  return {
    isLoading,
    movies,
    pagination,
    currentPage,
    getMoviesByFilter,
    goToPage,
    nextPage,
    previousPage,
  };
};

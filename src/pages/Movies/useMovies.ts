import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../services/movies/movies.service.ts";
import { useCallback, useEffect, useState } from "react";
import type { GetMoviesParams, Movie } from "../../interfaces/movies.interface.ts";
import type { PaginationData } from "../../interfaces/data-table.interface.ts";

export const useMovies = () => {
  const DEFAULT_PAGE_SIZE = 15;
  const DEFAULT_PAGE_NUMBER = 1;

  const [currentPage, setCurrentPage] = useState(0);
  const [pagination, setPagination] = useState<PaginationData>({});

  const [movies, setMovies] = useState<Movie[]>([]);

  const queryMovies = useQuery({
    queryKey: ["movies", "movies", DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE],
    queryFn: () => getMovies({ page: DEFAULT_PAGE_NUMBER, size: DEFAULT_PAGE_SIZE }),
  });

  const isLoading = queryMovies.isLoading;

  useEffect(() => {
    if (queryMovies.data) {
      setMovies(queryMovies.data.content);
      setPagination({
        totalPages: queryMovies.data.totalPages || 0,
        totalElements: queryMovies.data.totalElements || 0,
        currentPage: (queryMovies.data.number || 1) - 1,
        pageSize: queryMovies.data.size || DEFAULT_PAGE_SIZE,
        isFirst: queryMovies.data.first,
        isLast: queryMovies.data.last,
      });
    }
  }, [queryMovies.data]);

  const getMoviesByFilter = async (filters: Record<string, string | number>) => {
    if (filters.year) {
      filters.year = Number(filters.year);
    }
    const params: GetMoviesParams = {
      page: DEFAULT_PAGE_NUMBER,
      size: DEFAULT_PAGE_SIZE,
      ...filters,
    };

    await getMovies(params).then((r) => {
      setMovies(r.content);
      setCurrentPage(0);
      setPagination({
        totalPages: r.totalPages || 0,
        totalElements: r.totalElements || 0,
        currentPage: (r.number || 1) - 1,
        pageSize: r.size || DEFAULT_PAGE_SIZE,
        isFirst: r.first,
        isLast: r.last,
      });
    });
    return;
  };

  const goToPage = useCallback((page: number) => {
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

import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../services/movies/movies.service";
import type { MoviesPage } from "../../interfaces/movies.interface";
import { useState } from "react";

export const useMovies = () => {
  const [page, setPage] = useState(0);
  const pageSize = 15;

  const { data: moviesData, isLoading } = useQuery<MoviesPage>({
    queryKey: ["movies", "allMovies", page],
    queryFn: () => getMovies({ page: page + 1, size: pageSize }),
    keepPreviousData: true,
  });

  const movies = query.data ?? [];
  const isLoading = query.isLoading;

  return {
    movies,
    isLoading,
  };
};

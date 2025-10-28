import * as React from "react";
import { DataTable } from "../../components/DataTable/DataTable";
import { useMovies } from "./useMovies";
import type { Movie } from "../../interfaces/movies.interface";
import type { Column } from "../../interfaces/data-table.interface.ts";

const Movies: React.FC = () => {
  const COLUMNS: Column<Movie>[] = [
    { header: "ID", accessor: "id" },
    { header: "Ano", accessor: "year" },
    { header: "Título", accessor: "title" },
    { header: "Vencedor", accessor: "winner" },
  ];
  const KEYS_TO_FILTER = [
    { keyName: "year", placeholder: "Filtrar por ano", valueIsBoolean: false },
    { keyName: "winner", placeholder: "Vencedor", valueIsBoolean: true },
  ];
  const { movies, isLoading, getMoviesByFilter, pagination, nextPage, previousPage, goToPage } = useMovies();

  const handleFilters = (filters: Record<string, string>) => {
    getMoviesByFilter(filters).catch(console.error);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Filmes</h2>
      <DataTable
        columns={COLUMNS}
        data={movies}
        keysToFilter={KEYS_TO_FILTER}
        getDataByFilter={handleFilters}
        pagination={pagination}
        onPreviousPage={previousPage}
        onPageChange={goToPage}
        onNextPage={nextPage}
      />
    </div>
  );
};

export default Movies;

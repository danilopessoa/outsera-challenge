import * as React from "react";
import { DataTable, type Column } from "../../components/DataTable/DataTable";
import { useMovies } from "./useMovies";
import type { Movie } from "../../interfaces/movies.interface";

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
  const { movies, isLoading } = useMovies();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Filmes</h2>
      <DataTable columns={COLUMNS} data={movies} keysToFilter={KEYS_TO_FILTER} />
    </div>
  );
};

export default Movies;

interface GetMoviesParams {
  page: number;
  size: number;
  winner?: boolean;
  year?: number;
}

interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

interface Sorted {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

interface MoviesPage {
  content: Movie[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: Sorted;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: Sorted;
  first: boolean;
  empty: boolean;
}

export type { GetMoviesParams, Movie, MoviesPage };

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
  studios?: string[];
  producers?: string[];
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

interface YearsWithMultipleWinners {
  years: { year: number; winnerCount: number }[];
}

interface StudiosWithWinCount {
  studios: { name: string; winCount: number }[];
}

interface WinnersByYear {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

interface MaxMinWinIntervalForProducers {
  min: { producer: string; interval: number; previousWin: number; followingWin: number }[];
  max: { producer: string; interval: number; previousWin: number; followingWin: number }[];
}

export type {
  GetMoviesParams,
  Movie,
  MoviesPage,
  YearsWithMultipleWinners,
  StudiosWithWinCount,
  WinnersByYear,
  MaxMinWinIntervalForProducers,
};

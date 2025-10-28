import { httpClient } from "../api";
import type {
  GetMoviesParams,
  MaxMinWinIntervalForProducers,
  Movie,
  MoviesPage,
  StudiosWithWinCount,
  WinnersByYear,
  YearsWithMultipleWinners,
} from "../../interfaces/movies.interface";

const client = httpClient();

export const getMovies = async (params: GetMoviesParams): Promise<MoviesPage> => {
  const { page, size, winner, year } = params;

  if (!Number.isInteger(page) || page < 1) {
    throw new TypeError("`page` must be an integer >= 1");
  }
  if (!Number.isInteger(size) || size < 1) {
    throw new TypeError("`size` must be an integer >= 1");
  }
  if (typeof year !== "undefined" && !Number.isInteger(year)) {
    throw new TypeError("`year` must be an integer when provided");
  }

  const queryParams: Record<string, string> = {
    page: String(page),
    size: String(size),
  };

  if (typeof winner !== "undefined") queryParams.winner = String(winner);
  if (typeof year !== "undefined") queryParams.year = String(year);

  return await client.get<MoviesPage>("/movies", queryParams);
};

export const getMovieById = async (id: string): Promise<Movie> => {
  return client.get<Movie>(`/movies/${id}`);
};

export const getYearsWithMultipleWinners = async (): Promise<YearsWithMultipleWinners> => {
  return client.get<YearsWithMultipleWinners>("/movies/yearsWithMultipleWinners");
};

export const getWinnersByYear = async (year: number): Promise<WinnersByYear> => {
  return client.get<WinnersByYear>("/movies/winnersByYear", { year: String(year) });
};

export const getStudiosWithWinCount = async (): Promise<StudiosWithWinCount> => {
  return client.get<StudiosWithWinCount>("/movies/studiosWithWinCount");
};

export const getMaxMinWinIntervalForProducers = async (): Promise<MaxMinWinIntervalForProducers> => {
  return client.get<MaxMinWinIntervalForProducers>("/movies/maxMinWinIntervalForProducers");
};

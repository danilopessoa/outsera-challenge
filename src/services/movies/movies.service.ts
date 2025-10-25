import { httpClient } from "../api";
import type { GetMoviesParams, Movie, MoviesPage } from "../../interfaces/movies.interface";

const client = httpClient();

const getMovies = async (params: GetMoviesParams): Promise<Movie[]> => {
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

  const resp = await client.get<MoviesPage>("/movies", queryParams);
  return resp.content;
};

const getMovieById = async (id: string): Promise<Movie> => {
  return client.get<Movie>(`/movies/${id}`);
};

const getMoviesYearsWithMultipleWinners = async <T = unknown>(): Promise<T> => {
  return client.get<T>("/movies/yearsWithMultipleWinners");
};

const getWinnersByYear = async <T = unknown>(year: number): Promise<T> => {
  if (!Number.isInteger(year)) throw new TypeError("`year` must be an integer");
  return client.get<T>("/movies/winnersByYear", { year: String(year) });
};

const getStudiosWithWinCount = async <T = unknown>(): Promise<T> => {
  return client.get<T>("/movies/studiosWithWinCount");
};

const getMaxMinWinIntervalForProducers = async <T = unknown>(): Promise<T> => {
  return client.get<T>("/movies/maxMinWinIntervalForProducers");
};

export {
  getMovies,
  getMovieById,
  getMoviesYearsWithMultipleWinners,
  getWinnersByYear,
  getStudiosWithWinCount,
  getMaxMinWinIntervalForProducers,
};

import { useQueries } from "@tanstack/react-query";
import {
  getMaxMinWinIntervalForProducers,
  getStudiosWithWinCount,
  getWinnersByYear,
  getYearsWithMultipleWinners,
} from "../../services/movies/movies.service.ts";

export const useDashboard = () => {
  const resultQueries = useQueries({
    queries: [
      {
        queryKey: ["yearsWithMultipleWinners", "yearsWithMultipleWinners"],
        queryFn: () => getYearsWithMultipleWinners().then((r) => r),
      },
      {
        queryKey: ["studiosWithWinCount", "studiosWithWinCount"],
        queryFn: () => getStudiosWithWinCount().then((r) => r),
      },
      {
        queryKey: ["maxMinWinIntervalForProducers", "maxMinWinIntervalForProducers"],
        queryFn: () => getMaxMinWinIntervalForProducers().then((r) => r),
      },
    ],
  });

  const yearsWithMultipleWinners = resultQueries[0].data ?? { years: [] };
  const studiosWithWinCount = resultQueries[1].data ?? { studios: [] };
  const maxMinWinIntervalForProducers = resultQueries[2].data ?? { min: [], max: [] };

  const isLoading = resultQueries.some((query) => query.isLoading);
  const isError = resultQueries.some((query) => query.isError);

  const getListMoviesWinnersByYear = async (year: number) => {
    return await getWinnersByYear(year).then((r) => r);
  };

  return {
    isLoading,
    isError,
    yearsWithMultipleWinners,
    studiosWithWinCount,
    maxMinWinIntervalForProducers,
    getListMoviesWinnersByYear,
  };
};

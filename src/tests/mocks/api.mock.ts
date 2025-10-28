import { vi } from "vitest";

// Mock axios or API calls if needed
export const mockAxiosGet = vi.fn();
export const mockAxiosPost = vi.fn();
export const mockAxiosPut = vi.fn();
export const mockAxiosDelete = vi.fn();

// Example mock data for movies
export const mockMovies = {
  data: [
    {
      year: 1980,
      title: "Can't Stop the Music",
      studios: ["Associated Film Distribution"],
      producers: ["Allan Carr"],
      winner: "yes",
    },
    {
      year: 1980,
      title: "Cruising",
      studios: ["Lorimar Productions", "United Artists"],
      producers: ["Jerry Weintraub"],
      winner: "",
    },
  ],
};

export const mockProducerIntervals = {
  min: [
    {
      producer: "Joel Silver",
      interval: 1,
      previousWin: 1990,
      followingWin: 1991,
    },
  ],
  max: [
    {
      producer: "Matthew Vaughn",
      interval: 13,
      previousWin: 2002,
      followingWin: 2015,
    },
  ],
};

export const mockTopStudios = [
  { name: "Columbia Pictures", winCount: 7 },
  { name: "Paramount Pictures", winCount: 6 },
  { name: "Warner Bros.", winCount: 5 },
];

export const mockYearsWithMultipleWinners = [
  { year: 1986, winnerCount: 2 },
  { year: 1990, winnerCount: 2 },
  { year: 2015, winnerCount: 2 },
];

export const mockWinnersByYear = [
  {
    id: 1,
    year: 1980,
    title: "Can't Stop the Music",
  },
];

import * as React from "react";
import { useDashboard } from "./useDashboard";
import { YearsWithMultipleWinners } from "./components/YearsWithMultipleWinners";
import { TopStudios } from "./components/TopStudios";
import { ProducerWinIntervals } from "./components/ProducerWinIntervals";
import { WinnersByYears } from "./components/WinnersByYear.tsx";
import { Card } from "../../components/Card/Card.tsx";

const Dashboard: React.FC = () => {
  const {
    isLoading,
    yearsWithMultipleWinners: { years },
    studiosWithWinCount: { studios },
    maxMinWinIntervalForProducers: { min, max },
    getListMoviesWinnersByYear,
  } = useDashboard();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <Card title={"Loading..."} children={<div className="h-6 bg-gray-300 rounded w-1/3" />} />
        <Card title={"Loading..."} children={<div className="h-6 bg-gray-300 rounded w-1/3" />} />
        <Card title={"Loading..."} children={<div className="h-6 bg-gray-300 rounded w-1/3" />} />
        <Card title={"Loading..."} children={<div className="h-6 bg-gray-300 rounded w-1/3" />} />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <YearsWithMultipleWinners years={years} />
        <TopStudios studios={studios} />
        <ProducerWinIntervals min={min} max={max} />
        <WinnersByYears getListMoviesWinnersByYear={getListMoviesWinnersByYear} />
      </div>
    </div>
  );
};

export default Dashboard;

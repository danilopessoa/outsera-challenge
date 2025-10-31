import { Card } from "../../../components/Card/Card";
import { DataTable } from "../../../components/DataTable/DataTable";
import type { Column } from "../../../interfaces/data-table.interface.ts";

interface ProducerInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

interface ProducerWinIntervalsProps {
  min: ProducerInterval[];
  max: ProducerInterval[];
}

const COLUMNS: Column<ProducerInterval>[] = [
  { header: "Produtora", accessor: "producer" },
  { header: "Intervalo", accessor: "interval" },
  { header: "Ano anterior", accessor: "previousWin" },
  { header: "Ano seguinte", accessor: "followingWin" },
];

export const ProducerWinIntervals = ({ min, max }: ProducerWinIntervalsProps) => {
  return (
    <Card
      title="Producers with longest and shortest interval between wins"
      children={
        <div className="flex flex-col gap-2">
          <DataTable columns={COLUMNS} data={max} title="Maximum" />
          <DataTable columns={COLUMNS} data={min} title="Minimum" />
        </div>
      }
    />
  );
};

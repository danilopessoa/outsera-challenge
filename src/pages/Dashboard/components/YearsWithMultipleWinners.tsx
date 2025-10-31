import { Card } from "../../../components/Card/Card";
import { DataTable } from "../../../components/DataTable/DataTable";
import type { Column } from "../../../interfaces/data-table.interface.ts";

interface YearData {
  year: number;
  winnerCount: number;
}

interface YearsWithMultipleWinnersProps {
  years: YearData[];
}

const COLUMNS: Column<YearData>[] = [
  { header: "Ano", accessor: "year" },
  { header: "Contagem de vitórias", accessor: "winnerCount" },
];

export const YearsWithMultipleWinners = ({ years }: YearsWithMultipleWinnersProps) => {
  return <Card title="List years with multiple winners" children={<DataTable columns={COLUMNS} data={years} />} />;
};

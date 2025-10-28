import { Card } from "../../../components/Card/Card";
import { DataTable, type Column } from "../../../components/DataTable/DataTable";

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
  return <Card title="Liste os anos com mais vencedores" children={<DataTable columns={COLUMNS} data={years} />} />;
};

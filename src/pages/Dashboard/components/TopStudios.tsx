import { Card } from "../../../components/Card/Card";
import { DataTable } from "../../../components/DataTable/DataTable";
import type { Column } from "../../../interfaces/data-table.interface.ts";

interface Studio {
  name: string;
  winCount: number;
}

interface TopStudiosProps {
  studios: Studio[];
}

const COLUMNS: Column<Studio>[] = [
  { header: "Name", accessor: "name" },
  { header: "Win Count", accessor: "winCount" },
];

export const TopStudios = ({ studios }: TopStudiosProps) => {
  return (
    <Card title="Top 3 studios with winners" children={<DataTable columns={COLUMNS} data={studios?.slice(0, 3)} />} />
  );
};

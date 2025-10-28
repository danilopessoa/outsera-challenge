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
  { header: "Nome", accessor: "name" },
  { header: "Contagem de vitórias", accessor: "winCount" },
];

export const TopStudios = ({ studios }: TopStudiosProps) => {
  return (
    <Card
      title="Os 3 melhores estúdios com vencedores"
      children={<DataTable columns={COLUMNS} data={studios?.slice(0, 3)} />}
    />
  );
};

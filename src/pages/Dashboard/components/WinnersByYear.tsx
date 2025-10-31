import { DataTable } from "../../../components/DataTable/DataTable.tsx";
import { Card } from "../../../components/Card/Card.tsx";
import { useState } from "react";
import type { WinnersByYear } from "../../../interfaces/movies.interface.ts";
import { Search } from "lucide-react";

interface WinnersByYearProps {
  getListMoviesWinnersByYear: (year: number) => Promise<WinnersByYear | WinnersByYear[]>;
}

export const WinnersByYears = ({ getListMoviesWinnersByYear }: WinnersByYearProps) => {
  const [winnersByYear, setWinnersByYear] = useState<WinnersByYear[]>([]);
  const [yearInput, setYearInput] = useState<string>("");

  const handleSearch = async (value?: string | number): Promise<void> => {
    const yearToSearch = value ?? yearInput;
    if (String(yearToSearch).trim() === "") {
      return;
    }

    const num = typeof yearToSearch === "number" ? yearToSearch : Number(yearToSearch);
    if (Number.isInteger(num) && !isNaN(num) && num >= 0 && num <= 2025) {
      await getListMoviesWinnersByYear(num).then((response) => {
        setWinnersByYear(Array.isArray(response) ? response : [response]);
      });
    }
  };

  return (
    <Card
      title="List movie winners by year"
      children={
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch().catch(console.error);
            }}
            noValidate
            className="flex items-center"
          >
            <input
              type="text"
              id="yearInput"
              inputMode="numeric"
              placeholder="Filter by year"
              className="border p-2 rounded mr-2 text-xs w-full"
              value={yearInput}
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/\D+/g, "").slice(0, 4);
                setYearInput(onlyDigits);
              }}
            />

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
              aria-label="Filter by year"
              onClick={() => {
                handleSearch().catch(console.error);
              }}
            >
              <Search size={16} />
            </button>
          </form>
          <div className="mt-4">
            <DataTable
              columns={[
                { header: "ID", accessor: "id" },
                { header: "Year", accessor: "year" },
                { header: "Title", accessor: "title" },
              ]}
              data={winnersByYear}
            />
          </div>
        </div>
      }
    />
  );
};

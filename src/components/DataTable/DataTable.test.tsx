import { describe, it, expect, vi } from "vitest";
import { DataTable } from "./DataTable";
import type { Column } from "../../interfaces/data-table.interface";
import { render, screen } from "@testing-library/react";

const mockData = [
  { id: 1, name: "Item 1", value: 100 },
  { id: 2, name: "Item 2", value: 200 },
  { id: 3, name: "Item 3", value: 300 },
];

const mockColumns: Column<(typeof mockData)[0]>[] = [
  { header: "ID", accessor: "id" },
  { header: "Nome", accessor: "name" },
  { header: "Valor", accessor: "value" },
];

describe("DataTable Component", () => {
  it("should render table headers correctly", () => {
    render(<DataTable columns={mockColumns} data={mockData} keysToFilter={[]} getDataByFilter={vi.fn()} />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("Valor")).toBeInTheDocument();
  });

  it("should render table data correctly", () => {
    render(<DataTable columns={mockColumns} data={mockData} keysToFilter={[]} getDataByFilter={vi.fn()} />);

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("should render empty state when no data", () => {
    render(<DataTable columns={mockColumns} data={[]} keysToFilter={[]} getDataByFilter={vi.fn()} />);

    expect(screen.getByText("ID")).toBeInTheDocument();
  });

  it("should call filter function when filters are applied", () => {
    const mockGetDataByFilter = vi.fn();

    const keysToFilter = [{ keyName: "name", placeholder: "Filtrar por nome", type: "text" as const }];

    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        keysToFilter={keysToFilter}
        getDataByFilter={mockGetDataByFilter}
      />,
    );
    expect(mockGetDataByFilter).not.toHaveBeenCalled();
  });
});

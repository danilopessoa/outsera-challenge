import { useRef, useState } from "react";
import type { Column, PaginationData } from "../../interfaces/data-table.interface.ts";
import { FilterField } from "./FilterFields.tsx";
import { Pagination } from "./Pagination.tsx";

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  title?: string | null;
  keysToFilter?: { keyName: string; placeholder: string; type: "text" | "select" | "number" }[] | null;
  getDataByFilter?: (filters: Record<string, string>) => void;
  pagination?: PaginationData | null;
  onPageChange?: (page: number) => void;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
}

export function DataTable<T>({
  columns,
  data,
  title = null,
  keysToFilter = null,
  getDataByFilter = undefined,
  pagination = null,
  onPageChange,
  onNextPage,
  onPreviousPage,
}: DataTableProps<T>) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const debounceTimeout = useRef<number | null>(null);

  const filterData = (keyName: string, value: string) => {
    const updatedFilters = { ...activeFilters };
    if (value.trim() === "") delete updatedFilters[keyName];
    else updatedFilters[keyName] = value;
    setActiveFilters(updatedFilters);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = window.setTimeout(() => {
      if (getDataByFilter) getDataByFilter(updatedFilters);
    }, 500);
  };

  const clearFilterField = (keyName: string) => {
    const updatedFilters = { ...activeFilters };
    delete updatedFilters[keyName];
    setActiveFilters(updatedFilters);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
      debounceTimeout.current = null;
    }

    if (getDataByFilter) getDataByFilter(updatedFilters);
  };

  return (
    <>
      {title && <h3 className="text-lg font-medium">{title}</h3>}
      <table className="table-fixed w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-300">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className={`w-fit px-4 py-2 text-sm font-semibold border ${keysToFilter?.length ? "text-center" : "text-left"}`}
              >
                {col.header}
                {keysToFilter && keysToFilter.some((item) => item.keyName === String(col.accessor)) && (
                  <div>
                    {(() => {
                      const key = String(col.accessor);
                      const filterMeta = keysToFilter.find((i) => i.keyName === key);
                      if (!filterMeta) return null;
                      return (
                        <FilterField
                          id={key}
                          value={activeFilters[key] || ""}
                          placeholder={filterMeta?.placeholder}
                          fieldType={filterMeta?.type}
                          onChange={(v) => {
                            filterData(key, v);
                          }}
                          onClear={() => {
                            clearFilterField(key);
                          }}
                        />
                      );
                    })()}
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={String(col.accessor)} className="px-4 py-2 border-b text-sm">
                    {String(row[col.accessor])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-4 text-center text-gray-500" colSpan={columns.length}>
                Nenhum dado encontrado.
              </td>
            </tr>
          )}
        </tbody>

        <tfoot>
          {pagination && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-3 border-t">
                <div className="flex items-center justify-center">
                  {onPageChange && (
                    <Pagination
                      pagination={pagination}
                      onPageChange={onPageChange}
                      onNextPage={onNextPage}
                      onPreviousPage={onPreviousPage}
                    />
                  )}
                </div>
              </td>
            </tr>
          )}
        </tfoot>
      </table>
    </>
  );
}

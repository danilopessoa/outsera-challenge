import { useRef, useState } from "react";
import type { Column, PaginationData } from "../../interfaces/data-table.interface.ts";

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  title?: string | null;
  keysToFilter?: { keyName: string; placeholder: string; valueIsBoolean: boolean }[] | null;
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

    if (value.trim() === "") {
      delete updatedFilters[keyName];
    } else {
      updatedFilters[keyName] = value;
    }

    setActiveFilters(updatedFilters);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (getDataByFilter) {
        getDataByFilter(updatedFilters);
      }
    }, 500);
  };

  const renderPagination = () => {
    if (!pagination || !onPageChange) return null;

    const { currentPage, totalPages } = pagination;
    const maxVisiblePages = 5;

    const startPage = Math.floor(currentPage / maxVisiblePages) * maxVisiblePages;
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center gap-2">
        {/* Primeira página */}
        <button
          onClick={() => {
            onPageChange(0);
          }}
          disabled={currentPage === 0}
          className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-gray-100 cursor-pointer"
          title="Primeira página"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>

        {/* Página anterior */}
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 0}
          className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-gray-100 cursor-pointer"
          title="Página anterior"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Páginas numeradas */}
        <div className="flex gap-1">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => {
                onPageChange(page);
              }}
              className={`px-3 py-1 border cursor-pointer rounded min-w-[2.5rem] ${
                page === currentPage ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`}
            >
              {page + 1}
            </button>
          ))}
        </div>

        {/* Próxima página */}
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages - 1}
          className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-gray-100 cursor-pointer"
          title="Próxima página"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Última página */}
        <button
          onClick={() => {
            onPageChange(totalPages - 1);
          }}
          disabled={currentPage === totalPages - 1}
          className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-gray-100 cursor-pointer"
          title="Última página"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <>
      {title && <h3 className="text-lg font-medium">{title}</h3>}
      <table className="table-fixed w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-300">
          <tr>
            {columns.map((col) => (
              <th key={String(col.accessor)} className=" w-fit px-4 py-2 text-sm font-semibold border-b text-left">
                {col.header}
                {keysToFilter && keysToFilter.some((item) => item.keyName === String(col.accessor)) && (
                  <div>
                    {keysToFilter.find((item) => item.keyName === String(col.accessor))?.valueIsBoolean ? (
                      <select
                        id={String(col.accessor)}
                        className="bg-white border p-2 rounded mr-2 text-xs w-full"
                        value={activeFilters[String(col.accessor)] || ""}
                        onChange={(e) => {
                          filterData(String(col.accessor), e.target.value);
                        }}
                      >
                        <option value="">Escolha uma opção</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        id={String(col.accessor)}
                        placeholder={keysToFilter.find((item) => item.keyName === String(col.accessor))?.placeholder}
                        className="bg-white border p-2 rounded mr-2 text-xs w-full"
                        value={activeFilters[String(col.accessor)] || ""}
                        onChange={(e) => {
                          const fieldValue = e.target.value;
                          filterData(String(col.accessor), fieldValue);
                        }}
                      />
                    )}
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
                <div className="flex items-center justify-center">{renderPagination()}</div>
              </td>
            </tr>
          )}
        </tfoot>
      </table>
    </>
  );
}

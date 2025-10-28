import { useState } from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  title?: string;
  pageable?: boolean;
  keysToFilter?: { keyName: string; placeholder: string; valueIsBoolean: boolean }[];
}

export function DataTable<T>({ columns, data, title, keysToFilter, pageable = false }: DataTableProps<T>) {
  const [dataTableInitial] = useState(data);
  const [dataTable, setDataTable] = useState(data);

  const filterData = (keyName: string, value: string) => {
    if (keyName.trim() === "" || value.trim() === "") {
      setDataTable(dataTableInitial);
      return;
    }
    const result = dataTableInitial.filter((item) => {
      const itemValue = String(item[keyName as keyof T]).toLowerCase();
      return itemValue.includes(value.toLowerCase());
    });
    setDataTable(result);
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
                        onChange={(e) => {
                          filterData(String(col.accessor), e.target.value);
                        }}
                      >
                        <option selected>Escolha uma opção</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        id={String(col.accessor)}
                        placeholder={keysToFilter.find((item) => item.keyName === String(col.accessor))?.placeholder}
                        className="bg-white border p-2 rounded mr-2 text-xs w-full"
                        onChange={(e) => {
                          const fieldValue = e.target.value.trim();
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
          {dataTable.length > 0 ? (
            dataTable.map((row, idx) => (
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
          {pageable && (
            <tr>
              <td className="px-4 py-2 border-t text-sm" colSpan={columns.length}>
                {/* Pagination controls would go here */}
                Pagination Controls Placeholder
              </td>
            </tr>
          )}
        </tfoot>
      </table>
    </>
  );
}

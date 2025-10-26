interface DataTableProps {
  columns: { header: string; accessor: string | number; className?: string }[];
  data: Record<string, number | string>[];
}

const DataTable = ({ columns, data }: DataTableProps) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100 text-left">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className={`px-4 py-2 text-sm font-semibold border-b ${col.className ?? ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={String(col.accessor)} className={`px-4 py-2 border-b text-sm ${col.className ?? ""}`}>
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
      </table>
    </div>
  );
};

export { DataTable };

import type { PaginationData } from "../../interfaces/data-table.interface.ts";

interface PaginationProps {
  pagination: PaginationData;
  onPageChange: (page: number) => void;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
}

export function Pagination({ pagination, onPageChange, onNextPage, onPreviousPage }: PaginationProps) {
  if (!pagination) return null;

  const { currentPage, totalPages } = pagination;
  const maxVisiblePages = 5;

  const startPage = Math.floor(currentPage / maxVisiblePages) * maxVisiblePages;
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages - 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) pages.push(i);

  return (
    <div className="flex items-center gap-2">
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
}

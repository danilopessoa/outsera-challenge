export interface Column<T> {
  header: string;
  accessor: keyof T;
}

export interface PaginationData {
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
  isFirst: boolean;
  isLast: boolean;
}

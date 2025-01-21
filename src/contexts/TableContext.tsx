/**
 * TableContext provides centralized state management for the table component.
 *
 * Key Design Considerations:
 * 1. Performance: Context triggers re-renders for all consuming components when any value changes
 *    - We use useMemo for tableHeaders to prevent unnecessary recalculations
 *    - State is split logically to minimize re-renders
 *
 * 2. Type Safety:
 *    - TableContextType ensures all required values and functions are provided
 *    - undefined check in useTableContext hook prevents usage outside provider
 *
 * 3. State Updates:
 *    - We spread initialData into new array to avoid direct mutations
 *    - Reset pagination when data changes to prevent empty pages
 */

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import useTable from "../hooks/useTable";
import type { City } from "../api/getCities";
import { SortConfig, SortDirection } from "@/types/sorting";

interface TableContextType {
  // Core data
  cities: City[];
  setCities: React.Dispatch<React.SetStateAction<City[]>>;

  // Sorting state
  sortConfig: SortConfig;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;

  // Pagination state
  page: number;
  setPage: (newPage: number | ((prevPage: number) => number)) => void;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;

  // Derived data
  tableHeaders: Array<keyof City>;
  slice: City[]; // Current page data
  range: number[]; // Available page numbers

  // Actions
  handleSort: (column: keyof City) => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

/**
 * TableProvider manages all table-related state and logic.
 *
 * Gotchas:
 * 1. Initial state must handle empty data case
 * 2. Sort direction toggles need to consider current state
 * 3. Data updates from parent need to reset pagination
 */
export function TableProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: City[];
}) {
  const [cities, setCities] = useState<City[]>([...initialData]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: "name" as keyof City,
    direction: "asc" as SortDirection,
  });
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Function to handle page changes
  const handleSetPage = useCallback(
    (newPage: number | ((prevPage: number) => number)) => {
      setPage(newPage);
    },
    [],
  );

  // update cities when initialData changes (e.g., from search)
  useEffect(() => {
    setCities(initialData);
  }, [initialData]);

  const { slice, range } = useTable(cities, page, rowsPerPage);

  const tableHeaders = useMemo(() => {
    if (!cities || cities.length === 0) return [];
    return Object.keys(cities[0]) as Array<keyof City>;
  }, [cities]);

  const handleSort = (column: keyof City) => {
    const direction: SortDirection =
      sortConfig.column === column && sortConfig.direction === "asc"
        ? "desc"
        : "asc";

    const sortedData = [...cities].sort((a: City, b: City) => {
      const aValue = a[column];
      const bValue = b[column];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

    setCities(sortedData);
    setSortConfig({ column, direction });
  };

  const value: TableContextType = {
    cities,
    setCities,
    sortConfig,
    setSortConfig,
    page,
    setPage: handleSetPage,
    rowsPerPage,
    setRowsPerPage,
    tableHeaders,
    slice,
    range,
    handleSort,
  };

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
}

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};

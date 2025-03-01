/**
 * TableHeader Component
 *
 * Renders the table header with sorting functionality.
 *
 * Implementation Decisions:
 * 1. Uses context for state management to avoid prop drilling
 * 2. Implements click-to-sort on column headers
 * 3. Visual feedback for sort direction
 *
 * Trade-offs:
 * - Uses simple arrow indicators instead of more complex sort visualizations
 *   + Pros: Lightweight, clear UX
 *   - Cons: Limited visual feedback
 *
 * - Relies on context for all data
 *   + Pros: Cleaner component API
 *   - Cons: Less explicit data flow
 *
 * Gotchas:
 * - Header keys must match City type properties exactly
 * - Sort icons might need adjustment for different themes
 * - Using index as key in map function (potential issue with dynamic headers)
 */
import { useTableContext } from "@/contexts/TableContext";
import { City } from "@/api/getCities";

export default function TableHeader() {
  const { tableHeaders, sortConfig, handleSort } = useTableContext();

  const getSortIcon = (columnName: keyof City) => {
    
    if (sortConfig.column === columnName) {
      return sortConfig.direction === "asc" ? (
        <p className="inline w-4 h-4">↑</p>
      ) : (
        <p className="inline w-4 h-4">↓</p>
      );
    }
    return null;
  };

  return (
    <>
      <thead className=" text-[#f8f5f2] bg-[#005961] sticky top-0">
        <tr>
          {/* rendering the tableHeader array passed in from table */}
          {tableHeaders.map((header, i) => (
            <th
              key={i}
              scope="col"
              className="px-4 whitespace-nowrap md:px-6 md:py-4 font-semibold hover:bg-[rgb(10,128,128)] cursor-pointer transition-colors duration-200px-6 py-4 border-b"
              onClick={() => handleSort(header)}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="hidden md:block">{header}</span>
                <span className="md:hidden">
                  {/* Shortened header text for mobile */}
                  {header}
                </span>
                {getSortIcon(header)}
              </div>
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
}

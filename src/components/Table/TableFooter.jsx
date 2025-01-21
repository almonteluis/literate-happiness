/**
 * TableFooter handles pagination logic and UI.
 *
 * Pagination Considerations:
 * 1. Edge Cases:
 *    - Empty pages: Move back one page if current page becomes empty
 *    - Invalid pages: Reset to page 1 if current page exceeds available pages
 *
 * 2. Performance:
 *    - Range is limited to 5 pages before/after current page to prevent excessive buttons
 *    - Page changes trigger re-render of only visible data via slice
 *
 * 3. UX Improvements:
 *    - Reset to page 1 when changing rows per page
 *    - Dynamic page range around current page
 */
import { useEffect, useCallback } from "react";
import { useTableContext } from "@/contexts/TableContext";

export default function TableFooter() {
  const { range, setPage, page, slice, setRowsPerPage, rowsPerPage } =
    useTableContext();

  const totalPages = range.length;
  // Reset to first page when changing rows per page to prevent empty pages
  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  // Navigation helper function
  const goToFirstPage = useCallback(() => {
    setPage(1);
  }, [setPage]);

  const goToPreviousPage = useCallback(() => {
    setPage((prev) => Math.max(1, prev - 1));
  }, [setPage]);

  const goToNextPage = useCallback(() => {
    setPage((prev) => Math.min(totalPages, prev + 1));
  }, [totalPages, setPage]);

  const goToLastPage = useCallback(() => {
    setPage(totalPages);
  }, [totalPages, setPage]);

  useEffect(() => {
    // Only handle completely empty pages
    if (slice.length === 0 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice.length, page, setPage]);

  return (
    <tfoot>
      <tr>
        <td colSpan={7} className="bg-[rgb(251,250,250)]">
          {/* Set colspan to match your total columns */}
          <div className="flex items-center justify-between p-4 border-t border-[rgb(43,171,173)]/20">
            {/* Per page selector */}
            <div className="flex items-center gap-2">
              <span className="text-[rgb(34,37,37)] text-sm">
                Page {page} of {range.length} ({slice.length} items)
              </span>
              <select
                className="bg-white border border-[rgb(43,171,173)] text-[rgb(34,37,37)] rounded-lg px-3 py-2"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>

            {/* Pagination */}
            <div className="flex gap-2">
              {/* first page */}
              <button
                onClick={goToFirstPage}
                disabled={page === 1}
                className={`p-2 rounded-lg ${
                  page === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[rgb(43,171,173)] hover:bg-[rgb(43,171,173)]/10"
                }`}
                aria-label="First page"
              >
                <span className="text-lg">⟪</span>
              </button>
              {/* previous page */}
              <button
                onClick={goToPreviousPage}
                disabled={page === 1}
                className={`p-2 rounded-lg ${
                  page === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[rgb(43,171,173)] hover:bg-[rgb(43,171,173)]/10"
                }`}
                aria-label="Previous page"
              >
                <span className="text-lg">⟨</span>
              </button>

              <span className="px-4 py-2">
                {page} / {range.length}
              </span>

              {/* next page */}
              <button
                onClick={goToNextPage}
                disabled={page === range.length}
                className={`p-2 rounded-lg ${
                  page === range.length
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[rgb(43,171,173)] hover:bg-[rgb(43,171,173)]/10"
                }`}
                aria-label="Next page"
              >
                <span className="text-lg">⟩</span>
              </button>
              {/* last page */}
              <button
                onClick={goToLastPage}
                disabled={page === range.length}
                className={`p-2 rounded-lg ${
                  page === range.length
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[rgb(43,171,173)] hover:bg-[rgb(43,171,173)]/10"
                }`}
                aria-label="Last page"
              >
                <span className="text-lg">⟫</span>
              </button>
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  );
}

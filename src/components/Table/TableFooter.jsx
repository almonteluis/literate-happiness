/* eslint-disable react/prop-types */
import { useEffect } from "react";

export default function TableFooter({
  range,
  setPage,
  page,
  slice,
  setRowsPerPage,
  rowsPerPage,
}) {
  // handle function for rows per page change with reset page to first page
  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  // handle pagination edge cases
  /// 1. If we're on a page (not page 1) and it becomes empty (slice.length < 1),
  //    move back one page
  // 2. If we have fewer items than the current page number,
  //    reset to page 1 (this can happen when filtering or changing rows per page)
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    } else if (slice.length < page) {
      setPage(1);
    }
  }, [slice, page, setPage]);

  return (
    <tfoot>
      <tr>
        <td colSpan={7} className="bg-[rgb(251,250,250)]">
          {/* Set colspan to match your total columns */}
          <div className="flex items-center justify-between p-4 border-t border-[rgb(43,171,173)]/20">
            {/* Per page selector */}
            <div className="flex items-center gap-2">
              <span className="text-[rgb(34,37,37)] text-sm">Per page:</span>
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
              {/* starting and ending the range with 5 pages before & after current page */}
              {range
                .slice(Math.max(0, page - 5), Math.min(range.length, page + 5))
                .map((el, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(el)}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 
                    ${
                      page === el
                        ? "bg-[rgb(43,171,173)] text-white"
                        : "bg-white text-[rgb(34,37,37)] border border-[rgb(43,171,173)] hover:bg-[rgb(43,171,173)]/10"
                    }`}
                  >
                    {el}
                  </button>
                ))}
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  );
}

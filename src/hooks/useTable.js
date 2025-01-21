/**
 * useTable Hook
 *
 * Handles pagination logic and data slicing for the table component.
 *
 * Key Design Considerations:
 * 1. Performance:
 *    - Calculates range and slice together to minimize state updates
 *    - Uses single useEffect to handle both calculations
 *
 * 2. Edge Cases:
 *    - Handles empty data arrays
 *    - Validates page numbers to prevent out-of-bounds access
 *    - Ensures slice size matches rowsPerPage
 *
 * Trade-offs:
 * - Recalculates entire range array on every update instead of storing fixed range
 *   + Pros: Always in sync with data length changes
 *   - Cons: Performance impact on large datasets
 *
 * - Uses simple array slice instead of virtualization
 *   + Pros: Simpler implementation, works well for moderate data sizes
 *   - Cons: May have performance issues with very large datasets
 *
 * Future Improvements:
 * - Consider implementing virtualization for large datasets
 * - Add caching for frequently accessed page ranges
 */

import { useState, useEffect } from "react";

const calculateDataRange = (data, rowsPerPage) => {
  // Calculate total number of pages needed
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Create array of page number starting from 1 to totalPages
  return Array.from({ length: totalPages }, (_, index) => index + 1);
};

const sliceData = (data, page, rowsPerPage) => {
  // Calculate start and end indices for the current page
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  return data.slice(startIndex, endIndex);
};

const useTable = (data, page, rowsPerPage) => {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);

  // Calculate range and slice together
  useEffect(() => {
    const range = calculateDataRange(data, rowsPerPage);

    // Validate current page
    const maxPage = Math.ceil(data.length / rowsPerPage);
    const currentPage = Math.min(Math.max(1, page), maxPage);
    const currentSlice = sliceData(data, currentPage, rowsPerPage);

    setTableRange(range);
    setSlice(currentSlice);
  }, [data, page, rowsPerPage]);

  return {
    slice,
    range: tableRange,
    totalPages: Math.ceil((data?.length || 0) / rowsPerPage),
  };
};

export default useTable;

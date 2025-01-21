// * TableRow Component
//  *
//  * Renders table rows using data from context.
//  *
//  * Implementation Decisions:
//  * 1. Dynamic column rendering based on tableHeaders
//  * 2. String conversion for all cell values
//  * 3. Compound keys for better React reconciliation
//  *
//  * Trade-offs:
//  * - Converts all values to strings
//  *   + Pros: Simple, consistent rendering
//  *   - Cons: Loses type information, might need formatting
//  *
//  * - Uses context for data access
//  *   + Pros: Simpler component, no prop drilling
//  *   - Cons: Less explicit about data dependencies
//  *
//  * Gotchas:
//  * - Key generation might need improvement for better uniqueness
//  * - No cell formatting options (all values rendered as strings)
//  *
//  * Future Improvements:
//  * - Add cell formatting options

import { useTableContext } from "@/contexts/TableContext";

// TableRow component renders the table body with city data
// It maps through the slice array and displays each city's properties in a row
export default function TableRow() {
  const { slice, tableHeaders } = useTableContext();
  return (
    <>
    <tbody className="bg-[#f8f5f2]">
      {/* Map through each city in the slice and create a table row */}
      {slice.map((city) => (
        <tr
          key={city.id}
          className="bg-[#f8f5f2] border-b hover:bg-[#005961]/10"
        >
          {tableHeaders.map((header) => (
            <td
              key={`${city.id}-${header}`}
              className="px-6 py-4 text-text-primary dark:text-text-primary-dark whitespace-nowrap border-b"
            >
              {String(city[header])}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
    </>
  );
}

import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableFooter from "./TableFooter";

export default function SortableTable({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader />
            {/* add skeleton loading for table */}
            {isLoading ? (
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(7)].map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ) : (
              <TableRow />
            )}
          </table>
        </div>
        <TableFooter />
      </div>
    </>
  );
}

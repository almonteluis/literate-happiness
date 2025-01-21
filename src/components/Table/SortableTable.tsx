import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableFooter from "./TableFooter";

export default function SortableTable() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* This wrapper ensures proper horizontal scroll on mobile */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader />
            <TableRow />
          </table>
        </div>
        <TableFooter /> {/* Footer outside scroll area */}
      </div>
    </>
  );
}

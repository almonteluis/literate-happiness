import { useState, useMemo } from "react";
import TableHeader from "./TableHeader";
import type { City } from "../../api/getCities";
import TableRow from "./TableRow";
import TableFooter from "./TableFooter";
import useTable from "../../hooks/useTable";

interface TableProps {
  data: City[];
  rowsPerPage: number;
}

export default function Table({ data }: TableProps) {
  // setting up state for pagnation
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { slice, range } = useTable(data, page, rowsPerPage);

  // using the first entry im grabbing each column header text and storing in a variable
  const tableHeaders = useMemo(() => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]);
  }, [data]);

  return (
    <table className="w-full overflow-x-auto shadow:md sm:rounded-lg">
      <TableHeader tableHeaders={tableHeaders} />
      <TableRow slice={slice} />
      <TableFooter
        range={range}
        slice={slice}
        setPage={setPage}
        page={page}
        setRowsPerPage={setRowsPerPage}
        rowsPerPage={rowsPerPage}
      />
    </table>
  );
}

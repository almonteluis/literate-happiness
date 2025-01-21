import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableFooter from "./TableFooter";

export default function Table() {
  return (
    <table className="w-full overflow-x-auto shadow:md sm:rounded-lg">
      <TableHeader />
      <TableRow />
      <TableFooter />
    </table>
  );
}

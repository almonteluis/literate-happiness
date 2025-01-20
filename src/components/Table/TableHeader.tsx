interface TableHeaderProps {
  tableHeaders: string[];
}
export default function TableHeader({ tableHeaders }: TableHeaderProps) {
  return (
    <thead>
      <tr>
        {/* rendering the tableHeader array passed in from table */}
        {tableHeaders.map((header, i) => (
          <th key={i} scope="col">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

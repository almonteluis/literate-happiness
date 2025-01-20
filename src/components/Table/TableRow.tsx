import type { City } from "../../api/getCities";

// Props interface for the TableRow component that expects a slice of City data
interface SliceProps {
  slice: City[];
}

// TableRow component renders the table body with city data
// It maps through the slice array and displays each city's properties in a row
export default function TableRow({ slice }: SliceProps) {
  return (
    <tbody>
      {/* Map through each city in the slice and create a table row */}
      {slice.map((value, key) => (
        <tr key={key}>
          {/* Each cell displays a specific property of the city with consistent styling */}
          <td className="text-text-primary dark:text-text-primary-dark">
            {value.id}
          </td>
          <td className="text-text-primary dark:text-text-primary-dark">
            {value.name}
          </td>
          <td className="text-text-primary dark:text-text-primary-dark">
            {value.nameAscii}
          </td>
          <td className="text-text-primary dark:text-text-primary-dark">
            {value.country}
          </td>
          <td className="text-text-primary dark:text-text-primary-dark">
            {value.countryIso3}
          </td>
          <td className="text-text-primary dark:text-text-primary-dark">
            {value.capital}
          </td>
          <td className="text-text-primary dark:text-text-primary-dark">
            {value.population}
          </td>
        </tr>
      ))}
    </tbody>
  );
}
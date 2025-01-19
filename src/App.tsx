import "./index.css";

import { useEffect, useCallback, useState, useMemo } from "react";
import type { ChangeEvent } from "react";

import type { City } from "./api/getCities";
import { getCities } from "./api/getCities";

import RootLayout from "./features/RootLayout/RootLayout";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const runSearch = useCallback(async (term: string) => {
    try {
      const searchResult = await getCities({ searchTerm: term });
      setCities(searchResult);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        // Handle non-Error exceptions
        setError(new Error("An unexpected error occurred"));
      }
    }
  }, []);

  const tableHeaders = useMemo(() => {
    if (!cities || cities.length === 0) return [];
    return Object.keys(cities[0]);
  }, [cities]);

  useEffect(() => {
    runSearch(searchTerm);
  }, [runSearch, searchTerm]);

  const onSearchTermChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
  };

  return (
    <RootLayout>
      <h1 className="text-text-primary dark:text-text-primary-dark">
        City List
      </h1>
      <form>
        <label
          className="text-text-primary dark:text-text-primary-dark"
          htmlFor="search"
        >
          Search
        </label>
        <input
          id="search"
          name="search"
          type="text"
          value={searchTerm}
          onChange={onSearchTermChange}
          className="border"
        />
      </form>
      {error ? (
        <div className="text-text-primary dark:text-text-primary-dark">{`Eek! ${error.message}`}</div>
      ) : (
        <table>
          <thead>
            <tr>
              {tableHeaders.map((header, i) => (
                <th key={i} scope="col">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          {cities.map((s) => (
            <>
              <tbody>
                <tr>
                  <td className="text-text-primary dark:text-text-primary-dark">
                    {s.id}
                  </td>
                  <td className="text-text-primary dark:text-text-primary-dark">
                    {s.name}
                  </td>
                  <td className="text-text-primary dark:text-text-primary-dark">
                    {s.nameAscii}
                  </td>
                  <td className="text-text-primary dark:text-text-primary-dark">
                    {s.country}
                  </td>
                  <td className="text-text-primary dark:text-text-primary-dark">
                    {s.countryIso3}
                  </td>
                  <td className="text-text-primary dark:text-text-primary-dark">
                    {s.capital}
                  </td>
                  <td className="text-text-primary dark:text-text-primary-dark">
                    {s.population}
                  </td>
                </tr>
              </tbody>
            </>
          ))}
        </table>
      )}
    </RootLayout>
  );
};

export default App;

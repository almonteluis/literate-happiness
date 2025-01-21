/**
 * App component demonstrates proper Context usage.
 *
 * Key Points:
 * 1. Provider Placement:
 *    - TableProvider wraps only the Table component, not the entire app
 *    - This prevents unnecessary re-renders of unrelated components
 *
 * 2. Error Handling:
 *    - Table is only rendered if there's no error
 *    - Error state prevents invalid data from reaching the context
 *
 * 3. Data Flow:
 *    - Search results flow through initialData prop to context
 *    - Context handles internal updates and sorting
 */

import "./index.css";
import { TableProvider } from "./contexts/TableContext";
import { useEffect, useCallback, useState } from "react";
import type { ChangeEvent } from "react";
import type { City } from "./api/getCities";
import { getCities } from "./api/getCities";
import RootLayout from "./features/RootLayout/RootLayout";
import Table from "@/components/Table/Table";

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
        // moved table to separate component
        <TableProvider initialData={cities}>
          <Table />
        </TableProvider>
      )}
    </RootLayout>
  );
};

export default App;

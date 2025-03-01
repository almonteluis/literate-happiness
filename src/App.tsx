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
import { useEffect, useCallback, useState, ChangeEvent } from "react";
import type { City } from "./api/getCities";
import { getCities } from "./api/getCities";
import RootLayout from "./features/RootLayout/RootLayout";
import SortableTable from "@/components/Table/SortableTable";
import { getCachedCities, setCachedCities } from "./utils/cityCache";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // to remove loading screen once everything is rendered
  useEffect(() => {
    const loader = document.getElementById("initial-loader");
    if (loader) {
      loader.remove();
    }
  }, []);

  const runSearch = useCallback(async (term: string) => {
    setError(null);
    try {
      // added caching to improve performance after inital load
      setIsDataLoading(true);
      if (!term) {
        const cached = getCachedCities();
        if (cached) {
          setCities(cached);
          setIsDataLoading(false);
          return;
        }
      }

      const searchResult = await getCities({ searchTerm: term });
      if (!term) {
        setCachedCities(searchResult);
      }
      setCities(searchResult);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        // Handle non-Error exceptions
        setError(new Error("An unexpected error occurred"));
      }
    } finally {
      setIsDataLoading(false);
    }
  }, []);

  useEffect(() => {
    runSearch(searchTerm);
  }, [runSearch, searchTerm]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const cached = getCachedCities();
        if (cached) {
          setCities(cached);
          setIsDataLoading(false);
          return;
        }

        await runSearch(""); // Just await the function
        // Don't need to set cities here since runSearch already does it
      } finally {
        setIsDataLoading(false);
      }
    };

    loadInitialData();
  }, [runSearch]);

  const onSearchTermChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
  };

  // prevent default form submission & set search term with value from input
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputElement = formData.get("search") as string;
    setSearchTerm(inputElement);
  };

  return (
    <RootLayout>
      <h1 className="text-text-primary text-center dark:text-text-primary-dark">
        City List
      </h1>
      <form className="flex justify-center py-3" onSubmit={handleFormSubmit}>
        <div className="relative max-w-md mx-auto">
          <input
            id="search"
            name="search"
            type="text"
            value={searchTerm}
            onChange={onSearchTermChange}
            placeholder="Search for a city"
            className="w-full rounded-lg text-md border border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 pl-8"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
            </svg>
          </span>
        </div>
      </form>

      {error ? (
        <div className="text-text-primary dark:text-text-primary-dark">{`Eek! ${error.message}`}</div>
      ) : (
        // moved table to separate component
        <TableProvider initialData={cities}>
          <SortableTable isLoading={isDataLoading} />
        </TableProvider>
      )}
    </RootLayout>
  );
};

export default App;

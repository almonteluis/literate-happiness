import "./index.css";

import { useEffect, useCallback, useState } from "react";
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
        cities.map((s) => (
          <div
            className="text-text-primary dark:text-text-primary-dark"
            key={s.id}
          >
            {JSON.stringify(s)}
          </div>
        ))
      )}
    </RootLayout>
  );
};

export default App;

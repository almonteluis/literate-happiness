import type { City } from "../api/getCities";

// Define possible sort directions
export type SortDirection = "asc" | "desc";

// Define the structure for sort configuration
export interface SortConfig {
  column: keyof City;
  direction: SortDirection;
}

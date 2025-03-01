/**
 * City Cache Implementation
 *
 * Problem:
 * Initial load of 10,000 cities takes 6 seconds, creating poor UX.
 *
 * Solution:
 * Implement client-side caching using localStorage with time-based invalidation.
 *
 * Trade-offs:
 * + Pros:
 *   - Significantly reduces subsequent load times
 *   - Works offline once cached
 *   - Simple implementation without external dependencies
 *
 * - Cons:
 *   - Uses browser storage (5-10MB limit)
 *   - May serve stale data within cache window
 *   - Not shared across tabs/browsers
 *
 * Gotchas:
 * 1. localStorage quota limits
 * 2. JSON.parse can fail on corrupt data
 */

import { City } from "@/api/getCities";
const CACHE_KEY = "city-cache";
const CACHE_EXPIRY = 1000 * 60 * 5; // 5 MINUTES

interface CacheData {
  cities: City[];
  timestamp: number;
}

export const getCachedCities = () => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;

  const { cities, timestamp }: CacheData = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_EXPIRY) {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
  return cities;
};

/**
 * Retrieves cached cities if available and not expired
 * Returns null if:
 * - No cache exists
 * - Cache has expired
 * - Cache data is corrupted
 */
export const setCachedCities = (cities: City[]) => {
  const cachedData: CacheData = {
    cities,
    timestamp: Date.now(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));
};

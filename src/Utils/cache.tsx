const cache: any = {}; // Object to store cached data
const CACHE_TTL: number = 1800; // Cache TTL in seconds (1/2 hour)

// Function to set data in the cache
export function setCache(key: any, data: any) {
  cache[key] = {
    data: data,
    timestamp: Date.now(),
  };
}

// Function to get data from the cache
export function getCache(key: any) {
  const cachedData = cache[key];
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL * 1000) {
    // Data is within TTL, return it
    return cachedData.data;
  } else {
    // Data not found in cache or expired
    delete cache[key]; // Remove expired data from cache
    // console.log(`${cachedData && Date.now() - cachedData.timestamp} : deleting cache`);
    return null;
  }
}

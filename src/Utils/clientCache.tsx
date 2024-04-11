const CACHE_TTL: number = 1800; // Cache TTL in seconds (1/2 hour)

// Function to set data in the cache
export function setCache(key: any, data: any) {
  const StorageData = {
    data: data,
    timestamp: Date.now(),
  };
  sessionStorage?.setItem(key, JSON.stringify(StorageData));
}

// Function to get data from the cache
export function getCache(key: any) {
  const StorageData: any = sessionStorage?.getItem(key) || null;
  const cachedData: any = JSON.parse(StorageData);
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL * 1000) {
    // Data is within TTL, return it
    return cachedData?.data;
  } else {
    // Data not found in cache or expired
    cachedData && sessionStorage?.removeItem(key); // Remove expired data from cache
    // console.log(`${cachedData && Date.now() - cachedData.timestamp} : deleting cache`);
    return null;
  }
}

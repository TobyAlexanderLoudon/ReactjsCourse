import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialData = []) {
  const [fetchedData, setFetchedData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserPlacesData() {
      setIsLoading(true);

      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError(
          error.message ||
            "An error occurred while fetching data. Please try again later.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserPlacesData();
  }, [fetchFn]);

  return {
    fetchedData,
    setFetchedData,
    isLoading,
    setIsLoading,
    error,
    setError,
  };
}

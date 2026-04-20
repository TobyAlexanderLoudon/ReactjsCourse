import Places from "./Places.jsx";
import ErrorPage from "./ErrorPage.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";

async function getSortedPlacesByDistance() {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaced = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude,
      );
      resolve(sortedPlaced);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    fetchedData: availablePlaces,
    setFetchedData: setAvailablePlaces,
    isLoading,
    setIsLoading,
    error,
    setError,
  } = useFetch(getSortedPlacesByDistance, []);

  if (error) {
    return <ErrorPage title={"An error occurred"} message={error} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Loading places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

import { useEffect, useState } from "react";

import Places from "./Places.jsx";
import ErrorPage from "./ErrorPage.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPlaces() {
      try {
        const places = await fetchAvailablePlaces();

        const currentPosition = navigator.geolocation.getCurrentPosition(
          (position) => {
            const sortedPlaced = sortPlacesByDistance(
              places,
              position.coords.latitude,
              position.coords.longitude,
            );
            setAvailablePlaces(sortedPlaced);
            setIsLoading(false);
          },
          (error) => {
            console.error("Error getting user's location:", error);
            setAvailablePlaces(places);
            setIsLoading(false);
          },
        );
      } catch (error) {
        setError(
          error.message ||
            "An error occurred while fetching places. Please try again later.",
        );
        setIsLoading(false);
      }
    }

    getPlaces();
  }, []);

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

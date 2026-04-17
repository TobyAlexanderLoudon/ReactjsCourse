export async function fetchAvailablePlaces() {
  try {
    const response = await fetch("http://localhost:3000/places");
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch places");
    }

    return data.places;
  } catch (error) {
    throw new Error(
      error.message ||
        "An error occurred while fetching places. Please try again later.",
    );
  }
}

export async function updateSelectedPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ places }),
  });

  if (!response.ok) {
    throw new Error("Failed to update selected places");
  }

  const data = await response.json();

  return data.message;
}

export async function fetchUserPlaces() {
  try {
    const response = await fetch("http://localhost:3000/user-places");
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch user places");
    }

    return data.places;
  } catch (error) {
    throw new Error(
      error.message ||
        "An error occurred while fetching user places. Please try again later.",
    );
  }
}
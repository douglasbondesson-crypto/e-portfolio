function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function isNumber(value) {
    return typeof value === "number";
}

function computeDistanceKm(userLocation, placeLocation) {
    if (!userLocation || !placeLocation) return null;
    const lat1 = userLocation.lat;
    const lng1 = userLocation.lng;
    const lat2 = placeLocation.lat;
    const lng2 = placeLocation.lng;
    if (![lat1, lng1, lat2, lng2].every(isNumber)) return null;

    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return 6371 * c;
}

// Påhittade platser: inga användaruppgifter eller externa API-anrop.
const userLocation = { lat: 0, lng: 0 };
const restaurants = [
    { name: "Exempelköket", location: { lat: 0, lng: 1 } },
    { name: "Samma plats", location: { lat: 0, lng: 0 } },
    { name: "Okänd plats", location: null },
];

for (const restaurant of restaurants) {
    const distanceKm = computeDistanceKm(userLocation, restaurant.location);
    const label = distanceKm === null
        ? "Avstånd saknas"
        : `${distanceKm.toFixed(1)} km`;
    console.log(`${restaurant.name}: ${label}`);
}

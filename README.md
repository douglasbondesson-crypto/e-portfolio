# Douglas Bondesson – E-Portfolio

## About me
I am studying for a Master of Science in Engineering in Information Technology at KTH Royal Institute of Technology.  
I am interested in programming, problem solving, and building practical technical solutions.

Contact: douglas.bondesson@gmail.com  
LinkedIn: https://www.linkedin.com/in/douglas-bondesson-642b043b0

## Projects

### Meet & Eat (Group Project)
A group project developed at KTH where users can vote together to choose a restaurant.

**My contribution:**
- Implemented voting logic
- Integrated Google Places API
- Worked with views and frontend logic
- Collaborated with team members to integrate functionality into the final solution

**Technologies used:**
JavaScript, REST API, JSON, Google Places API

**Source code:** The group repository is hosted on KTH's private Git service and is not publicly accessible. Access can be provided on request.

## Runnable code example: distance to restaurants

In the Meet & Eat school project, restaurant options needed to display the distance from the user's location. This runnable JavaScript proof of concept calculates the straight-line distance in kilometres using the Haversine formula and handles missing locations.

### Origin and simplifications

The functions `toRadians`, `isNumber`, and `computeDistanceKm` are unchanged from my contribution to the group project.

The example has been simplified by extracting the functions from the application. React, location permissions, API calls, and the rest of the project are omitted. A small demonstration uses fictional coordinates and prints the results to the terminal. No packages, API keys, or personal data are required.

### Core code

The 24 core lines below are included in the [complete code example](distance-example.mjs), which also contains a short demonstration with sample data:

```javascript
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
```

`toRadians` converts degrees to radians for the trigonometric functions. The location checks return `null` if either location is missing or any coordinate is not of type `number`. The Haversine formula calculates the angle between the points; multiplying it by the Earth's radius of 6,371 km gives the distance. The demonstration then formats the result to one decimal place and displays a message for `null`.

### How to run

With Node.js 18 or later installed, run this command from the repository root:

```sh
node distance-example.mjs
```

Expected output:

```text
Example Kitchen: 111.2 km
Same location: 0.0 km
Unknown location: Distance unavailable
```

### Limitations

The distance is an estimate based on a spherical Earth and represents a straight-line distance, not a walking route, driving route, or travel time. The original basic type check does not reject `NaN`, infinite values, or coordinates outside valid ranges. This example uses valid, fictional coordinates; more comprehensive validation and protection against rounding errors for nearly antipodal points are not included.

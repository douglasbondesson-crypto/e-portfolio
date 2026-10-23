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

## Körbart kodexempel: avstånd till restauranger

I skolprojektet Meet & Eat behövde restaurangalternativ visa avståndet från användarens position. Det här körbara proof-of-concept-exemplet i JavaScript beräknar fågelvägsavstånd i kilometer med Haversines formel och hanterar att en position saknas.

### Ursprung och förenkling

Funktionerna `toRadians`, `isNumber` och `computeDistanceKm` är oförändrade från min del av projektarbetet.

Exemplet har förenklats genom att funktionerna lyfts ut ur appen. React, platsbehörigheter, API-anrop och övrig projektkod ingår inte. En ny, liten kördel använder påhittade koordinater och skriver resultat till terminalen. Inga paket, API-nycklar eller personuppgifter behövs.

### Central kod

De 24 centrala raderna nedan finns i [hela kodexemplet](distance-example.mjs), som även innehåller en liten kördel med exempeldata:

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

`toRadians` omvandlar grader till radianer för de trigonometriska funktionerna. Positionskontrollerna returnerar `null` om en position saknas eller någon koordinat inte har typen `number`. Haversines formel ger vinkeln mellan punkterna; multiplikation med jordradien 6 371 km ger avståndet. Kördelen formaterar sedan resultatet med en decimal och visar en text för `null`.

### Körning

Med Node.js 18 eller senare, kör från repots rot:

```sh
node distance-example.mjs
```

Förväntat resultat:

```text
Exempelköket: 111.2 km
Samma plats: 0.0 km
Okänd plats: Avstånd saknas
```

### Begränsningar

Avståndet är en uppskattning på en sfärisk jord och beskriver fågelvägen, inte gångväg, bilväg eller restid. Originalets enkla typkontroll avvisar inte `NaN`, oändliga tal eller koordinater utanför giltiga intervall. Exemplet använder giltiga, påhittade koordinater; mer omfattande validering och skydd mot avrundningsfel vid nästan antipodala punkter ingår inte.

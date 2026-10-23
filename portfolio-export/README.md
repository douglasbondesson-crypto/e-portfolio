# Avstånd till restauranger

I skolprojektet Meet & Eat behövde restaurangalternativ visa avståndet från användarens position. Det här fristående JavaScript-exemplet beräknar fågelvägsavstånd i kilometer med Haversines formel och hanterar att en position saknas.

## Ursprung och förenkling

Funktionerna `toRadians`, `isNumber` och `computeDistanceKm` är oförändrade från min del av `src/sources/preferenceSource.js`, tillagd av Douglas Bondesson i commit `ea12dff`. Publicering av min egen del har bekräftats som tillåten inför exporten.

Exemplet har förenklats genom att funktionerna lyfts ut ur appen. React, platsbehörigheter, API-anrop och övrig projektkod ingår inte. En ny, liten kördel använder påhittade koordinater och skriver resultat till terminalen. Inga paket, API-nycklar eller personuppgifter behövs.

## Central kod

De 24 raderna nedan är samma funktioner som i `distance-example.mjs`:

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

## Körning

Med Node.js 18 eller senare, kör från mappen med de två filerna:

```sh
node distance-example.mjs
```

Förväntat resultat:

```text
Exempelköket: 111.2 km
Samma plats: 0.0 km
Okänd plats: Avstånd saknas
```

## Begränsningar

Avståndet är en uppskattning på en sfärisk jord och beskriver fågelvägen, inte gångväg, bilväg eller restid. Originalets enkla typkontroll avvisar inte `NaN`, oändliga tal eller koordinater utanför giltiga intervall. Exemplet använder giltiga, påhittade koordinater; mer omfattande validering och skydd mot avrundningsfel vid nästan antipodala punkter ingår inte.

## Manuell uppladdning

Ladda endast upp `README.md` och `distance-example.mjs` från denna exportmapp till ditt personliga repo `douglasbondesson-crypto/e-portfolio`, exempelvis i en undermapp `meet-and-eat-distance/`. Inga filer från skolans repo behövs. Exporten har inte publicerats eller pushats.

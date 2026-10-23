# Douglas Bondesson – E-Portfolio

## About me
I am studying for a Master of Science in Engineering in Information Technology at KTH Royal Institute of Technology.  
I am interested in programming, problem solving, and building practical technical solutions.

Contact: douglas.bondesson@gmail.com  
LinkedIn: https://www.linkedin.com/in/douglas-bondesson-642b043b0

---

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

---

## Körbart kodexempel: restaurangomröstning

Som ett **proof-of-concept** finns här en fristående prototyp av röstningsflödet i en restaurangväljare. Exemplet är framtaget med AI-stöd för e-portföljen och är inte gruppprojektets ursprungliga kod. Det visar hur användarens knapptryck blir data, hur röster räknas och hur resultatet presenteras.

### Kör själv

1. Ladda ned repot via **Code → Download ZIP** och packa upp det, eller klona repot.
2. Öppna [examples/restaurant-vote/index.html](examples/restaurant-vote/index.html) i en webbläsare genom att dubbelklicka på den nedladdade filen. Inga paket, konton eller API-nycklar behövs. GitHubs filvy visar källkoden; själva demonstrationen körs lokalt.
3. Rösta på Pizzeria två gånger och Sushibar en gång. Pizzeria ska leda med två röster av totalt tre.
4. Rösta på Sushibar igen. Resultatet ska nu visa lika mellan Pizzeria och Sushibar.
5. Tryck på **Nollställ röster**. Alla antal ska bli noll och ingen vinnare visas.

### Kod med förklaring

Beräkningen finns i [voting.js](examples/restaurant-vote/voting.js):

```javascript
const counts = options.map(name => ({
  name,
  count: votes.filter(vote => vote === name).length
}));
const highest = Math.max(...counts.map(option => option.count));
const winners = highest === 0 ? [] : counts
  .filter(option => option.count === highest)
  .map(option => option.name);
```

- `options` innehåller restaurangerna och `votes` innehåller en restaurang per registrerad röst.
- `map` skapar en resultatpost för varje restaurang. `filter` väljer dess röster och `length` räknar dem.
- `Math.max` hittar det högsta röstetalet. Alla restauranger med det antalet returneras som ledare, så även lika resultat hanteras. Utan röster returneras en tom lista.
- Funktionen validerar att alternativen är unika och att rösterna gäller ett befintligt alternativ. Den ändrar inte indata och kan testas utan webbläsare.

I [app.js](examples/restaurant-vote/app.js) registrerar `addEventListener` knapptryck. `votes.push(name)` lägger till rösten, och `render()` anropar beräkningen och uppdaterar sidan. `textContent` används för att visa text i gränssnittet. HTML-filen innehåller struktur, enkel responsiv formgivning och ytterligare förklaringar bredvid demonstrationen.

### Avgränsning och nästa steg

Prototypen visar ett fungerande flöde från röstning till resultat. Den använder fasta restauranger och tillfällig lagring i webbläsarens minne. Omladdning nollställer rösterna. Den har ingen server, inloggning, kontroll av en röst per person eller Google Places-integration. En gemensam omröstning mellan flera användare skulle behöva serverlagring och deltagaridentifiering.

### Automatiska tester

Med Node.js installerat, kör från repots rot:

```sh
node --test examples/restaurant-vote/voting.test.js
```

Testerna kontrollerar noll röster, en ensam ledare, lika resultat och ogiltiga indata. Det manuella flödet ovan kontrollerar dessutom knappar och nollställning i webbläsaren.

const restaurants = ['Pizzeria', 'Sushibar', 'Vegetarisk restaurang'];
let votes = [];

function render() {
  const summary = summarizeVotes(restaurants, votes);
  const list = document.querySelector('#counts');
  list.replaceChildren();
  for (const { name, count } of summary.counts) {
    const item = document.createElement('li');
    item.textContent = `${name}: ${count} röster`;
    list.append(item);
  }
  document.querySelector('#result').textContent = summary.total === 0
    ? 'Inga röster ännu.'
    : summary.winners.length === 1
      ? `Leder: ${summary.winners[0]}. Totalt ${summary.total} röster.`
      : `Lika mellan: ${summary.winners.join(', ')}. Totalt ${summary.total} röster.`;
}

for (const name of restaurants) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = `Rösta på ${name}`;
  button.addEventListener('click', () => {
    votes.push(name);
    render();
  });
  document.querySelector('#options').append(button);
}

document.querySelector('#reset').addEventListener('click', () => {
  votes = [];
  render();
});
render();

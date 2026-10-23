const { test } = require('node:test');
const assert = require('node:assert/strict');
const { summarizeVotes } = require('./voting.js');
const options = ['Pizza', 'Sushi', 'Vegetariskt'];

test('inga röster ger ingen vinnare och noll för varje alternativ', () => {
  assert.deepEqual(summarizeVotes(options, []), {
    counts: options.map(name => ({ name, count: 0 })), winners: [], total: 0
  });
});
test('räknar röster och hittar en ensam ledare', () => {
  const result = summarizeVotes(options, ['Pizza', 'Sushi', 'Pizza']);
  assert.deepEqual(result.winners, ['Pizza']);
  assert.deepEqual(result.counts.map(item => item.count), [2, 1, 0]);
  assert.equal(result.total, 3);
});
test('visar alla ledare vid lika resultat', () => {
  assert.deepEqual(summarizeVotes(options, ['Pizza', 'Sushi']).winners, ['Pizza', 'Sushi']);
});
test('avvisar okända röster och ogiltiga alternativ', () => {
  assert.throws(() => summarizeVotes(options, ['Okänd']));
  assert.throws(() => summarizeVotes([], []));
  assert.throws(() => summarizeVotes(['Pizza', 'Pizza'], []));
});

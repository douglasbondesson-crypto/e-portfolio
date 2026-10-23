// Ren logik: samma funktion kan användas i webbläsaren och testas med Node.
function summarizeVotes(options, votes) {
  if (!Array.isArray(options) || options.length === 0 ||
      new Set(options).size !== options.length ||
      options.some(option => typeof option !== 'string' || !option.trim())) {
    throw new Error('Ange unika restaurangnamn.');
  }
  if (!Array.isArray(votes) || votes.some(vote => !options.includes(vote))) {
    throw new Error('Varje röst måste gälla en restaurang i listan.');
  }

  const counts = options.map(name => ({
    name,
    count: votes.filter(vote => vote === name).length
  }));
  const highest = Math.max(...counts.map(option => option.count));
  // Utan röster finns ingen vinnare. Vid lika resultat returneras alla ledare.
  const winners = highest === 0 ? [] : counts
    .filter(option => option.count === highest)
    .map(option => option.name);
  return { counts, winners, total: votes.length };
}

if (typeof module !== 'undefined') module.exports = { summarizeVotes };

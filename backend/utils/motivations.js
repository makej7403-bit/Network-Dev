const quotes = [
  "Believe you can and you're halfway there. —Theodore Roosevelt",
  "Start where you are. Use what you have. Do what you can. —Arthur Ashe",
  "The future depends on what you do today. —Mahatma Gandhi",
  "With God all things are possible. —Matthew 19:26",
  "Music gives a soul to the universe — Plato"
];

function getRandomMotivation() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

module.exports = { getRandomMotivation };

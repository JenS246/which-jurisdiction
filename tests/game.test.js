const assert = require("node:assert/strict");
const { ROUND_SIZE, cardBank, createRound, labelFor } = require("../app.js");

assert.equal(ROUND_SIZE, 10);
assert.ok(cardBank.length >= 30, "The replay deck should contain at least 30 cards.");
assert.equal(new Set(cardBank.map((card) => card.prompt)).size, cardBank.length, "Prompts must be unique.");

for (const card of cardBank) {
  assert.ok(["personal", "subject"].includes(card.answer), `Invalid answer for: ${card.prompt}`);
  assert.ok(card.prompt.length > 10 && card.prompt.length < 180, `Prompt length needs review: ${card.prompt}`);
  assert.ok(card.explanation.length > 20 && card.explanation.length < 180, `Explanation length needs review: ${card.prompt}`);
  assert.ok(!/[—–]/.test(`${card.prompt}${card.explanation}`), `Unsupported dash in: ${card.prompt}`);
}

for (let attempt = 0; attempt < 100; attempt += 1) {
  const round = createRound();
  assert.equal(round.length, ROUND_SIZE);
  assert.equal(new Set(round.map((card) => card.prompt)).size, ROUND_SIZE);
  assert.equal(round.filter((card) => card.answer === "personal").length, 5);
  assert.equal(round.filter((card) => card.answer === "subject").length, 5);
}

assert.equal(labelFor("personal"), "Personal Jurisdiction");
assert.equal(labelFor("subject"), "Subject Matter Jurisdiction");

console.log(`Validated ${cardBank.length} cards and 100 balanced rounds.`);

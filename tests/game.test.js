const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { ROUND_SIZE, cardBank, createRound, labelFor } = require("../app.js");

const projectRoot = path.join(__dirname, "..");
const indexHtml = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
const styles = fs.readFileSync(path.join(projectRoot, "styles.css"), "utf8");

assert.equal(ROUND_SIZE, 10);
assert.equal(cardBank.length, 48, "The replay deck should contain exactly 48 cards.");
assert.equal(cardBank.filter((card) => card.answer === "personal").length, 24);
assert.equal(cardBank.filter((card) => card.answer === "subject").length, 24);
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

const fixedDiversityCard = cardBank.find((card) => card.prompt.includes("citizen of Pennsylvania"));
assert.equal(
  fixedDiversityCard.prompt,
  "The plaintiff is a citizen of Pennsylvania, the defendant is a citizen of New Jersey, and the plaintiff seeks $120,000.",
);
assert.equal(
  fixedDiversityCard.explanation,
  "These facts relate to whether a federal court can hear the case based on diversity jurisdiction.",
);

for (const card of cardBank.filter((item) => /diversity/i.test(`${item.prompt} ${item.explanation}`))) {
  assert.ok(/citizen/i.test(`${card.prompt} ${card.explanation}`), `Diversity wording needs citizenship: ${card.prompt}`);
  assert.ok(!/\b(from|resides?|residence)\b/i.test(card.prompt), `Diversity prompt uses imprecise wording: ${card.prompt}`);
}

const repeatableRandom = () => 0.999999;
const firstDeterministicRound = createRound(repeatableRandom);
const secondDeterministicRound = createRound(repeatableRandom, firstDeterministicRound);
assert.notDeepEqual(
  secondDeterministicRound.map((card) => card.prompt).sort(),
  firstDeterministicRound.map((card) => card.prompt).sort(),
  "Play Again should not return the exact same set when alternatives exist.",
);
assert.equal(secondDeterministicRound.filter((card) => card.answer === "personal").length, 5);
assert.equal(secondDeterministicRound.filter((card) => card.answer === "subject").length, 5);

assert.equal(labelFor("personal"), "Personal Jurisdiction");
assert.equal(labelFor("subject"), "Subject Matter Jurisdiction");

for (const removedCopy of [
  "Civil Litigation Practice",
  "Identify the issue",
  "Who / where?",
  "What kind of case?",
  "A short recognition exercise",
  "Use keys",
]) {
  assert.ok(!indexHtml.includes(removedCopy), `Removed interface copy returned: ${removedCopy}`);
}

assert.ok(indexHtml.includes("Which kind of jurisdiction is at issue?"));
assert.ok(indexHtml.includes("Start Game"));
assert.ok(indexHtml.includes('data-screen="home"'));
assert.ok(indexHtml.includes('class="feedback-slot"'));
assert.ok(styles.includes('body[data-screen="home"]::before'));
assert.ok(styles.includes("0.24"), "The home margin rule should be visible at normal brightness.");
assert.ok(styles.includes("0.11"), "The home ruled lines should be visible at normal brightness.");
assert.ok(styles.includes("min-height: 100dvh"));
assert.ok(!styles.includes("linear-gradient"), "The redesign should not use gradients.");
assert.ok(!/[—–]/.test(indexHtml), "Visible interface copy must not use em or en dashes.");

console.log(`Validated ${cardBank.length} cards and 100 balanced rounds.`);

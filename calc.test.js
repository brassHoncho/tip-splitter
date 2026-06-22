const { test } = require("node:test");
const assert = require("node:assert");
const { tipPerPerson } = require("./calc.js");

// Each test states a known-correct answer. If the math ever drifts,
// these fail — even though the HTML would still be perfectly valid.

test("splits a tipped bill evenly between people", () => {
  // $50 + 18% tip = $59, split 2 ways = $29.50 each
  assert.strictEqual(tipPerPerson(50, 18, 2), 29.5);
});

test("handles a zero tip", () => {
  // $100 + 0% tip = $100, split 4 ways = $25 each
  assert.strictEqual(tipPerPerson(100, 0, 4), 25);
});

test("one person pays the whole tipped bill", () => {
  // $80 + 25% tip = $100, split 1 way = $100
  assert.strictEqual(tipPerPerson(80, 25, 1), 100);
});

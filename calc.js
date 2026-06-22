// The pure calculation, with NO reference to the web page.
// Input: bill amount, tip percentage, number of people.
// Output: how much each person pays (a plain number).
function tipPerPerson(bill, tipPercent, people) {
  return bill / people; // BUG: forgot to add the tip
}

// Make it available to Node's test runner (CommonJS) when running tests.
// In the browser there is no `module`, so this line is skipped and
// `tipPerPerson` is simply a normal global the page can call.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { tipPerPerson };
}

// Checks rop.js against values produced by recalculating the RCPCH
// spreadsheet formulas (ROP_screening_calculator_2024.xlsx v3.2) in LibreOffice
// for every GA week/day 22+0..42+6 x birthweights 300,1000,1499,1500,1501,1800,3500.
// Run: node tests/test_rop.js
const assert = require('assert');
const path = require('path');
const ROP = require(path.join(__dirname, '..', 'rop.js'));
const expected = require('./rop_expected.json');

let n = 0;
for (const e of expected) {
  const r = ROP.calculate(e.w, e.d, e.bw, null);
  const label = `${e.w}+${e.d} @ ${e.bw}g`;
  if (e.start === 'Not Eligible') assert.strictEqual(r.startDay, null, label);
  else assert.strictEqual(r.startDay, e.start, label);
  assert.strictEqual(r.status, e.status, label + ' status');
  n++;
}

// date arithmetic: 27 Feb 2024 + 28 days crosses a leap day; must not drift across DST
const dob = ROP.parseISODate('2024-02-27');
const r = ROP.calculate(28, 0, 1000, dob);
assert.strictEqual(r.startDay, 28); // 31+0 reached on day 21, so the 28-day minimum applies
assert.strictEqual(r.startDate.toISOString().slice(0, 10), '2024-03-26');
assert.strictEqual(r.endDate.toISOString().slice(0, 10), '2024-04-01');
assert.strictEqual(ROP.parseISODate('2024-02-30'), null);
assert.strictEqual(ROP.formatCGA(217), '31+0');
console.log(`ok - ${n} spreadsheet cases + date checks`);

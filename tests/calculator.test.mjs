import test from "node:test";
import assert from "node:assert/strict";
import { projectSavings } from "../lib/calculator.mjs";
test("zero return equals contributions", () =>
  assert.deepEqual(projectSavings(5000, 10, 0), {
    invested: 600000,
    total: 600000,
    growth: 0,
  }));
test("monthly compounding agrees with an independent deposit simulation", () => {
  let balance = 0;
  for (let month = 0; month < 120; month++) balance = balance * 1.01 + 5000;
  assert.ok(Math.abs(projectSavings(5000, 10, 12).total - balance) < 0.01);
});

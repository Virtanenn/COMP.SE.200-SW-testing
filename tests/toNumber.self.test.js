/*
Self-planned unit tests for toNumber(), based on Phase 1 test design.
These tests correspond exactly to Test Cases 01–05 defined in the plan.
*/

import chai from "chai";
const { expect } = chai;

import toNumber from "../library/src/toNumber.js";

describe("toNumber – Self-Planned Test Suite (Phase 1)", () => {

  // Test 01: Numeric input returns without change
  it("should return numeric inputs unchanged (1.5 → 1.5)", () => {
    expect(toNumber(1.5)).to.equal(1.5);
  });

  // Test 02: Numeric strings convert correctly
  it("should convert numeric strings ('2.0' → 2)", () => {
    expect(toNumber("2.0")).to.equal(2.0);
  });

  // Test 03: Whitespace is trimmed
  it("should trim whitespace before conversion (' 35 ' → 35)", () => {
    expect(toNumber(" 35 ")).to.equal(35);
  });

  // Test 04: Null is converted to zero
  it("should convert null to 0", () => {
    expect(toNumber(null)).to.equal(0);
  });

  // Test 05: Object with valueOf() should convert correctly
  it("should convert objects using valueOf() ({ valueOf: () => 5 } → 5)", () => {
    const obj = { valueOf: () => 5 };
    expect(toNumber(obj)).to.equal(5);
  });

});

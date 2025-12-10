/*
Self-planned unit tests for ceil(), based on Phase 1 test design.
These tests correspond exactly to Test Cases 01–05 defined in the plan.
*/

import chai from "chai";
const { expect } = chai;

import ceil from "../library/src/ceil.js";

describe("ceil – Self-Planned Test Suite (Phase 1)", () => {

  // Test 01: Basic rounding upward to nearest integer
  it("should round 6.007 upward to the nearest integer (result: 7)", () => {
    expect(ceil(6.007)).to.equal(7);
  });

  // Test 02: Precision rounding (2 decimal places)
  it("should round 1.004 upward to 2 decimal places (result: 1.01)", () => {
    expect(ceil(1.004, 2)).to.equal(1.01);
  });

  // Test 03: Negative number rounding upward
  it("should round -3.005 upward correctly (result: -3)", () => {
    expect(ceil(-3.005)).to.equal(-3);
  });

  // Test 04: Zero should remain zero
  it("should return 0 unchanged when input is 0", () => {
    expect(ceil(0)).to.equal(0);
  });

  // Test 05: Null should convert to 0 before rounding
  it("should convert null to 0 and return 0", () => {
    expect(ceil(null)).to.equal(0);
  });

});

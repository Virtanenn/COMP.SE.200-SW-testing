/*
Self-planned unit tests for toString(), based on Phase 1 test design.
These tests correspond exactly to Test Cases 01–05 defined in the plan.
*/

import chai from "chai";
const { expect } = chai;

import toString from "../library/src/toString.js";

describe("toString – Self-Planned Test Suite (Phase 1)", () => {
  
  // Test 01: String remains unchanged
  it("should return string inputs unchanged ('hello' → 'hello')", () => {
    expect(toString("hello")).to.equal("hello");
  });

  // Test 02: Numeric to string conversion
  it("should convert numbers to strings (12345 → '12345')", () => {
    expect(toString(12345)).to.equal("12345");
  });

  // Test 03: Negative zero should produce '-0'
  it("should preserve the sign of negative zero (-0 → '-0')", () => {
    const value = -0;
    expect(toString(value)).to.equal("-0");
  });

  // Test 04: Null should produce empty string
  it("should convert null to an empty string (null → '')", () => {
    expect(toString(null)).to.equal("");
  });

  // Test 05: Array converts to comma-separated string
  it("should convert arrays to comma-separated strings ([1,2,3] → '1,2,3')", () => {
    expect(toString([1, 2, 3])).to.equal("1,2,3");
  });

});

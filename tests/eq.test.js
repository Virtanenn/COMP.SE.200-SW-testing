import chai from "chai";
const { expect } = chai;

import eq from "../library/src/eq.js";
/**
 * Compare two items.
 * 
 * According to documentation:
 *  * eq('a', Object('a'))
 * // => false
 *
 * but comparisons between numbers and strings fail.
 *
 *
 */
describe("Integration Stub Tests", () => {
  it("Numbers", () => {
    expect(eq(1,1)).to.equal(true);
    expect(eq(-1,-1)).to.equal(true);
    expect(eq(1.99,1.99)).to.equal(true);
    expect(eq(-2.5,-2.5)).to.equal(true);
    expect(eq(-2.5,2.5)).to.equal(false);
    expect(eq(2.5,-2.5)).to.equal(false);
  });

  it("Strings", () => {
    expect(eq("Hello","Hello")).to.equal(true);
    expect(eq("hello","Hello")).to.equal(false);
    expect(eq("1","1")).to.equal(true);
    expect(eq("-2.5","2.5")).to.equal(false);
  });

  // Fails
  it("Compare strings and integers", () => {
    expect(eq(2.5,"2.5")).to.equal(false);
    expect(eq("2.5",2.5)).to.equal(false);
    expect(eq(-1.99,"-1.99")).to.equal(false);
    expect(eq("-2.5","2.5")).to.equal(false);
  });

  it("Compare NaN types.", () => {
    expect(eq(NaN,NaN)).to.equal(true);
    expect(eq(null,null)).to.equal(true);
    expect(eq(NaN,null)).to.equal(false);
  });

});

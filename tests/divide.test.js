import chai from "chai";
const { expect } = chai;
import divide from "../library/src/divide.js";
/**
 * Divide two numbers.
 * 
 * Divide function always returns either NaN or zero
 * This is due to divisor dividing divisor, instead of divident.
 *
 */

describe("Divide", () => {
  // pass
  it("Divide one by one", () => {
    expect(divide(1, 1)).to.equal(1);
  });

  // Fails
  it("Divide integers", () => {
    expect(divide(666, 6)).to.equal(111);
    expect(divide(6,3)).to.equal(2);
    expect(divide(32,8)).to.equal(4);
  });

  // Fails
  it("Divide with float", () => {
    expect(divide(1.0, 0.2)).to.equal(5);
    expect(divide(6.66,0.1)).to.equal(666);
  });

  it("Divide float with integer", () => {
    expect(divide(0.1,5)).to.equal(0.02);
  });

  // pass.
  it("Divide with zero", () => {
    expect(divide(100, 0)).to.be.NaN;
  });

  // Fails
  it("Divide by zero", () => {
    expect(divide(0,100)).to.equal(0);
  });
});
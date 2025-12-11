import chai from "chai";
const { expect } = chai;

import reduce from "../library/src/reduce.js";

describe("reduce – Basic Unit Tests", () => {

  // Test 1: Array reduction with explicit accumulator
  it("should reduce an array of numbers to their sum when accumulator is provided", () => {
    const result = reduce([1, 2, 3], (sum, n) => sum + n, 0);
    expect(result).to.equal(6);
  });

  // Test 2: Reduce array without initial accumulator
  it("should use the first element as accumulator when no initial value is given", () => {
    const result = reduce([1, 2, 3], (sum, n) => sum + n);
    expect(result).to.equal(6);
  });

  // Test 3: Reduce over an object
  it("should reduce an object by iterating over its key/value pairs", () => {
    const obj = { a: 1, b: 2, c: 1 };

    const result = reduce(
      obj,
      (acc, value, key) => {
        if (!acc[value]) acc[value] = [];
        acc[value].push(key);
        return acc;
      },
      {}
    );

    // Valid results:
    expect(result[1]).to.have.members(["a", "c"]);
    expect(result[2]).to.have.members(["b"]);
  });

  // Test 4: Reduce an empty array with accumulator
  it("should return the accumulator when reducing an empty array", () => {
    const result = reduce([], (acc, n) => acc + n, 10);
    expect(result).to.equal(10);
  });

  // Test 5: Reduce an empty object with accumulator
  it("should return the accumulator when reducing an empty object", () => {
    const result = reduce({}, (acc, v) => acc + v, 5);
    expect(result).to.equal(5);
  });

  // Test 6: Reduce array to build an object
  it("should reduce an array into an object", () => {
    const result = reduce(
      ["a", "b", "a"],
      (acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      },
      {}
    );

    expect(result).to.deep.equal({ a: 2, b: 1 });
  });

})
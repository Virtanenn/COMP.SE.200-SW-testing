/*
OpenAI’s GPT-5.1 model
with the prompt:

    "Create jest unit test for this toString file. 
    Here is imports: "import chai from "chai";
    const { expect } = chai; 
    import toString from "../library/src/toString.js";"

    *toString.js*-Copy paste"

*/
import chai from "chai";
const { expect } = chai;

// Use toString, which does not import from .internal
import toString from "../library/src/toString.js";

describe("toString – AI-Generated Test Suite", () => {

  // Basic behavior
  it("should return an empty string for null", () => {
    expect(toString(null)).to.equal("");
  });

  it("should return an empty string for undefined", () => {
    expect(toString(undefined)).to.equal("");
  });

  it("should return string unchanged", () => {
    expect(toString("AI Test")).to.equal("AI Test");
  });

  it("should convert a number to its string form", () => {
    expect(toString(42)).to.equal("42");
  });

  it("should convert boolean true to 'true'", () => {
    expect(toString(true)).to.equal("true");
  });

  it("should convert boolean false to 'false'", () => {
    expect(toString(false)).to.equal("false");
  });

  // Special numeric values
  it("should convert NaN to 'NaN'", () => {
    expect(toString(NaN)).to.equal("NaN");
  });

  it("should convert Infinity to 'Infinity'", () => {
    expect(toString(Infinity)).to.equal("Infinity");
  });

  it("should convert -Infinity to '-Infinity'", () => {
    expect(toString(-Infinity)).to.equal("-Infinity");
  });

  it("should preserve -0 sign formatting", () => {
    expect(toString(-0)).to.equal("-0");
  });

  // Arrays
  it("should convert array of numbers to comma-separated string", () => {
    expect(toString([1, 2, 3])).to.equal("1,2,3");
  });

  it("should convert nested arrays recursively", () => {
    expect(toString([1, [2, 3]])).to.equal("1,2,3");
  });

  it("should convert array with null/undefined correctly", () => {
    expect(toString([null, undefined, 5])).to.equal(",,5");
  });

  // Symbols
  it("should convert a Symbol to its string form using toString()", () => {
    const sym = Symbol("id");
    expect(toString(sym)).to.equal(sym.toString());
  });

  // Objects
  it("should convert a plain object to its default string form", () => {
    expect(toString({ a: 1 })).to.equal("[object Object]");
  });

  it("should convert object with custom toString()", () => {
    const obj = { toString: () => "custom-object" };
    expect(toString(obj)).to.equal("custom-object");
  });

  it("should convert Date to string using Date.toString()", () => {
    const d = new Date("2020-01-01");
    expect(toString(d)).to.equal(d.toString());
  });

  it("should handle RegExp objects", () => {
    expect(toString(/abc/i)).to.equal("/abc/i");
  });

  // Functions
  it("should convert a function to string", () => {
    const fn = function testFn() {};
    expect(toString(fn)).to.equal(fn.toString());
  });

});
/*
OpenAI’s GPT-5.1 model
with the prompt:

    "Create jest unit test for this toNumber file. 
    Here is imports: "import chai from "chai";
    const { expect } = chai; 
    import toNumber from "../library/src/toNumber.js";"

    *toNumber.js*-Copy paste"

*/
import chai from "chai";
const { expect } = chai;

import toNumber from "../library/src/toNumber.js";

describe("toNumber", () => {
  describe("number primitives", () => {
    it("returns the same value for number input", () => {
      expect(toNumber(3.2)).to.equal(3.2);
      expect(toNumber(0)).to.equal(0);
      expect(toNumber(42)).to.equal(42);
      expect(toNumber(Number.MIN_VALUE)).to.equal(Number.MIN_VALUE);
      expect(toNumber(Infinity)).to.equal(Infinity);
    });

    it("preserves -0", () => {
      const result = toNumber(-0);
      // 1 / -0 === -Infinity, 1 / 0 === Infinity
      expect(1 / result).to.equal(-Infinity);
    });

    it("returns NaN for NaN input", () => {
      const result = toNumber(NaN);
      expect(result).to.be.NaN;
    });
  });

  describe("string input", () => {
    it("converts simple numeric strings", () => {
      expect(toNumber("3.2")).to.equal(3.2);
      expect(toNumber("0")).to.equal(0);
      expect(toNumber("-10")).to.equal(-10);
    });

    it("trims whitespace around numeric strings", () => {
      expect(toNumber("  3.2  ")).to.equal(3.2);
      expect(toNumber("\t42\n")).to.equal(42);
    });

    it("parses binary strings (0b...)", () => {
      expect(toNumber("0b101")).to.equal(5);
      expect(toNumber("  0b101  ")).to.equal(5);
    });

    it("parses octal strings (0o...)", () => {
      expect(toNumber("0o10")).to.equal(8);
      expect(toNumber("  0o10  ")).to.equal(8);
    });

    it("parses normal hex strings without sign using unary +", () => {
      // unary + on "0x1f" => 31
      expect(toNumber("0x1f")).to.equal(31);
      expect(toNumber("0X10")).to.equal(16);
    });

    it("returns NaN for bad signed hex strings", () => {
      expect(toNumber("-0x1")).to.be.NaN;
      expect(toNumber("+0x1f")).to.be.NaN;
    });
  });

  describe("non-string, non-number primitives", () => {
    it("converts booleans to numbers", () => {
      expect(toNumber(true)).to.equal(1);
      expect(toNumber(false)).to.equal(0);
    });

    it("converts null to 0", () => {
      expect(toNumber(null)).to.equal(0);
    });

    it("converts undefined to NaN", () => {
      expect(toNumber(undefined)).to.be.NaN;
    });
  });

  describe("symbols", () => {
    it("returns NaN for symbol values", () => {
      const sym = Symbol("test");
      const result = toNumber(sym);
      expect(result).to.be.NaN;
    });
  });

  describe("objects", () => {
    it("returns NaN for plain objects without numeric coercion", () => {
      const result = toNumber({});
      expect(result).to.be.NaN;
    });

    it("uses valueOf when it returns a primitive", () => {
      const obj = {
        valueOf() {
          return 42;
        },
      };

      expect(toNumber(obj)).to.equal(42);
    });

    it("uses valueOf from Date objects", () => {
      const date = new Date(0); // epoch => valueOf() === 0
      expect(toNumber(date)).to.equal(date.valueOf());
    });

    it("stringifies object result of valueOf when still an object", () => {
      const obj = {
        valueOf() {
          return {
            toString() {
              return "5.5";
            },
          };
        },
      };

      expect(toNumber(obj)).to.equal(5.5);
    });
  });
});

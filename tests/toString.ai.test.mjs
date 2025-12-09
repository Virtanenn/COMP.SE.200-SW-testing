import chai from "chai";
const { expect } = chai;

// Use toString, which does not import from .internal
import toString from "../library/src/toString.js";

test("test environment works", () => {
  expect(2 + 2).to.equal(4);
});

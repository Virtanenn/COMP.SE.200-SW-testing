import chai from "chai";
const { expect } = chai;

import get from "../library/src/get.js";

describe("get", () => {
  it("basic tests for get", () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }] }
    expect(get(object, 'a[0].b.c')).to.equal(3);
    expect(get(object, 'a')).to.deep.equal([{ 'b': { 'c': 3 } }]);
    expect(get(object, 'a.b.c', 'default')).to.deep.equal('default');
    expect(get(object, 'a.b.c.c.e.s.')).to.deep.equal(undefined);
  });
  it("Test default value", () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }] }
    expect(get(object, 'a.b.c', 'default')).to.deep.equal('default');
    expect(get(object, 'a.b.c.c.e.s.')).to.deep.equal(undefined);
    expect(get(object, null)).to.deep.equal(undefined);
  });
});
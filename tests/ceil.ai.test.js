/*
OpenAI’s GPT-5.1 model
with the prompt:

    "implement js test for this code:

    *ceil.js*-Copy paste"

    and use these imports: import chai from "chai";
    const { expect } = chai; 
    import ceil from "../library/src/ceil.js";"
*/




import chai from "chai";
const { expect } = chai;

import ceil from "../library/src/ceil.js";

describe("ceil", () => {
  it("rounds up to the nearest integer by default", () => {
    expect(ceil(4.006)).to.equal(5);
    expect(ceil(4.0)).to.equal(4);
    expect(ceil(-1.2)).to.equal(-1);
    expect(ceil(-1.0)).to.equal(-1);
  });

  it("rounds up with positive precision", () => {
    expect(ceil(6.004, 2)).to.equal(6.01);
    expect(ceil(5.0001, 3)).to.equal(5.001);
    expect(ceil(0.1234, 3)).to.equal(0.124);
  });

  it("rounds up with negative precision", () => {
    expect(ceil(6040, -2)).to.equal(6100);
    expect(ceil(149, -1)).to.equal(150);
    expect(ceil(100, -3)).to.equal(1000);
  });

  it("handles edge cases", () => {
    expect(ceil(0)).to.equal(0);
    expect(ceil(-0.1)).to.equal(0);
    expect(ceil(NaN)).to.deep.equal(NaN);
  });

  it("treats undefined precision as 0", () => {
    expect(ceil(4.1, undefined)).to.equal(5);
  });
});

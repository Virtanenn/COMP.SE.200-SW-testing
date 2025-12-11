import chai from "chai";
const { expect } = chai;

import drop from "../library/src/drop.js";
/**
 * Drop items from array.
 * 
 * Drop n elements from the beginning of an array
 * All test pass
 *
 */
describe("drop", () => {
  it("drop first", () => {
    expect(drop([1,2,3])).to.deep.equal([2,3]);
    expect(drop([2,3,4])).to.deep.equal([3,4]);
    expect(drop([4,3,2])).to.deep.equal([3,2]);
  });
  it("drop two", () => {
    expect(drop([1,2,3],2)).to.deep.equal([3]);
    expect(drop(["Hello",2,1],2)).to.deep.equal([1]);
    expect(drop([3,2,"Hello"],2)).to.deep.equal(["Hello"]);
  });
  it("Drop all", () => {
    expect(drop([1,2,3],3)).to.deep.equal([]);
    expect(drop(["Hello",2,1],6)).to.deep.equal([]);
    expect(drop([-4,2,-1,2,5,7,-3,3,-7,-1,-12,-3,2,1],100)).to.deep.equal([]);
  });
  it("Drop nothing", () => {
    expect(drop([1,2,3],0)).to.deep.equal([1,2,3]);
    expect(drop([-3,2,1],0)).to.deep.equal([-3,2,1]);
    expect(drop([-3,"Hello",1],null)).to.deep.equal([-3,"Hello",1]);   
  });
});
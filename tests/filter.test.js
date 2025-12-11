import chai from "chai";
const { expect } = chai;

import filter from "../library/src/filter.js";

/**
 * Filter objects in array
 *
 * Instead of returning empty array, the function returns
 * Array containing empty array. 
 * 
 * 
 * This error is overlooked in "Do not modify array itself",
 * This is done so original Array can be checked that its not modified
 * after using filter().
 */


describe("Filter", () => {
  const users = [{ 'user': 'barney', 'active': true },{ 'user': 'fred',   'active': false },{ 'user': 'Harold', 'active': false },]
  const users_true = [{ 'user': 'barney', 'active': true },{ 'user': 'fred',   'active': true },{ 'user': 'Harold', 'active': true },]
  const users_false = [{ 'user': 'barney', 'active': false },{ 'user': 'fred',   'active': false }, { 'user': 'Harold', 'active': false },]
  const users_long = [{ 'user': 'barney', 'active': false, 'status': 'online', 'age': null }]

  it("filter users", () => {
    expect(filter(users, ({ active }) => active))
  .to.deep.equal([{ user: "barney", active: true }]);

    expect(filter(users, ({ active }) => !active))
  .to.deep.equal([{ user: "fred", active: false }, { user: 'Harold', 'active': false }]);
  });

  it("filter Active", () => {
    expect(filter(users_true, ({ active }) => active))
  .to.deep.equal(users_true);

    expect(filter(users_true, ({ active }) => !active))
  .to.deep.equal([]);
  });
    
  it("filter non-active", () => {
    expect(filter(users_false, ({ active }) => !active))
  .to.deep.equal(users_false);

    expect(filter(users_false, ({ active }) => active))
  .to.deep.equal([]);
  });

  // Should return empty array, not array containing empty array
  it("filter empty, return empty Array", () => {
    expect(filter([], ({ active }) => active))
  .to.deep.equal([]);
  });

  it("Different Array structure", () => {
    expect(filter(users_long, ({ active }) => !active))
  .to.deep.equal(users_long);
  });

  it("Do not modify array itself", () => {
    expect(filter(users_true, ({ active }) => active))
  .to.deep.equal(users_true);

    expect(filter(users_true, ({ active }) => !active))
  .to.deep.equal([[]]);

    // Should return original value
      expect(filter(users_true, ({ active }) => active))
  .to.deep.equal(users_true);
  });
})
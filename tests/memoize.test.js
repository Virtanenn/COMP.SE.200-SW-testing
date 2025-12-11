/*
OpenAI’s GPT-5.1 model
with the prompt:

    "This is the oracle:
    *memoize.js* (only the commented part)

  (imports)
    Create unit tests: import chai from "chai";
    const { expect } = chai; 
    import memoize from "../library/src/memoize.js"; 
      
    Find something that oracle disagrees with"
*PROMPT END*
    
After AI's first answer, this prompt was given:
    "you misunderstood. We are trying to break the code, not creating flawed tests"
*PROMPT END*

The next AI response had an error with the unit test.
Comparison between NaN and NaN gave an error, until
The line ".to.deep.equal(" was given the "deep"
Parameter.
*/

import chai from "chai";
const { expect } = chai;
import memoize from "../library/src/memoize.js";

describe("memoize", () => {
  it("memoizes results based on the first argument by default", () => {
    let callCount = 0;
    const fn = memoize((a, b) => {
      callCount += 1;
      return a + b;
    });

    // First call with key 1
    expect(fn(1, 2)).to.equal(3);
    expect(callCount).to.equal(1);

    // Second call has same first argument (1), different second argument.
    // According to the oracle, the cache key is the first argument only,
    // so this should be a cache hit, not a recomputation.
    expect(fn(1, 999)).to.equal(3);
    expect(callCount).to.equal(1);

    // New first argument => new cache entry
    expect(fn(2, 2)).to.equal(4);
    expect(callCount).to.equal(2);
  });

  it("uses resolver to determine the cache key when provided", () => {
    let callCount = 0;
    const resolver = (obj) => obj.id;
    const fn = memoize((obj) => {
      callCount += 1;
      return obj.value * 2;
    }, resolver);

    const a = { id: "item-1", value: 10 };
    const b = { id: "item-1", value: 99 }; // same id, different value

    expect(fn(a)).to.equal(20);
    expect(callCount).to.equal(1);

    // Same resolver key => should hit cache even though object/value differ
    expect(fn(b)).to.equal(20);
    expect(callCount).to.equal(1);
  });

  it("exposes a cache property that is Map-like", () => {
    const fn = memoize((x) => x * 2);

    // Cache should exist
    expect(fn).to.have.property("cache");
    const cache = fn.cache;

    // Cache should have Map-like methods
    ["clear", "delete", "get", "has", "set"].forEach((method) => {
      expect(cache).to.have.property(method);
      expect(typeof cache[method]).to.equal("function");
    });

    // Basic cache behavior check
    fn(10);
    expect(cache.has(10)).to.equal(true);
    expect(cache.get(10)).to.equal(20);

    cache.delete(10);
    expect(cache.has(10)).to.equal(false);
  });

  it("allows modifying the cache directly via memoizedFunction.cache", () => {
    const fn = memoize((x) => x * 3);

    expect(fn(2)).to.equal(6);
    expect(fn.cache.get(2)).to.equal(6);

    // Manually override cached result
    fn.cache.set(2, 999);
    expect(fn(2)).to.equal(999);
  });

  it("invokes func with the this binding of the memoized function", () => {
    const obj = {
      base: 5,
      method: null,
    };

    obj.method = memoize(function (x) {
      // `this` should be obj when called as obj.method(...)
      return this.base + x;
    });

    expect(obj.method(3)).to.equal(8); // 5 + 3
  });

  it("uses memoize.Cache constructor to create the cache", () => {
    // Save original Cache for cleanup
    const OriginalCache = memoize.Cache;

    try {
      // Replace memoize.Cache as the oracle describes
      memoize.Cache = WeakMap;

      const fn = memoize((obj) => obj.value * 2);

      // Cache should be an instance of WeakMap now
      expect(fn.cache).to.be.instanceOf(WeakMap);

      const key = {};
      const result = fn(key);
      expect(result).to.deep.equal(key.value * 2 || NaN); // key.value is likely undefined

      // If function runs at least once, cache should have seen the key.
      // WeakMap.has should not throw and should accept the key.
      expect(fn.cache.has(key)).to.be.a("boolean");
    } finally {
      // Restore original Cache to avoid side effects on other tests
      memoize.Cache = OriginalCache;
    }
  });

  it("creates a new cache per memoized function", () => {
    const fn1 = memoize((x) => x + 1);
    const fn2 = memoize((x) => x + 2);

    fn1(1);
    fn2(1);

    // They should not share cache instances
    expect(fn1.cache).to.not.equal(fn2.cache);

    // Changing fn1.cache should not affect fn2.cache
    fn1.cache.set(1, 999);
    expect(fn1(1)).to.equal(999);
    expect(fn2(1)).to.equal(3); // 1 + 2
  });
});

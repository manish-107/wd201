const sum = require("../sum.js");

test("adds 3 and 4 gives 3", () => {
  expect(sum(3, 4)).toBe(7);
});

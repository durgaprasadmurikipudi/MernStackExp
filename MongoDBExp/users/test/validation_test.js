const assert = require("assert");
const User = require("../src/user");

describe("Validation tests", () => {
  it("In user, name is required field", () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === "Name is required.");
  });

  it("User's name is greater than 2 chars", () => {
    const user = new User({ name: "A" });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === "The Name should have minimum length of 2.");
  });

  it("Disallow invalid records from being saved.", done => {
    const user = new User({ name: "A" });

    user.save().catch((validationResult) => {
      const { message } = validationResult.errors.name;
      assert(message === "The Name should have minimum length of 2.");
      done();
    });    
  });
});

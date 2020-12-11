var assert = require("assert");
import todo from "../dist/shader";

describe("Package", function () {
  it("works", ()=>{
    assert.equal(todo(), 42);
  });
});

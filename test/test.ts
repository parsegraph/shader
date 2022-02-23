const { assert } = require("chai");
import { compileShader } from "../src/index";

describe("Package", function () {
  it("works", () => {
    assert.ok(compileShader);
  });
});

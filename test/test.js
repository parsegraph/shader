var assert = require("assert");
import { compileShader } from "../dist/shader";

describe("Package", function () {
  it("works", () => {
    assert.ok(compileShader);
  });
});

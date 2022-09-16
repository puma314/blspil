// import path = require('path');
const pairing = require("../src/pairing").pairing;
const path = require("path");
const assert = require("chai").assert;

describe("BLS", function () {
  it("compute pairing", async function () {
    console.log("Hello world");
    const g1 = 2;
    const g2 = 5;
    const g12 = pairing(g1, g2);
    const expectedg12 = [];
    for (var i = 0; i < 12; i++) {
      assert(g12[i] == expectedg12[i]);
    }
  });
});

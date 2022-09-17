const { assert, expect } = require("chai");
const fs = require("fs");
const InstructionsBuilder = require("../src/instructions_build");
const Engine = require("../src/engine");

const F1Field = require("ffjavascript").F1Field;
const outPilFile = __dirname + "/../pil/main.pil";

const {
  newConstantPolsArray,
  newCommitPolsArray,
  compile,
  verifyPil,
  F,
} = require("pilcom");

const input = [
  {
    a: 10n,
    b: 20n,
    c: 0n,
    d: 0n,
    e: 200n,
  },
];

execute = async function (pols, input) {
  // Get N from definitions
  const N = pols.x1[0].length;

  for (let i = 0; i < N; ++i) {
    for (let j = 0; j < 24; ++j) {
      pols.x1[j][i] = 0n;
      pols.y1[j][i] = 0n;
      pols.x2[j][i] = 0n;
      pols.x3[j][i] = 0n;
      pols.y3[j][i] = 0n;
    }
    pols.carry[i] = 0n;
  }

  const Fr = new F1Field(0xffffffff00000001n);
  const chunks = 24;
  const steps = chunks * 2;
};

describe("test instructions_build", async function () {
  this.timeout(10000000);
  const Fr = new F1Field("0xFFFFFFFF00000001");
  let constPols, cmPols;
  let pil;
  it("It should fill constants correctly", async () => {
    pil = await compile(Fr, outPilFile, null, { defines: { N: 2 ** 16 } });
    constPols = newConstantPolsArray(pil);
    // const instructions = InstructionsBuilder(constPols);
    // const engine = new Engine(instructions);
    // engine.F1.add();
  });

  //   before(async function () {
  //     pil = await compile(Fr, outPilFile, null, { defines: { N: 2 ** 16 } });

  //     constPols = newConstantPolsArray(pil);

  //     await buildConstants(constPols.Arith);
  //   });

  //   it("It should verify the binary operations pil", async () => {
  //     cmPols = newCommitPolsArray(pil);
  //     await execute(cmPols.Arith, input);

  //     const res = await verifyPil(Fr, pil, cmPols, constPols);

  //     if (res.length != 0) {
  //       console.log("Pil does not pass");
  //       for (let i = 0; i < res.length; i++) {
  //         console.log(res[i]);
  //       }
  //       assert(0);
  //     }
  //   });
});

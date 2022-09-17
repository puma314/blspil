const { assert, expect } = require("chai");
const InstructionsBuilder = require("../src/instructions_build");
const Engine = require("../src/engine");
const FOps = require("../src/instructions");
const F1Field = require("ffjavascript").F1Field;
const buildConstantsArith = require("./sm_arith384").buildConstants;
const executeArith = require("./sm_arith384").execute;

const {
  newConstantPolsArray,
  newCommitPolsArray,
  compile,
  verifyPil,
  F,
} = require("pilcom");

function ramAddrToBigNum(addr, pols) {
  res = BigInt(0);
  for (var i = 0; i < 8; i++) {
    res += pols.ramVal[i][addr] << (48n * BigInt(i));
  }
  return res;
}

function storeToRamAddr(bigNum, addr, pols) {
  for (var i = 0; i < 8; i++) {
    pols.main.ramVal[i][addr] = BigInt(bigNum & 0xffffffffffffn);
    bigNum >>= 48n;
  }
  for (var i = 0; i < 24; i++) {
    pols.Arith.x1[i] = 
  }
}

execute = async function (pols, inputs, trace) {
  // Get N from definitions
  const ramVals = pols.main.ramVal;
  for (let i = 0; i < inputs.length; i++) {
    storeToRamAddr(inputs[i], i, pols);
  }

  trace.forEach((instruction, addr) => {
    if (instruction[0] == "mul") {
      const result = FOps.mul(
        ramAddrToBigNum(instruction[1], ramVals),
        ramAddrToBigNum(instruction[2], ramVals)
      );
      storeToRamAddr(result, addr, pols);
    } else if (instruction[0] == "inv") {
      const result = FOps.inv(ramAddrToBigNum(instruction[1], ramVals));
      storeToRamAddr(result, addr, pols);
    } else if (instruction[0] == "isZeroAux") {
      let result;
      const a = ramAddrToBigNum(instruction[1], ramVals);
      if (FOps.isZero(a)) {
        result = 0n;
      } else {
        result = FOps.inv(a);
      }
      storeToRamAddr(result, addr, pols);
    } else if (instruction[0] == "isZero") {
      let result;
      const a = ramAddrToBigNum(instruction[1], ramVals);
      if (FOps.isZero(a)) {
        result = 1n;
      } else {
        result = 0n;
      }
      storeToRamAddr(result, addr, pols);
    } else if (instruction[0] == "add") {
      const result = FOps.add(
        ramAddrToBigNum(instruction[1], ramVals),
        ramAddrToBigNum(instruction[2], ramVals)
      );
      storeToRamAddr(result, addr, pols);
    } else if (instruction[0] == "sub") {
      const result = FOps.sub(
        ramAddrToBigNum(instruction[1], ramVals),
        ramAddrToBigNum(instruction[2], ramVals)
      );
      storeToRamAddr(result, addr, pols);
    } else if (instruction[0] == "cmovAux") {
      const c = ramAddrToBigNum(instruction[1], ramVals);
      const a = ramAddrToBigNum(instruction[2], ramVals);
      const b = ramAddrToBigNum(instruction[3], ramVals);
      const result = FOps.add(FOps.mul(c, a), b);
      storeToRamAddr(result, addr, pols);
    } else if (instruction[0] == "cmov") {
      const c = ramAddrToBigNum(instruction[1], ramVals);
      const a = ramAddrToBigNum(instruction[2], ramVals);
      const b = ramAddrToBigNum(instruction[3], ramVals);
      const result = FOps.cmov(c, a, b);
      storeToRamAddr(result, addr, pols);
    } else {
      throw Error("Unknown instruction", instruction[0]);
    }
  });
};

initialize = async function (pols) {
  for (let i = 0; i < pols.main.pA.length; i++) {
    pols.main.pA[i] = 0n;
    pols.main.pB[i] = 0n;
    pols.main.pC[i] = 0n;
    pols.main.pD[i] = 0n;
    pols.main.isConstant[i] = 0n;
    for (let k = 0; k < 8; k++) {
      pols.main.ConstVal[k][i] = 0n;
    }
    pols.main.RamAddr[i] = BigInt(i);
    for (let j = 0; j < 12; j++) {
      pols.main.L[j][i] = j == i % 48 ? 1n : 0n;
    }
  }
};

initializeCommit = async function (pols) {
  for (let j = 0; j < 8; j++) {
    for (let i = 0; i < pols.ramVal.length; i++) {
      pols.ramVal[j][i] = 0n;
    }
  }
};

describe("test instructions_build", async function () {
  this.timeout(10000000);
  const Fr = new F1Field("0xFFFFFFFF00000001");
  let constPols, cmPols;
  let pil;
  it("It should fill constants correctly", async () => {
    pil = await compile(Fr, "pil/main.pil", null);
    constPols = newConstantPolsArray(pil);
    await initialize(constPols);
    await buildConstantsArith(constPols.Arith);
    const instructions = new InstructionsBuilder(constPols);
    const engine = new Engine(instructions);
    engine.G1.add([0n, 1n], [2n, 3n]);
    // engine.G2.add(
    //   [
    //     [1n, 2n],
    //     [3n, 4n],
    //   ],
    //   [
    //     [5n, 6n],
    //     [7n, 8n],
    //   ]
    // );
    // post-processing loop

    // TODO we can add this once we're done with pairing
    // engine.pairing(
    //   [0, 1],
    //   [
    //     [2, 3],
    //     [4, 5],
    //   ]
    // );
    const g1 = [
      3685416753713387016781088315183077757961620795782546409894578378688607592378376318836054947676345821548104185464507n,
      1339506544944476473020471379941921221584933875938349620426543736416511423956333506472724655353366534992391756441569n,
    ];
    const input = [g1[0], g1[1], g1[0], g1[1]];
    cmPols = newCommitPolsArray(pil);
    await initializeCommit(cmPols.main);
    await execute(cmPols, input, instructions.trace);

    const res = await verifyPil(Fr, pil, cmPols, constPols);
    if (res.length != 0) {
      console.log("Pil does not pass");
      for (let i = 0; i < res.length; i++) {
        console.log(res[i]);
      }
      assert(0);
    }
  });
});

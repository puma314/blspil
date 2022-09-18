const { assert, expect } = require("chai");
const InstructionsBuilder = require("../src/instructions_build");
const Engine = require("../src/engine");
const FOps = require("../src/instructions");
const F1Field = require("ffjavascript").F1Field;
const buildConstantsArith = require("./sm_arith384").buildConstants;
// const executeArith = require("./sm_arith384").execute;

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
}

function getAsBigInt(pols, addr_or_str) {
  if (typeof addr_or_str === "string" || addr_or_str instanceof String) {
    if (addr_or_str === "zero") {
      return 0n;
    } else if (addr_or_str === "one") {
      return 1n;
    } else if (addr_or_str === "neg_one") {
      return FOps.sub(0n, 1n);
    } else {
      throw Error("Unknown string", addr_or_str);
    }
  } else {
    return ramAddrToBigNum(addr_or_str, pols.main);
  }
}

function populateArith(pol, bigInt, counter) {
  for (let i = 0; i < 24; i++) {
    pol[i][counter] = BigInt(bigInt & 0xffffn);
    bigInt >>= 16n; // 2**4 = 16
  }
}

function populateArithCarry(pol, bigInt, counter) {
  pol[counter] = bigInt;
}

const executeArith = async function (pols, instructionMapping) {
  console.log("At top of execute arith");
  // This is assuming we've already filled the ram addr
  instructionMapping.forEach((vals, counter) => {
    const a = getAsBigInt(pols, vals[0]);
    const b = getAsBigInt(pols, vals[1]);
    const c = getAsBigInt(pols, vals[2]);
    const e = getAsBigInt(pols, vals[3]);
    populateArith(pols.Arith384.a, a, counter);
    populateArith(pols.Arith384.b, b, counter);
    populateArith(pols.Arith384.c, c, counter);
    populateArith(pols.Arith384.e, e, counter);

    const numerator = a * b + c - e;
    const denom =
      4002409555221667393417789825735904156556882819939007885332058136124031650490837864442687629129015664037894272559787n;
    const dValue2 = numerator / denom;
    populateArith(pols.Arith384.d, dValue2, counter);
  });
  for (let j = 0; j < 24; j++) {
    for (let i = instructionMapping.size; i < pols.Arith384.a[j].length; i++) {
      pols.Arith384.a[j][i] = 0n;
      pols.Arith384.b[j][i] = 0n;
      pols.Arith384.c[j][i] = 0n;
      pols.Arith384.d[j][i] = 0n;
      pols.Arith384.e[j][i] = 0n;
    }
  }

  for (let i = 0; i < pols.Arith384.carry.length; i++) {
    pols.Arith384.carry[i] = 0n;
  }

  console.log("End of execute arith");
};

execute = async function (pols, inputs, trace, constPols) {
  console.log("execute", pols.main.ramVal.length);
  const ramVals = pols.main;
  // Store the inputs in the ram
  for (let i = 0; i < inputs.length; i++) {
    console.log("storing inputs", inputs[i], i);
    storeToRamAddr(inputs[i], i, pols);
  }

  console.log("Done with inputs");

  for (let i = 0; i < constPols.main.isConstant.length; i++) {
    if (constPols.main.isConstant[i] == 1n) {
      let res = 0n;
      for (var j = 0; j < 8; j++) {
        const add = constPols.main.ConstVal[j][i] << (48n * BigInt(j));
        res += add;
      }
      storeToRamAddr(res, i, pols);
    }
  }

  console.log("Done with constants");

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
  console.log("Done with trace");
};

initialize = async function (pols) {
  const constZeroIndex = pols.main.pA.length - 1;
  for (let i = 0; i < pols.main.pA.length; i++) {
    pols.main.pA[i] = constZeroIndex;
    pols.main.pB[i] = constZeroIndex;
    pols.main.pC[i] = constZeroIndex;
    pols.main.pE[i] = constZeroIndex;
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
    for (let i = 0; i < pols.ramVal[j].length; i++) {
      pols.ramVal[j][i] = 0n;
    }
  }
};

function buidBYTE2(pol, N) {
  const m = 1 << 16;
  if (N < m) throw new Error("GLOBAL.BYTE does not fit");
  for (let i = 0; i < m; i++) {
    pol[i] = BigInt(i);
  }

  for (let i = m; i < N; i++) {
    pol[i] = 0n;
  }
}

function buidBYTE(pol, N) {
  if (N < 256) throw new Error("GLOBAL.BYTE does not fit");

  for (let i = 0; i < 256; i++) {
    pol[i] = BigInt(i);
  }

  for (let i = 256; i < N; i++) {
    pol[i] = 0n;
  }
}

function buildL1(pol) {
  for (let i = 0; i < pol.length; i++) {
    if (i % 48 == 0) {
      pol[i] = BigInt(1);
    } else {
      pol[i] = BigInt(0);
    }
  }
}

describe("test instructions_build", async function () {
  this.timeout(10000000);
  const Fr = new F1Field("0xFFFFFFFF00000001");
  let constPols, cmPols;
  let pil;
  it("It should fill constants correctly", async () => {
    pil = await compile(Fr, "pil/main.pil", null);
    constPols = newConstantPolsArray(pil);
    await initialize(constPols);
    await buildConstantsArith(constPols.Arith384);
    buidBYTE(constPols.Global.BYTE, constPols.Global.BYTE.length);
    buidBYTE2(constPols.Global.BYTE2, constPols.Global.BYTE.length);
    buildL1(constPols.Global.L1);
    const NUM_INPUTS = 2;
    const instructions = new InstructionsBuilder(constPols, NUM_INPUTS);
    const engine = new Engine(instructions);
    const inA = 0n;
    const out = 1n;
    const k = engine.F1.isZero(inA);
    engine.F1.assertEqual(k, out);
    // engine.G1.add([0n, 1n], [2n, 3n]);
    const g1 = [
      3685416753713387016781088315183077757961620795782546409894578378688607592378376318836054947676345821548104185464507n,
      1339506544944476473020471379941921221584933875938349620426543736416511423956333506472724655353366534992391756441569n,
    ];
    const two_g1 = [
      838589206289216005799424730305866328161735431124665289961769162861615689790485775997575391185127590486775437397838n,
      3450209970729243429733164009999191867485184320918914219895632678707687208996709678363578245114137957452475385814312n,
    ];
    const input = [2n, 0n];
    cmPols = newCommitPolsArray(pil);
    await initializeCommit(cmPols.main);
    await execute(cmPols, input, instructions.trace, constPols);
    await executeArith(cmPols, instructions.instructionMapping);

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

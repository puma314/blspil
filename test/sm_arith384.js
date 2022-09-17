const { assert, expect } = require("chai");
const fs = require("fs");

const pilTools = require('../tools/pilTools.js');

const F1Field = require("ffjavascript").F1Field;
const outPilFile = __dirname + '/../pil/arith384.pil';
const outPilHelperFile = __dirname + '/../src/arith384.js';
const pilTemplateFile = __dirname + "/../pil/arith/arith.ejs.pil";
let pilHelper;

const { newConstantPolsArray, newCommitPolsArray, compile, verifyPil, F } = require("pilcom");

const input = [
    {
        x1: 10n,
        x2: 20n,
        y1: 0n,
        y2: 0n,
        y3: 200n
    },
    {
        x1: 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn - 1n,
        x2: 1n,
        y1: 0n,
        y2: 0n,
        y3: 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn - 1n
    },
    {
        x1: 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn - 1n,
        x2: 1n,
        y1: 1n,
        y2: 1n,
        y3: 0n
    },
    {
        x1: 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn,
        x2: 16n,
        y1: 0n,
        y2: 16n,
        y3: 0n
    },
    {
        x1: 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn,
        x2: 2n,
        y1: 10n,
        y2: 2n,
        y3: 10n
    },
    {
        x1: 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn,
        x2: 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn,
        y1: 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn - 1n,
        y2: 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn,
        y3: 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn - 1n
    },
    {
        x1: 3n,
        x2: 2n,
        y1: 1n,
        y2: 0n,
        y3: 7n
    },
    {
        x1: 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn,
        x2: 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn,
        y1: 0n,
        y2: 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn,
        y3: 0n
    },
    {
        x1: 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn,
        x2: 0n,
        y1: 0n,
        y2: 0n,
        y3: 0n
    },
    {
        x1: 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn,
        x2: 1n,
        y1: 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn,
        y2: 2n,
        y3: 0n
    },
    {
        x1: 0x043e1af3a114d443e599a6ebe8669556ef0f138eb0088857845c2d451103293e4c6b9cce62966bf426c29ab4309281dbn,
        x2: 0x0a305f5539d351077b709194644ce85a1f2ceec42bcfb0258cb7a25dc818e03310197d057ab3891db238769e0d65f636n,
        y1: 0x09fb66d0fd96a5f718dc560f9efaa98156d8cb6dc39b9704ad7480f6320038ad5e2d2c08da0fa302aa101f54fabf0ac7n,
        y2: 0x01a98ec1e2089aea313e6a8db0a018e7f24e91316f96cd4666d17302709501762642ab56a4ea2afeb2239473fd932058n,
        y3: 0x042209281ee763d6dd2d0ee547bf89fa4817b8bc868e908c7f72c0f3d97a5f1fe9f2ad235a9633455df66748686cd631n
    }
];

const CONST_F = {
    // 0, 1, 2, 3, ..., 65534, 65535, 0, 1, 2, ...
    BYTE2_BIT19: (i) => BigInt(i & 0xFFFF),

    // CLK[0] = 1, (0 x 47), 1, 0 ...
    // CLK[1] = 0, 1, (0 x 46), 1, 0, ...
    //    :
    // CLK[47] = (0 x 47), 1, (0 x 47), 1, ...
    CLK: (index, i) => ((i >= 65520 || ((i % 48) == index)) ? 1n : 0n)
}

const buildConstants = async function (pols) {
    const N = pols.CLK[0].length;

    buildClocks(pols, N, 48);
    buildByte2Bits16(pols, N);
    buildRange(pols, N, 'GL_SIGNED_4BITS_C0', -16n, 16n);
    buildRange(pols, N, 'GL_SIGNED_4BITS_C1', -16n, 16n, 33);
    buildRange(pols, N, 'GL_SIGNED_4BITS_C2', -16n, 16n, 33 * 33);
    buildRange(pols, N, 'GL_SIGNED_18BITS', -(2n ** 18n), (2n ** 18n));
}

function buildClocks(pols, N, clocksByCycle) {
    for (let i = 0; i < clocksByCycle; i++) {
        for (let j = 0; j < N; ++j) {
            pols.CLK[i][j] = ((j + (clocksByCycle - i)) % clocksByCycle) == 0 ? 1n : 0n;
        }
    }
}

function buildByte2Bits16(pols, N) {
    const modB1 = (2 ** 16);
    const modB2 = (2 ** 19);
    const modBase = modB1 + modB2
    for (let i = 0; i < N; i++) {
        const value = i % modBase;
        pols.SEL_BYTE2_BIT19[i] = (i < modB1 ? 0n : 1n);
        pols.BYTE2_BIT19[i] = BigInt(value);
    }
}

function buildRange(pols, N, name, fromValue, toValue, steps = 1) {
    let value = fromValue;
    let csteps = steps;
    for (let i = 0; i < N; i++) {
        pols[name][i] = value;
        csteps -= 1;
        if (csteps <= 0) {
            csteps = steps;
            if (value === toValue) value = fromValue;
            else value += 1n;
        }
    }
}


execute = async function (pols, input) {

    // Get N from definitions
    const N = pols.x1[0].length;

    for (let i = 0; i < N; ++i) {
        for (let j = 0; j < 24; ++j) {
            pols.x1[j][i] = 0n;
            pols.y1[j][i] = 0n;
            pols.x2[j][i] = 0n;
            pols.y2[j][i] = 0n;
            pols.x3[j][i] = 0n;
            pols.y3[j][i] = 0n;
            pols.q0[j][i] = 0n;
            pols.q1[j][i] = 0n;
            pols.q2[j][i] = 0n;
            pols.s[j][i] = 0n;
            if (j < pols.carryL.length) pols.carryL[j][i] = 0n;
            if (j < pols.carryH.length) pols.carryH[j][i] = 0n;
            if (j < pols.selEq.length) pols.selEq[j][i] = 0n;
        }
    }

    const Fr = new F1Field(0xffffffff00000001n);
    const chunks = 24;
    const steps = chunks * 2;

    // Split the input in little-endian bytes
    prepareInput384bits(input, N, chunks);

    for (let i = 0; i < input.length; i++) {
        let offset = i * 48;
        for (let step = 0; step < 48; ++step) {
            for (let j = 0; j < 16; j++) {
                pols.x1[j][offset + step] = BigInt(input[i]["_x1"][j])
                pols.y1[j][offset + step] = BigInt(input[i]["_y1"][j])
                pols.x2[j][offset + step] = BigInt(input[i]["_x2"][j])
                pols.y2[j][offset + step] = BigInt(input[i]["_y2"][j])
                pols.x3[j][offset + step] = BigInt(input[i]["_x3"][j])
                pols.y3[j][offset + step] = BigInt(input[i]["_y3"][j])
                pols.s[j][offset + step] = BigInt(input[i]["_s"][j])
                pols.q0[j][offset + step] = BigInt(input[i]["_q0"][j])
                pols.q1[j][offset + step] = BigInt(input[i]["_q1"][j])
                pols.q2[j][offset + step] = BigInt(input[i]["_q2"][j])
            }
            pols.selEq[0][offset + step] = BigInt(input[i].selEq0);
            pols.selEq[1][offset + step] = BigInt(input[i].selEq1);
            pols.selEq[2][offset + step] = BigInt(input[i].selEq2);
            pols.selEq[3][offset + step] = BigInt(input[i].selEq3);
        }
        let carry = [0n, 0n, 0n];
        const eqIndexToCarryIndex = [0, 0, 0, 1, 2];
        let eq = [0n, 0n, 0n, 0n, 0n]

        let eqIndexes = [];
        if (pols.selEq[0][offset]) eqIndexes.push(0);
        if (pols.selEq[1][offset]) eqIndexes.push(1);
        if (pols.selEq[2][offset]) eqIndexes.push(2);
        if (pols.selEq[3][offset]) eqIndexes = eqIndexes.concat([3, 4]);

        for (let step = 0; step < 48; ++step) {
            eqIndexes.forEach((eqIndex) => {
                let carryIndex = eqIndexToCarryIndex[eqIndex];
                eq[eqIndex] = eqCalculates[eqIndex](pols, step, offset);
                pols.carryL[carryIndex][offset + step] = Fr.e((carry[carryIndex]) % (2n ** 18n));
                pols.carryH[carryIndex][offset + step] = Fr.e((carry[carryIndex]) / (2n ** 18n));
                carry[carryIndex] = (eq[eqIndex] + carry[carryIndex]) / (2n ** 16n);
            });
        }
    }
}

describe("test plookup operations", async function () {

    this.timeout(10000000);
    const Fr = new F1Field("0xFFFFFFFF00000001");
    let constPols, cmPols;
    let pil;
    before(async function () {
        const pilTemplate = fs.readFileSync(pilTemplateFile, { encoding: 'utf8', flag: 'r' });
        const pilCode = pilTools.generatePilFromTemplate(pilTemplate);
        fs.writeFileSync(outPilFile, pilCode);
        pil = await compile(Fr, outPilFile, null, { defines: { N: 2 ** 16 } });
        pilTools.generatePilHelpers(pilTemplateFile, outPilHelperFile);
        pilHelper = require(outPilHelperFile);

        constPols = newConstantPolsArray(pil);
        await buildConstants(constPols.Arith);
    });

    it("It should verify the binary operations pil", async () => {
        cmPols = newCommitPolsArray(pil);
        await execute(cmPols.Arith, input);

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

function prepareInput384bits(input, N, chunks = 16) {
    for (let i = 0; i < input.length; i++) {
        for (let key of Object.keys(input[i])) {
            input[i][`_${key}`] = to16bitsRegisters(input[i][key], chunks);
        }
    }
}

function to16bitsRegisters(value, chunks = 16) {
    if (typeof value !== 'bigint') {
        value = BigInt(value);
    }
    let parts = [];
    for (let index = 0; index < chunks; ++index) {
        const part = value & 0xFFFFn;
        parts.push(part);
        value = value >> 16n;
    }
    return parts;
}
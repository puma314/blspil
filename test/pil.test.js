const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
const F1Field = require("ffjavascript").F1Field;

const { newConstantPolsArray, newCommitPolsArray, compile, verifyPil } = require("pilcom");


describe("test main", async function () {

    this.timeout(10000000);
    const Fr = new F1Field("0xFFFFFFFF00000001");
    let pil;

    let constPols, cmPols;
    before(async function () {
        pil = await compile(Fr, "pil/main.pil", null);

        //constPols = newConstantPolsArray(pil);
        //await smBinary.buildConstants(constPols.Binary);
    });

    it("It should verify the binary operations pil", async () => {
        /*
        cmPols = newCommitPolsArray(pil);

        await smBinary.execute(cmPols.Binary, input);

        // Verify
        const res = await verifyPil(Fr, pil, cmPols, constPols);

        if (res.length != 0) {
            console.log("Pil does not pass");
            for (let i = 0; i < res.length; i++) {
                console.log(res[i]);
            }
            assert(0);
        }*/
    });
});
class FOpsBuilder {
  constructor(pols, numInputs) {
    this.pols = pols;
    this.pA = pols.main.pA;
    this.pB = pols.main.pB;
    this.pC = pols.main.pC;
    this.pE = pols.main.pE;
    this.isConstant = pols.main.isConstant;
    this.ConstVal = pols.main.ConstVal;
    this.instruction_counter = 0;
    this.address_counter = numInputs;
    this.constant_counter = this.pA.length - 1;
    this.constant_mapping = new Map();
    this.zero = this.constant(0n);
    this.one = this.constant(1n);
    this.neg_one = this.constant(this.field_modulus - 1n);
    this.trace = new Map();
    this.instructionMapping = new Map();
  }

  curve_order =
    52435875175126190479447740508185965837690552500527637822603658699938581184513n;
  field_modulus =
    4002409555221667393417789825735904156556882819939007885332058136124031650490837864442687629129015664037894272559787n;

  //   ramAddrToBigInt(addr) {
  //     res = BigInt(0);
  //     for (var i = 0; i < 8; i++) {
  //       res += this.pols.ramVal[i][addr] << (48n * BigInt(i));
  //     }
  //     return res;
  //   }

  //   storeToRamAddr(bigNum, addr) {
  //     for (var i = 0; i < 8; i++) {
  //       this.pols.ramVal[i][addr] = BigInt(bigNum & 0xffffffffffffn);
  //       bigNum >>= 48n;
  //     }
  //     this.pols.RamAddr[addr] = addr;
  //   }

  //   setNotConstant(addr) {
  //     this.pols.isConstant[addr] = 0n;
  //     for (var i = 0; i < 8; i++) {
  //       this.pols.ConstVal[i][addr] = 0n;
  //     }
  //   }

  mul(a, b) {
    const addr = this.address_counter;
    for (var i = 0; i < 48; i++) {
      this.pA[this.instruction_counter] = BigInt(a);
      this.pB[this.instruction_counter] = BigInt(b);
      this.pC[this.instruction_counter] = BigInt(this.zero);
      this.pE[this.instruction_counter] = BigInt(addr);
      this.instructionMapping.set(this.instruction_counter, [
        a,
        b,
        "zero",
        addr,
      ]);
      // if (this.instruction_counter == 336) {
      //   throw Error(a, b);
      // }
      this.instruction_counter++;
    }
    this.address_counter++;
    this.trace.set(addr, ["mul", a, b]);
    return addr;
  }

  inv(a) {
    const addr = this.address_counter;
    for (var i = 0; i < 48; i++) {
      this.pA[this.instruction_counter] = BigInt(a);
      this.pB[this.instruction_counter] = BigInt(addr);
      this.pC[this.instruction_counter] = BigInt(this.zero);
      this.pE[this.instruction_counter] = BigInt(this.zero);
      this.instructionMapping.set(this.instruction_counter, [
        a,
        addr,
        "zero",
        "zero",
      ]);
      // if (this.instruction_counter == 336) {
      //   throw Error(a);
      // }
      this.instruction_counter++;
    }
    this.address_counter++;
    this.trace.set(addr, ["inv", a]);
    return addr;
  }

  isZero(a) {
    // isZero has 2 steps
    const addr_inter = this.address_counter;
    this.address_counter++;
    // Fill this with a variable during execution
    const addr_out = this.address_counter;
    this.address_counter++;
    for (var i = 0; i < 48; i++) {
      this.pA[this.instruction_counter] = BigInt(a);
      this.pB[this.instruction_counter] = BigInt(addr_inter);
      this.pC[this.instruction_counter] = BigInt(this.one);
      this.pE[this.instruction_counter] = BigInt(addr_out);
      this.instructionMapping.set(this.instruction_counter, [
        a,
        addr_inter,
        "one",
        addr_out,
      ]);
      // if (this.instruction_counter == 336) {
      //   throw Error(a);
      // }
      this.instruction_counter++;
    }
    for (var i = 0; i < 48; i++) {
      this.pA[this.instruction_counter] = BigInt(a);
      this.pB[this.instruction_counter] = BigInt(addr_out);
      this.pC[this.instruction_counter] = BigInt(this.zero);
      this.pE[this.instruction_counter] = BigInt(this.zero);
      this.instructionMapping.set(this.instruction_counter, [
        a,
        addr_out,
        "zero",
        "zero",
      ]);
      // if (this.instruction_counter == 336) {
      //   throw Error(a);
      // }
      this.instruction_counter++;
    }
    this.trace.set(addr_inter, ["isZeroAux", a]); // If val_a = 0, then 0, else -1/a
    this.trace.set(addr_out, ["isZero", a]);
    return addr_out;
  }

  assertEqual(a, b) {
    for (var i = 0; i < 48; i++) {
      this.pA[this.instruction_counter] = BigInt(a);
      this.pB[this.instruction_counter] = BigInt(this.one);
      this.pC[this.instruction_counter] = BigInt(this.zero);
      this.pE[this.instruction_counter] = BigInt(b);
      this.instructionMapping.set(this.instruction_counter, [
        a,
        "one",
        "zero",
        b,
      ]);
      // if (this.instruction_counter == 336) {
      //   throw Error(a);
      // }
      this.instruction_counter++;
    }
  }

  add(a, b) {
    const addr = this.address_counter;
    for (var i = 0; i < 48; i++) {
      this.pA[this.instruction_counter] = BigInt(a);
      this.pB[this.instruction_counter] = BigInt(this.one);
      this.pC[this.instruction_counter] = BigInt(b);
      this.pE[this.instruction_counter] = BigInt(addr);
      this.instructionMapping.set(this.instruction_counter, [
        a,
        "one",
        b,
        addr,
      ]);
      // if (this.instruction_counter == 336) {
      //   throw Error(a);
      // }
      this.instruction_counter++;
    }
    this.trace.set(addr, ["add", a, b]);
    this.address_counter++;
    return addr;
  }

  sub(a, b) {
    const addr = this.address_counter;
    for (var i = 0; i < 48; i++) {
      this.pA[this.instruction_counter] = BigInt(this.neg_one);
      this.pB[this.instruction_counter] = BigInt(b);
      this.pC[this.instruction_counter] = BigInt(a);
      this.pE[this.instruction_counter] = BigInt(addr);
      this.instructionMapping.set(this.instruction_counter, [
        "neg_one",
        b,
        a,
        addr,
      ]);
      // if (this.instruction_counter == 336) {
      //   throw Error(a);
      // }
      this.instruction_counter++;
    }
    this.trace.set(addr, ["sub", a, b]);
    this.address_counter++;
    return addr;
  }

  /*
      Conditional mov.
    */
  cmov(c, a, b) {
    // If c != 0, return a
    // Else return b
    const addr_aux = this.address_counter;
    for (var i = 0; i < 48; i++) {
      this.pA[this.instruction_counter] = BigInt(c);
      this.pB[this.instruction_counter] = BigInt(a);
      this.pC[this.instruction_counter] = BigInt(b);
      this.pE[this.instruction_counter] = BigInt(addr_aux);
      this.instructionMapping.set(this.instruction_counter, [
        c,
        a,
        b,
        addr_aux,
      ]);
      this.instruction_counter++;
    }
    this.address_counter++;
    const addr_out = this.address_counter;
    for (var i = 0; i < 48; i++) {
      this.pA[this.instruction_counter] = BigInt(c);
      this.pB[this.instruction_counter] = BigInt(b);
      this.pC[this.instruction_counter] = BigInt(addr_out);
      this.pD[this.instruction_counter] = BigInt(addr_aux);
      this.instructionMapping.set(this.instruction_counter, [
        c,
        b,
        addr_out,
        addr_aux,
      ]);
      // if (this.instruction_counter == 336) {
      //   throw Error("secnod", a);
      // }
      this.instruction_counter++;
    }
    this.address_counter++;
    this.trace.set(addr_aux, ["cmovAux", c, a, b]); // should be c*a + b
    this.trace.set(addr_out, ["cmov", c, a, b]); // should be c * a + (1-c) * b
    return addr_out;
  }

  constant(a) {
    const existing = this.constant_mapping.get(a);
    if (existing) {
      return existing;
    }
    this.isConstant[this.constant_counter] = 1n;
    for (var i = 0; i < 8; i++) {
      this.ConstVal[i][this.constant_counter] = BigInt(a & 0xffffffffffffn);
      a >>= 48n;
    }
    this.constant_mapping.set(a, this.constant_counter);
    const ret = this.constant_counter;
    this.constant_counter--;
    return ret;
  }
}

module.exports = FOpsBuilder;

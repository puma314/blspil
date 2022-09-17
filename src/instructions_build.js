class FOpsBuilder {
  constructor(pols) {
    this.pols = pols;
    this.instruction_counter = 0;
    this.address_counter = 0;
    this.constant_counter = pols.pA.length - 1;
    this.constant_mapping = new Map();
    this.zero = this.constant(0n);
    this.one = this.constant(1n);
    this.neg_one = this.constant(this.field_modulus - 1n);
  }

  curve_order =
    52435875175126190479447740508185965837690552500527637822603658699938581184513n;
  field_modulus =
    4002409555221667393417789825735904156556882819939007885332058136124031650490837864442687629129015664037894272559787n;

  //   ramAddrToBigNum(addr) {
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
      this.pA[this.instruction_counter] = a;
      this.pB[this.instruction_counter] = b;
      this.pC[this.instruction_counter] = this.zero;
      this.pD[this.instruction_counter] = addr;
      this.instruction_counter++;
    }
    this.address_counter++;
    return addr;
  }

  inv(a) {
    const addr = this.address_counter;
    for (var i = 0; i < 48; i++) {
      this.pA[this.instruction_counter] = a;
      this.pB[this.instruction_counter] = addr;
      this.pC[this.instruction_counter] = this.zero;
      this.pD[this.instruction_counter] = this.zero;
      this.instruction_counter++;
    }
    this.address_counter++;
    return addr;
  }

  isZero(a) {
    // isZero has 2 steps
    const addr_out1 = this.address_counter;
    for (var i = 0; i < 48; i++) {
      this.pA[this.instruction_counter] = a;
      this.pB[this.instruction_counter] = constant_addr;
      this.pC[this.instruction_counter] = this.one;
      this.pD[this.instruction_counter] = addr_out1;
      this.instruction_counter++;
    }
    this.address_counter++;
    const addr_out = this.address_counter;
    for (var i = 0; i < 48; i++) {
      this.pA[this.instruction_counter] = a;
      this.pB[this.instruction_counter] = addr_out1;
      this.pC[this.instruction_counter] = this.zero;
      this.pD[this.instruction_counter] = this.zero;
      this.instruction_counter++;
    }
    this.address_counter++;
    return addr_out;
  }

  assertEqual(a, b) {
    for (var i = 0; i < 48; i++) {
      this.pA[this.instruction_counter] = a;
      this.pB[this.instruction_counter] = this.one;
      this.pC[this.instruction_counter] = this.zero;
      this.pD[this.instruction_counter] = b;
      this.instruction_counter++;
    }
  }

  add(a, b) {
    const addr = this.address_counter;
    for (var i = 0; i < 48; i++) {
      this.pA[this.instruction_counter] = a;
      this.pB[this.instruction_counter] = this.one;
      this.pC[this.instruction_counter] = b;
      this.pD[this.instruction_counter] = addr;
      this.instruction_counter++;
    }
    this.address_counter++;
    return addr;
  }

  sub(a, b) {
    const addr = this.address_counter;
    for (var i = 0; i < 48; i++) {
      this.pA[this.instruction_counter] = this.neg_one;
      this.pB[this.instruction_counter] = b;
      this.pC[this.instruction_counter] = a;
      this.pD[this.instruction_counter] = addr;
      this.instruction_counter++;
    }
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
      this.pA[this.instruction_counter] = c;
      this.pB[this.instruction_counter] = a;
      this.pC[this.instruction_counter] = b;
      this.pD[this.instruction_counter] = addr_aux;
      this.instruction_counter++;
    }
    this.address_counter++;
    const addr_out = this.address_counter;
    for (var i = 0; i < 48; i++) {
      this.pA[this.instruction_counter] = c;
      this.pB[this.instruction_counter] = b;
      this.pC[this.instruction_counter] = addr_out;
      this.pD[this.instruction_counter] = addr_aux;
      this.instruction_counter++;
    }
    this.address_counter++;
    return addr_out;
  }

  constant(a) {
    const existing = this.constant_mapping.get(a);
    if (existing) {
      return existing;
    }
    this.pols.isConstant[this.constant_counter] = 1n;
    for (var i = 0; i < 8; i++) {
      this.pols.ConstVal[i][this.constant_counter] = BigInt(
        a & 0xffffffffffffn
      );
      a >>= 48n;
    }
    this.constant_mapping.set(a, this.constant_counter);
    const ret = this.constant_counter;
    this.constant_counter--;
    return ret;
  }
}

module.exports = FOpsBuilder;

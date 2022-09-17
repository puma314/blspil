class FOps {
  curve_order =
    52435875175126190479447740508185965837690552500527637822603658699938581184513n;
  field_modulus =
    4002409555221667393417789825735904156556882819939007885332058136124031650490837864442687629129015664037894272559787n;

  mul(a, b) {
    return (a * b) % this.field_modulus;
  }

  inv(a) {
    if (!a) throw new Error("Division by zero");

    let t = 0n;
    let r = this.field_modulus;
    let newt = 1n;
    let newr = a % this.field_modulus;
    while (newr) {
      let q = r / newr;
      [t, newt] = [newt, t - q * newt];
      [r, newr] = [newr, r - q * newr];
    }
    if (t < 0n) t += this.field_modulus;
    return t;
  }

  isZero(a) {
    return (a % this.field_modulus == 0) ? 1n : 0n;
  }

  assertEqual(a, b) {
    if (a != b) {
      throw new Error("Assertion failed");
    }
  }

  add(a, b) {
    return (a + b) % this.field_modulus;
  }

  sub(a, b) {
    return (a - b + this.field_modulus) % this.field_modulus;
  }

  /*
    Conditional mov.
  */
  cmov(c, a, b) {
    if (c != 0n) {
      return a;
    } else {
      return b;
    }
  }

  constant(a) {
    return BigInt(a);
  }
}

module.exports = new FOps();

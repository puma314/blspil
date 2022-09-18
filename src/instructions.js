class FOps {
  constructor() {
    this.cnt =0;
  }
  curve_order =
    52435875175126190479447740508185965837690552500527637822603658699938581184513n;
  field_modulus =
    4002409555221667393417789825735904156556882819939007885332058136124031650490837864442687629129015664037894272559787n;

  mul(a, b) {
    this.cnt += 1;
    return (a * b) % this.field_modulus;
  }

  inv(a) {
    this.cnt += 1;

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
    this.cnt += 2;
    return (a % this.field_modulus == 0) ? 1n : 0n;
  }

  assertEqual(a, b) {
    this.cnt += 1;
    if (a != b) {
      throw new Error("Assertion failed");
    }
  }

  add(a, b) {
    this.cnt += 1;
    return (a + b) % this.field_modulus;
  }

  sub(a, b) {
    this.cnt += 1;
    return (a - b + this.field_modulus) % this.field_modulus;
  }

  /*
    Conditional mov.
  */
  cmov(c, a, b) {
    this.cnt += 2;
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

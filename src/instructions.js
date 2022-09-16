const field_modulus =
  4002409555221667393417789825735904156556882819939007885332058136124031650490837864442687629129015664037894272559787n;

class FOps {
  mul(a, b) {
    return (a * b) % field_modulus;
  }

  is_zero(a) {
    return a % field_modulus == 0;
  }

  assert_equal(a, b) {
    if (a != b) {
      throw new Error("Assertion failed");
    }
  }

  add(a, b) {
    return (a + b) % field_modulus;
  }

  sub(a, b, field_modulus) {
    return (a - b) % field_modulus;
  }
}

module.exports = new FOps();

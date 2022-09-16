function mul(a, b) {
  return a * b;
}

function is_zero(a, field_modulus) {
  return a % field_modulus == 0;
}

function assert_equal(a, b) {
  if (a != b) {
    throw new Error("Assertion failed");
  }
}

function sum(a, b) {
  return a + b;
}

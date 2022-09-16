const b = "";
const b2 = ""; // twisted curve

const field_modulus =
  4002409555221667393417789825735904156556882819939007885332058136124031650490837864442687629129015664037894272559787n;
const fq2_modulus_coeffs = [1, 0];
const fq12_modulus_coeffs = [2, 0, 0, 0, 0, 0, -2, 0, 0, 0, 0, 0];

function is_on_curve(g1_x, g1_y) {
  // TODO check if it's point at infinity
  const y_squared = mul(g1_y, g1_y);
  const x_cubed = mul(g1_x, mul(g1_x, g1_x));
  const rhs = sum(x_cubed + field_modulus);
  assert_equal(y_squared, rhs);
}

function linefunc() {}

function miller_loop() {}

function pairing(g2, g1) {
  is_on_curve(g2, b2);
  is_on_curve(g1, b);
  return g1 + g2;
}

function final_exponentiate() {}

module.exports.pairing = pairing;

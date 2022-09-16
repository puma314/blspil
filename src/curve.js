// const F = require("./fields").F;
const F2 = require("./fields").F2;
// const F12 = require("./fields").F12;
const assert = require("assert");

class Curve {
  constructor(instructions, F, b) {
    this.I = instructions;
    this.F = F; // The underlying base field of curve points
    this.b = b; // Curve is defined by y^2 = x^3 + b
    // b lives in F
  }

  inf() {
    return this.F.zero;
  }

  is_inf(p) {
    const mul = this.I.mul(
      this.F.is_eq(p[0], this.F.zero), // 1 if x is zero, 0 otherwise
      this.F.is_eq(p[1], this.F.zero) // 1 if y is zero, 0 otherwise
    );
    return mul;
  }

  is_on_curve(p) {
    // TODO refactor this using cmove
    const is_inf = this.is_inf(p);

    const if_inf = this.I.constant(1);

    const [p_x, p_y] = p;
    const y_squared = this.F.square(p_y);
    const x_cubed = this.F.mul(this.F.square(p_x), p_x);
    const rhs = this.F.add(x_cubed, this.b);
    const res = this.F.is_eq(y_squared, rhs);

    return this.I.cmov(is_inf, if_inf, res);
  }

  double(p) {
    const is_inf = this.is_inf(p);
    const if_inf = p;

    const [p_x, p_y] = p;
    const x_squared = this.F.square(p_x);
    const three_x_squared = this.F.scalar_mul(x_squared, this.I.constant(3n));
    const two_y = this.F.scalar_mul(p_y, this.I.constant(2n));
    const m = this.F.div(three_x_squared, two_y);
    const m_squared = this.F.square(m);
    const neg_two_x = this.F.neg(this.F.scalar_mul(p_x, this.I.constant(2n)));
    const newx = this.F.add(m_squared, neg_two_x);
    const neg_m = this.F.neg(m);
    const newy_term1 = this.F.mul(neg_m, newx);
    const newy_term2 = this.F.mul(m, p_x);
    const newy_term3 = this.F.neg(p_y);
    const newy_pt1 = this.F.add(newy_term1, newy_term2);
    const newy = this.F.add(newy_pt1, newy_term3);
    const res = [newx, newy];

    return [
      this.I.cmov(is_inf, if_inf[0], res[0]),
      this.I.cmov(is_inf, if_inf[1], res[1]),
    ];
  }

  add(p, q) {
    // TODO refactor this using cmove
    if (this.is_inf(p)) {
      return q;
    }
    if (this.is_inf(q)) {
      return p;
    }
    const [p_x, p_y] = p;
    const [q_x, q_y] = q;
    if (this.F.is_eq(p_x, q_x)) {
      if (this.F.is_eq(p_y, q_y)) {
        return this.double(p);
      } else {
        return this.inf();
      }
    }
    const neg_p_y = this.F.neg(p_y);
    const neg_p_x = this.F.neg(p_x);
    const m_num = this.F.add(q_y, neg_p_y);
    const m_den = this.F.add(q_x, neg_p_x);
    const m = this.F.div(m_num, m_den);

    const neg_q_x = this.F.neg(q_x);
    const m_squared = this.F.square(m);
    const newx_term1 = this.F.add(m_squared, neg_q_x);
    const newx = this.F.add(newx_term1, neg_p_x);

    const neg_m = this.F.neg(m);
    const newy_term1 = this.F.mul(neg_m, newx);
    const newy_term2 = this.F.mul(m, p_x);
    const newy_term3 = this.F.neg(p_y);
    const newy_pt1 = this.F.add(newy_term1, newy_term2);
    const newy = this.F.add(newy_pt1, newy_term3);

    const neg_m_neqx = this.F.mul(neg_m, newx);
    const mul_m_qx = this.F.mul(m, q_x);
    const neg_q_y = this.F.neg(q_y);
    const newy_rhs_pt1 = this.F.add(neg_m_neqx, mul_m_qx);
    const newy_rhs = this.F.add(newy_rhs_pt1, neg_q_y);

    this.F.eq(newy, newy_rhs); // Will assert they are equal

    return [newx, newy];
  }

  scalar_mul(p, s) {
    // Witness a binary representation of s
    // Constraint the binary representation
    // Compute a running sum given the binary representation
    // p ** s
  }

  neg(p) {
    // TODO refactor using cmove
    if (this.is_inf(p)) {
      return p;
    }
    const [p_x, p_y] = p;
    return [p_x, this.F.neg(p_y)];
  }

  eq(p, q) {
    const [p_x, p_y] = p;
    const [q_x, q_y] = q;
    return this.F.mul(this.F.is_eq(p_x, q_x), this.F.eq(p_y, q_y));
  }

  twist(p) {
    assert(this.F instanceof F2);
    const F1 = this.F.F;
    const [p_x, p_y] = p;

    console.log(p_x);
    console.log(this.F.neg(p_x));

    const xcoeffs = [[F1.add(p_x[0], F1.neg(p_x[1])), p_x[1]]];
    const ycoeffs = [[F1.add(p_y[0], F1.neg(p_y[1])), p_y[1]]];

    const nx = [
      [
        [xcoeffs[0], 0n],
        [0n, 0n],
        [0n, 0n],
      ],
      [
        [xcoeffs[1], 0n],
        [0n, 0n],
        [0n, 0n],
      ],
    ];
    const ny = [
      [
        [ycoeffs[0], 0n],
        [0n, 0n],
        [0n, 0n],
      ],
      [
        [ycoeffs[1], 0n],
        [0n, 0n],
        [0n, 0n],
      ],
    ];

    const w = [
      [
        [0n, 1n],
        [0n, 0n],
        [0n, 0n],
      ],
      [
        [0n, 0n],
        [0n, 0n],
        [0n, 0n],
      ],
    ];
    const w_sq = F12.square(w);
    const w_cubed = F12.mul(w_sq, w);
    return [F12.div(nx, w_sq), F12.div(ny, w_cubed)];
  }

  cast_point_to_fq12(p) {
    assert(this.F instanceof F);
    if (this.is_inf(p)) {
      return this.inf();
    }
    const [p_x, p_y] = p;
    return [
      [
        [
          [p_x, 0n],
          [0n, 0n],
          [0n, 0n],
        ],
        [
          [0n, 0n],
          [0n, 0n],
          [0n, 0n],
        ],
      ],
      [
        [
          [p_y, 0n],
          [0n, 0n],
          [0n, 0n],
        ],
        [
          [0n, 0n],
          [0n, 0n],
          [0n, 0n],
        ],
      ],
    ];
  }
}

module.exports = Curve;

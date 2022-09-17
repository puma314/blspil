// const F = require("./fields").F;
const F2 = require("./fields").F2;
// const F12 = require("./fields").F12;
const assert = require("assert");

class Curve {
  constructor(F, b, g) {
    this.F = F; // The underlying base field of curve points
    this.FBase = F.FBase;
    this.b = b; // Curve is defined by y^2 = x^3 + b
    this.g = g;
    this.inf = [this.F.zero, this.F.zero];
    this.order =
      0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001n;
    // b lives in F
  }

  isInf(p) {
    const mul = this.FBase.mul(
      this.F.isEq(p[0], this.F.zero), // 1 if x is zero, 0 otherwise
      this.F.isEq(p[1], this.F.zero) // 1 if y is zero, 0 otherwise
    );
    return mul;
  }

  cmov(c, a, b) {
    return [this.F.cmov(c, a[0], b[0]), this.F.cmov(c, a[1], b[1])];
  }

  isOnCurve(p) {
    // TODO refactor this using cmove
    const isInf = this.isInf(p);

    const if_inf = this.F.one;

    const [p_x, p_y] = p;
    const y_squared = this.F.square(p_y);
    const x_cubed = this.F.mul(this.F.square(p_x), p_x);
    const rhs = this.F.add(x_cubed, this.b);
    const res = this.F.isEq(y_squared, rhs);

    return this.FBase.cmov(isInf, if_inf, res);
  }

  double(p) {
    return this.add(p, p);
  }

  add(p, q) {
    // TODO refactor this using cmove

    const isInfP = this.isInf(p);
    const p1 = this.cmov(isInfP, this.g, p);
    const isInfQ = this.isInf(q);
    const q1 = this.cmov(isInfQ, this.g, q);

    const sameX = this.F.isEq(p1[0], q1[0]);

    const q2 = [
      this.F.cmov(sameX, this.F.add(q1[0], this.F.one), q1[0]),
      q1[1],
    ];

    const sDif = this.F.div(this.F.sub(p1[1], q2[1]), this.F.sub(p1[0], q2[0]));

    const xp2 = this.F.square(p1[0]);
    const xp2_3 = this.F.add(this.F.add(xp2, xp2), xp2);
    const sEq = this.F.div(xp2_3, this.F.add(p1[1], p1[1]));

    const s = this.F.cmov(sameX, sEq, sDif);

    const xr = this.F.sub(this.F.sub(this.F.square(s), p1[0]), q1[0]);
    const yr = this.F.sub(this.F.mul(s, this.F.sub(p1[0], xr)), p1[1]);

    const sameY = this.F.isEq(p1[1], q1[1]);
    const opose = this.FBase.mul(sameX, this.FBase.sub(this.FBase.one, sameY));

    const r1 = this.cmov(opose, this.inf, [xr, yr]);
    const r2 = this.cmov(isInfP, q, r1);
    const r3 = this.cmov(isInfQ, p, r2);

    return r3;
  }

  scalarMul(base, s) {
    // Witness a binary representation of s
    // Constraint the binary representation
    // Compute a running sum given the binary representation
    // p ** s

    let res;

    if (s == 0n) return this.zero;

    const n = naf(s);

    if (n[n.length - 1] == 1) {
      res = base;
    } else if (n[n.length - 1] == -1) {
      res = this.neg(base);
    } else {
      throw new Error("invlaud NAF");
    }

    for (let i = n.length - 2; i >= 0; i--) {
      res = this.double(res);

      if (n[i] == 1) {
        res = this.add(res, base);
      } else if (n[i] == -1) {
        res = this.sub(res, base);
      }
    }

    return res;

    function naf(n) {
      let E = BigInt(n);
      const res = [];
      while (E) {
        if (E & BigInt(1)) {
          const z = 2 - Number(E % BigInt(4));
          res.push(z);
          E = E - BigInt(z);
        } else {
          res.push(0);
        }
        E = E >> BigInt(1);
      }
      return res;
    }
  }

  neg(p) {
    const [p_x, p_y] = p;
    return [p_x, this.F.neg(p_y)];
  }

  sub(p, q) {
    return this.add(p, this.neg(q));
  }

  isEq(p, q) {
    const [p_x, p_y] = p;
    const [q_x, q_y] = q;
    return this.FBase.mul(this.F.isEq(p_x, q_x), this.F.isEq(p_y, q_y));
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
    if (this.isInf(p)) {
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

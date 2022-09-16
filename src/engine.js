const F1 = require("./fields").F1;
const F2 = require("./fields").F2;
const F3 = require("./fields").F3;
const Curve = require("./curve");
const assert = require("chai").assert;

const log_ate_loop_count = 62

class Engine {
  constructor(instructions) {
    this.F1 = new F1(instructions, function (a) {
      return this.neg(a);
    });
    this.F2 = new F2(this.F1, function (a) {
      return [this.F.sub(a[0], a[1]), this.F.add(a[0], a[1])];
    });
    this.F6 = new F3(this.F2, function (a) {
      return [this.F.mulByNonResidue(a[2]), a[0], a[1]];
    });
    this.F12 = new F2(this.F6);
    this.G1 = new Curve(instructions, this.F1, 4n);
    this.G2 = new Curve(instructions, this.F2, [4n, 4n]);
  }

  line_func(p1, p2, t) {
    if (p1.is_inf() && p2.is_inf() && t.is_inf()) return;
    x1 = p1[0];
    y1 = p1[1];
    x2 = p2[0];
    y2 = p2[1];
    xt = t[0];
    yt = t[1];
    if (x1 != x2) {
      // m = (y2 - y1) / (x2 - x1)
      // return m * (xt - x1) - (yt - y1)
      let num = F12.add(y2, F12.neg(y1));
      let den = F12.add(x2, F12.neg(x1));
      let m = F12.mul(num, F12.inv(den));
      let a = F12.add(xt, F12.neg(x1));
      let b = F12.add(y1, F12.neg(yt));
      let c = F12.mul(m, a);
      return F12.add(c, b);
    } else if (y1 == y2) {
      // m = 3 * x1**2 / (2 * y1)
      // return m * (xt - x1) - (yt - y1)
      let num = F12.mul_escalar(F12.square(x1), 3);
      let den = F12.add(y1, y1)
      let m = F12.mul(num, F12.inv(den));
      let a = F12.add(xt, F12.neg(x1));
      let b = F12.add(y1, F12.neg(yt));
      let c = F12.mul(m, a);
      return F12.add(c, b);
    } else {
      // return xt - x1
      return F12.add(xt, F12.neg(x1));
    }
  }

  final_exponentiation(p) {
    return F12.exp(p, Math.floor((instructions.field_modulus ** 12 - 1) / instructions.curve_order))
  }

  miller_loop(p1, p2) {
    if (p1.is_inf() || p2.is_inf()) {
      return F12.one();
    }
    let R = p1;
    let f = F12.one();
    for (i = log_ate_loop_count; i > -1; i--) {
      f = this.F12.mul(this.F12.mul(f, f), linefunc(R, R, P));
      R = F12.double(R);
      if (log_ate_loop_count & (2 ** i)) {
        f = F12.mul(f, linefunc(R, Q, P));
        R = F12.add(R, Q);
      }
    }
    return F12.exp(f, Math.floor((instructions.field_modulus ** 12 - 1) / instructions.curve_order))
  }

  pairing(p2, p1) {
    assert(this.G1.is_on_curve(p1));
    assert(this.G2.is_on_curve(p2));
    const twisted = this.G2.twist(p2);
    const casted = this.G1.cast_point_to_fq12(p1);
    const res = this.miller_loop(twisted, casted);
    return this.final_exponentiation(res);
  }
}

module.exports = Engine;

const F1 = require("./fields").F1;
const F2 = require("./fields").F2;
const F3 = require("./fields").F3;
const Curve = require("./curve");

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

  line_func() {}

  final_exponentiation() {}

  miller_loop(p1, p2) {}

  pairing(p2, p1) {
    this.G1.is_on_curve(p1);
    this.G2.is_on_curve(p2);
    const twisted = this.G2.twist(p2);
    const casted = this.G1.cast_point_to_fq12(p1);
    const res = this.miller_loop(twisted, casted);
    return this.final_exponentiation(res);
  }
}

module.exports = Engine;

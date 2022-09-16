const F = require("./fields").F;
const F2 = require("./fields").F2;
const F12 = require("./fields").F12;
const Curve = require("./curve");

class Engine {
  constructor(instructions) {
    this.F = new F(instructions);
    this.F2 = new F2(this.F);
    this.G1 = new Curve(this.F);
    this.G2 = new Curve(this.F2);
    this.F12 = new F12();
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

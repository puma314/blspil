const F1 = require("./fields").F1;
const F2 = require("./fields").F2;
const F12 = require("./fields").F12;
const Curve = require("./curve");

class Engine {
  constructor(instructions) {
    this.F1 = new F1(instructions);
    this.F2 = new F2(this.F1);
    this.G1 = new Curve(this.F1);
    this.G2 = new Curve(this.F2);
    this.F12 = new F12();
  }

  line_func() {}

  miller_loop() {}

  pairing(p2, p1) {
    this.G1.is_on_curve(p1);
    this.G2.is_on_curve(p2);
    const twisted = this.G2.twist(p2);
    const casted = this.G1.cast_point_to_fq12(p1);
    return this.miller_loop(twisted, casted);
  }
}

module.exports = Engine;

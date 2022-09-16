const F = require("./fields").F;
const F2 = require("./fields").F2;
const assert = require("assert");

class Curve {
  constructor(F) {
    this.F = F;
  }

  is_inf() {}

  is_on_curve() {}

  double(p) {}

  add(p, q) {}

  scalar_mul(p, s) {}

  neg(p) {}

  eq(p, q) {}

  twist(p) {
    assert(this.F instanceof F2);
  }

  cast_point_to_fq12(p) {
    assert(this.F instanceof F);
  }
}

module.exports = Curve;

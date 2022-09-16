const F = require("./fields").F;
const F2 = require("./fields").F2;

class Curve {
  constructor(F) {
    this.F = F;
  }

  is_inf() {}

  is_on_curve() {}

  double() {}

  add() {}

  neg() {}

  eq() {}

  twist() {
    assert(this.F instanceof F2);
  }

  cast_point_to_fq12() {
    assert(this.F instanceof F);
  }
}

module.exports = Curve;

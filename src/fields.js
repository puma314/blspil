class F1 {
  degree = 1;
  constructor(instructions) {
    this.instructions = instructions;
  }

  double() {}

  add() {}

  mul() {}

  square() {}

  eq() {}

  neg() {}
}

class F2 {
  degree = 2;
  constructor(base_field) {
    this.base_field = base_field;
  }

  double() {}

  add() {}

  mul() {}

  square() {}

  eq() {}

  neg() {}
}

class F12 {
  constructor(base_field) {
    this.base_field = base_field;
  }
  double() {}

  add() {}

  mul() {}

  square() {}

  eq() {}

  neg() {}
}

module.exports.F1 = F1;
module.exports.F2 = F2;
module.exports.F12 = F12;

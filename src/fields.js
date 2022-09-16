class F {
  degree = 1;
  constructor(instructions) {
    this.instructions = instructions;
  }

  add(a, b) {}

  neg(a) {}

  mul(a, b) {}

  exp(a, s) {}

  square(a) {}

  inv(a) {}

  div(a, b) {
    return this.mul(a, this.inv(b));
  }

  eq(a, b) {}
}

class F2 {
  degree = 2;
  constructor(base_field) {
    this.base_field = base_field;
  }

  add(a, b) {}

  neg(a) {}

  mul(a, b) {}

  exp(a, s) {}

  square(a) {}

  inv(a) {}

  div(a, b) {
    return this.mul(a, this.inv(b));
  }

  eq(a, b) {}
}

class F12 {
  degree = 12;
  constructor(base_field) {
    this.base_field = base_field;
  }

  add(a, b) {}

  neg(a) {}

  mul(a, b) {}

  exp(a, s) {}

  square(a) {}

  inv(a) {}

  div(a, b) {
    return this.mul(a, this.inv(b));
  }

  eq(a, b) {}
}

module.exports.F = F;
module.exports.F2 = F2;
module.exports.F12 = F12;

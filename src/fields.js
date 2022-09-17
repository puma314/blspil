const { assert } = require("chai");

function bits(s) {
  let E = BigInt(s);
  const res = [];
  while (E) {
      if (E & BigInt(1)) {
          res.push(1);
      } else {
          res.push( 0 );
      }
      E = E >> BigInt(1);
  }
  return res;
}

function exp(F, base, s) {

  if (s == 0n) return F.one;

  const n = bits(s);

  if (n.length==0) return F.one;

  let res = base;

  for (let i=n.length-2; i>=0; i--) {

      res = F.square(res);

      if (n[i]) {
          res = F.mul(res, base);
      }
  }

  return res;
}

class F1 {
  constructor(I, mulByNonResidue) {
    if (mulByNonResidue) {
      this.mulByNonResidue = mulByNonResidue.bind(this);
    }
    this.degree = 1;
    this.I = I;
    this.one = this.I.constant(1);
    this.zero = this.I.constant(0);
    this.FBase = this;
  }

  add(a, b) {
    return this.I.add(a,b);
  }

  sub(a, b) {
    return this.I.sub(a,b);
  }

  neg(a) {
    return this.sub(this.zero,a);
  }

  mul(a, b) {
    return this.I.mul(a,b);
  }

  exp(a, s) {
    return exp(this, a, s)
  }

  square(a) {
    return this.mul(a,a);
  }

  inv(a) {
    return this.I.inv(a);
  }

  div(a, b) {
    return this.mul(a, this.inv(b));
  }

  assertEqual(a, b) {
    this.I.assertEqual(a, b);
  }

  constant(a) {
    return this.I.constant(a);
  }

  cmov(c, a, b) {
    return this.I.cmov(c, a, b);
  }

  isZero(a) {
    return this.I.isZero(a);
  }

  eq(a, b) {
    return this.isZero(this.sub(a,b));
  }

}

class F2 {
  constructor(F, mulByNonResidue) {
    if (mulByNonResidue) {
      this.mulByNonResidue = mulByNonResidue.bind(this);
    }
    this.degree = F.degree*2
    this.F = F;
    this.FBase = F.FBase;
    this.one = [
      this.F.one,
      this.F.zero
    ];
    this.zero = [
      this.F.zero,
      this.F.zero
    ];
  }

  add(a, b) {
    return [
      this.F.add(a[0], b[0]),
      this.F.add(a[1], b[1]),
    ]
  }

  sub(a, b) {
    return [
      this.F.sub(a[0], b[0]),
      this.F.sub(a[1], b[1]),
    ]
  }

  neg(a) {
    return this.sub(this.zero,a);
  }

  mul(a, b) {
    return [
      this.F.add(this.F.mul(a[0], b[0]), this.F.mulByNonResidue(this.F.mul(a[1], b[1]))),
      this.F.add(this.F.mul(a[0], b[1]), this.F.mul(a[1], b[0])),
    ];
  }

  exp(a, s) {
    return exp(this, a, s)
  }

  square(a) {
    return this.mul(a,a);
  }

  inv(a) {
    const t0 = this.F.square(a[0]);
    const t1 = this.F.square(a[1]);
    const t2 = this.F.sub(t0, this.F.mulByNonResidue(t1));
    const t3 = this.F.inv(t2);
    return [
        this.F.mul(a[0], t3),
        this.F.neg(this.F.mul( a[1], t3)) ];
  }

  div(a, b) {
    return this.mul(a, this.inv(b));
  }

  assertEqual(a, b) {
    this.F.assertEqual(a[0], b[0]);
    this.F.assertEqual(a[1], b[1]);
  }

  constant(a) {
    return [
      this.F.constant(a[0]),
      this.F.constant(a[1])
    ];
  }

  cmov(c, a, b) {
    return [
      this.F.cmov(c, a[0], b[0]),
      this.F.cmov(c, a[1], b[1])
    ];
  }

  isZero(a) {
    return this.FBase.mul(
      this.F.isZero(a[0]),
      this.F.isZero(a[1])
    );
  }

  eq(a, b) {
    return this.isZero(this.sub(a,b));
  }

}

class F3 {
  constructor(F, mulByNonResidue) {
    if (mulByNonResidue) {
      this.mulByNonResidue = mulByNonResidue.bind(this);
    }
    this.degree = F.degree*3;
    this.F = F;
    this.FBase = F.FBase;
    this.one = [
      this.F.one,
      this.F.zero,
      this.F.zero
    ];
    this.zero = [
      this.F.zero,
      this.F.zero,
      this.F.zero
    ];
  }

  add(a, b) {
    return [
      this.F.add(a[0], b[0]),
      this.F.add(a[1], b[1]),
      this.F.add(a[2], b[2]),
    ]
  }

  sub(a, b) {
    return [
      this.F.sub(a[0], b[0]),
      this.F.sub(a[1], b[1]),
      this.F.sub(a[2], b[2]),
    ]
  }
  neg(a) {
    return this.sub(this.zero,a);
  }

  mul(a, b) {
    const aA = this.F.mul(a[0] , b[0]);
    const bB = this.F.mul(a[1] , b[1]);
    const cC = this.F.mul(a[2] , b[2]);

    return [
        this.F.add(
            aA,
            this.F.mulByNonResidue(
                this.F.sub(
                    this.F.mul(
                        this.F.add(a[1], a[2]),
                        this.F.add(b[1], b[2])),
                    this.F.add(bB, cC)))),    // aA + non_residue*((b+c)*(B+C)-bB-cC),
        this.F.add(
            this.F.sub(
                this.F.mul(
                    this.F.add(a[0], a[1]),
                    this.F.add(b[0], b[1])),
                this.F.add(aA, bB)),
            this.F.mulByNonResidue( cC)),   // (a+b)*(A+B)-aA-bB+non_residue*cC

        this.F.add(
            this.F.sub(
                this.F.mul(
                    this.F.add(a[0], a[2]),
                    this.F.add(b[0], b[2])),
                this.F.add(aA, cC)),
            bB)
      ];
  }

  exp(a, s) {
    return exp(this, a, s)
  }

  square(a) {
    return this.mul(a,a);
  }

  inv(a) {
    const t0 = this.F.square(a[0]);             // t0 = a^2 ;
    const t1 = this.F.square(a[1]);             // t1 = b^2 ;
    const t2 = this.F.square(a[2]);             // t2 = c^2;
    const t3 = this.F.mul(a[0],a[1]);           // t3 = ab
    const t4 = this.F.mul(a[0],a[2]);           // t4 = ac
    const t5 = this.F.mul(a[1],a[2]);           // t5 = bc;
    // c0 = t0 - non_residue * t5;
    const c0 = this.F.sub(t0, this.F.mulByNonResidue(t5));
    // c1 = non_residue * t2 - t3;
    const c1 = this.F.sub(this.F.mulByNonResidue(t2), t3);
    const c2 = this.F.sub(t1, t4);              // c2 = t1-t4

    // t6 = (a * c0 + non_residue * (c * c1 + b * c2)).inv();
    const t6 =
        this.F.inv(
            this.F.add(
                this.F.mul(a[0], c0),
                this.F.mulByNonResidue(
                    this.F.add(
                        this.F.mul(a[2], c1),
                        this.F.mul(a[1], c2)))));

    return [
        this.F.mul(t6, c0),         // t6*c0
        this.F.mul(t6, c1),         // t6*c1
        this.F.mul(t6, c2)];        // t6*c2
  }

  div(a, b) {
    return this.mul(a, this.inv(b));
  }

  assertEqual(a, b) {
    this.F.assertEqual(a[0], b[0]);
    this.F.assertEqual(a[1], b[1]);
    this.F.assertEqual(a[2], b[2]);
  }


  constant(a) {
    return [
      this.F.constant(a[0]),
      this.F.constant(a[1]),
      this.F.constant(a[2])
    ];
  }

  cmov(c, a, b) {
    return [
      this.F.cmov(c, a[0], b[0]),
      this.F.cmov(c, a[1], b[1]),
      this.F.cmov(c, a[2], b[2])
    ];
  }

  isZero(a) {
    return this.FBase.mul(
      this.FBase.mul(
        this.F.isZero(a[0]),
        this.F.isZero(a[1])
      ),
      this.F.isZero(a[2])
    );
  }

  eq(a, b) {
    return this.isZero(this.sub(a,b));
  }
}

module.exports.F1 = F1;
module.exports.F2 = F2;
module.exports.F3 = F3;

const F1 = require("./fields").F1;
const F2 = require("./fields").F2;
const F3 = require("./fields").F3;
const Curve = require("./curve");
const assert = require("chai").assert;
const { bits } = require("./utils");

const log_ate_loop_count = 62;

const g1 = [
  3685416753713387016781088315183077757961620795782546409894578378688607592378376318836054947676345821548104185464507n,
  1339506544944476473020471379941921221584933875938349620426543736416511423956333506472724655353366534992391756441569n,
];
const g2 = [
  [
    352701069587466618187139116011060144890029952792775240219908644239793785735715026873347600343865175952761926303160n,
    3059144344244213709971259814753781636986470325476647558659373206291635324768958432433509563104347017837885763365758n,
  ],
  [
    1985150602287291935568054521177171638300868978215655730859378665066344726373823718423869104263333984641494340347905n,
    927553665492332455747201965776037880757740193453592970025027978793976877002675564980949289727957565575433344219582n,
  ],
];

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
    const g1 = [
      instructions.constant(
        3685416753713387016781088315183077757961620795782546409894578378688607592378376318836054947676345821548104185464507n
      ),
      instructions.constant(
        1339506544944476473020471379941921221584933875938349620426543736416511423956333506472724655353366534992391756441569n
      ),
    ];
    const g2 = [
      [
        instructions.constant(
          352701069587466618187139116011060144890029952792775240219908644239793785735715026873347600343865175952761926303160n
        ),
        instructions.constant(
          3059144344244213709971259814753781636986470325476647558659373206291635324768958432433509563104347017837885763365758n
        ),
      ],
      [
        instructions.constant(
          1985150602287291935568054521177171638300868978215655730859378665066344726373823718423869104263333984641494340347905n
        ),
        instructions.constant(
          927553665492332455747201965776037880757740193453592970025027978793976877002675564980949289727957565575433344219582n
        ),
      ],
    ];

    this.G1 = new Curve(this.F1, instructions.constant(4n), g1);
    this.G2 = new Curve(
      this.F2,
      [instructions.constant(4n), instructions.constant(4n)],
      g2
    );
  }

  line_func(p1, p2, t) {
    if (p1.isInf() && p2.isInf() && t.isInf()) return;
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
      let den = F12.add(y1, y1);
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
    return F12.exp(
      p,
      Math.floor(
        (instructions.field_modulus ** 12 - 1) / instructions.curve_order
      )
    );
  }

  miller_loop(p1, p2) {
    if (p1.isInf() || p2.isInf()) {
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
    return F12.exp(
      f,
      Math.floor(
        (instructions.field_modulus ** 12 - 1) / instructions.curve_order
      )
    );
  }

  pairing(p2, p1) {
    assert(this.G1.isOnCurve(p1));
    assert(this.G2.isOnCurve(p2));
    const twisted = this.G2.twist(p2);
    const casted = this.G1.cast_point_to_fq12(p1);
    const res = this.miller_loop(twisted, casted);
    return this.final_exponentiation(res);
  }

  frobenius(n, a) {
    const F12 = [
      [
        [this.F1.one, this.F1.zero],
        [this.F1.one, this.F1.zero],
        [this.F1.one, this.F1.zero],
        [this.F1.one, this.F1.zero],
        [this.F1.one, this.F1.zero],
        [this.F1.one, this.F1.zero],
        [this.F1.one, this.F1.zero],
        [this.F1.one, this.F1.zero],
        [this.F1.one, this.F1.zero],
        [this.F1.one, this.F1.zero],
        [this.F1.one, this.F1.zero],
        [this.F1.one, this.F1.zero],
      ],
      [
        [this.F1.one, this.F1.zero],
        [
          this.F1.constant(
            3850754370037169011952147076051364057158807420970682438676050522613628423219637725072182697113062777891589506424760n
          ),
          this.F1.constant(
            151655185184498381465642749684540099398075398968325446656007613510403227271200139370504932015952886146304766135027n
          ),
        ],
        [
          this.F1.constant(
            793479390729215512621379701633421447060886740281060493010456487427281649075476305620758731620351n
          ),
          this.F1.zero,
        ],
        [
          this.F1.constant(
            2973677408986561043442465346520108879172042883009249989176415018091420807192182638567116318576472649347015917690530n
          ),
          this.F1.constant(
            1028732146235106349975324479215795277384839936929757896155643118032610843298655225875571310552543014690878354869257n
          ),
        ],
        [
          this.F1.constant(
            793479390729215512621379701633421447060886740281060493010456487427281649075476305620758731620350n
          ),
          this.F1.zero,
        ],
        [
          this.F1.constant(
            3125332594171059424908108096204648978570118281977575435832422631601824034463382777937621250592425535493320683825557n
          ),
          this.F1.constant(
            877076961050607968509681729531255177986764537961432449499635504522207616027455086505066378536590128544573588734230n
          ),
        ],
        [
          this.F1.constant(
            4002409555221667393417789825735904156556882819939007885332058136124031650490837864442687629129015664037894272559786n
          ),
          this.F1.zero,
        ],
        [
          this.F1.constant(
            151655185184498381465642749684540099398075398968325446656007613510403227271200139370504932015952886146304766135027n
          ),
          this.F1.constant(
            3850754370037169011952147076051364057158807420970682438676050522613628423219637725072182697113062777891589506424760n
          ),
        ],
        [
          this.F1.constant(
            4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939436n
          ),
          this.F1.zero,
        ],
        [
          this.F1.constant(
            1028732146235106349975324479215795277384839936929757896155643118032610843298655225875571310552543014690878354869257n
          ),
          this.F1.constant(
            2973677408986561043442465346520108879172042883009249989176415018091420807192182638567116318576472649347015917690530n
          ),
        ],
        [
          this.F1.constant(
            4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939437n
          ),
          this.F1.zero,
        ],
        [
          this.F1.constant(
            877076961050607968509681729531255177986764537961432449499635504522207616027455086505066378536590128544573588734230n
          ),
          this.F1.constant(
            3125332594171059424908108096204648978570118281977575435832422631601824034463382777937621250592425535493320683825557n
          ),
        ],
      ],
    ];

    const F6 = [
      [
        [this.F1.one, this.F1.zero],
        [this.F1.one, this.F1.zero],
        [this.F1.one, this.F1.zero],
        [this.F1.one, this.F1.zero],
        [this.F1.one, this.F1.zero],
        [this.F1.one, this.F1.zero],
      ],
      [
        [this.F1.one, this.F1.zero],
        [
          this.F1.zero,
          this.F1.constant(
            4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939436n
          ),
        ],
        [
          this.F1.constant(
            793479390729215512621379701633421447060886740281060493010456487427281649075476305620758731620350n
          ),
          this.F1.zero,
        ],
        [this.F1.zero, this.F1.one],
        [
          this.F1.constant(
            4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939436n
          ),
          this.F1.zero,
        ],
        [
          this.F1.zero,
          this.F1.constant(
            793479390729215512621379701633421447060886740281060493010456487427281649075476305620758731620350n
          ),
        ],
      ],
      [
        [this.F1.one, this.F1.zero],
        [
          this.F1.constant(
            4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939437n
          ),
          this.F1.zero,
        ],
        [
          this.F1.constant(
            4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939436n
          ),
          this.F1.zero,
        ],
        [
          this.F1.constant(
            4002409555221667393417789825735904156556882819939007885332058136124031650490837864442687629129015664037894272559786n
          ),
          this.F1.zero,
        ],
        [
          this.F1.constant(
            793479390729215512621379701633421447060886740281060493010456487427281649075476305620758731620350n
          ),
          this.F1.zero,
        ],
        [
          this.F1.constant(
            793479390729215512621379701633421447060886740281060493010456487427281649075476305620758731620351n
          ),
          this.F1.zero,
        ],
      ],
    ];

    const res = [[], []];
    for (let i = 0; i < 6; i++) {
      const i1 = Math.floor(i / 3);
      const i2 = i % 3;
      const coef = this.F2.mul(
        F12[Math.floor(i / 3)][n % 12],
        F6[i % 3][n % 6]
      );
      if (n % 2 == 1) {
        res[i1][i2] = this.F2.mul(this.F2.conjugate(a[i1][i2]), coef);
      } else {
        res[i1][i2] = this.F2.mul(a[i1][i2], coef);
      }
    }

    return res;
  }

  f6_mul1(a6, b2) {
    const b_b = this.F2.mul(a6[1], b2);
    let t1 = this.F2.sub(this.F2.mul(this.F2.add(a6[1], a6[2]), b2), b_b);
    t1 = this.F2.mulByNonResidue(t1);

    const t2 = this.F2.sub(this.F2.mul(this.F2.add(a6[0], a6[1]), b2), b_b);

    return [t1, t2, b_b];
  }

  f6_mul01(a6, c0, c1) {
    const a_a = this.F2.mul(a6[0], c0);
    const b_b = this.F2.mul(a6[1], c1);

    let t1 = this.F2.sub(this.F2.mul(this.F2.add(a6[1], a6[2]), c1), b_b);
    t1 = this.F2.add(this.F2.mulByNonResidue(t1), a_a);

    const t2 = this.F2.sub(
      this.F2.sub(
        this.F2.mul(this.F2.add(c0, c1), this.F2.add(a6[0], a6[1])),
        a_a
      ),
      b_b
    );

    const t3 = this.F2.add(
      this.F2.sub(this.F2.mul(this.F2.add(a6[0], a6[2]), c0), a_a),
      b_b
    );

    return [t1, t2, t3];
  }

  f12_mul014(a, c0, c1, c4) {
    const aa = this.f6_mul01(a[0], c0, c1);
    const bb = this.f6_mul1(a[1], c4);
    const o = this.F2.add(c1, c4);
    let t1 = this.F6.add(a[1], a[0]);
    t1 = this.f6_mul01(t1, c0, o);
    t1 = this.F6.sub(this.F6.sub(t1, aa), bb);
    let t0 = this.F6.mulByNonResidue(bb);
    t0 = this.F6.add(t0, aa);

    return [t0, t1];
  }

  fp4_square(a, b) {
    let t0, t1, t2;

    t0 = this.F2.square(a);
    t1 = this.F2.square(b);
    t2 = this.F2.mulByNonResidue(t1);
    const c0 = this.F2.add(t2, t0);
    t2 = this.F2.add(a, b);
    t2 = this.F2.square(t2);
    t2 = this.F2.sub(t2, t0);
    const c1 = this.F2.sub(t2, t1);

    return [c0, c1];
  }

  f12_cyclotomicSquare(a) {
    let z0 = a[0][0];
    let z4 = a[0][1];
    let z3 = a[0][2];
    let z2 = a[1][0];
    let z1 = a[1][1];
    let z5 = a[1][2];

    let t0, t1, t2, t3;

    [t0, t1] = this.fp4_square(z0, z1);

    // For A
    z0 = this.F2.sub(t0, z0);
    z0 = this.F2.add(this.F2.add(z0, z0), t0);

    z1 = this.F2.add(t1, z1);
    z1 = this.F2.add(this.F2.add(z1, z1), t1);

    [t0, t1] = this.fp4_square(z2, z3);
    [t2, t3] = this.fp4_square(z4, z5);

    // For C
    z4 = this.F2.sub(t0, z4);
    z4 = this.F2.add(this.F2.add(z4, z4), t0);

    z5 = this.F2.add(t1, z5);
    z5 = this.F2.add(this.F2.add(z5, z5), t1);

    // For B
    t0 = this.F2.mulByNonResidue(t3);

    z2 = this.F2.add(t0, z2);
    z2 = this.F2.add(this.F2.add(z2, z2), t0);

    z3 = this.F2.sub(t2, z3);
    z3 = this.F2.add(this.F2.add(z3, z3), t2);

    return [
      [z0, z4, z3],
      [z2, z1, z5],
    ];
  }

  f12_cyclotomicExp(base) {
    const exp = 0xd201000000010000;
    const n = bits(exp);

    let res = base;

    for (let i = n.length - 2; i >= 0; i--) {
      res = this.f12_cyclotomicSquare(res);

      if (n[i]) {
        res = this.F12.mul(res, base);
      }
    }

    return this.F12.conjugate(res);

    function bits(s) {
      let E = BigInt(s);
      const res = [];
      while (E) {
        if (E & BigInt(1)) {
          res.push(1);
        } else {
          res.push(0);
        }
        E = E >> BigInt(1);
      }
      return res;
    }
  }

  duublingStep(r) {
    const F2 = this.F2;

    let tmp0 = F2.square(r[0]);
    let tmp1 = F2.square(r[1]);
    let tmp2 = F2.square(tmp1);
    let tmp3 = F2.sub(F2.sub(F2.square(F2.add(tmp1, r[0])), tmp0), tmp2);
    tmp3 = F2.add(tmp3, tmp3);
    let tmp4 = F2.add(F2.add(tmp0, tmp0), tmp0);
    let tmp6 = F2.add(r[0], tmp4);
    const tmp5 = F2.square(tmp4);
    const zsquared = F2.square(r[2]);
    r[0] = F2.sub(F2.sub(tmp5, tmp3), tmp3);
    r[2] = F2.sub(F2.sub(F2.square(F2.add(r[2], r[1])), tmp1), zsquared);
    r[1] = F2.mul(F2.sub(tmp3, r[0]), tmp4);
    tmp2 = F2.add(tmp2, tmp2);
    tmp2 = F2.add(tmp2, tmp2);
    tmp2 = F2.add(tmp2, tmp2);

    r[1] = F2.sub(r[1], tmp2);
    tmp3 = F2.mul(tmp4, zsquared);
    tmp3 = F2.add(tmp3, tmp3);
    tmp3 = F2.neg(tmp3);

    tmp6 = F2.sub(F2.sub(F2.square(tmp6), tmp0), tmp5);
    tmp1 = F2.add(tmp1, tmp1);
    tmp1 = F2.add(tmp1, tmp1);
    tmp6 = F2.sub(tmp6, tmp1);
    tmp0 = F2.mul(r[2], zsquared);
    tmp0 = F2.add(tmp0, tmp0);

    return [tmp0, tmp3, tmp6];
  }

  additionStep(r, q) {
    const F2 = this.F2;

    let zsquared = F2.square(r[2]);
    const ysquared = F2.square(q[1]);

    let t0 = F2.mul(zsquared, q[0]);
    let t1 = F2.mul(
      F2.sub(F2.sub(F2.square(F2.add(q[1], r[2])), ysquared), zsquared),
      zsquared
    );
    let t2 = F2.sub(t0, r[0]);
    let t3 = F2.square(t2);
    let t4 = F2.add(t3, t3);
    t4 = F2.add(t4, t4);
    let t5 = F2.mul(t4, t2);
    let t6 = F2.sub(F2.sub(t1, r[1]), r[1]);
    let t9 = F2.mul(t6, q[0]);
    let t7 = F2.mul(t4, r[0]);
    r[0] = F2.sub(F2.sub(F2.sub(F2.square(t6), t5), t7), t7);
    r[2] = F2.sub(F2.sub(F2.square(F2.add(r[2], t2)), zsquared), t3);
    let t10 = F2.add(q[1], r[2]);
    let t8 = F2.mul(F2.sub(t7, r[0]), t6);
    t0 = F2.mul(r[1], t5);
    t0 = F2.add(t0, t0);
    r[1] = F2.sub(t8, t0);
    t10 = F2.sub(F2.square(t10), ysquared);
    zsquared = F2.square(r[2]);
    t10 = F2.sub(t10, zsquared);
    t9 = F2.sub(F2.add(t9, t9), t10);
    t10 = F2.add(r[2], r[2]);
    t6 = F2.neg(t6);
    t1 = F2.add(t6, t6);

    return [t10, t1, t9];
  }

  prepareG2(q) {
    const coefs = [];
    const base = [q[0], q[1], this.F2.one];
    coefs.push(base);

    const exp = 0xd201000000010000;
    const n = bits(exp);

    let res = [
      [base[0][0], base[0][1]],
      [base[1][0], base[1][1]],
      [base[2][0], base[2][1]],
    ];

    for (let i = n.length - 2; i >= 0; i--) {
      coefs.push(this.duublingStep(res));

      if (n[i]) {
        coefs.push(this.additionStep(res, base));
      }
    }

    return coefs;
  }

  miller_loop(p, qPrep) {
    const exp = 0xd201000000010000;
    const n = bits(exp);

    let f = this.F12.one;
    let ci = 1;

    for (let i = n.length - 2; i > 0; i--) {
      f = this.ell(p, qPrep[ci], f);
      ci++;

      if (n[i]) {
        f = this.ell(p, qPrep[ci], f);
        ci++;
      }

      f = this.F12.square(f);
    }
    f = this.ell(p, qPrep[ci], f);
    ci++;

    assert((ci = qPrep.length));

    f = this.F12.conjugate(f);

    return f;
  }

  ell(p, coefs, f) {
    const c0 = coefs[0];
    const c1 = coefs[1];

    c0[0] = this.F1.mul(c0[0], p[1]);
    c0[1] = this.F1.mul(c0[1], p[1]);

    c1[0] = this.F1.mul(c1[0], p[0]);
    c1[1] = this.F1.mul(c1[1], p[0]);

    return this.f12_mul014(f, coefs[2], c1, c0);
  }

  pairing(p, q) {
    const qPrep = this.prepareG2(q);
    const m = this.miller_loop(p, qPrep);
    /*
    const exponent = 322277361516934140462891564586510139908379969514828494218366688025288661041104682794998680497580008899973249814104447692778988208376779573819485263026159588510513834876303014016798809919343532899164848730280942609956670917565618115867287399623286813270357901731510188149934363360381614501334086825442271920079363289954510565375378443704372994881406797882676971082200626541916413184642520269678897559532260949334760604962086348898118982248842634379637598665468817769075878555493752214492790122785850202957575200176084204422751485957336465472324810982833638490904279282696134323072515220044451592646885410572234451732790590013479358343841220074174848221722017083597872017638514103174122784843925578370430843522959600095676285723737049438346544753168912974976791528535276317256904336520179281145394686565050419250614107803233314658825463117900250701199181529205942363159325765991819433914303908860460720581408201373164047773794825411011922305820065611121544561808414055302212057471395719432072209245600258134364584636810093520285711072578721435517884103526483832733289802426157301542744476740008494780363354305116978805620671467071400711358839553375340724899735460480144599782014906586543813292157922220645089192130209334926661588737007768565838519456601560804957985667880395221049249803753582637708560n;
    return this.F12.exp(m, exponent);
    */
    return this.finalExponentiation(m);
  }

  finalExponentiation(elt) {
    const F12 = this.F12;

    let t0, t1, t2, t3, t4, t5, t6;

    // let mut t0 = f.frobenius_map(6)
    t0 = this.frobenius(6, elt);

    // let t1 = f.invert()
    t1 = F12.inv(elt);

    // let mut t2 = t0 * t1;
    t2 = F12.mul(t0, t1);

    // t1 = t2.clone();
    t1 = t2;

    // t2 = t2.frobenius_map().frobenius_map();
    t2 = this.frobenius(2, t2);

    // t2 *= t1;
    t2 = F12.mul(t2, t1);

    // t1 = cyclotomic_square(t2).conjugate();
    t1 = this.f12_cyclotomicSquare(t2);
    t1 = F12.conjugate(t1);

    // let mut t3 = cycolotomic_exp(t2);
    t3 = this.f12_cyclotomicExp(t2);

    // let mut t4 = cyclotomic_square(t3);
    t4 = this.f12_cyclotomicSquare(t3);

    // let mut t5 = t1 * t3;
    t5 = F12.mul(t1, t3);

    // t1 = cycolotomic_exp(t5);
    t1 = this.f12_cyclotomicExp(t5);

    // t0 = cycolotomic_exp(t1);
    t0 = this.f12_cyclotomicExp(t1);

    // let mut t6 = cycolotomic_exp(t0);
    t6 = this.f12_cyclotomicExp(t0);

    // t6 *= t4;
    t6 = F12.mul(t6, t4);

    // t4 = cycolotomic_exp(t6);
    t4 = this.f12_cyclotomicExp(t6);

    // t5 = t5.conjugate();
    t5 = F12.conjugate(t5);

    // t4 *= t5 * t2;
    t4 = F12.mul(t4, F12.mul(t5, t2));

    // t5 = t2.conjugate();
    t5 = F12.conjugate(t2);

    // t1 *= t2;
    t1 = F12.mul(t1, t2);

    // t1 = t1.frobenius_map().frobenius_map().frobenius_map();
    t1 = this.frobenius(3, t1);

    // t6 *= t5;
    t6 = F12.mul(t6, t5);

    // t6 = t6.frobenius_map();
    t6 = this.frobenius(1, t6);

    // t3 *= t0;
    t3 = F12.mul(t3, t0);

    // t3 = t3.frobenius_map().frobenius_map();
    t3 = this.frobenius(2, t3);

    // t3 *= t1;
    t3 = F12.mul(t3, t1);

    // t3 *= t6;
    t3 = F12.mul(t3, t6);

    // f = t3 * t4;
    const f = F12.mul(t3, t4);

    return f;
  }
}

module.exports = Engine;

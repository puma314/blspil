

// import path = require('path');
const instructions = require("../src/instructions");
const Engine = require("../src/engine");
const path = require("path");
const assert = require("chai").assert;

describe("BLS Field", function () {
    this.timeout(10000000);
    let engine;
    before(function() {
        engine = new Engine(instructions);
    });
    it("should add in F1", async function () {
        const a = 3n;
        const b = 4n;
        const c  = engine.F1.add(a, b);
        assert(c == 7n);
        engine.F1.assertEqual(c, 7n);
    });
    it("should sub in F1", async function () {
        const a = 4n;
        const b = 3n;
        const c  = engine.F1.sub(a, b);
        assert(c == 1n);
        engine.F1.assertEqual(c, 1n);
    });
    it("should neg in F1", async function () {
        const a = 3n;
        const c  = engine.F1.neg(a);
        const cExp = instructions.field_modulus - 3n;
        assert(c == cExp);
        engine.F1.assertEqual(c, cExp);
    });
    it("should mul in F1", async function () {
        const a = 3n;
        const b = 4n;
        const c  = engine.F1.mul(a, b);
        assert(c == 12n);
        engine.F1.assertEqual(c, 12n);
    });
    it("should exp in F1", async function () {
        const a = 3n;
        const b = 5n;
        const c  = engine.F1.exp(a, b);
        const cExp = (a**b)%instructions.field_modulus;
        assert(c == cExp);
        engine.F1.assertEqual(c, cExp);
    });
    it("should square in F1", async function () {
        const a = 3n;
        const c  = engine.F1.square(a);
        const cExp = (a*a) % instructions.field_modulus;
        assert(c == cExp);
        engine.F1.assertEqual(c, cExp);
    });
    it("should inv in F1", async function () {
        const a = 3n;
        const c  = engine.F1.inv(a);
        const c2 = engine.F1.mul(a,c);
        const c2Exp = 1n;
        assert(c2 == c2Exp);
        engine.F1.assertEqual(c2, c2Exp);
    });
    it("should div in F1", async function () {
        const a = 8n;
        const b = 4n;
        const c  = engine.F1.div(a, b);
        const cExp = 2n;
        assert(c == cExp);
        engine.F1.assertEqual(c, cExp);
    });
    it("should isZero in F1", async function () {
        const c1  = engine.F1.isZero(engine.F1.zero);
        const c1Exp = 1n;
        assert(c1 == c1Exp);
        engine.F1.assertEqual(c1, c1Exp);

        const c2  = engine.F1.isZero(engine.F1.one);
        const c2Exp = 0n;
        assert(c2 == c2Exp);
        engine.F1.assertEqual(c2, c2Exp);
    });
    it("should cmov in F1", async function () {
        const a = 8n;
        const b = 4n;
        const c1  = engine.F1.cmov(1n, a, b);
        engine.F1.assertEqual(c1, a);
        const c2  = engine.F1.cmov(0n, a, b);
        engine.F1.assertEqual(c2, b);
    });
    it("should eq in F1", async function () {
        const a = 8n;
        const b = 4n;
        const c1  = engine.F1.isEq(a, b);
        engine.F1.assertEqual(c1, 0n);
        const c2  = engine.F1.isEq(a, a);
        engine.F1.assertEqual(c2, 1n);
    });

    it("should add in F2", async function () {
        const a = [4n, 5n];
        const b = [2n, 3n];
        const c  = engine.F2.add(a, b);
        const cExp = [6n, 8n];
        for (let i=0; i<2; i++) {
            assert(c[i] == cExp[i]);
        }
        engine.F2.assertEqual(c, cExp);
    });
    it("should sub in F2", async function () {
        const a = [4n, 5n];
        const b = [2n, 3n];
        const c  = engine.F2.sub(a, b);
        const cExp = [2n, 2n];
        for (let i=0; i<2; i++) {
            assert(c[i] == cExp[i]);
        }
        engine.F2.assertEqual(c, cExp);
    });
    it("should neg in F2", async function () {
        const a = [4n, 5n];
        const c  = engine.F2.neg(a);
        const cExp = [
            instructions.field_modulus - 4n,
            instructions.field_modulus - 5n
        ];
        for (let i=0; i<2; i++) {
            assert(c[i] == cExp[i]);
        }
        engine.F2.assertEqual(c, cExp);
    });
    it("should mul in F2", async function () {
        const a = [4n, 5n];
        const b = [2n, 3n];
        const c  = engine.F2.mul(a, b);
        const cExp = [
            instructions.field_modulus - 7n,
            22n
        ];
        for (let i=0; i<2; i++) {
            assert(c[i] == cExp[i]);
        }
        engine.F2.assertEqual(c, cExp);
    });
    it("should exp in F2", async function () {
        const a = [4n, 5n];
        const b = 5n;
        const c  = engine.F2.exp(a, b);
        let cExp = [1n, 0n];
        for (let i=0; i<5; i++) {
            cExp = engine.F2.mul(cExp, a);
        }
        for (let i=0; i<2; i++) {
            assert(c[i] == cExp[i]);
        }
        engine.F2.assertEqual(c, cExp);
    });
    it("should square in F2", async function () {
        const a = [4n, 5n];
        const c  = engine.F2.square(a);
        const cExp = [
            instructions.field_modulus -9n,
            40n
        ];
        for (let i=0; i<2; i++) {
            assert(c[i] == cExp[i]);
        }
        engine.F2.assertEqual(c, cExp);
    });
    it("should inv in F2", async function () {
        const a = [4n, 5n];
        const c  = engine.F2.inv(a);
        const c2 = engine.F2.mul(a,c);
        const c2Exp = engine.F2.one;
        for (let i=0; i<2; i++) {
            assert(c2[i] == c2Exp[i]);
        }
        engine.F2.assertEqual(c2, c2Exp);
    });
    it("should div in F2", async function () {
        const a = [4n, 5n];
        const b = [2n, 3n];
        const c  = engine.F2.mul(a, b);
        const d = engine.F2.div(c , a);
        for (let i=0; i<2; i++) {
            assert(d[i] == b[i]);
        }
        engine.F2.assertEqual(d, b);
    });
    it("should isZero in F2", async function () {
        const c1  = engine.F2.isZero(engine.F2.zero);
        const c1Exp = 1n;
        assert(c1 == c1Exp);
        engine.F1.assertEqual(c1, c1Exp);

        const c2  = engine.F2.isZero(engine.F2.one);
        const c2Exp = 0n;
        assert(c2 == c2Exp);
        engine.F1.assertEqual(c2, c2Exp);
    });
    it("should cmov in F2", async function () {
        const a = [4n, 5n];
        const b = [2n, 3n];
        const c1  = engine.F2.cmov(1n, a, b);
        engine.F2.assertEqual(c1, a);
        const c2  = engine.F2.cmov(0n, a, b);
        engine.F2.assertEqual(c2, b);
    });
    it("should eq in F2", async function () {
        const a = [4n, 5n];
        const b = [2n, 3n];
        const c1  = engine.F2.isEq(a, b);
        engine.F1.assertEqual(c1, 0n);
        const c2  = engine.F2.isEq(a, a);
        engine.F1.assertEqual(c2, 1n);
    });

    it("should add in F6", async function () {
        const a = [[4n, 5n], [6n, 7n], [8n, 9n]];
        const b = [[2n, 3n], [4n, 5n], [6n, 7n]];
        const c  = engine.F6.add(a, b);
        const cExp = [[6n, 8n], [10n, 12n], [14n, 16n]];
        for (let i=0; i<3; i++) {
            for (let j=0; j<2; j++) {
                assert(c[i][j] == cExp[i][j]);
            }
        }
        engine.F6.assertEqual(c, cExp);
    });
    it("should sub in F6", async function () {
        const a = [[4n, 5n], [6n, 7n], [8n, 9n]];
        const b = [[2n, 3n], [4n, 5n], [6n, 7n]];
        const c  = engine.F6.sub(a, b);
        const cExp = [[2n, 2n], [2n, 2n], [2n, 2n]];
        for (let i=0; i<3; i++) {
            for (let j=0; j<2; j++) {
                assert(c[i][j] == cExp[i][j]);
            }
        }
        engine.F6.assertEqual(c, cExp);
    });
    it("should neg in F6", async function () {
        const a = [[4n, 5n], [6n, 7n], [8n, 9n]];
        const c  = engine.F6.neg(a);
        const cExp = [
            [
                instructions.field_modulus - 4n,
                instructions.field_modulus - 5n
            ],
            [
                instructions.field_modulus - 6n,
                instructions.field_modulus - 7n
            ],
            [
                instructions.field_modulus - 8n,
                instructions.field_modulus - 9n
            ]
        ];
        for (let i=0; i<3; i++) {
            for (let j=0; j<2; j++) {
                assert(c[i][j] == cExp[i][j]);
            }
        }
        engine.F6.assertEqual(c, cExp);
    });
    it("should mul in F6", async function () {
        const a = [[4n, 5n], [6n, 7n], [8n, 9n]];
        const b = [[2n, 3n], [4n, 5n], [6n, 7n]];
        const c  = engine.F6.mul(a, b);
        const cExp = [
            [
                instructions.field_modulus - 193n,
                156n
            ],
            [
                instructions.field_modulus - 143n,
                167n
            ],
            [
                instructions.field_modulus - 33n,
                158n
            ]
        ];
        for (let i=0; i<3; i++) {
            for (let j=0; j<2; j++) {
                assert(c[i][j] == cExp[i][j]);
            }
        }
        engine.F6.assertEqual(c, cExp);
    });
    it("should exp in F6", async function () {
        const a = [[4n, 5n], [6n, 7n], [8n, 9n]];
        const b = 5n;
        const c  = engine.F6.exp(a, b);
        let cExp = [[1n, 0n], [0n, 0n], [0n, 0n]];
        for (let i=0; i<5; i++) {
            cExp = engine.F6.mul(cExp, a);
        }
        for (let i=0; i<3; i++) {
            for (let j=0; j<2; j++) {
                assert(c[i][j] == cExp[i][j]);
            }
        }
        engine.F6.assertEqual(c, cExp);
    });
    it("should square in F6", async function () {
        const a = [[4n, 5n], [6n, 7n], [8n, 9n]];
        const c  = engine.F6.square(a);
        const cExp = engine.F6.mul(a, a);
        for (let i=0; i<3; i++) {
            for (let j=0; j<2; j++) {
                assert(c[i][j] == cExp[i][j]);
            }
        }
        engine.F6.assertEqual(c, cExp);
    });
    it("should inv in F6", async function () {
        const a = [[4n, 5n], [6n, 7n], [8n, 9n]];
        const c  = engine.F6.inv(a);
        const c2 = engine.F6.mul(a,c);
        const c2Exp = engine.F6.one;
        for (let i=0; i<3; i++) {
            for (let j=0; j<2; j++) {
                assert(c2[i][j] == c2Exp[i][j]);
            }
        }
        engine.F6.assertEqual(c2, c2Exp);
    });
    it("should div in F6", async function () {
        const a = [[4n, 5n], [6n, 7n], [8n, 9n]];
        const b = [[2n, 3n], [4n, 5n], [6n, 7n]];
        const c  = engine.F6.mul(a, b);
        const d = engine.F6.div(c , a);
        for (let i=0; i<3; i++) {
            for (let j=0; j<2; j++) {
                assert(d[i][j] == b[i][j]);
            }
        }
        engine.F6.assertEqual(d, b);
    });
    it("should isZero in F6", async function () {
        const c1  = engine.F6.isZero(engine.F6.zero);
        const c1Exp = 1n;
        assert(c1 == c1Exp);
        engine.F1.assertEqual(c1, c1Exp);

        const c2  = engine.F6.isZero(engine.F6.one);
        const c2Exp = 0n;
        assert(c2 == c2Exp);
        engine.F1.assertEqual(c2, c2Exp);
    });
    it("should cmov in F6", async function () {
        const a = [[4n, 5n], [6n, 7n], [8n, 9n]];
        const b = [[2n, 3n], [4n, 5n], [6n, 7n]];
        const c1  = engine.F6.cmov(1n, a, b);
        engine.F6.assertEqual(c1, a);
        const c2  = engine.F6.cmov(0n, a, b);
        engine.F6.assertEqual(c2, b);
    });
    it("should eq in F6", async function () {
        const a = [[4n, 5n], [6n, 7n], [8n, 9n]];
        const b = [[2n, 3n], [4n, 5n], [6n, 7n]];
        const c1  = engine.F6.isEq(a, b);
        engine.F1.assertEqual(c1, 0n);
        const c2  = engine.F6.isEq(a, a);
        engine.F1.assertEqual(c2, 1n);
    });

    it("should add in F12", async function () {
        const a = [[[4n, 5n], [6n, 7n], [8n, 9n]], [[10n, 11n], [12n, 13n], [14n, 15n]]];
        const b = [[[2n, 3n], [4n, 5n], [6n, 7n]], [[8n, 9n], [10n, 11n], [12n, 13n]]];
        const c  = engine.F12.add(a, b);
        const cExp = [[[6n, 8n], [10n, 12n], [14n, 16n]], [[18n, 20n], [22n, 24n], [26n, 28n]]];
        for (let i=0; i<2; i++) {
            for (let j=0; j<3; j++) {
                for (let k=0; k<2; k++) {
                    assert(c[i][j][k] == cExp[i][j][k]);
                }
            }
        }
        engine.F12.assertEqual(c, cExp);
    });
    it("should sub in F12", async function () {
        const a = [[[4n, 5n], [6n, 7n], [8n, 9n]], [[10n, 11n], [12n, 13n], [14n, 15n]]];
        const b = [[[2n, 3n], [4n, 5n], [6n, 7n]], [[8n, 9n], [10n, 11n], [12n, 13n]]];
        const c  = engine.F12.sub(a, b);
        const cExp = [[[2n, 2n], [2n, 2n], [2n, 2n]], [[2n, 2n], [2n, 2n], [2n, 2n]]];
        for (let i=0; i<2; i++) {
            for (let j=0; j<3; j++) {
                for (let k=0; k<2; k++) {
                    assert(c[i][j][k] == cExp[i][j][k]);
                }
            }
        }
        engine.F12.assertEqual(c, cExp);
    });
    it("should neg in F12", async function () {
        const a = [[[4n, 5n], [6n, 7n], [8n, 9n]], [[10n, 11n], [12n, 13n], [14n, 15n]]];
        const c  = engine.F12.neg(a);
        const cExp = [
            [
                [
                    instructions.field_modulus - 4n,
                    instructions.field_modulus - 5n
                ],
                [
                    instructions.field_modulus - 6n,
                    instructions.field_modulus - 7n
                ],
                [
                    instructions.field_modulus - 8n,
                    instructions.field_modulus - 9n
                ]
            ],
            [
                [
                    instructions.field_modulus - 10n,
                    instructions.field_modulus - 11n
                ],
                [
                    instructions.field_modulus - 12n,
                    instructions.field_modulus - 13n
                ],
                [
                    instructions.field_modulus - 14n,
                    instructions.field_modulus - 15n
                ]
            ],
        ];
        for (let i=0; i<2; i++) {
            for (let j=0; j<3; j++) {
                for (let k=0; k<2; k++) {
                    assert(c[i][j][k] == cExp[i][j][k]);
                }
            }
        }
        engine.F12.assertEqual(c, cExp);
    });
    it("should mul in F12", async function () {
        const a = [[[4n, 5n], [6n, 7n], [8n, 9n]], [[10n, 11n], [12n, 13n], [14n, 15n]]];
        const b = [[[2n, 3n], [4n, 5n], [6n, 7n]], [[8n, 9n], [10n, 11n], [12n, 13n]]];
        const c  = engine.F12.mul(a, b);
        const cExp = [
            [
                [
                    instructions.field_modulus - 1032n,
                    857n
                ],
                [
                    instructions.field_modulus - 828n,
                    911n
                ],
                [
                    instructions.field_modulus - 464n,
                    925n
                ]
            ],
            [
                [
                    instructions.field_modulus - 734n,
                    684n
                ],
                [
                    instructions.field_modulus - 502n,
                    718n
                ],
                [
                    instructions.field_modulus - 102n,
                    712n
                ]
            ]
        ];
        for (let i=0; i<2; i++) {
            for (let j=0; j<3; j++) {
                for (let k=0; k<2; k++) {
                    assert(c[i][j][k] == cExp[i][j][k]);
                }
            }
        }
        engine.F12.assertEqual(c, cExp);
    });
    it("should mul in F12 2", async function () {
        const a = [[[0n, 0n], [0n, 0n], [0n, 1n]], [[1n, 0n], [0n, 0n], [0n, 0n]]];
        const b = [[[2n, 3n], [4n, 5n], [6n, 7n]], [[8n, 9n], [10n, 11n], [12n, 13n]]];
        const c  = engine.F12.mul(a, a);
        const cExp = [
            [
                [
                    0n,
                    0n
                ],
                [
                    0n,
                    0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaaan
                ],
                [
                    0n,
                    0n
                ]
            ],
            [
                [
                    0n,
                    0n
                ],
                [
                    0n,
                    0n
                ],
                [
                    0n,
                    2n
                ]
            ]
        ];
        for (let i=0; i<2; i++) {
            for (let j=0; j<3; j++) {
                for (let k=0; k<2; k++) {
                    assert(c[i][j][k] == cExp[i][j][k]);
                }
            }
        }
        engine.F12.assertEqual(c, cExp);
    });
    it("should exp in F12", async function () {
        const a = [[[4n, 5n], [6n, 7n], [8n, 9n]], [[10n, 11n], [12n, 13n], [14n, 15n]]];
        const b = 5n;
        const c  = engine.F12.exp(a, b);
        let cExp = [[[1n, 0n], [0n, 0n], [0n, 0n]], [[0n, 0n], [0n, 0n], [0n, 0n]]];
        for (let i=0; i<5; i++) {
            cExp = engine.F12.mul(cExp, a);
        }
        for (let i=0; i<2; i++) {
            for (let j=0; j<3; j++) {
                for (let k=0; k<2; k++) {
                    assert(c[i][j][k] == cExp[i][j][k]);
                }
            }
        }
        engine.F12.assertEqual(c, cExp);
    });
    it("should square in F12", async function () {
        const a = [[[4n, 5n], [6n, 7n], [8n, 9n]], [[10n, 11n], [12n, 13n], [14n, 15n]]];
        const c  = engine.F12.square(a);
        const cExp = engine.F12.mul(a, a);
        for (let i=0; i<2; i++) {
            for (let j=0; j<3; j++) {
                for (let k=0; k<2; k++) {
                    assert(c[i][j][k] == cExp[i][j][k]);
                }
            }
        }
        engine.F12.assertEqual(c, cExp);
    });
    it("should inv in F12", async function () {
        const a = [[[4n, 5n], [6n, 7n], [8n, 9n]], [[10n, 11n], [12n, 13n], [14n, 15n]]];
        const c  = engine.F12.inv(a);
        const c2 = engine.F12.mul(a,c);
        const c2Exp = engine.F12.one;
        for (let i=0; i<2; i++) {
            for (let j=0; j<3; j++) {
                for (let k=0; k<2; k++) {
                    assert(c2[i][j][k] == c2Exp[i][j][k]);
                }
            }
        }
        engine.F12.assertEqual(c2, c2Exp);
    });
    it("should div in F12", async function () {
        const a = [[[4n, 5n], [6n, 7n], [8n, 9n]], [[10n, 11n], [12n, 13n], [14n, 15n]]];
        const b = [[[2n, 3n], [4n, 5n], [6n, 7n]], [[8n, 9n], [10n, 11n], [12n, 13n]]];
        const c  = engine.F12.mul(a, b);
        const d = engine.F12.div(c , a);
        for (let i=0; i<2; i++) {
            for (let j=0; j<3; j++) {
                for (let k=0; k<2; k++) {
                    assert(d[i][j][k] == b[i][j][k]);
                }
            }
        }
        engine.F12.assertEqual(d, b);
    });
    it("should isZero in F12", async function () {
        const c1  = engine.F12.isZero(engine.F12.zero);
        const c1Exp = 1n;
        assert(c1 == c1Exp);
        engine.F1.assertEqual(c1, c1Exp);

        const c2  = engine.F12.isZero(engine.F12.one);
        const c2Exp = 0n;
        assert(c2 == c2Exp);
        engine.F1.assertEqual(c2, c2Exp);
    });
    it("should cmov in F12", async function () {
        const a = [[[4n, 5n], [6n, 7n], [8n, 9n]], [[10n, 11n], [12n, 13n], [14n, 15n]]];
        const b = [[[2n, 3n], [4n, 5n], [6n, 7n]], [[8n, 9n], [10n, 11n], [12n, 13n]]];
        const c1  = engine.F12.cmov(1n, a, b);
        engine.F12.assertEqual(c1, a);
        const c2  = engine.F12.cmov(0n, a, b);
        engine.F12.assertEqual(c2, b);
    });
    it("should eq in F12", async function () {
        const a = [[[4n, 5n], [6n, 7n], [8n, 9n]], [[10n, 11n], [12n, 13n], [14n, 15n]]];
        const b = [[[2n, 3n], [4n, 5n], [6n, 7n]], [[8n, 9n], [10n, 11n], [12n, 13n]]];
        const c1  = engine.F12.isEq(a, b);
        engine.F1.assertEqual(c1, 0n);
        const c2  = engine.F12.isEq(a, a);
        engine.F1.assertEqual(c2, 1n);
    });
    it("should check frobenius F12", async function () {
        for (let e=0; e<11; e++) {
            const a = [[[4n, 5n], [6n, 7n], [8n, 9n]], [[10n, 11n], [12n, 13n], [14n, 15n]]];
            const res1 = engine.F12.exp(a, engine.F1.p**BigInt(e));
            const res2 = engine.frobenius(e, a);
            engine.F12.assertEqual(res1, res2);
        }
    });
    it("should check frobenius f6_mul1", async function () {
        const a = [[1n, 2n], [3n, 4n], [5n, 6n]];
        const b = [[0n, 0n], [3n, 4n], [0n, 0n]];
        const c = [3n, 4n];


        const ref = engine.f6_mul1(engine.F6.one, c);
        const res1 = engine.f6_mul1(a, c);
        const res2 = engine.F6.mul(a, b);

        engine.F6.assertEqual(ref, b);
        engine.F6.assertEqual(res1, res2);
    });

    it("should check frobenius f6_mul01", async function () {
        const a = [[1n, 2n], [3n, 4n], [5n, 6n]];
        const b = [[1n, 2n], [3n, 4n], [0n, 0n]];
        const c0 = [1n, 2n];
        const c1 = [3n, 4n];


        const ref = engine.f6_mul01(engine.F6.one, c0, c1);
        const res1 = engine.f6_mul01(a, c0, c1);
        const res2 = engine.F6.mul(a, b);

        engine.F6.assertEqual(ref, b);
        engine.F6.assertEqual(res1, res2);
    });

    it("should check frobenius f12_mul014", async function () {
        const a = [[[1n, 2n], [3n, 4n], [5n, 6n]], [[7n, 8n], [9n, 10n], [11n, 12n]]];
        const b = [[[1n, 2n], [3n, 4n], [0n, 0n]], [[0n, 0n], [9n, 10n], [0n, 0n]]];
        const c0 = [1n, 2n];
        const c1 = [3n, 4n];
        const c4 = [9n, 10n];

        const ref = engine.f12_mul014(engine.F12.one, c0, c1, c4);
        const res1 = engine.f12_mul014(a, c0, c1, c4);
        const res2 = engine.F12.mul(a, b);

        engine.F12.assertEqual(ref, b);
        engine.F12.assertEqual(res1, res2);
    });

    it("Should test cyclotomic", async function () {
        // typedef Fqk<edwards_pp> FieldT;
        // assert(FieldT::extension_degree() % 2 == 0);
        //  FieldT a = FieldT::random_element();
        // FieldT a_unitary = a.Frobenius_map(FieldT::extension_degree()/2) * a.inverse();
        // // beta = a^((q^(k/2)-1)*(q+1))
        // FieldT beta = a_unitary.Frobenius_map(1) * a_unitary;
        // assert(beta.cyclotomic_squared() == beta.squared());

        let r= 0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001n;
        let e= 322277361516934140462891564586510139908379969514828494218366688025288661041104682794998680497580008899973249814104447692778988208376779573819485263026159588510513834876303014016798809919343532899164848730280942609956670917565618115867287399623286813270357901731510188149934363360381614501334086825442271920079363289954510565375378443704372994881406797882676971082200626541916413184642520269678897559532260949334760604962086348898118982248842634379637598665468817769075878555493752214492790122785850202957575200176084204422751485957336465472324810982833638490904279282696134323072515220044451592646885410572234451732790590013479358343841220074174848221722017083597872017638514103174122784843925578370430843522959600095676285723737049438346544753168912974976791528535276317256904336520179281145394686565050419250614107803233314658825463117900250701199181529205942363159325765991819433914303908860460720581408201373164047773794825411011922305820065611121544561808414055302212057471395719432072209245600258134364584636810093520285711072578721435517884103526483832733289802426157301542744476740008494780363354305116978805620671467071400711358839553375340724899735460480144599782014906586543813292157922220645089192130209334926661588737007768565838519456601560804957985667880395221049249803753582637708560n;
        let eZ=  15132376222941642752n;

        const a = [[[1n, 2n], [3n, 4n], [5n, 6n]], [[7n, 8n], [9n, 10n], [11n, 12n]]];

        const beta = engine.F12.exp(a, e);
        const normSquare = engine.F12.square(beta);
        const cycSquare = engine.f12_cyclotomicSquare(beta);

        engine.F12.assertEqual(normSquare, cycSquare);

        let normExp = engine.F12.exp(beta, eZ);
        normExp = engine.F12.conjugate(normExp);

        const cycExp = engine.f12_cyclotomicExp(beta);
        engine.F12.assertEqual(normExp, cycExp);

    });
});
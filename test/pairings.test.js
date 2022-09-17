// import path = require('path');
const instructions = require("../src/instructions");
const Engine = require("../src/engine");
const path = require("path");
const assert = require("chai").assert;

describe("BLS", function () {
  this.timeout(10000000);
  /*
  it("compute pairing", async function () {
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
    const engine = new Engine(instructions);
    console.log(engine);
    const g12 = engine.pairing(g2, g1);
    const expectedg12 = [
      3408834164464458755751340723502736743445402614640994055433339214424916442641449510670327077303074893591740399366532n,
      1017299873256115394687936133146817339783508925356207904663165117501336940438300180831508525168135575931758510829235n,
      1919447955347661378578718469488414822573562393353397544098339472673901193098010131520945815709482515519580400649694n,
      233557331756520805040932826416017142246700002714928636467514104620558679338483625829873520553081791155104026612174n,
      2882199334237819327910933128503231887000342950792587449681715803095618652567681747054312179958427092970985872417068n,
      579878855790610229145575079003483905368886712027403088810647643659132674704592975818766405092658613973478871626949n,
      3268798540077874559188095304926415053902298079662269128631117894259354335713488241073281881110999874366368799440511n,
      2688711983546324406847903726099677850388169649284572370749691792743294691894680263880362424577638309433508620982332n,
      3520140447471844017044610248175793726488927385800919015247604269617056365166670232096113218155158979455637700602719n,
      1555267885602801620621747613743921378408444002839854792606782732724136830563310004098024452104661167182680744848589n,
      2626389147790168154036854297373352480470342009417426750876875476996308393122833154115295241935326582225976246741447n,
      873321072950766150592434764742436722571574260472569072177205897167854308426485977134306337249021436737462538398830n,
    ];
    for (var i = 0; i < 12; i++) {
      assert(g12[i] == expectedg12[i]);
    }
  });
*/
  it("should test pairing identity", async function() {
    const engine = new Engine(instructions);
    const g1 = engine.G1.g;
    const g2 = engine.G2.g;
    const ng1 = engine.G1.neg(g1);
    const ng2 = engine.G2.neg(g2);

    let P = engine.pairing(g1, g2);
    P = engine.F12.conjugate(P);

    let Q = engine.pairing(ng1, g2);
    let R = engine.pairing(g1, ng2);

    engine.F12.assertEqual(P, Q);
    engine.F12.assertEqual(Q, R);
  });
});

/*
* code generated with arith_eq_gen.js
* equation: a*b-P*d+c-e
* 
* P=0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab
*/

module.exports.calculate = function (p, step, _o)
{
	switch(step) {
	case 0: return (
		(p.a[0][_o]   * p.b[0][_o]   - 0xaaabn  * p.d[0][_o]  )
		 + p.c[0][_o]   - p.e[0][_o]  );

	case 1: return (
		(p.a[0][_o]   * p.b[1][_o]   - 0xaaabn  * p.d[1][_o]  ) +
		(p.a[1][_o]   * p.b[0][_o]   - 0xffffn  * p.d[0][_o]  )
		 + p.c[1][_o]   - p.e[1][_o]  );

	case 2: return (
		(p.a[0][_o]   * p.b[2][_o]   - 0xaaabn  * p.d[2][_o]  ) +
		(p.a[1][_o]   * p.b[1][_o]   - 0xffffn  * p.d[1][_o]  ) +
		(p.a[2][_o]   * p.b[0][_o]   - 0xffffn  * p.d[0][_o]  )
		 + p.c[2][_o]   - p.e[2][_o]  );

	case 3: return (
		(p.a[0][_o]   * p.b[3][_o]   - 0xaaabn  * p.d[3][_o]  ) +
		(p.a[1][_o]   * p.b[2][_o]   - 0xffffn  * p.d[2][_o]  ) +
		(p.a[2][_o]   * p.b[1][_o]   - 0xffffn  * p.d[1][_o]  ) +
		(p.a[3][_o]   * p.b[0][_o]   - 0xb9fen  * p.d[0][_o]  )
		 + p.c[3][_o]   - p.e[3][_o]  );

	case 4: return (
		(p.a[0][_o]   * p.b[4][_o]   - 0xaaabn  * p.d[4][_o]  ) +
		(p.a[1][_o]   * p.b[3][_o]   - 0xffffn  * p.d[3][_o]  ) +
		(p.a[2][_o]   * p.b[2][_o]   - 0xffffn  * p.d[2][_o]  ) +
		(p.a[3][_o]   * p.b[1][_o]   - 0xb9fen  * p.d[1][_o]  ) +
		(p.a[4][_o]   * p.b[0][_o]   - 0xffffn  * p.d[0][_o]  )
		 + p.c[4][_o]   - p.e[4][_o]  );

	case 5: return (
		(p.a[0][_o]   * p.b[5][_o]   - 0xaaabn  * p.d[5][_o]  ) +
		(p.a[1][_o]   * p.b[4][_o]   - 0xffffn  * p.d[4][_o]  ) +
		(p.a[2][_o]   * p.b[3][_o]   - 0xffffn  * p.d[3][_o]  ) +
		(p.a[3][_o]   * p.b[2][_o]   - 0xb9fen  * p.d[2][_o]  ) +
		(p.a[4][_o]   * p.b[1][_o]   - 0xffffn  * p.d[1][_o]  ) +
		(p.a[5][_o]   * p.b[0][_o]   - 0xb153n  * p.d[0][_o]  )
		 + p.c[5][_o]   - p.e[5][_o]  );

	case 6: return (
		(p.a[0][_o]   * p.b[6][_o]   - 0xaaabn  * p.d[6][_o]  ) +
		(p.a[1][_o]   * p.b[5][_o]   - 0xffffn  * p.d[5][_o]  ) +
		(p.a[2][_o]   * p.b[4][_o]   - 0xffffn  * p.d[4][_o]  ) +
		(p.a[3][_o]   * p.b[3][_o]   - 0xb9fen  * p.d[3][_o]  ) +
		(p.a[4][_o]   * p.b[2][_o]   - 0xffffn  * p.d[2][_o]  ) +
		(p.a[5][_o]   * p.b[1][_o]   - 0xb153n  * p.d[1][_o]  ) +
		(p.a[6][_o]   * p.b[0][_o]   - 0xfffen  * p.d[0][_o]  )
		 + p.c[6][_o]   - p.e[6][_o]  );

	case 7: return (
		(p.a[0][_o]   * p.b[7][_o]   - 0xaaabn  * p.d[7][_o]  ) +
		(p.a[1][_o]   * p.b[6][_o]   - 0xffffn  * p.d[6][_o]  ) +
		(p.a[2][_o]   * p.b[5][_o]   - 0xffffn  * p.d[5][_o]  ) +
		(p.a[3][_o]   * p.b[4][_o]   - 0xb9fen  * p.d[4][_o]  ) +
		(p.a[4][_o]   * p.b[3][_o]   - 0xffffn  * p.d[3][_o]  ) +
		(p.a[5][_o]   * p.b[2][_o]   - 0xb153n  * p.d[2][_o]  ) +
		(p.a[6][_o]   * p.b[1][_o]   - 0xfffen  * p.d[1][_o]  ) +
		(p.a[7][_o]   * p.b[0][_o]   - 0x1eabn  * p.d[0][_o]  )
		 + p.c[7][_o]   - p.e[7][_o]  );

	case 8: return (
		(p.a[0][_o]   * p.b[8][_o]   - 0xaaabn  * p.d[8][_o]  ) +
		(p.a[1][_o]   * p.b[7][_o]   - 0xffffn  * p.d[7][_o]  ) +
		(p.a[2][_o]   * p.b[6][_o]   - 0xffffn  * p.d[6][_o]  ) +
		(p.a[3][_o]   * p.b[5][_o]   - 0xb9fen  * p.d[5][_o]  ) +
		(p.a[4][_o]   * p.b[4][_o]   - 0xffffn  * p.d[4][_o]  ) +
		(p.a[5][_o]   * p.b[3][_o]   - 0xb153n  * p.d[3][_o]  ) +
		(p.a[6][_o]   * p.b[2][_o]   - 0xfffen  * p.d[2][_o]  ) +
		(p.a[7][_o]   * p.b[1][_o]   - 0x1eabn  * p.d[1][_o]  ) +
		(p.a[8][_o]   * p.b[0][_o]   - 0xf624n  * p.d[0][_o]  )
		 + p.c[8][_o]   - p.e[8][_o]  );

	case 9: return (
		(p.a[0][_o]   * p.b[9][_o]   - 0xaaabn  * p.d[9][_o]  ) +
		(p.a[1][_o]   * p.b[8][_o]   - 0xffffn  * p.d[8][_o]  ) +
		(p.a[2][_o]   * p.b[7][_o]   - 0xffffn  * p.d[7][_o]  ) +
		(p.a[3][_o]   * p.b[6][_o]   - 0xb9fen  * p.d[6][_o]  ) +
		(p.a[4][_o]   * p.b[5][_o]   - 0xffffn  * p.d[5][_o]  ) +
		(p.a[5][_o]   * p.b[4][_o]   - 0xb153n  * p.d[4][_o]  ) +
		(p.a[6][_o]   * p.b[3][_o]   - 0xfffen  * p.d[3][_o]  ) +
		(p.a[7][_o]   * p.b[2][_o]   - 0x1eabn  * p.d[2][_o]  ) +
		(p.a[8][_o]   * p.b[1][_o]   - 0xf624n  * p.d[1][_o]  ) +
		(p.a[9][_o]   * p.b[0][_o]   - 0xf6b0n  * p.d[0][_o]  )
		 + p.c[9][_o]   - p.e[9][_o]  );

	case 10: return (
		(p.a[0][_o]   * p.b[10][_o]  - 0xaaabn  * p.d[10][_o] ) +
		(p.a[1][_o]   * p.b[9][_o]   - 0xffffn  * p.d[9][_o]  ) +
		(p.a[2][_o]   * p.b[8][_o]   - 0xffffn  * p.d[8][_o]  ) +
		(p.a[3][_o]   * p.b[7][_o]   - 0xb9fen  * p.d[7][_o]  ) +
		(p.a[4][_o]   * p.b[6][_o]   - 0xffffn  * p.d[6][_o]  ) +
		(p.a[5][_o]   * p.b[5][_o]   - 0xb153n  * p.d[5][_o]  ) +
		(p.a[6][_o]   * p.b[4][_o]   - 0xfffen  * p.d[4][_o]  ) +
		(p.a[7][_o]   * p.b[3][_o]   - 0x1eabn  * p.d[3][_o]  ) +
		(p.a[8][_o]   * p.b[2][_o]   - 0xf624n  * p.d[2][_o]  ) +
		(p.a[9][_o]   * p.b[1][_o]   - 0xf6b0n  * p.d[1][_o]  ) +
		(p.a[10][_o]  * p.b[0][_o]   - 0xd2a0n  * p.d[0][_o]  )
		 + p.c[10][_o]  - p.e[10][_o] );

	case 11: return (
		(p.a[0][_o]   * p.b[11][_o]  - 0xaaabn  * p.d[11][_o] ) +
		(p.a[1][_o]   * p.b[10][_o]  - 0xffffn  * p.d[10][_o] ) +
		(p.a[2][_o]   * p.b[9][_o]   - 0xffffn  * p.d[9][_o]  ) +
		(p.a[3][_o]   * p.b[8][_o]   - 0xb9fen  * p.d[8][_o]  ) +
		(p.a[4][_o]   * p.b[7][_o]   - 0xffffn  * p.d[7][_o]  ) +
		(p.a[5][_o]   * p.b[6][_o]   - 0xb153n  * p.d[6][_o]  ) +
		(p.a[6][_o]   * p.b[5][_o]   - 0xfffen  * p.d[5][_o]  ) +
		(p.a[7][_o]   * p.b[4][_o]   - 0x1eabn  * p.d[4][_o]  ) +
		(p.a[8][_o]   * p.b[3][_o]   - 0xf624n  * p.d[3][_o]  ) +
		(p.a[9][_o]   * p.b[2][_o]   - 0xf6b0n  * p.d[2][_o]  ) +
		(p.a[10][_o]  * p.b[1][_o]   - 0xd2a0n  * p.d[1][_o]  ) +
		(p.a[11][_o]  * p.b[0][_o]   - 0x6730n  * p.d[0][_o]  )
		 + p.c[11][_o]  - p.e[11][_o] );

	case 12: return (
		(p.a[0][_o]   * p.b[12][_o]  - 0xaaabn  * p.d[12][_o] ) +
		(p.a[1][_o]   * p.b[11][_o]  - 0xffffn  * p.d[11][_o] ) +
		(p.a[2][_o]   * p.b[10][_o]  - 0xffffn  * p.d[10][_o] ) +
		(p.a[3][_o]   * p.b[9][_o]   - 0xb9fen  * p.d[9][_o]  ) +
		(p.a[4][_o]   * p.b[8][_o]   - 0xffffn  * p.d[8][_o]  ) +
		(p.a[5][_o]   * p.b[7][_o]   - 0xb153n  * p.d[7][_o]  ) +
		(p.a[6][_o]   * p.b[6][_o]   - 0xfffen  * p.d[6][_o]  ) +
		(p.a[7][_o]   * p.b[5][_o]   - 0x1eabn  * p.d[5][_o]  ) +
		(p.a[8][_o]   * p.b[4][_o]   - 0xf624n  * p.d[4][_o]  ) +
		(p.a[9][_o]   * p.b[3][_o]   - 0xf6b0n  * p.d[3][_o]  ) +
		(p.a[10][_o]  * p.b[2][_o]   - 0xd2a0n  * p.d[2][_o]  ) +
		(p.a[11][_o]  * p.b[1][_o]   - 0x6730n  * p.d[1][_o]  ) +
		(p.a[12][_o]  * p.b[0][_o]   - 0x12bfn  * p.d[0][_o]  )
		 + p.c[12][_o]  - p.e[12][_o] );

	case 13: return (
		(p.a[0][_o]   * p.b[13][_o]  - 0xaaabn  * p.d[13][_o] ) +
		(p.a[1][_o]   * p.b[12][_o]  - 0xffffn  * p.d[12][_o] ) +
		(p.a[2][_o]   * p.b[11][_o]  - 0xffffn  * p.d[11][_o] ) +
		(p.a[3][_o]   * p.b[10][_o]  - 0xb9fen  * p.d[10][_o] ) +
		(p.a[4][_o]   * p.b[9][_o]   - 0xffffn  * p.d[9][_o]  ) +
		(p.a[5][_o]   * p.b[8][_o]   - 0xb153n  * p.d[8][_o]  ) +
		(p.a[6][_o]   * p.b[7][_o]   - 0xfffen  * p.d[7][_o]  ) +
		(p.a[7][_o]   * p.b[6][_o]   - 0x1eabn  * p.d[6][_o]  ) +
		(p.a[8][_o]   * p.b[5][_o]   - 0xf624n  * p.d[5][_o]  ) +
		(p.a[9][_o]   * p.b[4][_o]   - 0xf6b0n  * p.d[4][_o]  ) +
		(p.a[10][_o]  * p.b[3][_o]   - 0xd2a0n  * p.d[3][_o]  ) +
		(p.a[11][_o]  * p.b[2][_o]   - 0x6730n  * p.d[2][_o]  ) +
		(p.a[12][_o]  * p.b[1][_o]   - 0x12bfn  * p.d[1][_o]  ) +
		(p.a[13][_o]  * p.b[0][_o]   - 0xf385n  * p.d[0][_o]  )
		 + p.c[13][_o]  - p.e[13][_o] );

	case 14: return (
		(p.a[0][_o]   * p.b[14][_o]  - 0xaaabn  * p.d[14][_o] ) +
		(p.a[1][_o]   * p.b[13][_o]  - 0xffffn  * p.d[13][_o] ) +
		(p.a[2][_o]   * p.b[12][_o]  - 0xffffn  * p.d[12][_o] ) +
		(p.a[3][_o]   * p.b[11][_o]  - 0xb9fen  * p.d[11][_o] ) +
		(p.a[4][_o]   * p.b[10][_o]  - 0xffffn  * p.d[10][_o] ) +
		(p.a[5][_o]   * p.b[9][_o]   - 0xb153n  * p.d[9][_o]  ) +
		(p.a[6][_o]   * p.b[8][_o]   - 0xfffen  * p.d[8][_o]  ) +
		(p.a[7][_o]   * p.b[7][_o]   - 0x1eabn  * p.d[7][_o]  ) +
		(p.a[8][_o]   * p.b[6][_o]   - 0xf624n  * p.d[6][_o]  ) +
		(p.a[9][_o]   * p.b[5][_o]   - 0xf6b0n  * p.d[5][_o]  ) +
		(p.a[10][_o]  * p.b[4][_o]   - 0xd2a0n  * p.d[4][_o]  ) +
		(p.a[11][_o]  * p.b[3][_o]   - 0x6730n  * p.d[3][_o]  ) +
		(p.a[12][_o]  * p.b[2][_o]   - 0x12bfn  * p.d[2][_o]  ) +
		(p.a[13][_o]  * p.b[1][_o]   - 0xf385n  * p.d[1][_o]  ) +
		(p.a[14][_o]  * p.b[0][_o]   - 0x4b84n  * p.d[0][_o]  )
		 + p.c[14][_o]  - p.e[14][_o] );

	case 15: return (
		(p.a[0][_o]   * p.b[15][_o]  - 0xaaabn  * p.d[15][_o] ) +
		(p.a[1][_o]   * p.b[14][_o]  - 0xffffn  * p.d[14][_o] ) +
		(p.a[2][_o]   * p.b[13][_o]  - 0xffffn  * p.d[13][_o] ) +
		(p.a[3][_o]   * p.b[12][_o]  - 0xb9fen  * p.d[12][_o] ) +
		(p.a[4][_o]   * p.b[11][_o]  - 0xffffn  * p.d[11][_o] ) +
		(p.a[5][_o]   * p.b[10][_o]  - 0xb153n  * p.d[10][_o] ) +
		(p.a[6][_o]   * p.b[9][_o]   - 0xfffen  * p.d[9][_o]  ) +
		(p.a[7][_o]   * p.b[8][_o]   - 0x1eabn  * p.d[8][_o]  ) +
		(p.a[8][_o]   * p.b[7][_o]   - 0xf624n  * p.d[7][_o]  ) +
		(p.a[9][_o]   * p.b[6][_o]   - 0xf6b0n  * p.d[6][_o]  ) +
		(p.a[10][_o]  * p.b[5][_o]   - 0xd2a0n  * p.d[5][_o]  ) +
		(p.a[11][_o]  * p.b[4][_o]   - 0x6730n  * p.d[4][_o]  ) +
		(p.a[12][_o]  * p.b[3][_o]   - 0x12bfn  * p.d[3][_o]  ) +
		(p.a[13][_o]  * p.b[2][_o]   - 0xf385n  * p.d[2][_o]  ) +
		(p.a[14][_o]  * p.b[1][_o]   - 0x4b84n  * p.d[1][_o]  ) +
		(p.a[15][_o]  * p.b[0][_o]   - 0x6477n  * p.d[0][_o]  )
		 + p.c[15][_o]  - p.e[15][_o] );

	case 16: return (
		(p.a[0][_o]   * p.b[16][_o]  - 0xaaabn  * p.d[16][_o] ) +
		(p.a[1][_o]   * p.b[15][_o]  - 0xffffn  * p.d[15][_o] ) +
		(p.a[2][_o]   * p.b[14][_o]  - 0xffffn  * p.d[14][_o] ) +
		(p.a[3][_o]   * p.b[13][_o]  - 0xb9fen  * p.d[13][_o] ) +
		(p.a[4][_o]   * p.b[12][_o]  - 0xffffn  * p.d[12][_o] ) +
		(p.a[5][_o]   * p.b[11][_o]  - 0xb153n  * p.d[11][_o] ) +
		(p.a[6][_o]   * p.b[10][_o]  - 0xfffen  * p.d[10][_o] ) +
		(p.a[7][_o]   * p.b[9][_o]   - 0x1eabn  * p.d[9][_o]  ) +
		(p.a[8][_o]   * p.b[8][_o]   - 0xf624n  * p.d[8][_o]  ) +
		(p.a[9][_o]   * p.b[7][_o]   - 0xf6b0n  * p.d[7][_o]  ) +
		(p.a[10][_o]  * p.b[6][_o]   - 0xd2a0n  * p.d[6][_o]  ) +
		(p.a[11][_o]  * p.b[5][_o]   - 0x6730n  * p.d[5][_o]  ) +
		(p.a[12][_o]  * p.b[4][_o]   - 0x12bfn  * p.d[4][_o]  ) +
		(p.a[13][_o]  * p.b[3][_o]   - 0xf385n  * p.d[3][_o]  ) +
		(p.a[14][_o]  * p.b[2][_o]   - 0x4b84n  * p.d[2][_o]  ) +
		(p.a[15][_o]  * p.b[1][_o]   - 0x6477n  * p.d[1][_o]  ) +
		(p.a[16][_o]  * p.b[0][_o]   - 0xacd7n  * p.d[0][_o]  )
		 + p.c[16][_o]  - p.e[16][_o] );

	case 17: return (
		(p.a[0][_o]   * p.b[17][_o]  - 0xaaabn  * p.d[17][_o] ) +
		(p.a[1][_o]   * p.b[16][_o]  - 0xffffn  * p.d[16][_o] ) +
		(p.a[2][_o]   * p.b[15][_o]  - 0xffffn  * p.d[15][_o] ) +
		(p.a[3][_o]   * p.b[14][_o]  - 0xb9fen  * p.d[14][_o] ) +
		(p.a[4][_o]   * p.b[13][_o]  - 0xffffn  * p.d[13][_o] ) +
		(p.a[5][_o]   * p.b[12][_o]  - 0xb153n  * p.d[12][_o] ) +
		(p.a[6][_o]   * p.b[11][_o]  - 0xfffen  * p.d[11][_o] ) +
		(p.a[7][_o]   * p.b[10][_o]  - 0x1eabn  * p.d[10][_o] ) +
		(p.a[8][_o]   * p.b[9][_o]   - 0xf624n  * p.d[9][_o]  ) +
		(p.a[9][_o]   * p.b[8][_o]   - 0xf6b0n  * p.d[8][_o]  ) +
		(p.a[10][_o]  * p.b[7][_o]   - 0xd2a0n  * p.d[7][_o]  ) +
		(p.a[11][_o]  * p.b[6][_o]   - 0x6730n  * p.d[6][_o]  ) +
		(p.a[12][_o]  * p.b[5][_o]   - 0x12bfn  * p.d[5][_o]  ) +
		(p.a[13][_o]  * p.b[4][_o]   - 0xf385n  * p.d[4][_o]  ) +
		(p.a[14][_o]  * p.b[3][_o]   - 0x4b84n  * p.d[3][_o]  ) +
		(p.a[15][_o]  * p.b[2][_o]   - 0x6477n  * p.d[2][_o]  ) +
		(p.a[16][_o]  * p.b[1][_o]   - 0xacd7n  * p.d[1][_o]  ) +
		(p.a[17][_o]  * p.b[0][_o]   - 0x434bn  * p.d[0][_o]  )
		 + p.c[17][_o]  - p.e[17][_o] );

	case 18: return (
		(p.a[0][_o]   * p.b[18][_o]  - 0xaaabn  * p.d[18][_o] ) +
		(p.a[1][_o]   * p.b[17][_o]  - 0xffffn  * p.d[17][_o] ) +
		(p.a[2][_o]   * p.b[16][_o]  - 0xffffn  * p.d[16][_o] ) +
		(p.a[3][_o]   * p.b[15][_o]  - 0xb9fen  * p.d[15][_o] ) +
		(p.a[4][_o]   * p.b[14][_o]  - 0xffffn  * p.d[14][_o] ) +
		(p.a[5][_o]   * p.b[13][_o]  - 0xb153n  * p.d[13][_o] ) +
		(p.a[6][_o]   * p.b[12][_o]  - 0xfffen  * p.d[12][_o] ) +
		(p.a[7][_o]   * p.b[11][_o]  - 0x1eabn  * p.d[11][_o] ) +
		(p.a[8][_o]   * p.b[10][_o]  - 0xf624n  * p.d[10][_o] ) +
		(p.a[9][_o]   * p.b[9][_o]   - 0xf6b0n  * p.d[9][_o]  ) +
		(p.a[10][_o]  * p.b[8][_o]   - 0xd2a0n  * p.d[8][_o]  ) +
		(p.a[11][_o]  * p.b[7][_o]   - 0x6730n  * p.d[7][_o]  ) +
		(p.a[12][_o]  * p.b[6][_o]   - 0x12bfn  * p.d[6][_o]  ) +
		(p.a[13][_o]  * p.b[5][_o]   - 0xf385n  * p.d[5][_o]  ) +
		(p.a[14][_o]  * p.b[4][_o]   - 0x4b84n  * p.d[4][_o]  ) +
		(p.a[15][_o]  * p.b[3][_o]   - 0x6477n  * p.d[3][_o]  ) +
		(p.a[16][_o]  * p.b[2][_o]   - 0xacd7n  * p.d[2][_o]  ) +
		(p.a[17][_o]  * p.b[1][_o]   - 0x434bn  * p.d[1][_o]  ) +
		(p.a[18][_o]  * p.b[0][_o]   - 0xa7b6n  * p.d[0][_o]  )
		 + p.c[18][_o]  - p.e[18][_o] );

	case 19: return (
		(p.a[0][_o]   * p.b[19][_o]  - 0xaaabn  * p.d[19][_o] ) +
		(p.a[1][_o]   * p.b[18][_o]  - 0xffffn  * p.d[18][_o] ) +
		(p.a[2][_o]   * p.b[17][_o]  - 0xffffn  * p.d[17][_o] ) +
		(p.a[3][_o]   * p.b[16][_o]  - 0xb9fen  * p.d[16][_o] ) +
		(p.a[4][_o]   * p.b[15][_o]  - 0xffffn  * p.d[15][_o] ) +
		(p.a[5][_o]   * p.b[14][_o]  - 0xb153n  * p.d[14][_o] ) +
		(p.a[6][_o]   * p.b[13][_o]  - 0xfffen  * p.d[13][_o] ) +
		(p.a[7][_o]   * p.b[12][_o]  - 0x1eabn  * p.d[12][_o] ) +
		(p.a[8][_o]   * p.b[11][_o]  - 0xf624n  * p.d[11][_o] ) +
		(p.a[9][_o]   * p.b[10][_o]  - 0xf6b0n  * p.d[10][_o] ) +
		(p.a[10][_o]  * p.b[9][_o]   - 0xd2a0n  * p.d[9][_o]  ) +
		(p.a[11][_o]  * p.b[8][_o]   - 0x6730n  * p.d[8][_o]  ) +
		(p.a[12][_o]  * p.b[7][_o]   - 0x12bfn  * p.d[7][_o]  ) +
		(p.a[13][_o]  * p.b[6][_o]   - 0xf385n  * p.d[6][_o]  ) +
		(p.a[14][_o]  * p.b[5][_o]   - 0x4b84n  * p.d[5][_o]  ) +
		(p.a[15][_o]  * p.b[4][_o]   - 0x6477n  * p.d[4][_o]  ) +
		(p.a[16][_o]  * p.b[3][_o]   - 0xacd7n  * p.d[3][_o]  ) +
		(p.a[17][_o]  * p.b[2][_o]   - 0x434bn  * p.d[2][_o]  ) +
		(p.a[18][_o]  * p.b[1][_o]   - 0xa7b6n  * p.d[1][_o]  ) +
		(p.a[19][_o]  * p.b[0][_o]   - 0x4b1bn  * p.d[0][_o]  )
		 + p.c[19][_o]  - p.e[19][_o] );

	case 20: return (
		(p.a[0][_o]   * p.b[20][_o]  - 0xaaabn  * p.d[20][_o] ) +
		(p.a[1][_o]   * p.b[19][_o]  - 0xffffn  * p.d[19][_o] ) +
		(p.a[2][_o]   * p.b[18][_o]  - 0xffffn  * p.d[18][_o] ) +
		(p.a[3][_o]   * p.b[17][_o]  - 0xb9fen  * p.d[17][_o] ) +
		(p.a[4][_o]   * p.b[16][_o]  - 0xffffn  * p.d[16][_o] ) +
		(p.a[5][_o]   * p.b[15][_o]  - 0xb153n  * p.d[15][_o] ) +
		(p.a[6][_o]   * p.b[14][_o]  - 0xfffen  * p.d[14][_o] ) +
		(p.a[7][_o]   * p.b[13][_o]  - 0x1eabn  * p.d[13][_o] ) +
		(p.a[8][_o]   * p.b[12][_o]  - 0xf624n  * p.d[12][_o] ) +
		(p.a[9][_o]   * p.b[11][_o]  - 0xf6b0n  * p.d[11][_o] ) +
		(p.a[10][_o]  * p.b[10][_o]  - 0xd2a0n  * p.d[10][_o] ) +
		(p.a[11][_o]  * p.b[9][_o]   - 0x6730n  * p.d[9][_o]  ) +
		(p.a[12][_o]  * p.b[8][_o]   - 0x12bfn  * p.d[8][_o]  ) +
		(p.a[13][_o]  * p.b[7][_o]   - 0xf385n  * p.d[7][_o]  ) +
		(p.a[14][_o]  * p.b[6][_o]   - 0x4b84n  * p.d[6][_o]  ) +
		(p.a[15][_o]  * p.b[5][_o]   - 0x6477n  * p.d[5][_o]  ) +
		(p.a[16][_o]  * p.b[4][_o]   - 0xacd7n  * p.d[4][_o]  ) +
		(p.a[17][_o]  * p.b[3][_o]   - 0x434bn  * p.d[3][_o]  ) +
		(p.a[18][_o]  * p.b[2][_o]   - 0xa7b6n  * p.d[2][_o]  ) +
		(p.a[19][_o]  * p.b[1][_o]   - 0x4b1bn  * p.d[1][_o]  ) +
		(p.a[20][_o]  * p.b[0][_o]   - 0xe69an  * p.d[0][_o]  )
		 + p.c[20][_o]  - p.e[20][_o] );

	case 21: return (
		(p.a[0][_o]   * p.b[21][_o]  - 0xaaabn  * p.d[21][_o] ) +
		(p.a[1][_o]   * p.b[20][_o]  - 0xffffn  * p.d[20][_o] ) +
		(p.a[2][_o]   * p.b[19][_o]  - 0xffffn  * p.d[19][_o] ) +
		(p.a[3][_o]   * p.b[18][_o]  - 0xb9fen  * p.d[18][_o] ) +
		(p.a[4][_o]   * p.b[17][_o]  - 0xffffn  * p.d[17][_o] ) +
		(p.a[5][_o]   * p.b[16][_o]  - 0xb153n  * p.d[16][_o] ) +
		(p.a[6][_o]   * p.b[15][_o]  - 0xfffen  * p.d[15][_o] ) +
		(p.a[7][_o]   * p.b[14][_o]  - 0x1eabn  * p.d[14][_o] ) +
		(p.a[8][_o]   * p.b[13][_o]  - 0xf624n  * p.d[13][_o] ) +
		(p.a[9][_o]   * p.b[12][_o]  - 0xf6b0n  * p.d[12][_o] ) +
		(p.a[10][_o]  * p.b[11][_o]  - 0xd2a0n  * p.d[11][_o] ) +
		(p.a[11][_o]  * p.b[10][_o]  - 0x6730n  * p.d[10][_o] ) +
		(p.a[12][_o]  * p.b[9][_o]   - 0x12bfn  * p.d[9][_o]  ) +
		(p.a[13][_o]  * p.b[8][_o]   - 0xf385n  * p.d[8][_o]  ) +
		(p.a[14][_o]  * p.b[7][_o]   - 0x4b84n  * p.d[7][_o]  ) +
		(p.a[15][_o]  * p.b[6][_o]   - 0x6477n  * p.d[6][_o]  ) +
		(p.a[16][_o]  * p.b[5][_o]   - 0xacd7n  * p.d[5][_o]  ) +
		(p.a[17][_o]  * p.b[4][_o]   - 0x434bn  * p.d[4][_o]  ) +
		(p.a[18][_o]  * p.b[3][_o]   - 0xa7b6n  * p.d[3][_o]  ) +
		(p.a[19][_o]  * p.b[2][_o]   - 0x4b1bn  * p.d[2][_o]  ) +
		(p.a[20][_o]  * p.b[1][_o]   - 0xe69an  * p.d[1][_o]  ) +
		(p.a[21][_o]  * p.b[0][_o]   - 0x397fn  * p.d[0][_o]  )
		 + p.c[21][_o]  - p.e[21][_o] );

	case 22: return (
		(p.a[0][_o]   * p.b[22][_o]  - 0xaaabn  * p.d[22][_o] ) +
		(p.a[1][_o]   * p.b[21][_o]  - 0xffffn  * p.d[21][_o] ) +
		(p.a[2][_o]   * p.b[20][_o]  - 0xffffn  * p.d[20][_o] ) +
		(p.a[3][_o]   * p.b[19][_o]  - 0xb9fen  * p.d[19][_o] ) +
		(p.a[4][_o]   * p.b[18][_o]  - 0xffffn  * p.d[18][_o] ) +
		(p.a[5][_o]   * p.b[17][_o]  - 0xb153n  * p.d[17][_o] ) +
		(p.a[6][_o]   * p.b[16][_o]  - 0xfffen  * p.d[16][_o] ) +
		(p.a[7][_o]   * p.b[15][_o]  - 0x1eabn  * p.d[15][_o] ) +
		(p.a[8][_o]   * p.b[14][_o]  - 0xf624n  * p.d[14][_o] ) +
		(p.a[9][_o]   * p.b[13][_o]  - 0xf6b0n  * p.d[13][_o] ) +
		(p.a[10][_o]  * p.b[12][_o]  - 0xd2a0n  * p.d[12][_o] ) +
		(p.a[11][_o]  * p.b[11][_o]  - 0x6730n  * p.d[11][_o] ) +
		(p.a[12][_o]  * p.b[10][_o]  - 0x12bfn  * p.d[10][_o] ) +
		(p.a[13][_o]  * p.b[9][_o]   - 0xf385n  * p.d[9][_o]  ) +
		(p.a[14][_o]  * p.b[8][_o]   - 0x4b84n  * p.d[8][_o]  ) +
		(p.a[15][_o]  * p.b[7][_o]   - 0x6477n  * p.d[7][_o]  ) +
		(p.a[16][_o]  * p.b[6][_o]   - 0xacd7n  * p.d[6][_o]  ) +
		(p.a[17][_o]  * p.b[5][_o]   - 0x434bn  * p.d[5][_o]  ) +
		(p.a[18][_o]  * p.b[4][_o]   - 0xa7b6n  * p.d[4][_o]  ) +
		(p.a[19][_o]  * p.b[3][_o]   - 0x4b1bn  * p.d[3][_o]  ) +
		(p.a[20][_o]  * p.b[2][_o]   - 0xe69an  * p.d[2][_o]  ) +
		(p.a[21][_o]  * p.b[1][_o]   - 0x397fn  * p.d[1][_o]  ) +
		(p.a[22][_o]  * p.b[0][_o]   - 0x11ean  * p.d[0][_o]  )
		 + p.c[22][_o]  - p.e[22][_o] );

	case 23: return (
		(p.a[0][_o]   * p.b[23][_o]  - 0xaaabn  * p.d[23][_o] ) +
		(p.a[1][_o]   * p.b[22][_o]  - 0xffffn  * p.d[22][_o] ) +
		(p.a[2][_o]   * p.b[21][_o]  - 0xffffn  * p.d[21][_o] ) +
		(p.a[3][_o]   * p.b[20][_o]  - 0xb9fen  * p.d[20][_o] ) +
		(p.a[4][_o]   * p.b[19][_o]  - 0xffffn  * p.d[19][_o] ) +
		(p.a[5][_o]   * p.b[18][_o]  - 0xb153n  * p.d[18][_o] ) +
		(p.a[6][_o]   * p.b[17][_o]  - 0xfffen  * p.d[17][_o] ) +
		(p.a[7][_o]   * p.b[16][_o]  - 0x1eabn  * p.d[16][_o] ) +
		(p.a[8][_o]   * p.b[15][_o]  - 0xf624n  * p.d[15][_o] ) +
		(p.a[9][_o]   * p.b[14][_o]  - 0xf6b0n  * p.d[14][_o] ) +
		(p.a[10][_o]  * p.b[13][_o]  - 0xd2a0n  * p.d[13][_o] ) +
		(p.a[11][_o]  * p.b[12][_o]  - 0x6730n  * p.d[12][_o] ) +
		(p.a[12][_o]  * p.b[11][_o]  - 0x12bfn  * p.d[11][_o] ) +
		(p.a[13][_o]  * p.b[10][_o]  - 0xf385n  * p.d[10][_o] ) +
		(p.a[14][_o]  * p.b[9][_o]   - 0x4b84n  * p.d[9][_o]  ) +
		(p.a[15][_o]  * p.b[8][_o]   - 0x6477n  * p.d[8][_o]  ) +
		(p.a[16][_o]  * p.b[7][_o]   - 0xacd7n  * p.d[7][_o]  ) +
		(p.a[17][_o]  * p.b[6][_o]   - 0x434bn  * p.d[6][_o]  ) +
		(p.a[18][_o]  * p.b[5][_o]   - 0xa7b6n  * p.d[5][_o]  ) +
		(p.a[19][_o]  * p.b[4][_o]   - 0x4b1bn  * p.d[4][_o]  ) +
		(p.a[20][_o]  * p.b[3][_o]   - 0xe69an  * p.d[3][_o]  ) +
		(p.a[21][_o]  * p.b[2][_o]   - 0x397fn  * p.d[2][_o]  ) +
		(p.a[22][_o]  * p.b[1][_o]   - 0x11ean  * p.d[1][_o]  ) +
		(p.a[23][_o]  * p.b[0][_o]   - 0x1a01n  * p.d[0][_o]  )
		 + p.c[23][_o]  - p.e[23][_o] );

	case 24: return (
		(p.a[1][_o]   * p.b[23][_o]  - 0xffffn  * p.d[23][_o] ) +
		(p.a[2][_o]   * p.b[22][_o]  - 0xffffn  * p.d[22][_o] ) +
		(p.a[3][_o]   * p.b[21][_o]  - 0xb9fen  * p.d[21][_o] ) +
		(p.a[4][_o]   * p.b[20][_o]  - 0xffffn  * p.d[20][_o] ) +
		(p.a[5][_o]   * p.b[19][_o]  - 0xb153n  * p.d[19][_o] ) +
		(p.a[6][_o]   * p.b[18][_o]  - 0xfffen  * p.d[18][_o] ) +
		(p.a[7][_o]   * p.b[17][_o]  - 0x1eabn  * p.d[17][_o] ) +
		(p.a[8][_o]   * p.b[16][_o]  - 0xf624n  * p.d[16][_o] ) +
		(p.a[9][_o]   * p.b[15][_o]  - 0xf6b0n  * p.d[15][_o] ) +
		(p.a[10][_o]  * p.b[14][_o]  - 0xd2a0n  * p.d[14][_o] ) +
		(p.a[11][_o]  * p.b[13][_o]  - 0x6730n  * p.d[13][_o] ) +
		(p.a[12][_o]  * p.b[12][_o]  - 0x12bfn  * p.d[12][_o] ) +
		(p.a[13][_o]  * p.b[11][_o]  - 0xf385n  * p.d[11][_o] ) +
		(p.a[14][_o]  * p.b[10][_o]  - 0x4b84n  * p.d[10][_o] ) +
		(p.a[15][_o]  * p.b[9][_o]   - 0x6477n  * p.d[9][_o]  ) +
		(p.a[16][_o]  * p.b[8][_o]   - 0xacd7n  * p.d[8][_o]  ) +
		(p.a[17][_o]  * p.b[7][_o]   - 0x434bn  * p.d[7][_o]  ) +
		(p.a[18][_o]  * p.b[6][_o]   - 0xa7b6n  * p.d[6][_o]  ) +
		(p.a[19][_o]  * p.b[5][_o]   - 0x4b1bn  * p.d[5][_o]  ) +
		(p.a[20][_o]  * p.b[4][_o]   - 0xe69an  * p.d[4][_o]  ) +
		(p.a[21][_o]  * p.b[3][_o]   - 0x397fn  * p.d[3][_o]  ) +
		(p.a[22][_o]  * p.b[2][_o]   - 0x11ean  * p.d[2][_o]  ) +
		(p.a[23][_o]  * p.b[1][_o]   - 0x1a01n  * p.d[1][_o]  ));

	case 25: return (
		(p.a[2][_o]   * p.b[23][_o]  - 0xffffn  * p.d[23][_o] ) +
		(p.a[3][_o]   * p.b[22][_o]  - 0xb9fen  * p.d[22][_o] ) +
		(p.a[4][_o]   * p.b[21][_o]  - 0xffffn  * p.d[21][_o] ) +
		(p.a[5][_o]   * p.b[20][_o]  - 0xb153n  * p.d[20][_o] ) +
		(p.a[6][_o]   * p.b[19][_o]  - 0xfffen  * p.d[19][_o] ) +
		(p.a[7][_o]   * p.b[18][_o]  - 0x1eabn  * p.d[18][_o] ) +
		(p.a[8][_o]   * p.b[17][_o]  - 0xf624n  * p.d[17][_o] ) +
		(p.a[9][_o]   * p.b[16][_o]  - 0xf6b0n  * p.d[16][_o] ) +
		(p.a[10][_o]  * p.b[15][_o]  - 0xd2a0n  * p.d[15][_o] ) +
		(p.a[11][_o]  * p.b[14][_o]  - 0x6730n  * p.d[14][_o] ) +
		(p.a[12][_o]  * p.b[13][_o]  - 0x12bfn  * p.d[13][_o] ) +
		(p.a[13][_o]  * p.b[12][_o]  - 0xf385n  * p.d[12][_o] ) +
		(p.a[14][_o]  * p.b[11][_o]  - 0x4b84n  * p.d[11][_o] ) +
		(p.a[15][_o]  * p.b[10][_o]  - 0x6477n  * p.d[10][_o] ) +
		(p.a[16][_o]  * p.b[9][_o]   - 0xacd7n  * p.d[9][_o]  ) +
		(p.a[17][_o]  * p.b[8][_o]   - 0x434bn  * p.d[8][_o]  ) +
		(p.a[18][_o]  * p.b[7][_o]   - 0xa7b6n  * p.d[7][_o]  ) +
		(p.a[19][_o]  * p.b[6][_o]   - 0x4b1bn  * p.d[6][_o]  ) +
		(p.a[20][_o]  * p.b[5][_o]   - 0xe69an  * p.d[5][_o]  ) +
		(p.a[21][_o]  * p.b[4][_o]   - 0x397fn  * p.d[4][_o]  ) +
		(p.a[22][_o]  * p.b[3][_o]   - 0x11ean  * p.d[3][_o]  ) +
		(p.a[23][_o]  * p.b[2][_o]   - 0x1a01n  * p.d[2][_o]  ));

	case 26: return (
		(p.a[3][_o]   * p.b[23][_o]  - 0xb9fen  * p.d[23][_o] ) +
		(p.a[4][_o]   * p.b[22][_o]  - 0xffffn  * p.d[22][_o] ) +
		(p.a[5][_o]   * p.b[21][_o]  - 0xb153n  * p.d[21][_o] ) +
		(p.a[6][_o]   * p.b[20][_o]  - 0xfffen  * p.d[20][_o] ) +
		(p.a[7][_o]   * p.b[19][_o]  - 0x1eabn  * p.d[19][_o] ) +
		(p.a[8][_o]   * p.b[18][_o]  - 0xf624n  * p.d[18][_o] ) +
		(p.a[9][_o]   * p.b[17][_o]  - 0xf6b0n  * p.d[17][_o] ) +
		(p.a[10][_o]  * p.b[16][_o]  - 0xd2a0n  * p.d[16][_o] ) +
		(p.a[11][_o]  * p.b[15][_o]  - 0x6730n  * p.d[15][_o] ) +
		(p.a[12][_o]  * p.b[14][_o]  - 0x12bfn  * p.d[14][_o] ) +
		(p.a[13][_o]  * p.b[13][_o]  - 0xf385n  * p.d[13][_o] ) +
		(p.a[14][_o]  * p.b[12][_o]  - 0x4b84n  * p.d[12][_o] ) +
		(p.a[15][_o]  * p.b[11][_o]  - 0x6477n  * p.d[11][_o] ) +
		(p.a[16][_o]  * p.b[10][_o]  - 0xacd7n  * p.d[10][_o] ) +
		(p.a[17][_o]  * p.b[9][_o]   - 0x434bn  * p.d[9][_o]  ) +
		(p.a[18][_o]  * p.b[8][_o]   - 0xa7b6n  * p.d[8][_o]  ) +
		(p.a[19][_o]  * p.b[7][_o]   - 0x4b1bn  * p.d[7][_o]  ) +
		(p.a[20][_o]  * p.b[6][_o]   - 0xe69an  * p.d[6][_o]  ) +
		(p.a[21][_o]  * p.b[5][_o]   - 0x397fn  * p.d[5][_o]  ) +
		(p.a[22][_o]  * p.b[4][_o]   - 0x11ean  * p.d[4][_o]  ) +
		(p.a[23][_o]  * p.b[3][_o]   - 0x1a01n  * p.d[3][_o]  ));

	case 27: return (
		(p.a[4][_o]   * p.b[23][_o]  - 0xffffn  * p.d[23][_o] ) +
		(p.a[5][_o]   * p.b[22][_o]  - 0xb153n  * p.d[22][_o] ) +
		(p.a[6][_o]   * p.b[21][_o]  - 0xfffen  * p.d[21][_o] ) +
		(p.a[7][_o]   * p.b[20][_o]  - 0x1eabn  * p.d[20][_o] ) +
		(p.a[8][_o]   * p.b[19][_o]  - 0xf624n  * p.d[19][_o] ) +
		(p.a[9][_o]   * p.b[18][_o]  - 0xf6b0n  * p.d[18][_o] ) +
		(p.a[10][_o]  * p.b[17][_o]  - 0xd2a0n  * p.d[17][_o] ) +
		(p.a[11][_o]  * p.b[16][_o]  - 0x6730n  * p.d[16][_o] ) +
		(p.a[12][_o]  * p.b[15][_o]  - 0x12bfn  * p.d[15][_o] ) +
		(p.a[13][_o]  * p.b[14][_o]  - 0xf385n  * p.d[14][_o] ) +
		(p.a[14][_o]  * p.b[13][_o]  - 0x4b84n  * p.d[13][_o] ) +
		(p.a[15][_o]  * p.b[12][_o]  - 0x6477n  * p.d[12][_o] ) +
		(p.a[16][_o]  * p.b[11][_o]  - 0xacd7n  * p.d[11][_o] ) +
		(p.a[17][_o]  * p.b[10][_o]  - 0x434bn  * p.d[10][_o] ) +
		(p.a[18][_o]  * p.b[9][_o]   - 0xa7b6n  * p.d[9][_o]  ) +
		(p.a[19][_o]  * p.b[8][_o]   - 0x4b1bn  * p.d[8][_o]  ) +
		(p.a[20][_o]  * p.b[7][_o]   - 0xe69an  * p.d[7][_o]  ) +
		(p.a[21][_o]  * p.b[6][_o]   - 0x397fn  * p.d[6][_o]  ) +
		(p.a[22][_o]  * p.b[5][_o]   - 0x11ean  * p.d[5][_o]  ) +
		(p.a[23][_o]  * p.b[4][_o]   - 0x1a01n  * p.d[4][_o]  ));

	case 28: return (
		(p.a[5][_o]   * p.b[23][_o]  - 0xb153n  * p.d[23][_o] ) +
		(p.a[6][_o]   * p.b[22][_o]  - 0xfffen  * p.d[22][_o] ) +
		(p.a[7][_o]   * p.b[21][_o]  - 0x1eabn  * p.d[21][_o] ) +
		(p.a[8][_o]   * p.b[20][_o]  - 0xf624n  * p.d[20][_o] ) +
		(p.a[9][_o]   * p.b[19][_o]  - 0xf6b0n  * p.d[19][_o] ) +
		(p.a[10][_o]  * p.b[18][_o]  - 0xd2a0n  * p.d[18][_o] ) +
		(p.a[11][_o]  * p.b[17][_o]  - 0x6730n  * p.d[17][_o] ) +
		(p.a[12][_o]  * p.b[16][_o]  - 0x12bfn  * p.d[16][_o] ) +
		(p.a[13][_o]  * p.b[15][_o]  - 0xf385n  * p.d[15][_o] ) +
		(p.a[14][_o]  * p.b[14][_o]  - 0x4b84n  * p.d[14][_o] ) +
		(p.a[15][_o]  * p.b[13][_o]  - 0x6477n  * p.d[13][_o] ) +
		(p.a[16][_o]  * p.b[12][_o]  - 0xacd7n  * p.d[12][_o] ) +
		(p.a[17][_o]  * p.b[11][_o]  - 0x434bn  * p.d[11][_o] ) +
		(p.a[18][_o]  * p.b[10][_o]  - 0xa7b6n  * p.d[10][_o] ) +
		(p.a[19][_o]  * p.b[9][_o]   - 0x4b1bn  * p.d[9][_o]  ) +
		(p.a[20][_o]  * p.b[8][_o]   - 0xe69an  * p.d[8][_o]  ) +
		(p.a[21][_o]  * p.b[7][_o]   - 0x397fn  * p.d[7][_o]  ) +
		(p.a[22][_o]  * p.b[6][_o]   - 0x11ean  * p.d[6][_o]  ) +
		(p.a[23][_o]  * p.b[5][_o]   - 0x1a01n  * p.d[5][_o]  ));

	case 29: return (
		(p.a[6][_o]   * p.b[23][_o]  - 0xfffen  * p.d[23][_o] ) +
		(p.a[7][_o]   * p.b[22][_o]  - 0x1eabn  * p.d[22][_o] ) +
		(p.a[8][_o]   * p.b[21][_o]  - 0xf624n  * p.d[21][_o] ) +
		(p.a[9][_o]   * p.b[20][_o]  - 0xf6b0n  * p.d[20][_o] ) +
		(p.a[10][_o]  * p.b[19][_o]  - 0xd2a0n  * p.d[19][_o] ) +
		(p.a[11][_o]  * p.b[18][_o]  - 0x6730n  * p.d[18][_o] ) +
		(p.a[12][_o]  * p.b[17][_o]  - 0x12bfn  * p.d[17][_o] ) +
		(p.a[13][_o]  * p.b[16][_o]  - 0xf385n  * p.d[16][_o] ) +
		(p.a[14][_o]  * p.b[15][_o]  - 0x4b84n  * p.d[15][_o] ) +
		(p.a[15][_o]  * p.b[14][_o]  - 0x6477n  * p.d[14][_o] ) +
		(p.a[16][_o]  * p.b[13][_o]  - 0xacd7n  * p.d[13][_o] ) +
		(p.a[17][_o]  * p.b[12][_o]  - 0x434bn  * p.d[12][_o] ) +
		(p.a[18][_o]  * p.b[11][_o]  - 0xa7b6n  * p.d[11][_o] ) +
		(p.a[19][_o]  * p.b[10][_o]  - 0x4b1bn  * p.d[10][_o] ) +
		(p.a[20][_o]  * p.b[9][_o]   - 0xe69an  * p.d[9][_o]  ) +
		(p.a[21][_o]  * p.b[8][_o]   - 0x397fn  * p.d[8][_o]  ) +
		(p.a[22][_o]  * p.b[7][_o]   - 0x11ean  * p.d[7][_o]  ) +
		(p.a[23][_o]  * p.b[6][_o]   - 0x1a01n  * p.d[6][_o]  ));

	case 30: return (
		(p.a[7][_o]   * p.b[23][_o]  - 0x1eabn  * p.d[23][_o] ) +
		(p.a[8][_o]   * p.b[22][_o]  - 0xf624n  * p.d[22][_o] ) +
		(p.a[9][_o]   * p.b[21][_o]  - 0xf6b0n  * p.d[21][_o] ) +
		(p.a[10][_o]  * p.b[20][_o]  - 0xd2a0n  * p.d[20][_o] ) +
		(p.a[11][_o]  * p.b[19][_o]  - 0x6730n  * p.d[19][_o] ) +
		(p.a[12][_o]  * p.b[18][_o]  - 0x12bfn  * p.d[18][_o] ) +
		(p.a[13][_o]  * p.b[17][_o]  - 0xf385n  * p.d[17][_o] ) +
		(p.a[14][_o]  * p.b[16][_o]  - 0x4b84n  * p.d[16][_o] ) +
		(p.a[15][_o]  * p.b[15][_o]  - 0x6477n  * p.d[15][_o] ) +
		(p.a[16][_o]  * p.b[14][_o]  - 0xacd7n  * p.d[14][_o] ) +
		(p.a[17][_o]  * p.b[13][_o]  - 0x434bn  * p.d[13][_o] ) +
		(p.a[18][_o]  * p.b[12][_o]  - 0xa7b6n  * p.d[12][_o] ) +
		(p.a[19][_o]  * p.b[11][_o]  - 0x4b1bn  * p.d[11][_o] ) +
		(p.a[20][_o]  * p.b[10][_o]  - 0xe69an  * p.d[10][_o] ) +
		(p.a[21][_o]  * p.b[9][_o]   - 0x397fn  * p.d[9][_o]  ) +
		(p.a[22][_o]  * p.b[8][_o]   - 0x11ean  * p.d[8][_o]  ) +
		(p.a[23][_o]  * p.b[7][_o]   - 0x1a01n  * p.d[7][_o]  ));

	case 31: return (
		(p.a[8][_o]   * p.b[23][_o]  - 0xf624n  * p.d[23][_o] ) +
		(p.a[9][_o]   * p.b[22][_o]  - 0xf6b0n  * p.d[22][_o] ) +
		(p.a[10][_o]  * p.b[21][_o]  - 0xd2a0n  * p.d[21][_o] ) +
		(p.a[11][_o]  * p.b[20][_o]  - 0x6730n  * p.d[20][_o] ) +
		(p.a[12][_o]  * p.b[19][_o]  - 0x12bfn  * p.d[19][_o] ) +
		(p.a[13][_o]  * p.b[18][_o]  - 0xf385n  * p.d[18][_o] ) +
		(p.a[14][_o]  * p.b[17][_o]  - 0x4b84n  * p.d[17][_o] ) +
		(p.a[15][_o]  * p.b[16][_o]  - 0x6477n  * p.d[16][_o] ) +
		(p.a[16][_o]  * p.b[15][_o]  - 0xacd7n  * p.d[15][_o] ) +
		(p.a[17][_o]  * p.b[14][_o]  - 0x434bn  * p.d[14][_o] ) +
		(p.a[18][_o]  * p.b[13][_o]  - 0xa7b6n  * p.d[13][_o] ) +
		(p.a[19][_o]  * p.b[12][_o]  - 0x4b1bn  * p.d[12][_o] ) +
		(p.a[20][_o]  * p.b[11][_o]  - 0xe69an  * p.d[11][_o] ) +
		(p.a[21][_o]  * p.b[10][_o]  - 0x397fn  * p.d[10][_o] ) +
		(p.a[22][_o]  * p.b[9][_o]   - 0x11ean  * p.d[9][_o]  ) +
		(p.a[23][_o]  * p.b[8][_o]   - 0x1a01n  * p.d[8][_o]  ));

	case 32: return (
		(p.a[9][_o]   * p.b[23][_o]  - 0xf6b0n  * p.d[23][_o] ) +
		(p.a[10][_o]  * p.b[22][_o]  - 0xd2a0n  * p.d[22][_o] ) +
		(p.a[11][_o]  * p.b[21][_o]  - 0x6730n  * p.d[21][_o] ) +
		(p.a[12][_o]  * p.b[20][_o]  - 0x12bfn  * p.d[20][_o] ) +
		(p.a[13][_o]  * p.b[19][_o]  - 0xf385n  * p.d[19][_o] ) +
		(p.a[14][_o]  * p.b[18][_o]  - 0x4b84n  * p.d[18][_o] ) +
		(p.a[15][_o]  * p.b[17][_o]  - 0x6477n  * p.d[17][_o] ) +
		(p.a[16][_o]  * p.b[16][_o]  - 0xacd7n  * p.d[16][_o] ) +
		(p.a[17][_o]  * p.b[15][_o]  - 0x434bn  * p.d[15][_o] ) +
		(p.a[18][_o]  * p.b[14][_o]  - 0xa7b6n  * p.d[14][_o] ) +
		(p.a[19][_o]  * p.b[13][_o]  - 0x4b1bn  * p.d[13][_o] ) +
		(p.a[20][_o]  * p.b[12][_o]  - 0xe69an  * p.d[12][_o] ) +
		(p.a[21][_o]  * p.b[11][_o]  - 0x397fn  * p.d[11][_o] ) +
		(p.a[22][_o]  * p.b[10][_o]  - 0x11ean  * p.d[10][_o] ) +
		(p.a[23][_o]  * p.b[9][_o]   - 0x1a01n  * p.d[9][_o]  ));

	case 33: return (
		(p.a[10][_o]  * p.b[23][_o]  - 0xd2a0n  * p.d[23][_o] ) +
		(p.a[11][_o]  * p.b[22][_o]  - 0x6730n  * p.d[22][_o] ) +
		(p.a[12][_o]  * p.b[21][_o]  - 0x12bfn  * p.d[21][_o] ) +
		(p.a[13][_o]  * p.b[20][_o]  - 0xf385n  * p.d[20][_o] ) +
		(p.a[14][_o]  * p.b[19][_o]  - 0x4b84n  * p.d[19][_o] ) +
		(p.a[15][_o]  * p.b[18][_o]  - 0x6477n  * p.d[18][_o] ) +
		(p.a[16][_o]  * p.b[17][_o]  - 0xacd7n  * p.d[17][_o] ) +
		(p.a[17][_o]  * p.b[16][_o]  - 0x434bn  * p.d[16][_o] ) +
		(p.a[18][_o]  * p.b[15][_o]  - 0xa7b6n  * p.d[15][_o] ) +
		(p.a[19][_o]  * p.b[14][_o]  - 0x4b1bn  * p.d[14][_o] ) +
		(p.a[20][_o]  * p.b[13][_o]  - 0xe69an  * p.d[13][_o] ) +
		(p.a[21][_o]  * p.b[12][_o]  - 0x397fn  * p.d[12][_o] ) +
		(p.a[22][_o]  * p.b[11][_o]  - 0x11ean  * p.d[11][_o] ) +
		(p.a[23][_o]  * p.b[10][_o]  - 0x1a01n  * p.d[10][_o] ));

	case 34: return (
		(p.a[11][_o]  * p.b[23][_o]  - 0x6730n  * p.d[23][_o] ) +
		(p.a[12][_o]  * p.b[22][_o]  - 0x12bfn  * p.d[22][_o] ) +
		(p.a[13][_o]  * p.b[21][_o]  - 0xf385n  * p.d[21][_o] ) +
		(p.a[14][_o]  * p.b[20][_o]  - 0x4b84n  * p.d[20][_o] ) +
		(p.a[15][_o]  * p.b[19][_o]  - 0x6477n  * p.d[19][_o] ) +
		(p.a[16][_o]  * p.b[18][_o]  - 0xacd7n  * p.d[18][_o] ) +
		(p.a[17][_o]  * p.b[17][_o]  - 0x434bn  * p.d[17][_o] ) +
		(p.a[18][_o]  * p.b[16][_o]  - 0xa7b6n  * p.d[16][_o] ) +
		(p.a[19][_o]  * p.b[15][_o]  - 0x4b1bn  * p.d[15][_o] ) +
		(p.a[20][_o]  * p.b[14][_o]  - 0xe69an  * p.d[14][_o] ) +
		(p.a[21][_o]  * p.b[13][_o]  - 0x397fn  * p.d[13][_o] ) +
		(p.a[22][_o]  * p.b[12][_o]  - 0x11ean  * p.d[12][_o] ) +
		(p.a[23][_o]  * p.b[11][_o]  - 0x1a01n  * p.d[11][_o] ));

	case 35: return (
		(p.a[12][_o]  * p.b[23][_o]  - 0x12bfn  * p.d[23][_o] ) +
		(p.a[13][_o]  * p.b[22][_o]  - 0xf385n  * p.d[22][_o] ) +
		(p.a[14][_o]  * p.b[21][_o]  - 0x4b84n  * p.d[21][_o] ) +
		(p.a[15][_o]  * p.b[20][_o]  - 0x6477n  * p.d[20][_o] ) +
		(p.a[16][_o]  * p.b[19][_o]  - 0xacd7n  * p.d[19][_o] ) +
		(p.a[17][_o]  * p.b[18][_o]  - 0x434bn  * p.d[18][_o] ) +
		(p.a[18][_o]  * p.b[17][_o]  - 0xa7b6n  * p.d[17][_o] ) +
		(p.a[19][_o]  * p.b[16][_o]  - 0x4b1bn  * p.d[16][_o] ) +
		(p.a[20][_o]  * p.b[15][_o]  - 0xe69an  * p.d[15][_o] ) +
		(p.a[21][_o]  * p.b[14][_o]  - 0x397fn  * p.d[14][_o] ) +
		(p.a[22][_o]  * p.b[13][_o]  - 0x11ean  * p.d[13][_o] ) +
		(p.a[23][_o]  * p.b[12][_o]  - 0x1a01n  * p.d[12][_o] ));

	case 36: return (
		(p.a[13][_o]  * p.b[23][_o]  - 0xf385n  * p.d[23][_o] ) +
		(p.a[14][_o]  * p.b[22][_o]  - 0x4b84n  * p.d[22][_o] ) +
		(p.a[15][_o]  * p.b[21][_o]  - 0x6477n  * p.d[21][_o] ) +
		(p.a[16][_o]  * p.b[20][_o]  - 0xacd7n  * p.d[20][_o] ) +
		(p.a[17][_o]  * p.b[19][_o]  - 0x434bn  * p.d[19][_o] ) +
		(p.a[18][_o]  * p.b[18][_o]  - 0xa7b6n  * p.d[18][_o] ) +
		(p.a[19][_o]  * p.b[17][_o]  - 0x4b1bn  * p.d[17][_o] ) +
		(p.a[20][_o]  * p.b[16][_o]  - 0xe69an  * p.d[16][_o] ) +
		(p.a[21][_o]  * p.b[15][_o]  - 0x397fn  * p.d[15][_o] ) +
		(p.a[22][_o]  * p.b[14][_o]  - 0x11ean  * p.d[14][_o] ) +
		(p.a[23][_o]  * p.b[13][_o]  - 0x1a01n  * p.d[13][_o] ));

	case 37: return (
		(p.a[14][_o]  * p.b[23][_o]  - 0x4b84n  * p.d[23][_o] ) +
		(p.a[15][_o]  * p.b[22][_o]  - 0x6477n  * p.d[22][_o] ) +
		(p.a[16][_o]  * p.b[21][_o]  - 0xacd7n  * p.d[21][_o] ) +
		(p.a[17][_o]  * p.b[20][_o]  - 0x434bn  * p.d[20][_o] ) +
		(p.a[18][_o]  * p.b[19][_o]  - 0xa7b6n  * p.d[19][_o] ) +
		(p.a[19][_o]  * p.b[18][_o]  - 0x4b1bn  * p.d[18][_o] ) +
		(p.a[20][_o]  * p.b[17][_o]  - 0xe69an  * p.d[17][_o] ) +
		(p.a[21][_o]  * p.b[16][_o]  - 0x397fn  * p.d[16][_o] ) +
		(p.a[22][_o]  * p.b[15][_o]  - 0x11ean  * p.d[15][_o] ) +
		(p.a[23][_o]  * p.b[14][_o]  - 0x1a01n  * p.d[14][_o] ));

	case 38: return (
		(p.a[15][_o]  * p.b[23][_o]  - 0x6477n  * p.d[23][_o] ) +
		(p.a[16][_o]  * p.b[22][_o]  - 0xacd7n  * p.d[22][_o] ) +
		(p.a[17][_o]  * p.b[21][_o]  - 0x434bn  * p.d[21][_o] ) +
		(p.a[18][_o]  * p.b[20][_o]  - 0xa7b6n  * p.d[20][_o] ) +
		(p.a[19][_o]  * p.b[19][_o]  - 0x4b1bn  * p.d[19][_o] ) +
		(p.a[20][_o]  * p.b[18][_o]  - 0xe69an  * p.d[18][_o] ) +
		(p.a[21][_o]  * p.b[17][_o]  - 0x397fn  * p.d[17][_o] ) +
		(p.a[22][_o]  * p.b[16][_o]  - 0x11ean  * p.d[16][_o] ) +
		(p.a[23][_o]  * p.b[15][_o]  - 0x1a01n  * p.d[15][_o] ));

	case 39: return (
		(p.a[16][_o]  * p.b[23][_o]  - 0xacd7n  * p.d[23][_o] ) +
		(p.a[17][_o]  * p.b[22][_o]  - 0x434bn  * p.d[22][_o] ) +
		(p.a[18][_o]  * p.b[21][_o]  - 0xa7b6n  * p.d[21][_o] ) +
		(p.a[19][_o]  * p.b[20][_o]  - 0x4b1bn  * p.d[20][_o] ) +
		(p.a[20][_o]  * p.b[19][_o]  - 0xe69an  * p.d[19][_o] ) +
		(p.a[21][_o]  * p.b[18][_o]  - 0x397fn  * p.d[18][_o] ) +
		(p.a[22][_o]  * p.b[17][_o]  - 0x11ean  * p.d[17][_o] ) +
		(p.a[23][_o]  * p.b[16][_o]  - 0x1a01n  * p.d[16][_o] ));

	case 40: return (
		(p.a[17][_o]  * p.b[23][_o]  - 0x434bn  * p.d[23][_o] ) +
		(p.a[18][_o]  * p.b[22][_o]  - 0xa7b6n  * p.d[22][_o] ) +
		(p.a[19][_o]  * p.b[21][_o]  - 0x4b1bn  * p.d[21][_o] ) +
		(p.a[20][_o]  * p.b[20][_o]  - 0xe69an  * p.d[20][_o] ) +
		(p.a[21][_o]  * p.b[19][_o]  - 0x397fn  * p.d[19][_o] ) +
		(p.a[22][_o]  * p.b[18][_o]  - 0x11ean  * p.d[18][_o] ) +
		(p.a[23][_o]  * p.b[17][_o]  - 0x1a01n  * p.d[17][_o] ));

	case 41: return (
		(p.a[18][_o]  * p.b[23][_o]  - 0xa7b6n  * p.d[23][_o] ) +
		(p.a[19][_o]  * p.b[22][_o]  - 0x4b1bn  * p.d[22][_o] ) +
		(p.a[20][_o]  * p.b[21][_o]  - 0xe69an  * p.d[21][_o] ) +
		(p.a[21][_o]  * p.b[20][_o]  - 0x397fn  * p.d[20][_o] ) +
		(p.a[22][_o]  * p.b[19][_o]  - 0x11ean  * p.d[19][_o] ) +
		(p.a[23][_o]  * p.b[18][_o]  - 0x1a01n  * p.d[18][_o] ));

	case 42: return (
		(p.a[19][_o]  * p.b[23][_o]  - 0x4b1bn  * p.d[23][_o] ) +
		(p.a[20][_o]  * p.b[22][_o]  - 0xe69an  * p.d[22][_o] ) +
		(p.a[21][_o]  * p.b[21][_o]  - 0x397fn  * p.d[21][_o] ) +
		(p.a[22][_o]  * p.b[20][_o]  - 0x11ean  * p.d[20][_o] ) +
		(p.a[23][_o]  * p.b[19][_o]  - 0x1a01n  * p.d[19][_o] ));

	case 43: return (
		(p.a[20][_o]  * p.b[23][_o]  - 0xe69an  * p.d[23][_o] ) +
		(p.a[21][_o]  * p.b[22][_o]  - 0x397fn  * p.d[22][_o] ) +
		(p.a[22][_o]  * p.b[21][_o]  - 0x11ean  * p.d[21][_o] ) +
		(p.a[23][_o]  * p.b[20][_o]  - 0x1a01n  * p.d[20][_o] ));

	case 44: return (
		(p.a[21][_o]  * p.b[23][_o]  - 0x397fn  * p.d[23][_o] ) +
		(p.a[22][_o]  * p.b[22][_o]  - 0x11ean  * p.d[22][_o] ) +
		(p.a[23][_o]  * p.b[21][_o]  - 0x1a01n  * p.d[21][_o] ));

	case 45: return (
		(p.a[22][_o]  * p.b[23][_o]  - 0x11ean  * p.d[23][_o] ) +
		(p.a[23][_o]  * p.b[22][_o]  - 0x1a01n  * p.d[22][_o] ));

	case 46: return (
		(p.a[23][_o]  * p.b[23][_o]  - 0x1a01n  * p.d[23][_o] ));

	case 47: return (
		0x0n    );
	}
	return 0n;
}

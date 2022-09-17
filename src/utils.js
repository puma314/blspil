module.exports.bits = function bits(s) {
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
class PolynomialHash {
  /**
   *
   * @param {Number} [base]
   * @param {Number} [modulus]
   */
  constructor(base = 39, modulus = 102) {
    this.base = base;
    this.modulus = modulus;
  }

  /**
   * @param {String} word
   * @return {Number}
   */
  hash(word) {
    const charCodes = Array.from(word).map(char => this.charToNumber(char));

    let hash = 0;
    for (let i = 0; i < charCodes.length; i++) {
      hash *= this.base;
      hash += charCodes[i];
      hash %= this.modulus;
    }

    return hash;
  }

  /**
   *
   * @param {Number} pHash
   * @param {String} pWord
   * @param {String} nWord
   * @return {Number}
   */
  roll(pHash, pWord, nWord) {
    let hash = pHash;

    const pValue = this.charToNumber(pWord[0]);
    const nValue = this.charToNumber(nWord[nWord.length - 1]);

    let pValueMult = 1;
    for (let i = 0; i < pWord.length; i++) {
      pValueMult *= this.base;
      pValueMult %= this.modulus;
    }

    hash += this.modulus;
    hash -= (pValue * pValueMult) % this.modulus;

    hash *= this.base;
    hash += nValue;
    hash %= this.modulus;

    return hash;
  }

  /**
   * @param {String} char
   * @return {Number}
   */
  charToNumber(char) {
    let charCode = char.codePointAt(0);

    const pair = char.codePointAt(1);
    if (pair !== undefined) charCode += pair * Math.pow(2, 16);

    return charCode;
  }
}

module.exports = PolynomialHash;

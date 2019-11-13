class Comparator {
  constructor(compareFunction) {
    this.compare = compareFunction || Comparator.defaultCompare;
  }

  static defaultCompare(a, b) {
    return a === b ? 0 : a > b ? 1 : -1;
  }

  equal(a, b) {
    return this.compare(a, b) === 0;
  }

  lessThan(a, b) {
    return this.compare(a, b) === -1;
  }

  greaterThan(a, b) {
    return this.compare(a, b) === 1;
  }

  lessThanOrEqual(a, b) {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  greaterThanOrEqual(a, b) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  reverse() {
    const initialCompare = this.compare;
    this.compare = (a, b) => initialCompare(b, a);
  }
}

export default Comparator;

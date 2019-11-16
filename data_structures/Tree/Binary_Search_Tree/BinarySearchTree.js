const BinarySearchTreeNode = require('./BinarySearchTreeNode');

class BinarySearchTree {
  constructor(valueComparator) {
    this.root = new BinarySearchTreeNode(null, valueComparator);

    this._nodeComparator = this.root._comparator;
  }

  /**
   * @param {*} value
   * @return {BinarySearchTreeNode}
   */
  insert(value) {
    return this.root.insert(value);
  }

  /**
   * @param {*} value
   * @return {Boolean}
   */
  contains(value) {
    return this.root.contains(value);
  }

  /**
   * @param {*} value
   * @return {Boolean}
   */
  remove(value) {
    return this.root.remove(value);
  }

  /**
   * @return {String}
   */
  toString() {
    return this.root.toString();
  }
}

module.exports = BinarySearchTree;

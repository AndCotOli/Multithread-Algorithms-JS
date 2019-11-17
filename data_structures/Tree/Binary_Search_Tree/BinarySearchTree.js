const BinarySearchTreeNode = require('./BinarySearchTreeNode');

class BinarySearchTree {
  /**
   * @param {Function} valueComparator - The comparator function for values.
   */
  constructor(valueComparator) {
    this.root = new BinarySearchTreeNode(null, valueComparator);

    this._nodeComparator = this.root._comparator;
  }

  /**
   * Insertes a new Node into the Tree.
   * @param {*} value - The value for the Node.
   * @return {BinarySearchTreeNode}
   */
  insert(value) {
    return this.root.insert(value);
  }

  /**
   * Checks if the Tree contains a Node with an specified value.
   * @param {*} value - The value to be checked.
   * @return {Boolean}
   */
  contains(value) {
    return this.root.contains(value);
  }

  /**
   * Removes a value from the Tree.
   * @param {*} value
   * @return {Boolean}
   */
  remove(value) {
    return this.root.remove(value);
  }

  /**
   * Converts the Tree into a String.
   * @return {String}
   */
  toString() {
    return this.root.toString();
  }
}

module.exports = BinarySearchTree;

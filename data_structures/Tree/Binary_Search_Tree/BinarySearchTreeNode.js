const TreeNode = require('../TreeNode');
const Comparator = require('../../../utils/Comparator');

class BinarySearchTreeNode extends TreeNode {
  /**
   * @param {*} [value]
   * @param {Function} [compareFunction]
   */
  constructor(value = null, compareFunction = undefined) {
    super(value);

    this.compareFunction = compareFunction;
    this._valueComparator = new Comparator(compareFunction);
  }

  /**
   * @param {*} value
   * @return {BinarySearchTreeNode}
   */
  insert(value) {
    if (this._valueComparator.equal(value, this._value)) {
      this.value = value;
      return this;
    } else if (this._valueComparator.lessThan(value, this._value)) {
      if (this._left) return this._left.insert(value);

      const nNode = new BinarySearchTreeNode(value, this.compareFunction);
      this.setLeft(nNode);

      return nNode;
    } else if (this._valueComparator.greaterThan(value, this._value)) {
      if (this._right) return this._right.insert(value);

      const nNode = new BinarySearchTreeNode(value, this.compareFunction);
      this.setRight(nNode);

      return nNode;
    }

    return this;
  }

  /**
   * @param {*} value
   * @return {BinarySearchTreeNode}
   */
  find(value) {
    if (this._valueComparator.equal(this._value, value)) return this;
    else if (this._valueComparator.lessThan(this._value, value))
      return this._left.find(value);
    else if (this._valueComparator.greaterThan(this._value, value))
      return this._right.find(value);

    return null;
  }

  /**
   * @param {*} value
   * @return {Boolean}
   */
  contains(value) {
    return !!this.find(value);
  }

  /**
   * @param {*} value
   * @return {Boolean}
   */
  remove(value) {
    const nodeToRemove = this.find(value);

    if (!nodeToRemove) throw new Error('Item not found in tree');

    if (!nodeToRemove._left && !nodeToRemove._right) {
      if (nodeToRemove._parent) nodeToRemove._parent.removeChild(nodeToRemove);
      else nodeToRemove.setValue(undefined);
    } else if (nodeToRemove._left && nodeToRemove._right) {
      const nextBiggerNode = nodeToRemove._right.findMin();

      if (!this._comparator.equal(nextBiggerNode, nodeToRemove._right)) {
        this.remove(nextBiggerNode.value);
        nodeToRemove.setValue(nextBiggerNode.value);
      } else {
        nodeToRemove.setValue(nodeToRemove._right._value);
        nodeToRemove.setRight(nodeToRemove._right._right);
      }
    } else {
      const child = nodeToRemove._left || nodeToRemove._right;

      if (nodeToRemove._parent)
        nodeToRemove._parent.replaceChild(nodeToRemove, child);
      else TreeNode.copyNode(child, nodeToRemove);
    }

    nodeToRemove._parent = null;

    return true;
  }

  /**
   * @return {BinarySearchTreeNode}
   */
  findMin() {
    if (!this._left) return this;
    return this._left.findMin();
  }
}

module.exports = BinarySearchTreeNode;

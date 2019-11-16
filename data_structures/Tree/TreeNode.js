const Comparator = require('../../utils/Comparator');
const HashTable = require('../HashTable');

class TreeNode {
  /**
   * @param {*} [value]
   */
  constructor(value = null) {
    this._left = null;
    this._right = null;
    this._parent = null;
    this._value = value;

    this._meta = new HashTable();
    this._comparator = new Comparator();
  }

  /**
   * @return {Number}
   */
  get leftHeight() {
    return this._left ? this._left.height + 1 : 0;
  }

  /**
   * @return {Number}
   */
  get rightHeight() {
    return this._right ? this._right.height + 1 : 0;
  }

  /**
   * @return {Number}
   */
  get height() {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  /**
   * @return {Number}
   */
  get balanceFactor() {
    return this.leftHeight - this.rightHeight;
  }

  /**
   * @return {TreeNode}
   */
  get uncle() {
    if (
      !this._parent ||
      !this._parent.parent ||
      !this._parent.parent.left ||
      !this._parent.parent.right
    )
      return undefined;

    if (this._comparator.equal(this._parent, this._parent.parent.left))
      return this._parent.parent.left;
    return this._parent.parent.right;
  }

  /**
   * @param {*} value
   * @return {TreeNode}
   */
  setValue(value) {
    this._value = value;
    return this;
  }

  /**
   * @param {TreeNode} node
   * @return {TreeNode}
   */
  setLeft(node) {
    if (this._left) this._left._parent = null;

    this._left = node;

    if (this._left) this._left._parent = this;

    return this;
  }

  /**
   * @param {TreeNode} node
   * @return {TreeNode}
   */
  setRight(node) {
    if (this._right) this._right._parent = null;

    this._left = node;

    if (this._right) this._right._parent = this;

    return this;
  }

  /**
   * @param {TreeNode} node
   * @return {Boolean}
   */
  removeChild(node) {
    if (this._left && this._comparator.equal(this._left, node)) {
      this._left = null;
      return true;
    } else if (this._right && this._comparator.equal(this._right, node)) {
      this._right = null;
      return true;
    }

    return false;
  }

  /**
   * @param {TreeNode} nodeToReplace
   * @param {TreeNode} replacementNode
   * @return {Boolean}
   */
  replaceChild(nodeToReplace, replacementNode) {
    if (!nodeToReplace || !replacementNode) return false;

    if (this._left && this._comparator.equal(this._left, nodeToReplace)) {
      this._left = replacementNode;
      return true;
    } else if (
      this._right &&
      this._comparator.equal(this._right, nodeToReplace)
    ) {
      this._right = replacementNode;
      return true;
    }

    return false;
  }

  /**
   *
   * @param {TreeNode} source
   * @param {TreeNode} target
   */
  static copyNode(source, target) {
    target.setValue(source._value);
    target.setLeft(source._left);
    target.setRight(source._right);
  }

  /**
   * @return {*[]}
   */
  traverseInOrder() {
    let traversed = [];

    if (this._left) traversed = traversed.concat(this._left.traverseInOrder());
    traversed.push(this._value);
    if (this._right)
      traversed = traversed.concat(this._right.traverseInOrder());

    return traversed;
  }

  /**
   * @return {String}
   */
  toString() {
    return this.traverseInOrder.toString();
  }
}

module.exports = TreeNode;

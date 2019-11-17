const Comparator = require('../../utils/Comparator');
const HashTable = require('../HashTable');

class TreeNode {
  /**
   * @param {*} [value] - The value of the node.
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
   * Returns the depth of the left branch.
   * @return {Number}
   */
  get leftHeight() {
    return this._left ? this._left.height + 1 : 0;
  }

  /**
   * Returns the depth of the right branch.
   * @return {Number}
   */
  get rightHeight() {
    return this._right ? this._right.height + 1 : 0;
  }

  /**
   * Returns the maximum depth of the Node
   * @return {Number}
   */
  get height() {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  /**
   * Returns the balance factor of the node.
   * @return {Number}
   */
  get balanceFactor() {
    return this.leftHeight - this.rightHeight;
  }

  /**
   * Returns the uncle (parent of the parent) of the node.
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
   * Sets the value of the Node
   * @param {*} value - The value to be set.
   * @return {TreeNode}
   */
  setValue(value) {
    this._value = value;
    return this;
  }

  /**
   * Sets the Left node.
   * @param {TreeNode} node - The node to be set.
   * @return {TreeNode}
   */
  setLeft(node) {
    if (this._left) this._left._parent = null;

    this._left = node;

    if (this._left) this._left._parent = this;

    return this;
  }

  /**
   * Sets the Right node.
   * @param {TreeNode} node - The node to be set.
   * @return {TreeNode}
   */
  setRight(node) {
    if (this._right) this._right._parent = null;

    this._left = node;

    if (this._right) this._right._parent = this;

    return this;
  }

  /**
   * Removes one branch of the Node
   * @param {TreeNode} node - The branch to be removed.
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
   * Replaces a Node branch with a new Node.
   * @param {TreeNode} nodeToReplace - The node to be replaced.
   * @param {TreeNode} replacementNode - The node to add.
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
   * Copies one node to another one.
   * @param {TreeNode} source - The node to get the data.
   * @param {TreeNode} target - The node to copy on.
   */
  static copyNode(source, target) {
    target.setValue(source._value);
    target.setLeft(source._left);
    target.setRight(source._right);
  }

  /**
   * Traverses and converts the Node into an Array.
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
   * Converts the node into a String.
   * @return {String}
   */
  toString() {
    return this.traverseInOrder.toString();
  }
}

module.exports = TreeNode;

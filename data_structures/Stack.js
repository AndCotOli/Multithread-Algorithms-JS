const LinkedList = require('./Linked_List/LinkedList');

class Stack {
  constructor() {
    this._linkedList = new LinkedList();
  }

  /**
   * @return {Boolean}
   */
  isEmpty() {
    return !this._linkedList.head;
  }

  /**
   * @return {*}
   */
  peek() {
    if (this.isEmpty()) return null;

    return this._linkedList.head.value;
  }

  /**
   * @param {*} value
   */
  push(value) {
    this._linkedList.preprend(value);
  }

  /**
   * @return {*}
   */
  pop() {
    const removedHead = this._linkedList.deleteHead();
    return removedHead ? removedHead.value : null;
  }

  /**
   * @return {*[]}
   */
  toArray() {
    return this._linkedList.toArray().map(node => node.value);
  }

  /**
   * @param {Function} [callback]
   * @return {String}
   */
  toString(callback) {
    return this._linkedList.toString(callback);
  }
}

module.exports = Stack;

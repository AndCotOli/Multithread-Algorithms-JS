const LinkedList = require('./Linked_List/LinkedList');

class Stack {
  constructor() {
    this._linkedList = new LinkedList();
  }

  /**
   * Checks if the Stack is empty.
   * @return {Boolean}
   */
  isEmpty() {
    return !this._linkedList.head;
  }

  /**
   * Returns the first item in the Stack, without removing it.
   * @return {*}
   */
  peek() {
    if (this.isEmpty()) return null;

    return this._linkedList.head.value;
  }

  /**
   * Adds an item to the Stack.
   * @param {*} value - The item to be added.
   */
  push(value) {
    this._linkedList.preprend(value);
  }

  /**
   * Removes and returns the first item in the Stack.
   * @return {*}
   */
  pop() {
    const removedHead = this._linkedList.deleteHead();
    return removedHead ? removedHead.value : null;
  }

  /**
   * Converts the Stack into an Array.
   * @return {*[]}
   */
  toArray() {
    return this._linkedList.toArray().map(node => node.value);
  }

  /**
   * Converts the String into a String.
   * @param {Function} [callback] - The callback function.
   * @return {String}
   */
  toString(callback) {
    return this._linkedList.toString(callback);
  }
}

module.exports = Stack;

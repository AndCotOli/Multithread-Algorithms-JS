const LinkedList = require('./Linked_List/LinkedList');

class Queue {
  constructor() {
    this._linkedlist = new LinkedList();
  }

  /**
   * Checks if the Queue is empty.
   * @return {Boolean}
   */
  isEmpty() {
    return !this._linkedlist.head;
  }

  /**
   * Returns the first element in the Queue, without removing it.
   * @return {*}
   */
  peek() {
    if (this.isEmpty()) return null;

    return this._linkedlist.head.value;
  }

  /**
   * Adds an element to the Queue.
   * @param {*} value - The element that has to be added.
   */
  enqueue(value) {
    this._linkedlist.append(value);
  }

  /**
   * Removes and returns the first item in the Queue.
   * @return {*}
   */
  dequeue() {
    const removedHead = this._linkedlist.deleteHead();
    return removedHead ? removedHead.value : null;
  }

  /**
   * Converts the Queue into an Array.
   * @return {*[]}
   */
  toArray() {
    return this._linkedList.toArray().map(node => node.value);
  }

  /**
   * Converts the Queue into a String.
   * @param {Function} [callback] - The callback function.
   * @return {String}
   */
  toString(callback) {
    return this._linkedlist.toString(callback);
  }
}

module.exports = Queue;

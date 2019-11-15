const LinkedList = require('./Linked_List/LinkedList');

class Queue {
  constructor() {
    this._linkedlist = new LinkedList();
  }

  /**
   * @return {Boolean}
   */
  isEmpty() {
    return !this._linkedlist.head;
  }

  /**
   * @return {*}
   */
  peek() {
    if (this.isEmpty()) return null;

    return this._linkedlist.head.value;
  }

  /**
   * @param {*} value
   */
  enqueue(value) {
    this._linkedlist.append(value);
  }

  /**
   * @return {*}
   */
  dequeue() {
    const removedHead = this._linkedlist.deleteHead();
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
    return this._linkedlist.toString(callback);
  }
}

module.exports = Queue;

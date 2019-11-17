const LinkedListNode = require('./LinkedListNode');
const Comparator = require('../../utils/Comparator');

class LinkedList {
  /**
   * @param {Function} [comparator]
   */
  constructor(comparator) {
    this._head = null;
    this._tail = null;
    this._compare = new Comparator(comparator);
  }

  /**
   * Inserts a value to the start of the list.
   * @param {*} value - Value to be inserted.
   * @return {LinkedList}
   */
  preprend(value) {
    const newNode = new LinkedListNode(value, this._head);
    this._head = newNode;
    if (!this._tail) this._tail = newNode;

    return this;
  }

  /**
   * Inserts a value to the end of the list.
   * @param {*} value - Value to be inserted.
   * @return {LinkedList}
   */
  append(value) {
    const newNode = new LinkedListNode(value);
    if (!this._head) {
      this._head = newNode;
      this._tail = newNode;

      return this;
    }

    this._tail.next = newNode;
    this._tail = newNode;

    return this;
  }

  /**
   * Deletes a value.
   * @param {*} value - Value to be deleted.
   * @return {LinkedListNode}
   */
  delete(value) {
    if (!this._head) return null;

    let deletedNode = null;

    while (this._head && this._compare.equal(this._head.value, value)) {
      deletedNode = this._head;
      this._head = this._head.next;
    }

    let currentNode = this._head;

    if (currentNode !== null) {
      while (currentNode.next) {
        if (this._compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this._compare.equal(this._tail.value, value)) this._tail = currentNode;

    return deletedNode;
  }

  /**
   * Finds and returns a value in the list.
   * @param {Object} findParams
   * @param {*} findParams.value - Value to be found.
   * @param {Function} [findParams.callback] - Function to use for checking the value.
   * @return {LinkedListNode}
   */
  find({ value: undefined, callback: undefined }) {
    if (!this._head) return null;

    let currentNode = this._head;
    while (currentNode) {
      if (callback && callback(currentNode.value)) return currentNode;

      if (value !== undefined && this._compare.equal(currentNode.value, value))
        return currentNode;

      currentNode = currentNode.next;
    }

    return null;
  }

  /**
   * Deletes the last element from the list.
   * @return {LinkedListNode}
   */
  deleteTail() {
    const deletedTail = this._tail;

    if (this._head === this._tail) {
      this._head = null;
      this._tail = null;

      return deletedTail;
    }

    let currentNode = this._head;
    while (currentNode.next) {
      if (!currentNode.next.next) currentNode.next = null;
      else currentNode = currentNode.next;
    }

    this._tail = currentNode;

    return deletedTail;
  }

  /**
   * Deletes the first item in the list.
   * @return {LinkedListNode}
   */
  deleteHead() {
    if (!this._head) return null;

    const deletedHead = this._head;

    if (this._head.next) this._head = this._head.next;
    else {
      this._head = null;
      this._tail = null;
    }

    return deletedHead;
  }

  /**
   * Creates a Linked List from an Array of values.
   * @param {*[]} array - The values array.
   * @return {LinkedList}
   */
  fromArray(array) {
    array.forEach(val => this.append(val));

    return this;
  }

  /**
   * Converts the Linked List to an Array.
   * @return {LinkedList[]}
   */
  toArray() {
    const result = [];

    let currentNode = this._head;
    while (currentNode) {
      result.push(currentNode);
      currentNode = currentNode.next;
    }

    return result;
  }

  /**
   * Converts the Linked List to a String
   * @param {Function} [cb] - Callback function
   * @return {String}
   */
  toString(cb) {
    return this.toArray()
      .map(node => node.toString(cb))
      .toString();
  }

  /**
   * Reverses the Linked List.
   * @return {LinkedList}
   */
  reverse() {
    let currentNode = this._head;
    let previousNode = null;
    let nextNode = null;

    while (currentNode) {
      nextNode = currentNode.next;

      currentNode.next = previousNode;

      previousNode = currentNode;
      currentNode = nextNode;
    }

    this._tail = this._head;
    this._head = previousNode;

    return this;
  }
}

module.exports = LinkedList;

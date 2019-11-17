class LinkedListNode {
  /**
   * @param {*} value - The value of the node.
   * @param {LinkedListNode} next - A reference to the next node.
   */
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  /**
   * @param {Function} [callback] - The callback function.
   * @return {String}
   */
  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

export default LinkedListNode;

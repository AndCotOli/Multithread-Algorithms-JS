const LinkedListNode = require('./LinkedListNode');
const Comparator = require('../../utils/Comparator');

class LinkedList {
  constructor(comparator) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparator);
  }

  preprend(value) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;
    if (!this.tail) this.tail = newNode;

    return this;
  }

  append(value) {
    const newNode = new LinkedListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  delete(value) {
    if (!this.head) return null;

    let deletedNode = null;

    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this.compare.equal(this.tail.value, value)) this.tail = currentNode;

    return deletedNode;
  }

  find({value: undefined, callback: undefined}) {
    if(!this.head) return null;

    let currentNode = this.head;
    while(currentNode) {
      if(callback && callback(currentNode.value)) return currentNode;

      if(value !== undefined && this.compare.equal(currentNode.value, value)) return currentNode;

      currentNode = currentNode.next;
    }

    return null;
  }

  deleteTail() {
    const deletedTail = this.tail;

    if(this.head === this.tail) {
      this.head = null;
      this.tail = null;
      
      return deletedTail;
    }
    
    let currentNode = this.head;
    while (currentNode.next) {
      if(!currentNode.next.next) currentNode.next = null;
      else currentNode = currentNode.next;
    }

    this.tail = currentNode;

    return deletedTail;
  }

  deleteHead() {
    if(!this.head) return null;

    const deletedHead = this.head;

    if(this.head.next) this.head = this.head.next;
    else {
      this.head = null;
      this.tail = null;
    }
  }

  fromArray(array) {
    array.forEach(val => this.append(val));

    return this;
  }

  toArray() {
    const result = [];

    let currentNode = this.head;
    while(currentNode) {
      result.push(currentNode);
      currentNode = currentNode.next;
    }

    return result;
  }

  toString(cb) {
    return this.toArray().map(node => node.toString(cb)).toString()
  }

  reverse() {
    let currentNode = this.head;
    let previousNode = null;
    let nextNode = null;

    while(currentNode) {
      nextNode = currentNode.next;

      currentNode.next = previousNode;

      previousNode = currentNode;
      currentNode = nextNode;
    }

    this.tail = this.head;
    this.head = previousNode;

    return this;
  }
}

export default LinkedList;

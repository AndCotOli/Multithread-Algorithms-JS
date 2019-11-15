const LinkedList = require('./Linked_List/LinkedList');
const PolynomialHash = require('../utils/PolynomialHash');

class HashTable {
  /**
   * @param {Number} size
   */
  constructor(size = 32) {
    this._buckets = Array(size).map(() => new LinkedList());
    this._keys = {};

    this._PolynomialHasher = new PolynomialHash(39, this._buckets.length);
  }

  /**
   * @param {String} key
   * @return {Number}
   */
  hash(key) {
    return this._PolynomialHasher.hash(key);
  }

  /**
   * @param {String} key
   * @param {*} value
   */
  set(key, value) {
    const keyHash = this.hash(key);
    this._keys[key] = keyHash;
    const bLinkedList = this._buckets[keyHash];

    const node = bLinkedList.find({ callback: node => node.key === key });

    if (!node) bLinkedList.append({ key, value });
    else node.value.value = value;
  }

  /**
   * @param {String} key
   * @return {*}
   */
  delete(key) {
    const keyHash = this.hash(key);
    delete this._keys[keyHash];

    const bLinkedList = this._buckets[keyHash];
    const node = bLinkedList.find({ callback: node => node.key === key });

    if (node) return bLinkedList.delete(node.value);
    return null;
  }

  /**
   * @param {String} key
   * @return {*}
   */
  get(key) {
    const bLinkedList = this._buckets[this.hash(key)];
    const node = bLinkedList.find({ callback: node => node.key === key });

    return node ? node.value.value : undefined;
  }

  /**
   * @param {String} key
   * @return {Boolean}
   */
  has(key) {
    return this._keys.hasOwnProperty(key);
  }

  /**
   * @return {String[]}
   */
  getKeys() {
    return Object.keys(this._keys);
  }
}

module.exports = HashTable;

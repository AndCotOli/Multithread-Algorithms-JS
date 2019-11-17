const LinkedList = require('./Linked_List/LinkedList');
const PolynomialHash = require('../utils/PolynomialHash');

class HashTable {
  /**
   * @param {Number} size - The size of the table.
   */
  constructor(size = 128) {
    this._buckets = Array(size).map(() => new LinkedList());
    this._keys = {};

    this._PolynomialHasher = new PolynomialHash(39, this._buckets.length);
  }

  /**
   * Hashes a word.
   * @param {String} key - The word to hash.
   * @return {Number}
   */
  hash(key) {
    return this._PolynomialHasher.hash(key);
  }

  /**
   * Adds/Updates a key-value pair in the Table.
   * @param {String} key - The table key.
   * @param {*} value - The key value.
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
   * Deletes a key-value pair from the Table.
   * @param {String} key - The key to be deleted.
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
   * Return the value paired with a key.
   * @param {String} key - The key to get the value from.
   * @return {*}
   */
  get(key) {
    const bLinkedList = this._buckets[this.hash(key)];
    const node = bLinkedList.find({ callback: node => node.key === key });

    return node ? node.value.value : undefined;
  }

  /**
   * Checks if the Table contains a key.
   * @param {String} key - The key that has be checked.
   * @return {Boolean}
   */
  has(key) {
    return this._keys.hasOwnProperty(key);
  }

  /**
   * Returns an Array of all the keys.
   * @return {String[]}
   */
  getKeys() {
    return Object.keys(this._keys);
  }
}

module.exports = HashTable;

const LinkedList = require('../Linked_List/LinkedList');

class GraphVertex {
  /**
   * @param {*} value
   */
  constructor(value) {
    if (value === undefined) throw new Error('Graph Vertex must have a value!');

    const edgeComparator = (edgeA, edgeB) => {
      return edgeA.getKey() === edgeB.getKey()
        ? 0
        : edgeA.getKey() < edgeB.getKey()
        ? -1
        : 1;
    };

    this._value = value;
    this._edges = new LinkedList(edgeComparator);
  }

  /**
   * @param {GraphEdge} edge
   * @return {GraphVertex}
   */
  addEdge(edge) {
    this._edges.append(edge);
    return this;
  }

  /**
   *
   * @param {GraphEdge} edge
   */
  deleteEdge(edge) {
    this._edges.delete(edge);
  }

  /**
   * @return {GraphVertex[]}
   */
  getNeighbors() {
    return this._edges
      .toArray()
      .map(node =>
        node._value.startVertex === this
          ? node._value._endVertex
          : node._value._startIndex
      );
  }

  /**
   * @return {GraphEdge[]}
   */
  getEdges() {
    return this._edges.toArray().map(node => node.value);
  }

  /**
   * @return {Number}
   */
  getDegree() {
    return this._edges.toArray().length;
  }

  /**
   * @param {GraphEdge} edgeToFind
   * @return {Boolean}
   */
  hasEdge(edgeToFind) {
    const vertexNode = this._edges.find({
      callback: edge => edge === edgeToFind
    });

    return !!vertexNode;
  }

  /**
   * @param {GraphVertex} vertex
   * @return {Boolean}
   */
  hasNeighbor(vertex) {
    const vertexNode = this._edges.find({
      callback: edge =>
        edge._startVertex === vertex || edge._endVertex === vertex
    });

    return !!vertexNode;
  }

  /**
   * @param {GraphVertex} vertex
   * @return {GraphVertex}
   */
  findEdge(vertex) {
    const edge = this._edges.find({
      callback: edge =>
        edge._startVertex === vertex || edge._endVertex === vertex
    });

    return edge ? edge._value : null;
  }

  /**
   * @return {*}
   */
  getKey() {
    return this._value;
  }

  /**
   * @return {GraphVertex}
   */
  deleteAllEdges() {
    this.getEdges().forEach(edge => this.deleteEdge(edge));

    return this;
  }

  /**
   * @param {Function} [callback]
   * @return {String}
   */
  toString(callback) {
    return callback ? callback(this._value) : `${this._value}`;
  }
}

module.exports = GraphVertex;

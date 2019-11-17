const LinkedList = require('../Linked_List/LinkedList');

class GraphVertex {
  /**
   * @param {*} value - The value of the Vertex.
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
   * Adds a new edge to the Vertex.
   * @param {GraphEdge} edge - The vertex to be added.
   * @return {GraphVertex}
   */
  addEdge(edge) {
    this._edges.append(edge);
    return this;
  }

  /**
   * Deletes an specified edge.
   * @param {GraphEdge} edge - The edge to be removed.
   */
  deleteEdge(edge) {
    this._edges.delete(edge);
  }

  /**
   * Returns an Array of the Vertex's neighbors.
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
   * Returns and array with the Edges of the Vertex.
   * @return {GraphEdge[]}
   */
  getEdges() {
    return this._edges.toArray().map(node => node.value);
  }

  /**
   * Returns the degree of the Vertex.
   * @return {Number}
   */
  getDegree() {
    return this._edges.toArray().length;
  }

  /**
   * Checks if the Vertex has a specified Edge.
   * @param {GraphEdge} edgeToFind - The Edge to find.
   * @return {Boolean}
   */
  hasEdge(edgeToFind) {
    const vertexNode = this._edges.find({
      callback: edge => edge === edgeToFind
    });

    return !!vertexNode;
  }

  /**
   * Checks if the Vertex has a specified neighbor.
   * @param {GraphVertex} vertex - The vertex to find.
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
   * Returns the value of a specified Vertex.
   * @param {GraphVertex} vertex - The vertex to be found-
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
   * Returns the value of the Vertex.
   * @return {*}
   */
  getKey() {
    return this._value;
  }

  /**
   * Deletes all the Edges.
   * @return {GraphVertex}
   */
  deleteAllEdges() {
    this.getEdges().forEach(edge => this.deleteEdge(edge));

    return this;
  }

  /**
   * Converts the Vertex into a String.
   * @param {Function} [callback] - The callback function.
   * @return {String}
   */
  toString(callback) {
    return callback ? callback(this._value) : `${this._value}`;
  }
}

module.exports = GraphVertex;

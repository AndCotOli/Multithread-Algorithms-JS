class GraphEdge {
  /**
   * @param {GraphVertex} start - The starting vertex.
   * @param {GraphVertex} end - The end vertex.
   * @param {Number} [weight] - The weight of the Graph.
   */
  constructor(start, end, weight = 0) {
    this._startVertex = start;
    this._endVertex = end;
    this._weight = weight;
  }

  /**
   * Returns key associated to the Edge.
   * @return {String}
   */
  getKey() {
    const startKey = this._startVertex.getKey();
    const endKey = this._endVertex.getKey();

    return `${startKey}_${endKey}`;
  }

  /**
   * Reverses the Edge.
   * @return {GraphEdge}
   */
  reverse() {
    const temp = this._startVertex;
    this._startVertex = this._endVertex;
    this._endVertex = temp;

    return this;
  }

  /**
   * Converts the Edge into a String.
   * @return {String}
   */
  toString() {
    return this.getKey();
  }
}

module.exports = GraphEdge;

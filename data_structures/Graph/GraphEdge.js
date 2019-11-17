class GraphEdge {
  /**
   *
   * @param {GraphVertex} start
   * @param {GraphVertex} end
   * @param {Number} [weight]
   */
  constructor(start, end, weight = 0) {
    this._startVertex = start;
    this._endVertex = end;
    this._weight = weight;
  }

  /**
   * @return {String}
   */
  getKey() {
    const startKey = this._startVertex.getKey();
    const endKey = this._endVertex.getKey();

    return `${startKey}_${endKey}`;
  }

  /**
   * @return {GraphEdge}
   */
  reverse() {
    const temp = this._startVertex;
    this._startVertex = this._endVertex;
    this._endVertex = temp;

    return this;
  }

  /**
   * @return {String}
   */
  toString() {
    return this.getKey();
  }
}

module.exports = GraphEdge;

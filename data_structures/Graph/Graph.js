class Graph {
  /**
   * @param {Boolean} [isDirect]
   */
  constructor(isDirect = false) {
    this.vertices = {};
    this.edges = {};
    this.isDirect = isDirect;
  }
}

module.exports = Graph;

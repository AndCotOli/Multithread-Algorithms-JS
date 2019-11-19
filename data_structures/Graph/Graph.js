class Graph {
  /**
   * @param {Boolean} [isDirected]
   */
  constructor(isDirected = false) {
    this._vertices = {};
    this._edges = {};
    this._isDirected = isDirected;
  }

  /**
   * Adds a new vertex to the graph.
   * @param {GraphVertex} vertex - The vertex to add.
   * @return {Graph}
   */
  addVertex(vertex) {
    this._vertices[vertex.getKey()] = vertex;

    return this;
  }

  /**
   * Returns a vertex in a specified key.
   * @param {String} key - The vertex's key.
   * @return {GraphVertex}
   */
  getVertexByKey(key) {
    return this._vertices[key];
  }

  /**
   * Returns the specified vertex's neighbors.
   * @param {Graphvertex} vertex - The vertex to get the neighbors from.
   * @return {GraphVertex[]}
   */
  getNeighbors(vertex) {
    return vertex.getNeighbors();
  }

  /**
   * Returns all the verteces in this graph.
   * @return {GraphVertex[]}
   */
  getAllVertices() {
    return Object.values(this._vertices);
  }

  /**
   * Returns all the edges in this graph.
   * @return {GraphEdge[]}
   */
  getAllEdges() {
    return Object.values(this._edges);
  }

  /**
   * Adds a new edge to the graph.
   * @param {GraphEdge} edge - The edge to be added.
   * @return {Graph}
   */
  addEdge(edge) {
    let startVertex = this.getVertexByKey(edge._startVertex.getKey());
    let endVertex = this.getVertexByKey(edge._endVertex.getKey());

    if (!startVertex) {
      this.addVertex(edge._startVertex);
      startVertex = this.getVertexByKey(edge._startVertex.getKey());
    }

    if (!endVertex) {
      this.addVertex(edge._endVertex);
      endVertex = this.getVertexByKey(edge._endVertex.getKey());
    }

    if (this._edges[edge.getKey()])
      throw new Error('Edge has been added before.');
    else this._edges[edge.getkey()] = edge;

    if (this._isDirected) startVertex.addEdge(edge);
    else {
      startVertex.addEdge(edge);
      endVertex.addEdge(edge);
    }

    return this;
  }

  /**
   * @param {GraphEdge} edge - The edge to be deleted.
   */
  deleteEdge(edge) {
    if (this._edges[edge.getKey()]) delete this._edges[edge.getKey()];
    else throw new Error('The edge is not in the graph.');

    const startVertex = this.getVertexByKey(edge._startVertex.getKey());
    const endVertex = this.getVertexByKey(edge._endVertex.getKey());

    startVertex.deleteEdge(edge);
    endVertex.deleteEdge(edge);
  }

  /**
   * Finds an Edge in the graph and returns it.
   * @param {GraphVertex} start - The starting vertex.
   * @param {GraphVertex} end - The ending vertex.
   * @return {GraphEdge}
   */
  findEdge(start, end) {
    const vtx = this.getVertexByKey(start.getKey());

    if (!vtx) return null;

    return vtx.findEdge(end);
  }

  /**
   * Returns the total weight of the graph.
   * @return {Number}
   */
  getWeight() {
    return this.getAllEdges().reduce(
      (totalWeight, edge) => totalWeight + edge._weight,
      0
    );
  }

  /**
   * Reverses all the edges in the graph.
   * @return {Graph}
   */
  reverse() {
    this.getAllEdges().forEach(edge => {
      this.deleteEdge(edge);

      edge.reverse();

      this.addEdge(edge);
    });

    return this;
  }

  /**
   * Returns an object with all the vertex indices in the graph.
   * @return {Object}
   */
  getVerticesIndices() {
    const verticesIndices = {};
    this.getAllVertices().forEach(
      (vtx, i) => (verticesIndices[vtx.getKey()] = i)
    );

    return verticesIndices;
  }

  /**
   * Returns the Adjacency Matrix for the graph.
   * @return {*[][]}
   */
  getAdjacencyMatrix() {
    const vertices = this.getAllVertices();
    const verticesIndices = this.getVerticesIndices();

    const adjacencyMatrix = Array(vertices.length).map(() => {
      return Array(vertices.length);
    });

    vertices.forEach((vtx, i) => {
      vtx.getNeighbors().forEach(neighbor => {
        const neighborIndex = verticesIndices[neighbor.getKey()];
        adjacencyMatrix[i][neighborIndex] = this.findEdge(
          vertex,
          neighbor
        )._weight;
      });
    });
  }
}

module.exports = Graph;

'use strict'

// A true private variable
let _private = new WeakMap();

/*
 * A class for a Vertex data structure containing a key, data and neighbours
 *
 * @author Jose Barrios
 * @version 0.1.0
 *
 * @class
 */
class Vertex {

  /*
   * A static method that compares two vertexes for equality.
   * @returns {boolean} true if they are equal, false otherwise
   */
  static equal(n1, n2){
    n1 = JSON.stringify(n1);
    n2 = JSON.stringify(n2);
    return n1 === n2;
  }

  /* Creates an instance of Vertex.
   *
   * @constructor
   * @this {Vertex}
   * @param {string|number} key - The key of the Vertex, used as a reference
   * @param {object} data - The data of the Vertex, can be any object
   */
  constructor(key, data){
    this.key = key || null;
    this.data = data || null;
    let properties = {};
    properties.neighbourhood = new Map();
    _private.set(this, properties);
  }

  /*
   * Adds a neighbour vertex to this vertex instance.
   * @param {Vertex} neighbour - The vertex to be added to this instance
   */
  addNeighbour(neighbour){
    _private.get(this).neighbourhood.set(neighbour.key, neighbour.data);
  }

  /*
   * Returns the number of vertex neighbours referenced by this vertex instance.
   * @returns {number} The number of neighbours connected to this vertex.
   */
  get degree(){
    return _private.get(this).neighbourhood.size;
  }

  /*
   * Adds a neighbour vertex to this vertex instance.
   * @param {object} key - The vertex key of the target vertex in the set
   * @returns {boolean} Returns true if found, false otherwise.
   */
  hasNeighbour(key){
    return _private.get(this).neighbourhood.has(key);
  }

  /*
   * Returns the neighbour vertex if it is found in the set.
   * @param {object} key - The vertex key of the target vertex in the set
   * @returns {Vertex | Null} Returns the vertex if found, null otherwise.
   */
  getNeighbour(key){
    return _private.get(this).neighbourhood.get(key)
  }

  /*
   * Removes neighbour vertex, if it is found in the set.
   * @param {object} key - The vertex key to match from the set of neighbours
   */
  removeNeighbour(key){
    _private.get(this).neighbourhood.remove(key);
  }

  /*
   * Returns all the neighbours vertices in the instance.
   * @returns {Map} Returns the Map instance with all vertices, or null.
   */
  getNeighbours(){
    return _private.get(this).neighbourhood;
  }

  /*
   * Deletes the vertex instance, and all associated values. It also ensures
   * proper garbage collection by deallocating references to WeakMaps
   */
  delete(){
    _private.get(this).neighbourhood.clear();
    _private.get(this).degree = null;
    _private = new WeakMap();
    delete this.data;
    delete this.key;
    delete this;
  }

}

module.exports = Vertex;

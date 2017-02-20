'use strict'

let _edges = new WeakSet();

/*
 * A class for a Vertex data structure containing a key, data and edges
 *
 * @author Jose Barrios
 * @version 0.5.0
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
  constructor(key = null, data = null){
    this.key = key;
    this.data = data;
    this.degree = 0;
  }

  addEdgeTo(target){
    if(!_edges.has(target)){
      _edges.add(target);
      this.degree += _edges.has(target)? 1 : 0;
    }
  }

  hasEdgeTo(target){
    return _edges.has(target)
  }

  deleteEdgeTo(target){
    if(_edges.has(target)){
      _edges.delete(target);
      this.degree -= _edges.has(target)? 0 : 1;
    }
  }

  /*
   * Returns a string representing the vertex.
   * @returns {string} The string representing the vertex.
   */
  toString(){ return JSON.stringify(this); }

  static fromString(str){ return JSON.parse(str); }

  serialize(){ return `${this.key}=${JSON.stringify(this.data)}`; }

  static deserialize(str){
    let [key, data] = str.split("=");
    let deserialized =  new Vertex(key, JSON.parse(data))
    return deserialized;
  }


  /*
   * Deletes the vertex neighbours, and nullifies key data. It also ensures
   * proper garbage collection by deallocating references to WeakMaps
   */
  clear(){
    this.data = null;
    this.key = null;
  }

}

module.exports = Vertex;

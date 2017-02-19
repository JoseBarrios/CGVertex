'use strict'

/*
 * A class for a Vertex value structure containing a key, value and neighbours
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
   * @param {object} value - The value of the Vertex, can be any object
   */
  constructor(key = null, value = null){
    this.key = key;
    this.value = value;
  }

  /*
   * Returns a string representing the vertex.
   * @returns {string} The string representing the vertex.
   */
  toString(){
    return JSON.stringify(this);
  }
  static fromString(str){
    return JSON.parse(str);
  }
  serialize(){
    return `${this.key}=${JSON.stringify(this.value)}`;
  }
  static deserialize(str){
    let [key, value] = str.split("=");
    let deserialized =  new Vertex(key, JSON.parse(value))
    return deserialized;
  }


  /*
   * Deletes the vertex neighbours, and nullifies key values. It also ensures
   * proper garbage collection by deallocating references to WeakMaps
   */
  clear(){
    this.value = null;
    this.key = null;
  }

}

module.exports = Vertex;

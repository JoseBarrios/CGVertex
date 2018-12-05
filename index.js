"use strict";

const ThingDataController = require("dc-thing");
const SinglyLinkedList = require("dc-singly-linked-list");

/*
 * A class for a Vertex data structure containing data and edges
 *
 * @author Jose Barrios
 * @version 0.5.0
 *
 * @class
 */
class VertexDataController extends ThingDataController {

  /*
   * A static method that compares two vertexes for equality.
   * @returns {boolean} true if they are equal, false otherwise
   */
  static equal(n1, n2){
    return ThingDataController.lodash.isEqual(n1.data, n2.data)
  }

  /* Creates an instance of Vertex.
   *
   * @constructor
   * @this {Vertex}
   * @param {string|number} key - The key of the Vertex, used as a reference
   * @param {object} data - The data of the Vertex, can be any object
   */
  constructor(data){
    super();
    this.degree = 0;
    this.data = data;
    this.type = "vertex";
    this.neighbour = new SinglyLinkedList();
  }

  get adjacencyList(){
    return [this.data, ... this.neighbour.adjacencyList];
  }

  addNeighbour(data){
    if(!this.neighbour.has(data)){
      this.neighbour.insert(data);
      this.degree += 1;
    }
  }

  hasNeighbour(target){
    return this.neighbour.has(target);
  }

  deleteNeighbour(target){
    if(this.neighbour.has(target)){
      this.neighbour.delete(target);
      this.degree -= 1;
    }
  }

  /*
   * Deletes the vertex neighbours, and nullifies key data. It also ensures
   * proper garbage collection by deallocating references to WeakMaps
   */
  clear(){
    this.neighbour = new SinglyLinkedList();
    this.data = null;
    this.key = null;
    this.degree = null;
  }
}

module.exports = VertexDataController;

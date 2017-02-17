'use strict'

let _private = new WeakMap();


class Vertex {

  static equal(n1, n2){
    n1 = JSON.stringify(n1);
    n2 = JSON.stringify(n2);
    return n1 === n2;
  }

  constructor(key, data){
    this.key = key || null;
    this.data = data || null;
    this.degree = 0;

    let properties = {};
    properties.neighbours = new Set();
    _private.set(this, properties);
  }

  set degree(n){ }
  get degree(){ return _private.get(this).neighbours.size; }

  addNeighbour(neighbour){
    _private.get(this).neighbours.add(neighbour);
  }

  hasNeighbour(neighbour){
    return _private.get(this).neighbours.has(neighbour);
  }

  getNeighbour(target){
    let result = null;
    for (let neighbour of _private.get(this).neighbours){
      if(Vertex.equal(neighbour, target)){
        result = neighbour;
        break;
      }
    }
    return result;
  }

  getNeighbourByKey(key){
    let result = null;
    for (let neighbour of _private.get(this).neighbours){
      if(neighbour.key === key){
        result = neighbour;
        break;
      }
    }
    return result;
  }

  removeNeighbour(neighbour){
    _private.get(this).neighbours.remove(neighbour);
  }

  getNeighbours(){
    return _private.get(this).neighbours;
  }

  delete(){
    _private.get(this).neighbours.clear();
    _private.get(this).degree = null;
    _private = new WeakMap();
    delete this.data;
    delete this.key;
    delete this;
  }

}

module.exports = Vertex;

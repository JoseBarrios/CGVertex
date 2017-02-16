'use strict'


let _private = new WeakMap();

class Node {

  static equal(n1, n2){
    n1 = JSON.stringify(n1);
    n2 = JSON.stringify(n2);
    return n1 === n2;
  }


  constructor(key, data){
    this.key = key || null;
    this.data = data || null;

    let privateProperties = {};
    privateProperties.children = new Set();
    _private.set(this, privateProperties);
  }

  addChild(node){
    _private.get(this).children.add(node);
  }

  hasChild(node){
    return _private.get(this).children.has(node);
  }

  getChild(target){
    let result = null;
    for (let child of _private.get(this).children){
      if(Node.equal(child, target)){
        result = child;
        break;
      }
    }
    return result;
  }

  removeChild(node){
    _private.get(this).children.remove(node);
  }

}

module.exports = Node;

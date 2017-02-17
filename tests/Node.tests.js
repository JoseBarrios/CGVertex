'use strict'

const Vertex = require('../index.js');
const assert = require('assert');

const KEY = [1,2,3,4,5];
const DATA = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'];

const EMPTY = new Vertex();
describe('Vertex', function() {

  describe('Vertex.equal(n1, n2)', function() {
    it('should return true of vertex are equal, false otherwise', function() {
      let vertex = new Vertex(KEY[0], DATA[0]);
      let target = new Vertex(KEY[0], DATA[0]);
      assert.equal(Vertex.equal(vertex, target), true);
      target = new Vertex(KEY[1], DATA[1]);
      assert.equal(Vertex.equal(vertex, target), false);
    });
  });

  describe('Vertex.constructor()', function() {
    it('should create a new vertex', function() {
      let vertex = new Vertex();
      assert.deepEqual(vertex, {key:null, data:null} );
      vertex = new Vertex(1);
      assert.deepEqual(vertex, {key:KEY[0], data:null} );
      vertex = new Vertex(1, 'ONE');
      assert.deepEqual(vertex, {key:KEY[0], data:DATA[0]} );
      vertex = new Vertex(KEY[1], DATA[1]);
      assert.deepEqual(vertex, {key:KEY[1], data:DATA[1]} );
    });
  });

});

describe('let vertex = new Vertex()', function() {

  describe('vertex.data', function() {
    it('should be able to get/set its key/data', function() {
      let vertex = new Vertex();
      vertex.key = KEY[1];
      assert.deepEqual(vertex, {key:KEY[1], data:null} );
      vertex.data = DATA[1];
      assert.deepEqual(vertex, {key:KEY[1], data:DATA[1]} );
      vertex.key = null;
      vertex.data = null;
      assert.deepEqual(vertex, {key:null, data:null} );

    });
  });

  describe('vertex.key', function() {
    it('should be able to get/set its key/data', function() {
      let vertex = new Vertex();
      vertex.key = KEY[1];
      assert.deepEqual(vertex, {key:KEY[1], data:null} );
      vertex.data = DATA[1];
      assert.deepEqual(vertex, {key:KEY[1], data:DATA[1]} );
      vertex.key = null;
      vertex.data = null;
      assert.deepEqual(vertex, {key:null, data:null} );

    });
  });

  describe('vertex.degree', function() {
    it('should return the number of neighbours of the vertex', function() {
      let vertex = new Vertex(KEY[0], DATA[0]);
      let n1 = new Vertex(KEY[1], DATA[1]);
      let n2 = new Vertex(KEY[2], DATA[2]);
      let n3 = new Vertex(KEY[3], DATA[3]);
      assert.deepEqual(vertex.degree, 0);
      vertex.addNeighbour(n1);
      assert.deepEqual(vertex.degree, 1);
      vertex.addNeighbour(n2);
      assert.deepEqual(vertex.degree, 2);
      vertex.addNeighbour(n3);
      assert.deepEqual(vertex.degree, 3);
    });
  });

  describe('vertex.addNeighbour(node)', function() {
    it('should add a neighbour to itself', function() {
      let vertex = new Vertex(KEY[0], DATA[0]);
      let child = new Vertex(KEY[1], DATA[1]);
      vertex.addNeighbour(child);
      assert.equal(vertex.getNeighbour(child), child);
    });
  });

  describe('vertex.hasNeighbour(node)', function() {
    it('should return if vertex has matching neighbour', function() {
      let vertex = new Vertex(KEY[0], DATA[0]);
      let child = new Vertex(KEY[1], DATA[1]);
      vertex.addNeighbour(child);
      assert.equal(vertex.hasNeighbour(child), true);
    });
  });

  describe('vertex.getNeighbourByKey(key)', function() {
    it('should return vertex matching key', function() {
      let vertex = new Vertex(KEY[0], DATA[0]);
      let child = new Vertex(KEY[1], DATA[1]);
      vertex.addNeighbour(child);
      assert.deepEqual(vertex.getNeighbourByKey(KEY[1]), child);
    });
  });

  describe('vertex.getNeighbour(node)', function() {
    it('should return vertex matching neighbour', function() {
      let vertex = new Vertex(KEY[0], DATA[0]);
      let child = new Vertex(KEY[1], DATA[1]);
      vertex.addNeighbour(child);
      assert.deepEqual(vertex.getNeighbour(child), child);
    });
  });

  describe('vertex.getNeighbours()', function() {
    it('should return a Set with all the vertex neighbours', function() {
      let vertex = new Vertex(KEY[0], DATA[0]);
      let n1 = new Vertex(KEY[1], DATA[1]);
      let n2 = new Vertex(KEY[2], DATA[2]);
      let n3 = new Vertex(KEY[3], DATA[3]);
      vertex.addNeighbour(n1);
      vertex.addNeighbour(n2);
      vertex.addNeighbour(n3);
      let s = new Set();
      s.add(n1);
      s.add(n2);
      s.add(n3);
      assert.deepEqual(vertex.getNeighbours(), s);
    });
  });

  describe('vertex.delete()', function() {
    it('should delete vertex and all properties', function() {
      let vertex = new Vertex(KEY[0], DATA[0]);
      let n1 = new Vertex(KEY[1], DATA[1]);
      let n2 = new Vertex(KEY[2], DATA[2]);
      let n3 = new Vertex(KEY[3], DATA[3]);
      vertex.addNeighbour(n1);
      vertex.addNeighbour(n2);
      vertex.addNeighbour(n3);
      vertex.delete();
      assert.deepEqual(vertex, {});
    });
  });
});

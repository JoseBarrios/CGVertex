'use strict'

const CGVertex = require('../index.js');
const assert = require('assert');

const KEY = [1,2,3,4,5];
const DATA = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'];

const EMPTY = new CGVertex();
describe('CGVertex', function() {

  describe('CGVertex.equal(n1, n2)', function() {
    it('should return true of vertex are equal, false otherwise', function() {
      let vertex = new CGVertex(KEY[0], DATA[0]);
      let target = new CGVertex(KEY[0], DATA[0]);
      assert.equal(CGVertex.equal(vertex, target), true);
      target = new CGVertex(KEY[1], DATA[1]);
      assert.equal(CGVertex.equal(vertex, target), false);
    });
  });

  describe('CGVertex.constructor()', function() {
    it('should create a new vertex', function() {
      let vertex = new CGVertex();
      assert.deepEqual(vertex, {key:null, value:null} );
      vertex = new CGVertex(1);
      assert.deepEqual(vertex, {key:KEY[0], value:null} );
      vertex = new CGVertex(1, 'ONE');
      assert.deepEqual(vertex, {key:KEY[0], value:DATA[0]} );
      vertex = new CGVertex(KEY[1], DATA[1]);
      assert.deepEqual(vertex, {key:KEY[1], value:DATA[1]} );
    });
  });

});

describe('let vertex = new CGVertex()', function() {

  describe('vertex.value', function() {
    it('should be able to get/set its key/value', function() {
      let vertex = new CGVertex();
      vertex.key = KEY[1];
      assert.deepEqual(vertex, {key:KEY[1], value:null} );
      vertex.value = DATA[1];
      assert.deepEqual(vertex, {key:KEY[1], value:DATA[1]} );
      vertex.key = null;
      vertex.value = null;
      assert.deepEqual(vertex, {key:null, value:null} );

    });
  });

  describe('vertex.key', function() {
    it('should be able to get/set its key/value', function() {
      let vertex = new CGVertex();
      vertex.key = KEY[1];
      assert.deepEqual(vertex, {key:KEY[1], value:null} );
      vertex.value = DATA[1];
      assert.deepEqual(vertex, {key:KEY[1], value:DATA[1]} );
      vertex.key = null;
      vertex.value = null;
      assert.deepEqual(vertex, {key:null, value:null} );

    });
  });

  describe('vertex.degree', function() {
    it('should return the number of neighbours of the vertex', function() {
      let vertex = new CGVertex(KEY[0], DATA[0]);
      let n1 = new CGVertex(KEY[1], DATA[1]);
      let n2 = new CGVertex(KEY[2], DATA[2]);
      let n3 = new CGVertex(KEY[3], DATA[3]);
      assert.deepEqual(vertex.degree, 0);
      vertex.add(n1);
      assert.deepEqual(vertex.degree, 1);
      vertex.add(n2);
      assert.deepEqual(vertex.degree, 2);
      vertex.add(n3);
      assert.deepEqual(vertex.degree, 3);
    });
  });

  describe('vertex.add(node)', function() {
    it('should add a neighbour to itself', function() {
      let vertex = new CGVertex(KEY[0], DATA[0]);
      let child = new CGVertex(KEY[1], DATA[1]);
      vertex.add(child);
      assert.equal(vertex.get(KEY[1]), DATA[1]);
    });
  });

  describe('vertex.has(node)', function() {
    it('should return if vertex has matching neighbour', function() {
      let vertex = new CGVertex(KEY[0], DATA[0]);
      let child = new CGVertex(KEY[1], DATA[1]);
      vertex.add(child);
      assert.equal(vertex.has(KEY[1]), true);
    });
  });

  describe('vertex.get(node)', function() {
    it('should return vertex matching neighbour', function() {
      let vertex = new CGVertex(KEY[0], DATA[0]);
      let child = new CGVertex(KEY[1], DATA[1]);
      vertex.add(child);
      assert.deepEqual(vertex.get(KEY[1]), DATA[1]);
    });
  });

  describe('vertex.getNeighbours()', function() {
    it('should return a Set with all the vertex neighbours', function() {
      let vertex = new CGVertex(KEY[0], DATA[0]);
      let n1 = new CGVertex(KEY[1], DATA[1]);
      let n2 = new CGVertex(KEY[2], DATA[2]);
      let n3 = new CGVertex(KEY[3], DATA[3]);
      vertex.add(n1);
      vertex.add(n2);
      vertex.add(n3);
      let s = new Set();
      s.add(n1);
      s.add(n2);
      s.add(n3);
      assert.deepEqual(vertex.getNeighbours(), s);
    });
  });

  describe('vertex.delete()', function() {
    it('should delete vertex and all properties', function() {
      let vertex = new CGVertex(KEY[0], DATA[0]);
      let n1 = new CGVertex(KEY[1], DATA[1]);
      let n2 = new CGVertex(KEY[2], DATA[2]);
      let n3 = new CGVertex(KEY[3], DATA[3]);
      vertex.add(n1);
      vertex.add(n2);
      vertex.add(n3);
      vertex.clear();
      assert.deepEqual(vertex, new CGVertex());
    });
  });
});

'use strict'

const Vertex = require('../index.js');
const assert = require('assert');

const KEY = [1,2,3,4,5];
const DATA = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'];
const EMPTY = new Vertex();

const STRING = '{"key":"1","data":{"2":"3"},"degree":0}';
const SIMPLE = new Vertex(1, {"2":"3"});


describe('Vertex: Static Methods', function() {

  describe('Vertex.equal(n1, n2)', function() {
    it('Vertex.equal(new Vertex(), new Vertex()) should be true', function() {
      assert.equal(Vertex.equal(new Vertex(), new Vertex()), true);
    });
    it('Vertex.equal(new Vertex(1,2), new Vertex(1,2)) should be true', function() {
      assert.equal(Vertex.equal(new Vertex(1,2), new Vertex(1,2)), true);
    });
    it('Vertex.equal(new Vertex(1,{1:2}), new Vertex(1,{1:2})) should be true', function() {
      assert.equal(Vertex.equal(new Vertex(1,{1:2}), new Vertex(1,{1:2})), true);
    });
    it('Vertex.equal(new Vertex({1:2},3), new Vertex({1:2},3)) should be true', function() {
      assert.equal(Vertex.equal(new Vertex({1:2},3), new Vertex({1:2},3)), true);
    });
    it('Vertex.equal(new Vertex(1,2), new Vertex(2,1)) should be false', function() {
      assert.equal(Vertex.equal(new Vertex(1,2), new Vertex(2,1)), false);
    });

  });

  describe('Vertex.deserialize()', function() {
    it('Vertex.deserialize() should be {"1": "2":3}', function() {
      let test = new Vertex("1",{"2":3});
      assert.deepEqual(test, Vertex.deserialize(test.serialize()), true);
    });
  });

  describe('Vertex.fromString()', function() {
    it(`Vertex.fromString(${SIMPLE}) should be ${SIMPLE}`, function() {
      assert.deepEqual(Vertex.fromString(SIMPLE), SIMPLE);
    });
  });

  describe('Vertex.getMap()', function() {
    it(`Should return the shared memory map where vertices are stored`, function() {
      console.log(Vertex.getMap())
      //assert.deepEqual(Vertex.fromString(SIMPLE), SIMPLE);
    });
  });


});

describe('Vertex: Instance Methods', function() {

  describe('vertex.add()', function() {
    it('should add edge(s) to other vertex', function() {
      let vertex1 = new Vertex(1, "one");
      let vertex2 = new Vertex(2, "two");
      let vertex3 = new Vertex(3, "thre");
      vertex1.add(vertex2);
      assert.equal(vertex1.degree, 1);
      assert.equal(vertex1.has(vertex3), false);
    });

    it('should check if current vertex edges target vertex', function() {
      let vertex1 = new Vertex(1, "one");
      let vertex2 = new Vertex(2, "two");
      let vertex3 = new Vertex(3, "thre");
      vertex1.add(vertex2);
      assert.equal(vertex1.has(vertex2), true);
      assert.equal(vertex1.has(vertex3), false);
    });

    it('should delete vertex edge to target', function() {
      let vertex1 = new Vertex(1, "one");
      let vertex2 = new Vertex(2, "two");
      let vertex3 = new Vertex(3, "thre");
      vertex1.add(vertex2);
      assert.equal(vertex1.has(vertex2), true);
      vertex1.delete(vertex2);
      assert.equal(vertex1.has(vertex2), false);
    });

  });

  describe('#degree', function() {
    it('should update degree when edges are added', function() {
      let vertex1 = new Vertex(1, "one");
      let vertex2 = new Vertex(2, "two");
      let vertex3 = new Vertex(3, "thre");
      assert.equal(vertex1.degree, 0);
      vertex1.add(vertex2);
      vertex1.add(vertex2);
      assert.equal(vertex1.degree, 1);
      vertex1.add(vertex3);
      assert.equal(vertex1.degree, 2);
    });
    it('should update degree when edges are removed', function() {
      let vertex1 = new Vertex(1, "one");
      let vertex2 = new Vertex(2, "two");
      let vertex3 = new Vertex(3, "thre");
      vertex1.add(vertex2);
      vertex1.add(vertex3);
      assert.equal(vertex1.degree, 2);
      vertex1.delete(vertex3);
      assert.equal(vertex1.degree, 1);
      vertex1.delete(vertex2);
      assert.equal(vertex1.degree, 0);
      vertex1.delete(vertex2);
      assert.equal(vertex1.degree, 0);
    });

  });


  describe('#toString()', function() {
    it('should convert vertex to string format', function() {
      let vertex = new Vertex("1",{2:"3"});
      assert.deepEqual(vertex.toString(), STRING);
    });
  });

  describe('vertex.key/data', function() {
    it('should be able to get/set its key/data', function() {
      let vertex = new Vertex();
      vertex.key = KEY[1];
      assert.deepEqual(vertex, {key:KEY[1], data:null, degree:0 } );
      vertex.data = DATA[1];
      assert.deepEqual(vertex, {key:KEY[1], data:DATA[1], degree:0 } );
      vertex.key = null;
      vertex.data = null;
      assert.deepEqual(vertex, {key:null, data:null, degree:0 } );

    });
  });

  describe('vertex.delete()', function() {
    it('should delete vertex and all properties', function() {
      let vertex = new Vertex(1, "one");
      vertex.clear();
      assert.deepEqual(vertex, new Vertex());
    });
  });
});

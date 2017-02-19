'use strict'

const Vertex = require('../index.js');
const assert = require('assert');
const KEY = [1,2,3,4,5];
const DATA = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'];
const EMPTY = new Vertex();

const STRING = '{"key":"1","value":{"2":"3"}}';
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
    it('Vertex.deserialize() should be {1: "2":3}', function() {
      let test = new Vertex(1,{"2":3});
      assert.deepEqual(test, Vertex.deserialize(test.serialize()), true);
    });
  });

  describe('Vertex.fromString()', function() {
    it(`Vertex.fromString(${SIMPLE}) should be ${SIMPLE}`, function() {
      assert.deepEqual(Vertex.fromString(SIMPLE), SIMPLE);
    });
  });

});

describe('Vertex: Instance Methods', function() {

  describe('#constructor()', function() {
    it('new Vertex() should equal {key: null, value: null}', function() {
      assert.deepEqual(new Vertex(), {key:null, value:null} );
    });
    it('new Vertex(1, 2) should equal {key: 1, value: 2}', function() {
      assert.deepEqual(new Vertex(1,2), {key:1, value:2} );
    });
  });

  describe('#toString()', function() {
    it('should convert vertex to string format', function() {
      let vertex = new Vertex("1",{2:"3"});
      assert.deepEqual(vertex.toString(), STRING);
    });
  });

  describe('vertex.key/value', function() {
    it('should be able to get/set its key/value', function() {
      let vertex = new Vertex();
      vertex.key = KEY[1];
      assert.deepEqual(vertex, {key:KEY[1], value:null } );
      vertex.value = DATA[1];
      assert.deepEqual(vertex, {key:KEY[1], value:DATA[1] } );
      vertex.key = null;
      vertex.value = null;
      assert.deepEqual(vertex, {key:null, value:null } );

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

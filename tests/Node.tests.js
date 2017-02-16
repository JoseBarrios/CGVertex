'use strict'

const Node = require('../index.js');
const assert = require('assert');

const KEY = [1,2,3,4,5];
const DATA = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'];

const EMPTY = new Node();
describe('Node', function() {

  describe('#constructor()', function() {
    it('should create a new node', function() {
      let node = new Node();
      assert.deepEqual(node, {key:null, data:null} );
      node = new Node(1);
      assert.deepEqual(node, {key:KEY[0], data:null} );
      node = new Node(1, 'ONE');
      assert.deepEqual(node, {key:KEY[0], data:DATA[0]} );
      node = new Node(KEY[1], DATA[1]);
      assert.deepEqual(node, {key:KEY[1], data:DATA[1]} );
    });
  });

  describe('#data', function() {
    it('should be able to get/set its key/data', function() {
      let node = new Node();
      node.key = KEY[1];
      assert.deepEqual(node, {key:KEY[1], data:null} );
      node.data = DATA[1];
      assert.deepEqual(node, {key:KEY[1], data:DATA[1]} );
      node.key = null;
      node.data = null;
      assert.deepEqual(node, {key:null, data:null} );

    });
  });

  describe('Node.equal', function() {
    it('should return true of nodes are equal, false otherwise', function() {
      let node = new Node(KEY[0], DATA[0]);
      let target = new Node(KEY[0], DATA[0]);
      assert.equal(Node.equal(node, target), true);
      target = new Node(KEY[1], DATA[1]);
      assert.equal(Node.equal(node, target), false);
    });
  });

  describe('#addChild', function() {
    it('should be able to add children to itself', function() {
      let node = new Node(KEY[0], DATA[0]);
      let child = new Node(KEY[1], DATA[1]);
      node.addChild(child);
      assert.equal(node.getChild(child), child);
    });
  });


});

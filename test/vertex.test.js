"use strict"

const Vertex = require("../index.js");
const assert = require("assert");

const KEY = [1,2,3,4,5];
const DATA = ["ONE", "TWO", "THREE", "FOUR", "FIVE"];
const EMPTY = new Vertex();

const STRING = "{\"key\":\"1\",\"data\":{\"2\":\"3\"},\"degree\":0}";
const SIMPLE = new Vertex(1, {"2":"3"});


describe("Vertex: Static Methods", function() {

  describe("Vertex.equal(n1, n2)", function() {
    it("Vertex.equal(new Vertex(), new Vertex()) should be true", function() {
      assert.equal(Vertex.equal(new Vertex(), new Vertex()), true);
    });
    it("Vertex.equal(new Vertex(1,2), new Vertex(1,2)) should be true", function() {
      assert.equal(Vertex.equal(new Vertex(1,2), new Vertex(1,2)), true);
    });
    it("Vertex.equal(new Vertex(1,{1:2}), new Vertex(1,{1:2})) should be true", function() {
      assert.equal(Vertex.equal(new Vertex(1,{1:2}), new Vertex(1,{1:2})), true);
    });
    it("Vertex.equal(new Vertex({1:2},3), new Vertex({1:2},3)) should be true", function() {
      assert.deepEqual(Vertex.equal(new Vertex({1:2},3), new Vertex({1:2},3)), true);
    });
    it("Vertex.equal(new Vertex(1,2), new Vertex(2,1)) should be false", function() {
      assert.equal(Vertex.equal(new Vertex(1,2), new Vertex(2,1)), false);
    });

  });
});

describe("Vertex: Instance Methods", function() {

  describe("vertex.addNeighbour(data)", function() {

    it("should addNeighbour edge(s) to other vertex", function() {
      let vertex1 = new Vertex(1);
      vertex1.addNeighbour(2);
      assert.equal(vertex1.degree, 1);

      let vertex2 = new Vertex(2);
      vertex1.addNeighbour(vertex2);
      assert.equal(vertex1.degree, 2);

    });
    it("should check if current vertex edges target vertex", function() {
      let vertex1 = new Vertex(1);
      let vertex2 = new Vertex(2);
      let vertex3 = new Vertex(3);
      vertex1.addNeighbour(vertex2);
      assert.equal(vertex1.has(vertex2), true);
      assert.equal(vertex1.has(vertex3), false);
    });
    it("should delete vertex edge to target", function() {
      let vertex1 = new Vertex(1);
      // let vertex2 = new Vertex("two");
      let vertex2 = {complex:"data"};
      vertex1.addNeighbour(vertex2);
      assert.equal(vertex1.has(vertex2), true);
      assert.equal(vertex1.degree, 1);
      vertex1.delete(vertex2);
      console.log(vertex1.adjacencyList);
      assert.equal(vertex1.has(vertex2), false);
    });
  });

  describe("#degree", function() {
    it("should update degree when edges are added", function() {
      let vertex1 = new Vertex(1, "one");
      let vertex2 = new Vertex(2, "two");
      let vertex3 = new Vertex(3, "thre");
      assert.equal(vertex1.degree, 0);
      vertex1.addNeighbour(vertex2);
      vertex1.addNeighbour(vertex2);
      assert.equal(vertex1.degree, 1);
      vertex1.addNeighbour(vertex3);
      assert.equal(vertex1.degree, 2);
    });
    it("should update degree when edges are removed", function() {
      let vertex1 = new Vertex(1, "one");
      let vertex2 = new Vertex(2, "two");
      let vertex3 = new Vertex(3, "thre");
      vertex1.addNeighbour(vertex2);
      vertex1.addNeighbour(vertex3);
      assert.equal(vertex1.degree, 2);
      vertex1.delete(vertex3);
      assert.equal(vertex1.degree, 1);
      vertex1.delete(vertex2);
      assert.equal(vertex1.degree, 0);
      vertex1.delete(vertex2);
      assert.equal(vertex1.degree, 0);
    });

  });

  describe("vertex.adjacencyList", function() {
    it("should return vertex adjacency list", function() {
      let vertex1 = new Vertex("one");
      let vertex2 = new Vertex("two");
      let vertex3 = new Vertex("three");
      vertex1.addNeighbour(vertex2);
      vertex1.addNeighbour(vertex3);
      assert.deepEqual(vertex1.adjacencyList, ["one", vertex2, vertex3]);
    });
  });

  describe("vertex.delete()", function() {
    it("should delete vertex and all properties", function() {
      let vertex = new Vertex();
      let vertex2 = new Vertex();
      vertex.addNeighbour(vertex2);
      assert.equal(vertex.degree, 1);
      vertex.delete(vertex2);
      assert.deepEqual(vertex.degree, 0);
    });
  });
});
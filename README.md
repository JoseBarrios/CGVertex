# Usage

```javascript
//Initialize
let vertex = new Vertex('key', 'value');
let n1 = new Vertex(1, 'one');
let n2 = new Vertex(2, 'two');

//Append neighbours to vertex instance
vertex.addNeighbour(n1);
vertex.addNeighbour(n2);

//Get number of neighbours in vertex instance
let numNeighbours = vertex.degree; // 2

//Get all neighbours in vertex instance
let neighbourhood = vertex.neighbourhood();// Map {1:'one', 2:'two'}

vertex.hasNeighbour(1);// True
vertex.hasNeighbour(3);// False

vertex.getNeighbour(1);// "one"

vertex.delete(2);
vertex.getNeighbour(2);// "null"
numNeighbours = vertex.degree; // 1
neighbourhood = vertex.neighbourhood();// Map {1:'one'}

```

# Requirements

1. ES6, or compiler
2. Node ^4.4.4
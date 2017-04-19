'use strict';

module.exports = {
    isInRange,
    getNeighbours,
    getAll
};

var DIRECTIONS = [{
    x: 0,
    y: 1
}, {
    x: 0,
    y: -1
}, {
    x: 1,
    y: 0
}, {
    x: -1,
    y: 0
}, {
    x: 1,
    y: 1
}, {
    x: 1,
    y: -1
}, {
    x: -1,
    y: 1
}, {
    x: -1,
    y: -1
}];

function getAll(size) {
  var points = [];
  for (var x = 0; x < size.x; x++) {
      for (var y = 0; y < size.y; y++) {
          points.push({x,y});
      }
  }
  return points;
}


function getNeighbours(point, size) {
    return DIRECTIONS
        .map(d => add(point, d))
        .filter(n => isInRange(n, size));
}

function add(point, direction) {
    return {
        x: point.x + direction.x,
        y: point.y + direction.y
    };
}

function isInRange(point, size) {
    return point.x < size.x && point.x >= 0 && point.y < size.y && point.y >= 0;
}

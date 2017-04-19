'use strict';

var covers = require('./covers.js');
var board = require('./field.js');
var geo = require('./geometry.js');

var field;
var events = [];

module.exports = {
    start,
    quit,
    uncover,
    flag,
    getEvents
};

function getEvents() {
  return events;
}

function start(minesCount, size) {
    field = board.populate(minesCount, size);
    return geo
      .getAll(size)
      .map(update);
}

function quit() {
    return covers
      .uncoverRange(field.covers, field.mines)
      .map(update);
}

function flag(point) {
    covers.switchFlag(field.covers, point);
    return update(point);
}

function uncover(point) {
    return board
        .uncoverDeep(field, point)
        .map(update);
}

function update(point) {
  var e = {
      point: point,
      value: getCellValue(point)
  };
  events.push(e);
  return e;
}

function getCellValue(point) {
    return covers.isCovered(field.covers, point) ?
        (covers.hasFlag(field.covers, point) ? "flagged" : "covered") :
        (board.hasMineAt(field, point) ? "mine" : board.getWarningsAt(field, point));
}

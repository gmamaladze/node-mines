'use strict';

var repository = require('./repository.js');

var covers = require('./logic/covers.js');
var board = require('./logic/field.js');
var geo = require('./logic/geometry.js');

module.exports = {
    getAll,
    getCell,
    uncover,
    triggerFlag
};

function getAll(id) {
    var field = repository.load(id);
    if (!field) {
        return;
    }

    return geo
        .getAll(field.size)
        .map((point) => createUpdate(field, point));
}

function getCell(id, x, y) {
    var cell = toCell(id, x, y);
    if (!cell) {
        return;
    }
    return toUpdate(cell);
}

function triggerFlag(id, x, y) {
    var cell = toCell(id, x, y);
    if (!cell) {
        return;
    }

    covers.switchFlag(cell.field.covers, cell.point);
    repository.save(cell.field);
    return toUpdate(cell);
}

function uncover(id, x, y) {
    var cell = toCell(id, x, y);
    if (!cell) {
        return;
    }
    var result = board
        .uncoverDeep(cell.field, cell.point)
        .map((point) => createUpdate(cell.field, point));
console.log(result);
    repository.save(cell.field);
    return result;
}

function toCell(id, x, y) {
    var field = repository.load(id);
    if (!field) {
        return;
    }

    var point = {
        x,
        y
    };

    if (!geo.isInRange(point, field.size)) {
        return;
    }

    return {
        field,
        point
    };
}

function toUpdate(cell) {
    return createUpdate(cell.field, cell.point);
}

function createUpdate(field, point) {
    return {
        point: point,
        value: getCellValue(field, point)
    };
}

function getCellValue(field, point) {
    return covers.isCovered(field.covers, point) ?
        (covers.hasFlag(field.covers, point) ? "flagged" : "covered") :
        (board.hasMineAt(field, point) ? "mine" : board.getWarningsAt(field, point));
}

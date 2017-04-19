'use strict';

var geo = require('./geometry.js');
var hashmap = require('./hashmap.js');
var toHashmap = hashmap.toHashmap;
var getKey = hashmap.getKey;

module.exports = {
    create,
    switchFlag,
    uncover,
    uncoverRange,
    isCovered,
    hasFlag,
    getUnflaggedCount
};

function create(size) {
    var allPoints = geo.getAll(size);
    return toHashmap(allPoints, (p) => getKey(p), (p) => false);
}

function switchFlag(covers, point) {
    if (!isCovered(covers, point)) {
        return;
    }
    covers[getKey(point)] = !hasFlag(covers, point);
    return covers;
}

function uncover(covers, point) {
    delete covers[getKey(point)];
    return covers;
}

function uncoverRange(covers, points) {
    points.forEach((p) => uncover(covers, p));
    return covers;
}

function isCovered(covers, point) {
    return covers[getKey(point)] !== undefined;
}

function hasFlag(covers, point) {
    return covers[getKey(point)] === true;
}

function getUnflaggedCount(covers) {
    return covers.filter((f) => f !== true).length;
}

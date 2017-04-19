'use strict';

var geo = require('./geometry.js');
var covers = require('./covers.js');
var hashmap = require('./hashmap.js');
var getKey = hashmap.getKey;


module.exports = {
    uncoverDeep,
    hasMineAt,
    getWarningsAt
};


function uncoverDeep(field, point) {
    if (!covers.isCovered(field.covers, point)) {
        return [];
    }

    covers.uncover(field.covers, point);

    if (!isEmptyAt(field, point)) {
        return [point];
    }
    return geo
        .getNeighbours(point, field.size)
        .reduce((current, neighbor) => {
            return current.concat(uncoverDeep(field, neighbor));
        }, [point]);
}

function hasMineAt(field, point) {
    return field.mines[getKey(point)] !== undefined;
}

function getWarningsAt(field, point) {
    var value = field.warnings[getKey(point)];
    return value ? value : 0;
}

function isEmptyAt(field, point) {
    return !hasMineAt(field, point) && getWarningsAt(field, point) === 0;
}

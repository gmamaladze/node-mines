'use strict';

var geo = require('./geometry.js');
var covers = require('./covers.js');
var getKey = require('./hashmap.js').getKey;


module.exports = {
    populate,
    uncoverDeep,
    hasMineAt,
    getWarningsAt
};

function populate(minesCount, size, random = (max) => Math.floor(Math.random() * max)) {
    var mines = createRandomMines(minesCount, size, random);
    var warnings = calculateWarnings(mines, size);
    return {
        size,
        mines,
        warnings,
        covers: covers.create(size)
    };
}

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

function createRandomMines(minesCount, size, random) {
    var mines = [];
    while (mines.length < minesCount) {
        var mine = {
            x: random(size.x),
            y: random(size.y)
        };

        if (mines[getKey(mine)]) {
            continue;
        }
        mines[getKey(mine)] = mine;
        mines.push(mine);
    }
    return mines;
}

function calculateWarnings(mines, size) {
    var a1 = mines.map(m => geo.getNeighbours(m, size));
    var a2 = [].concat.apply([], a1);
      return  a2.map(p => getKey(p)).
        reduce(function(acc, val) {
            if (acc[val]) {
                acc[val] = acc[val] + 1;
            } else {
                acc.push(val);
                acc[val] = 1;
            }
            return acc;
        }, []);
}

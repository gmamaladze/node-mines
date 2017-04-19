'use strict';

var shortid = require('shortid');

var geo = require('./geometry.js');
var covers = require('./covers.js');
var getKey = require('./hashmap.js').getKey;
var level = require('./level.js');

module.exports = {
    create
};


function create(levelName, random = (max) => Math.floor(Math.random() * max)) {
    var levelInfo = level.byName(levelName);
    var minesCount = levelInfo.minesCount;
    var size = levelInfo.size;

    var mines = createRandomMines(minesCount, size, random);
    var warnings = calculateWarnings(mines, size);
    return {
        id: shortid.generate(),
        level: levelInfo.name,
        size,
        mines,
        warnings,
        covers: covers.create(size),
        state: 'in-progress'
    };
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
    return a2.map(p => getKey(p)).
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

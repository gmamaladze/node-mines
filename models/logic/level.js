'use strict';

var hashmap = require('./hashmap.js');

module.exports = {
  byName
};

const levels = hashmap.toHashmap([{
        name: 'Beginner',
        size: {
            x: 8,
            y: 8
        },
        minesCount: 10
    },
    {
        name: 'Intermediate',
        size: {
            x: 16,
            y: 16
        },
        minesCount: 40
    },
    {
        name: 'Expert',
        size: {
            x: 24,
            y: 24
        },
        minesCount: 99
    }
], (val) => val.name);

function byName(name) {
    var level = levels[name];
    return level ? level : levels.Beginner;
}

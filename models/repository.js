'use strict';

var repository = {};

module.exports = {
    load,
    loadMin,
    save,
    getIds,
    remove
};

function load(id) {
    return repository[id];
}

function loadMin(id) {
    return strip(load(id));
}

function save(obj) {
    repository[obj.id] = obj;
    return obj;
}

function getIds() {
    return Object.keys(repository);
}

function remove(id) {
    var obj = load(id);
    delete repository[id];
    return obj;
}

function strip(game) {
    if (!game) {
        return;
    }
    return {
        id: game.id,
        level: game.level,
        size: game.size,
        state: game.state
    };
}

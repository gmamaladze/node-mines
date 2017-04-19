'use strict';

var repository = require('./repository.js');
var factory = require('./logic/factory.js');

module.exports = {
    all,
    get,
    create,
    remove
};

function all() {
    return repository.
    getIds().
    map(id => repository.loadMin(id));
}

function get(id) {
    return repository.loadMin(id);
}

function create(level) {
    var game = factory.create(level);

    game = repository.save(game);
    return repository.loadMin(game.id);
}

function remove(id) {
    var game = repository.loadMin(id);
    repository.remove(id);
    return game;
}

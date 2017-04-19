'use strict';

var model = require('../models/gameModel.js');

module.exports = {
    getAll,
    getGame,
    postGame,
    deleteGame
};

function getAll(req, res, next) {
    var all = model.all();
    res.status(200).json(all);
}

function getGame(req, res, next) {
    var id = req.params.id;
    var game = model.get(id);
    if (game) {
        res.status(200).json(game);
    } else {
        res.status(404).end();
    }
}

function postGame(req, res, next) {
    var level = req.body.level ? req.body.level : req.params.level;
    console.log(req.body);
    var game = model.create(level);
    res.status(200).json(game);
}

function deleteGame(req, res, next) {
    var id = req.params.id;
    var game = model.remove(id);
    if (game) {
        res.status(200).json(game);
    } else {
        res.status(404).end();
    }
}

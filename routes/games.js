'use strict';

var express = require('express');
var router = express.Router();

var gameController = require('../controllers/gamesController.js');
var cells = require('./cells.js');

module.exports = router;

/* GET list of games currently running. */
router.get('/', gameController.getAll);

/* POST start a new game */
router.post('/', gameController.postGame);

/* GET current game state */
router.get('/:id/', gameController.getGame);

/* DELETE delete the game */
router.delete('/:id/', gameController.deleteGame);

/* delegate to cells router */
router.use('/:id/cells', cells);

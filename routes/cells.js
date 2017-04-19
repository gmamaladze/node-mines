'use strict';

var express = require('express');
//{mergeParams: true} - needed to access params from parent router
var router = express.Router({mergeParams: true});
var cellsController = require('../controllers/cellsController.js');

module.exports = router;

/* GET current value of all cells */
router.get('/', cellsController.getAll);

/* GET current value of particular cell */
router.get('/:x.:y', cellsController.getCell);

router.delete('/:x.:y/cover', cellsController.deleteCover);

router.put('/:x.:y/flag', cellsController.putFlag);

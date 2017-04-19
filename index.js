'use strict';

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var game = require('./game.js');

var app = express();
app.use(bodyParser.json());

var server = http.createServer(app);

var size = {
    x: 9,
    y: 9
};

game.start(10, size);

app.use(express.static('public'));

app.get('/size', function(req, res) {
    res.status(200).json(size);
});

app.get('/events', function(req, res) {
    res.status(200).json(game.getEvents());
});

app.post('/uncover', function(req, res) {
    var point = req.body;
    var result = game.uncover(point);
    res.status(201).json(result);
});

app.post('/flag', function(req, res) {
    var point = req.body;
    var result = game.flag(point);
    res.status(201).json(result);
});

server.listen(3000);

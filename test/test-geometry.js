"use strict";

var expect = require('chai').expect;
var geo = require('../geometry.js');

var size = {
    x: 10,
    y: 10
};


describe('Geometry', function() {
    describe('isInRange', function() {

        it('some point from middle is in range', function() {
            expect(geo.isInRange({x:1,y:5}, size)).to.be.true;
        });

        it('some point outside is not in range', function() {
            expect(geo.isInRange({x:15,y:5}, size)).to.be.false;
        });

        it('upper edge is in range', function() {
            expect(geo.isInRange({x:0,y:0}, size)).to.be.true;
        });

        it('bottom edge is in range', function() {
            expect(geo.isInRange({x:9,y:9}, size)).to.be.true;
        });

        it('one beside edge is not in range', function() {
            expect(geo.isInRange({x:10,y:9}, size)).to.be.false;
        });

    });

    describe('getNeighbours', function() {

        it('some point from middle has 8 neighbours', function() {
            expect(geo.getNeighbours({x:5,y:5}, size).length).to.be.eql(8);
        });

        it('some point outside is has 0 neighbours', function() {
            expect(geo.getNeighbours({x:15,y:5}, size).length).to.be.eql(0);
        });

        it('a corner has 3 neighbours', function() {
            expect(geo.getNeighbours({x:0,y:0}, size).length).to.be.eql(3);
        });

        it('a cell on the edge has 5 neighbours', function() {
            expect(geo.getNeighbours({x:5,y:9}, size).length).to.be.eql(5);
        });


    });

});

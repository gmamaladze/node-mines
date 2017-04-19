"use strict";

var expect = require('chai').expect;
var board = require('../board.js');

describe('Board', function() {
    describe('baord.populate', function() {
        it('should have correct size', function() {
            var size  = {x:10,y:10};
            expect(board.populate(10, size).size).to.be.equal(size);
        });

        it('should have correct number of mines', function() {
            var size  = {x:10,y:10};
            var minesCount = 10;
            expect(board.populate(minesCount, size).mines.length).to.be.equal(minesCount);
        });

        it('mines should map to values', function() {
          var size  = {x:10,y:10};
          var minseCount = 10;
          var mines = board.populate(minseCount, size).mines;
          mines.forEach( m  => expect(mines[JSON.stringify(m)]).to.be.equal(m));
        });

        it('initially all cells are covered', function() {
          var size  = {x:10,y:16};
          var minesCount = 10;
          var populated = board.populate(minesCount, size);
          var covers = populated.covers;

          for (var x = 0; x < size.x; x++) {
            for (var y = 0; y < size.y; y++) {
              expect(covers[JSON.stringify({x,y})]).to.be.eql({x,y});
            }
          }
        });

        it('warnings are set coorectly', function() {
          var populated = board.populate(1, {x:3,y:3}, (m) => 1);
          var warnings = populated.warnings;
          console.log(warnings);

          expect(warnings[JSON.stringify({x:0, y:0})]).to.be.equal(1);
          expect(warnings[JSON.stringify({x:0, y:1})]).to.be.equal(1);
          expect(warnings[JSON.stringify({x:0, y:2})]).to.be.equal(1);
          expect(warnings[JSON.stringify({x:1, y:0})]).to.be.equal(1);
          expect(warnings[JSON.stringify({x:1, y:1})]).to.be.equal(0);
          expect(warnings[JSON.stringify({x:1, y:2})]).to.be.equal(1);
          expect(warnings[JSON.stringify({x:2, y:0})]).to.be.equal(1);
          expect(warnings[JSON.stringify({x:2, y:1})]).to.be.equal(1);
          expect(warnings[JSON.stringify({x:2, y:1})]).to.be.equal(1);
        });
    });
});

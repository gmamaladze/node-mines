"use strict";

var expect = require('chai').expect;
var covers = require('../covers.js');

var size = {
    x: 10,
    y: 10
};


describe('Covers', function() {
    describe('create', function() {

        it('has all 100 elements', function() {
          var actual = covers.create(size);
            for (var x = 0; x < size.x; x++) {
                for (var y = 0; y < size.y; y++) {
                    expect(actual[JSON.stringify({x,y})]).not.to.be.eql(undefined);
                }
            }
        });
    });
});

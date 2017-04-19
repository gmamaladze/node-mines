'use strict';

module.exports = {
    toHashmap,
    getKey
};

/**
 *Turn an array into a hashmap.
 *@param {Array} arr - array of objects.
 *@param {Function} key - gets the array element object, returns somthing to be used as key.
 *@param {Function} value - gets the array element object, returns somthing to be used as value.
 *@returns {Map}
 **/
function toHashmap(arr, key = (val) => getKey(val), value = (val) => val) {
    return arr.reduce(function(map, obj) {
        map[key(obj)] = value(obj);
        return map;
    }, {});
}

function getKey(point) {
    return JSON.stringify(point);
}

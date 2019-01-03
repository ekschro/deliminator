'use strict';

var _require = require('ramda'),
    curry = _require.curry;

var delimData = curry(function (delimiter, data) {
    return '' + data + delimiter;
});

var diceData = curry(function (delimiter, data) {
    return data.split(delimiter);
});

var trimData = curry(function (arr, chunks) {
    return {
        complete: arr.slice(0, arr.length - 1),
        pending: '' + chunks + arr[arr.length - 1]
    };
});

var diceAndTrimData = curry(function (delimiter, data, chunks) {
    return trimData(diceData(delimiter, data), chunks);
});

var create = function create(delimiter) {
    return {
        delimit: delimData(delimiter),
        dice: diceData(delimiter),
        diceAndTrim: diceAndTrimData(delimiter)
    };
};

module.exports = { create: create };
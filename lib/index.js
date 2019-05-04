"use strict";

var _require = require('ramda'),
  curry = _require.curry;

var delimData = curry(function (delimiter, data) {
  return "".concat(data).concat(delimiter);
});
var diceData = curry(function (delimiter, data) {
  return data.split(delimiter);
});
var diceDataAsync = curry(async function (delimiter, data) {
  return data.split(delimiter);
});

var trimData = function trimData(arr) {
  return {
    complete: arr.slice(0, arr.length - 1),
    pending: arr[arr.length - 1]
  };
};

var trimDataAsync = async function trimDataAsync(arr) {
  return {
    complete: arr.slice(0, arr.length - 1),
    pending: arr[arr.length - 1]
  };
};

var diceAndTrimData = curry(function (delimiter, data, chunks) {
  return trimData(diceData(delimiter, "".concat(chunks).concat(data)));
});
var diceAndTrimDataAsync = curry(async function (delimiter, data, chunks) {
  try {
    var diced = await diceDataAsync(delimiter, "".concat(chunks).concat(data));
    return trimDataAsync(diced);
  } catch (err) {
    return;
  }
});

var create = function create(delimiter) {
  return {
    delimit: delimData(delimiter),
    dice: diceData(delimiter),
    diceAndTrim: diceAndTrimData(delimiter)
  };
};

var createAsync = function createAsync(delimiter) {
  return {
    delimit: delimData(delimiter),
    dice: diceDataAsync(delimiter),
    diceAndTrim: diceAndTrimDataAsync(delimiter)
  };
};

module.exports = {
  create: create,
  createAsync: createAsync
};
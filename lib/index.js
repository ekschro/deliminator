'use strict';

var _require = require('ramda'),
    curry = _require.curry;

var delimData = curry(function (delimiter, data) {
  return '' + data + delimiter;
});

var diceData = curry(function (delimiter, data) {
  return data.split(delimiter);
});

var diceDataAsync = curry(function (delimiter, data) {
  return new Promise(function (resolve) {
    resolve(data.split(delimiter));
  });
});

var trimData = function trimData(arr) {
  return {
    complete: arr.slice(0, arr.length - 1),
    pending: arr[arr.length - 1]
  };
};

var trimDataAsync = function trimDataAsync(arr) {
  return new Promise(function (resolve) {
    resolve({
      complete: arr.slice(0, arr.length - 1),
      pending: arr[arr.length - 1]
    });
  });
};

var diceAndTrimData = curry(function (delimiter, data, chunks) {
  return trimData(diceData(delimiter, '' + chunks + data));
});

var diceAndTrimDataAsync = curry(function (delimiter, data, chunks) {
  return diceDataAsync(delimiter, '' + chunks + data).then(trimDataAsync).catch(function (err) {
    return err;
  });
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

module.exports = { create: create, createAsync: createAsync };
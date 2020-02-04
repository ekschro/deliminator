"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const delimData = d => data => `${data}${d}`;

const diceData = d => data => data.split(d);

const trimData = arr => ({
  complete: arr.slice(0, arr.length - 1),
  pending: arr[arr.length - 1]
});

const diceAndTrimData = d => (data, chunks) => trimData(diceData(d)(`${chunks}${data}`));

const diceDataAsync = d =>
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (data) {
    return diceData(d)(data);
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

const trimDataAsync =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(function* (arr) {
    return trimData(arr);
  });

  return function trimDataAsync(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

const diceAndTrimDataAsync = d =>
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(function* (data, chunks) {
    const diced = yield diceDataAsync(d)(`${chunks}${data}`);
    return trimDataAsync(diced);
  });

  return function (_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

const create = d => ({
  delimit: delimData(d),
  dice: diceData(d),
  diceAndTrim: diceAndTrimData(d)
});

const createAsync = d => ({
  delimit: delimData(d),
  dice: diceDataAsync(d),
  diceAndTrim: diceAndTrimDataAsync(d)
});

module.exports = {
  create,
  createAsync
};
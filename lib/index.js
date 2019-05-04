"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('ramda'),
    curry = _require.curry;

var delimData = curry(function (delimiter, data) {
  return "".concat(data).concat(delimiter);
});
var diceData = curry(function (delimiter, data) {
  return data.split(delimiter);
});
var diceDataAsync = curry(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(delimiter, data) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", data.split(delimiter));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

var trimData = function trimData(arr) {
  return {
    complete: arr.slice(0, arr.length - 1),
    pending: arr[arr.length - 1]
  };
};

var trimDataAsync =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(arr) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", trimData(arr));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function trimDataAsync(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var diceAndTrimData = curry(function (delimiter, data, chunks) {
  return trimData(diceData(delimiter, "".concat(chunks).concat(data)));
});
var diceAndTrimDataAsync = curry(
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(delimiter, data, chunks) {
    var diced;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return diceDataAsync(delimiter, "".concat(chunks).concat(data));

          case 3:
            diced = _context3.sent;
            return _context3.abrupt("return", trimDataAsync(diced));

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return");

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

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
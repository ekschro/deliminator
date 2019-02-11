const { curry } = require('ramda');

const delimData = curry(
  (delimiter, data) => `${data}${delimiter}`,
);

const diceData = curry(
  (delimiter, data) => data.split(delimiter),
);

const diceDataAsync = curry((delimiter, data) => new Promise((resolve) => {
  resolve(data.split(delimiter));
}));

const trimData = arr => ({
  complete: arr.slice(0, arr.length - 1),
  pending: arr[arr.length - 1],
});

const trimDataAsync = arr => new Promise((resolve) => {
  resolve({
    complete: arr.slice(0, arr.length - 1),
    pending: arr[arr.length - 1],
  });
});

const diceAndTrimData = curry(
  (delimiter, data, chunks) => trimData(diceData(delimiter, `${chunks}${data}`)),
);

const diceAndTrimDataAsync = curry(
  (delimiter, data, chunks) => diceDataAsync(delimiter, `${chunks}${data}`).then(trimDataAsync).catch(err => err),
);

const create = delimiter => ({
  delimit: delimData(delimiter),
  dice: diceData(delimiter),
  diceAndTrim: diceAndTrimData(delimiter),
});

const createAsync = delimiter => ({
  delimit: delimData(delimiter),
  dice: diceDataAsync(delimiter),
  diceAndTrim: diceAndTrimDataAsync(delimiter),
});

module.exports = { create, createAsync };

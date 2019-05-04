const { curry } = require('ramda');

const delimData = curry(
  (delimiter, data) => `${data}${delimiter}`,
);

const diceData = curry(
  (delimiter, data) => data.split(delimiter),
);

const diceDataAsync = curry(async (delimiter, data) => data.split(delimiter));

const trimData = arr => ({
  complete: arr.slice(0, arr.length - 1),
  pending: arr[arr.length - 1],
});

const trimDataAsync = async arr => ({
  complete: arr.slice(0, arr.length - 1),
  pending: arr[arr.length - 1],
});

const diceAndTrimData = curry(
  (delimiter, data, chunks) => trimData(diceData(delimiter, `${chunks}${data}`)),
);

const diceAndTrimDataAsync = curry(
  async (delimiter, data, chunks) => {
    try {
      const diced = await diceDataAsync(delimiter, `${chunks}${data}`);
      return trimDataAsync(diced);
    }
    catch (err) {
      return;
    }
  },
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

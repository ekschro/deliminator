const { curry } = require('ramda')

const delimData = curry(
    (delimiter, data) => `${data}${delimiter}`
);

const diceData = curry(
    (delimiter, data) => data.split(delimiter)
);

const trimData = curry(
    (arr, chunks) => ({
        complete: arr.slice(0,arr.length - 1),
        pending: `${chunks}${arr[arr.length - 1]}`
    })
);

const diceAndTrimData = curry(
    (delimiter, data, chunks) =>  trimData(diceData(delimiter,data), chunks)
);

const create = delimiter => ({
    delimit: delimData(delimiter),
    dice: diceData(delimiter),
    diceAndTrim: diceAndTrimData(delimiter)
});

module.exports = { create };

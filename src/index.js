const delimData = delimiter => data => `${data}${delimiter}`;

const diceData = delimiter => data => data.split(delimiter);

const diceDataAsync = delimiter => async data => data.split(delimiter);

const trimData = arr => ({ complete: arr.slice(0, arr.length - 1), pending: arr[arr.length - 1] });

const trimDataAsync = async arr => trimData(arr);

const diceAndTrimData = delimiter => (data, chunks) => trimData(diceData(delimiter)(`${chunks}${data}`));

const diceAndTrimDataAsync = delimiter => async (data, chunks) => {
  const diced = await diceDataAsync(delimiter)(`${chunks}${data}`);
  return trimDataAsync(diced);
};

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

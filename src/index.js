const delimData = d => data => `${data}${d}`;

const diceData = d => data => data.split(d);

const trimData = arr => ({ complete: arr.slice(0, arr.length - 1), pending: arr[arr.length - 1] });

const diceAndTrimData = d => (data, chunks) => trimData(diceData(d)(`${chunks}${data}`));

const diceDataAsync = d => async data => diceData(d)(data);

const trimDataAsync = async arr => trimData(arr);

const diceAndTrimDataAsync = d => async (data, chunks) => {
  const diced = await diceDataAsync(d)(`${chunks}${data}`);
  return trimDataAsync(diced);
};

const create = d => ({
  delimit: delimData(d),
  dice: diceData(d),
  diceAndTrim: diceAndTrimData(d),
});

const createAsync = d => ({
  delimit: delimData(d),
  dice: diceDataAsync(d),
  diceAndTrim: diceAndTrimDataAsync(d),
});

module.exports = { create, createAsync };

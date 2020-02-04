let deliminator = require('../src/index');

test('Test delimit() method.  Should return "hello;;"',
  () => {
    let d = deliminator.createAsync(';;');
    expect(d.delimit('hello')).toBe('hello;;');
  });

test('Test delimit() method.  Should return "hello;aehkadfhfworld;aehkadfhf!;aehkadfhf"',
  () => {
    let d = deliminator.createAsync(';aehkadfhf');

    let delimitedData = '';

    delimitedData += d.delimit('hello');
    delimitedData += d.delimit('world');
    delimitedData += d.delimit('!');

    expect(delimitedData).toBe('hello;aehkadfhfworld;aehkadfhf!;aehkadfhf');
  });

test('Test dice() method.  Should return ["hello", "world", "!", ""]',
  () => {
    let d = deliminator.createAsync(';;;');

    let delimitedData = '';

    delimitedData += d.delimit('hello');
    delimitedData += d.delimit('world');
    delimitedData += d.delimit('!');

    d.dice(delimitedData).then(res => expect(res).toEqual(['hello', 'world', '!', '']));
  });

test('Test diceAndTrim() method.  Should return {complete: ["hello", "world", "!"], pending: ""}',
  () => {
    let d = deliminator.createAsync(';;;');

    let delimitedData = '';
    let pending = '';

    delimitedData += d.delimit('hello');
    delimitedData += d.delimit('world');
    delimitedData += d.delimit('!');

    d.diceAndTrim(delimitedData, pending).then(res => expect(res)
      .toEqual({
        complete: ['hello', 'world', '!'],
        pending: '',
      }));
  });

test('Test diceAndTrim() method.  Should return {complete: ["hello", "world", "!"], pending: "incomplete"}',
  () => {
    let d = deliminator.createAsync(';;;');

    let delimitedData = '';
    let pending = 'incomplete';

    delimitedData += d.delimit(' now completed');
    delimitedData += d.delimit('world');
    delimitedData += d.delimit('!');

    d.diceAndTrim(delimitedData, pending).then(res => expect(res)
      .toEqual({
        complete: ['incomplete now completed', 'world', '!'],
        pending: '',
      }));
  });

test('Test diceAndTrim() method.  Should return {complete: ["hello", "world", "!"], pending: "incomplete data"}',
  () => {
    let d = deliminator.createAsync('$$$');

    let delimitedData = '';
    let pending = 'incomplete';

    delimitedData += d.delimit(' hello');
    delimitedData += d.delimit('world');
    delimitedData += d.delimit('!');
    delimitedData += 'more incomplete data';

    d.diceAndTrim(delimitedData, pending).then(res => expect(res)
      .toEqual({
        complete: ['incomplete hello', 'world', '!'],
        pending: 'more incomplete data',
      }));
  });

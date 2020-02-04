var deliminator = require('../src/index');

test('Test delimit() method.  Should return "hello;;"',
  () => {
    var d = deliminator.createAsync(';;');
    expect(d.delimit('hello')).toBe('hello;;');
  });

test('Test delimit() method.  Should return "hello;aehkadfhfworld;aehkadfhf!;aehkadfhf"',
  () => {
    var d = deliminator.createAsync(';aehkadfhf');

    let delimitedData = '';

    delimitedData += d.delimit('hello');
    delimitedData += d.delimit('world');
    delimitedData += d.delimit('!');

    expect(delimitedData).toBe('hello;aehkadfhfworld;aehkadfhf!;aehkadfhf');
  });

test('Test dice() method.  Should return ["hello", "world", "!", ""]',
  () => {
    var d = deliminator.createAsync(';;;');

    let delimitedData = '';

    delimitedData += d.delimit('hello');
    delimitedData += d.delimit('world');
    delimitedData += d.delimit('!');

    d.dice(delimitedData).then(res => expect(res).toEqual(['hello', 'world', '!', '']));
  });

test('Test diceAndTrim() method.  Should return {complete: ["hello", "world", "!"], pending: ""}',
  () => {
    var d = deliminator.createAsync(';;;');

    let delimitedData = '';
    var pending = '';

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
    var d = deliminator.createAsync(';;;');

    let delimitedData = '';
    var pending = 'incomplete';

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
    var d = deliminator.createAsync('$$$');

    let delimitedData = '';
    var pending = 'incomplete';

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

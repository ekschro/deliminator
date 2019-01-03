const deliminator = require('../src/index');

test('Test delimit() method.  Should return "hello;;"',
    () => {
        const d = deliminator.create(';;');
        expect(d.delimit('hello')).toBe('hello;;')
    }
);

test('Test delimit() method.  Should return "hello;aehkadfhfworld;aehkadfhf!;aehkadfhf"',
    () => {
        const d = deliminator.create(';aehkadfhf');

        let delimitedData = '';

        delimitedData += d.delimit('hello');
        delimitedData += d.delimit('world');
        delimitedData += d.delimit('!'); 

        expect(delimitedData).toBe('hello;aehkadfhfworld;aehkadfhf!;aehkadfhf');
    }
);

test('Test dice() method.  Should return ["hello", "world", "!", ""]',
    () => {
        const d = deliminator.create(';;;');

        let delimitedData = '';

        delimitedData += d.delimit('hello');
        delimitedData += d.delimit('world');
        delimitedData += d.delimit('!'); 

        expect(d.dice(delimitedData)).toEqual(["hello", "world", "!", ""]);
    }
);

test('Test diceAndTrim() method.  Should return {complete: ["hello", "world", "!"], pending: ""}',
    () => {
        const d = deliminator.create(';;;');

        let delimitedData = '';
        let pending = '';

        delimitedData += d.delimit('hello');
        delimitedData += d.delimit('world');
        delimitedData += d.delimit('!'); 

        expect(d.diceAndTrim(delimitedData, pending))
            .toEqual({
                complete: ["hello", "world", "!"],
                pending: ''
            });
    }
);

test('Test diceAndTrim() method.  Should return {complete: ["hello", "world", "!"], pending: "incomplete"}',
    () => {
        const d = deliminator.create(';;;');

        let delimitedData = '';
        let pending = 'incomplete';

        delimitedData += d.delimit('hello');
        delimitedData += d.delimit('world');
        delimitedData += d.delimit('!'); 

        expect(d.diceAndTrim(delimitedData, pending))
            .toEqual({
                complete: ["hello", "world", "!"],
                pending: 'incomplete'
            });
    }
);

test('Test diceAndTrim() method.  Should return {complete: ["hello", "world", "!"], pending: "incomplete data"}',
    () => {
        const d = deliminator.create('$$$');

        let delimitedData = '';
        let pending = 'incomplete';

        delimitedData += d.delimit('hello');
        delimitedData += d.delimit('world');
        delimitedData += d.delimit('!');
        delimitedData += ' data';

        expect(d.diceAndTrim(delimitedData, pending))
            .toEqual({
                complete: ["hello", "world", "!"],
                pending: 'incomplete data'
            });
    }
);
import test from 'ava';

import InputParser from '../lib/input-parser';
import ParseError from '../lib/input-parse-error';

const parser = new InputParser();

test('Parse correctly', t => {
	const input = {
		vowels: [
			{front: 1, close: 1, round: true, label: 'y'},
			{front: 0, close: 0, round: false, 'x-sampa': 'A'},
		],
	};
	const expected = {
		vowels: [
			{front: 1, close: 1, round: true, label: 'y'},
			{front: 0, close: 0, round: false, label: 'ɑ'},
		],
	};
	const result = parser.parse(input);
	t.deepEqual(result, expected);
});

function testMissingRequiredField(t, input, errorClass) {
	t.throws(() => {
		parser.parse(input);
	}, errorClass);
}

test(
	'Missing basic vowel quality',
	testMissingRequiredField,
	{
		vowels: [{front: 1, close: 1, label: 't'}],
	},
	ParseError
);

test(
	'Missing label',
	testMissingRequiredField,
	{
		vowels: [{front: 1, close: 1, round: 1}],
	},
	ParseError
);

test(
	'Too many labels',
	testMissingRequiredField,
	{
		vowels: [{front: 1, close: 1, round: true, label: 'x', 'x-sampa': 'x'}],
	},
	ParseError
);

test(
	'Front value too big',
	testMissingRequiredField,
	{
		vowels: [{front: 1, close: 1, round: true, label: 'x', 'x-sampa': 'x'}],
	},
	ParseError
);

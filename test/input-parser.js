import test from 'ava';

import InputParser from '../lib/input-parser';
import ParseError from '../lib/input-parse-error';

const parser = new InputParser();

function parseCorrectly(t, input, expected) {
	const result = parser.parse(input);
	t.deepEqual(result, expected);
}

test(
	'Test integer numbers',
	parseCorrectly,
	{vowels: [{front: 0, close: 1, round: true, label: 'u'}]},
	{vowels: [{front: 0, close: 1, round: true, label: 'u'}]}
);

test(
	'Test decimal',
	parseCorrectly,
	{vowels: [{front: 0.5, close: 0.1, round: false, 'x-sampa': '6'}]},
	{vowels: [{front: 0.5, close: 0.1, round: false, label: 'ɐ'}]}
);

test(
	'Test fraction',
	parseCorrectly,
	{vowels: [{front: 0, close: '2/3', round: true, label: 'o'}]},
	{vowels: [{front: 0, close: 2 / 3, round: true, label: 'o'}]}
);

function testInvalidInput(t, input, errorClass) {
	t.throws(() => {
		parser.parse(input);
	}, errorClass);
}

test(
	'Missing basic vowel quality',
	testInvalidInput,
	{
		vowels: [{front: 1, close: 1, label: 't'}],
	},
	ParseError
);

test(
	'Missing label',
	testInvalidInput,
	{
		vowels: [{front: 1, close: 1, round: 1}],
	},
	ParseError
);

test(
	'Too many labels',
	testInvalidInput,
	{
		vowels: [{front: 1, close: 1, round: true, label: 'x', 'x-sampa': 'x'}],
	},
	ParseError
);

test(
	'Front value too big',
	testInvalidInput,
	{
		vowels: [{front: 1, close: 1, round: true, label: 'x', 'x-sampa': 'x'}],
	},
	ParseError
);

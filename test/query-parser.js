import test from 'ava';

import QueryParser from '../lib/query-parser';

const parser = new QueryParser();

test('Parse single vowel', parse, 'v=f1c0ula', {
	vowels: [
		{
			front: 1,
			close: 0,
			round: false,
			label: 'a',
		},
	],
});

test('Parse vowel with decimals', parse, 'v=f.5c0.5ulə', {
	vowels: [
		{
			front: 0.5,
			close: 0.5,
			round: false,
			label: 'ə',
		},
	],
});

test('Parse vowel with fraction', parse, 'v=f1/2c1/2ulə', {
	vowels: [
		{
			front: '1/2',
			close: '1/2',
			round: false,
			label: 'ə',
		},
	],
});

test('Parse more vowels', parse, 'v=f1c0ula&v=f1c1uxi', {
	vowels: [
		{
			front: 1,
			close: 0,
			round: false,
			label: 'a',
		},
		{
			front: 1,
			close: 1,
			round: false,
			'x-sampa': 'i',
		},
	],
});

function parse(t, input, output) {
	const actual = parser.parse(input);
	t.deepEqual(actual, output);
}

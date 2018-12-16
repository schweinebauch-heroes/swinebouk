import test from 'ava';

import QueryParser from '../lib/query-parser';

const parser = new QueryParser();

test('Parse single vowel', parse, 'v=f0c0ula', {
	vowels: [
		{
			close: 0,
			front: 0,
			label: 'a',
			round: false,
		},
	],
});

test('Parse two vowels', parse, 'v=f0c0ula&v=f1c1uxi', {
	vowels: [
		{
			close: 0,
			front: 0,
			label: 'a',
			round: false,
		},
		{
			close: 1,
			front: 1,
			round: false,
			'x-sampa': 'i',
		},
	],
});

function parse(t, input, output) {
	const actual = parser.parse(input);
	t.deepEqual(actual, output);
}

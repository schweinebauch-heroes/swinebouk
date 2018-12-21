import test from 'ava';

import QueryParser from '../lib/query-parser';

const parser = new QueryParser();

test('Parse single vowel', parse, 'v=f1c1ula', {
	vowels: [
		{
			close: 1,
			front: 1,
			round: false,
			label: 'a',
		},
	],
});

test('Parse two vowels', parse, 'v=f1c1ula&v=f12c12uxi', {
	vowels: [
		{
			close: 1,
			front: 1,
			round: false,
			label: 'a',
		},
		{
			close: 12,
			front: 12,
			round: false,
			'x-sampa': 'i',
		},
	],
});

function parse(t, input, output) {
	const actual = parser.parse(input);
	t.deepEqual(actual, output);
}

import test from 'ava';
import VowelLang from '../lib/vowel-lang';
import Vowel from '../lib/vowel';
import {
	Openness as O,
	Frontness as F,
	Roundness as R
} from '../lib/articulation';

test('Parse single vowel', t => {
	const parser = new VowelLang();
	const actualVowel = parser.parse('open+front+unrounded=a');
  t.deepEqual(actualVowel, new Map([['open+front+unrounded', 'a']]));
});

test('Parse two vowels', t => {
	const parser = new VowelLang();
	const actualVowel = parser.parse('open+front+unrounded=a&close+front+unrounded=i');
	const expectedVowels = new Map([
		['open+front+unrounded', 'a'],
		['close+front+unrounded', 'i']
	]);
  t.deepEqual(actualVowel, expectedVowels);
});

test('Parses text to vowel', t => {
	const parser = new VowelLang();
	const vowelsToTest = [
		['open+front+unrounded', 'a', new Vowel(O.open, F.front, R.unrounded, 'a')],
		['openMid+back+rounded', 'ɔ', new Vowel(O.openMid, F.back, R.rounded, 'ɔ')],
		// Mock vowel that does not exist
		['nearOpen+back+rounded', 'O', new Vowel(O.nearOpen, F.back, R.rounded, 'O')],
		// Default symbols are correctly found
		['open+front+unrounded', null, new Vowel(O.open, F.front, R.unrounded, 'a')]
	];
  vowelsToTest.forEach(v => {
    t.deepEqual(parser.textToVowel(v[0], v[1]), v[2]);
  });
});

test('Incomplete string throws an error', t => {
	const parser = new VowelLang();
  t.throws(() => parser.textToVowel('open+front'), TypeError);
});

test('Unrecognized manners of articulation throw an error', t => {
	const parser = new VowelLang();
  t.throws(() => parser.textToVowel('open+almostFront+rounded'), TypeError);
});

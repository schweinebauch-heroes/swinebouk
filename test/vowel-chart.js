import test from 'ava';

import Vowel from '../lib/vowel';
import VowelChart from '../lib/vowel-chart';
import {
	Openness as O,
	Frontness as F,
	Roundness as R
} from '../lib/articulation';

test('Calculates the primary set positions correctly', t => {
	const chart = new VowelChart(120);
	const c1 = new Vowel(O.close, F.front, R.unrounded);
	const c2 = new Vowel(O.closeMid, F.front, R.unrounded);
	const c3 = new Vowel(O.openMid, F.front, R.unrounded);
	const c4 = new Vowel(O.open, F.front, R.unrounded);
	const c5 = new Vowel(O.open, F.back, R.unrounded);
	const c6 = new Vowel(O.openMid, F.back, R.unrounded);
	const c7 = new Vowel(O.closeMid, F.back, R.unrounded);
	const c8 = new Vowel(O.close, F.back, R.unrounded);

  t.is(chart.vowelX(c1), 12);
  t.is(chart.vowelX(c2), 28);
  t.is(chart.vowelX(c3), 44);
  t.is(chart.vowelX(c4), 60);
  t.is(chart.vowelX(c5), 108);
  t.is(chart.vowelX(c6), 108);
  t.is(chart.vowelX(c7), 108);
  t.is(chart.vowelX(c8), 108);

  t.is(chart.vowelY(c1), 12);
  t.is(chart.vowelY(c2), 36);
  t.is(chart.vowelY(c3), 60);
  t.is(chart.vowelY(c4), 84);
  t.is(chart.vowelY(c5), 84);
  t.is(chart.vowelY(c6), 60);
  t.is(chart.vowelY(c7), 36);
  t.is(chart.vowelY(c8), 12);
});

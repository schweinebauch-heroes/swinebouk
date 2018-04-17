const Snap = require('snapsvg-cjs');
const _ = require('lodash');

const VowelChart = require('./vowel-chart');
const {findDefaultVowel} = require('./vowel-list');

const {
	Openness: O,
	Frontness: F,
	Roundness: R
} = require('./articulation');

class VowelPlotter {
	constructor(props) {
		this.width = props.width;
		this.height = props.height;
		this.vowelList = props.vowelList;
		this.vowelChart = new VowelChart(this.props.width);
	}

	svgRender() {
		this.snap = new Snap(this.svgElem);
		this.snap.clear();
		this.drawBorder();
		_.each(this.vowelList, v => this.markVowel(v));
	}

	get borderAttr() {
		this._borderAttr = this._borderAttr || {fill: 'none', stroke: 'black'};
		return this._borderAttr;
	}

	get markAttr() {
		this._markAttr = this._markAttr || {fill: 'black', stroke: 'black'};
		return this._markAttr;
	}

	get labelAttr() {
		this._labelAttr = this._labelAttr || {
			'alignment-baseline': 'middle',
			fill: 'black',
			'font-size': `${this.vowelChart.textSize}px`,
			'text-anchor': 'middle'
		};
		return this._labelAttr;
	}

	drawBorder() {
		const coordinatePairs = [
			this.vowelChart.vowelXY(findDefaultVowel(O.close, F.front, R.unrounded)),
			this.vowelChart.vowelXY(findDefaultVowel(O.close, F.back, R.rounded)),
			this.vowelChart.vowelXY(findDefaultVowel(O.open, F.back, R.unrounded)),
			this.vowelChart.vowelXY(findDefaultVowel(O.open, F.front, R.unrounded))
		];
		const formattedPairs = _.map(coordinatePairs, p => p.join(','));
		const points = formattedPairs.join(' ');
		const polygon = this.snap.polygon(points);
		polygon.attr(this.borderAttr);
	}

	markVowel(vowel, label = null) {
		this.markVowelCircle(vowel);
		this.labelVowel(vowel, label);
	}

	markVowelCircle(vowel) {
		const circle = this.snap.circle(
			this.vowelChart.vowelX(vowel),
			this.vowelChart.vowelY(vowel),
			this.vowelChart.vowelMarkRadius,
		);
		circle.attr(this.markAttr);
	}

	labelVowel(vowel, label = null) {
		label = label || vowel.symbol;
		const shift = this.vowelChart.textDistance * (vowel.rounded ? 1 : -1);
		const text = this.snap.text(
			this.vowelChart.vowelX(vowel) + shift,
			this.vowelChart.vowelY(vowel),
			label,
		);
		text.attr(this.labelAttr);
	}
}

module.exports = VowelPlotter;

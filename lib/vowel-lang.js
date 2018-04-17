const _ = require('lodash');

const Vowel = require('./vowel');
const {Openness, Frontness, Roundness} = require('./articulation');
const {findDefaultVowel} = require('./vowel-list');

/**
 * Takes a query string and returns an array of vowels.
 *
 * @example
 * (new VowelLang()).parse("mid-central=ə")
 */
class VowelLang {
	/**
	 * @param {string} query The string that represents a chart.
	 * @returns {Map<String, String>} A map of vowel representations to the
	 * symbols to be used.
	 */
	parse(query) {
		const kvAsString = query.split('&');
		const kvAsArray = kvAsString.map(kvPair => kvPair.split('='));
		const kvDecoded = kvAsArray.map(kvPair => [
			decodeURIComponent(kvPair[0]),
			kvPair[1],
		]);
		const map = new Map(kvDecoded);
		return map;
	}

	/**
	 * @param {string} text A string like "open+front+unrounded".
	 * @param {string} symbol A symbol, like "i".
	 * @returns {Vowel} The corresponding vowel.
	 * @example textToVowel("open+front+unrounded") # new Vowel(1, 1, false)
	 * @example textToVowel("close+front+unrounded", 'i') # new Vowel(0, 1, false, 'i')
	 */
	textToVowel(text, symbol) {
		const [openness, frontness, roundness] = text.split('+');
		if (![openness, frontness, roundness].every(e => _.isString(e))) {
			throw new TypeError(`Unparseable: ${text}`);
		}
		const unrecognizedProperties = {};
		if (!_.has(Openness, openness)) {
			unrecognizedProperties.openness = openness;
		}
		if (!_.has(Frontness, frontness)) {
			unrecognizedProperties.frontness = frontness;
		}
		if (!_.has(Roundness, roundness)) {
			unrecognizedProperties.roundness = roundness;
		}
		if (!_.isEmpty(unrecognizedProperties)) {
			const kvPairs = _.map(unrecognizedProperties, v => `"${v}"`);
			throw new TypeError(`Unrecognized ${kvPairs.join(', ')}`);
		}
		const o = Openness[openness];
		const f = Frontness[frontness];
		const r = Roundness[roundness];
		if (!symbol) {
			try {
				return findDefaultVowel(o, f, r);
			} catch (e) {
				return new Vowel(o, f, r, symbol);
			}
		}
		return new Vowel(o, f, r, symbol);
	}
}

module.exports = VowelLang;

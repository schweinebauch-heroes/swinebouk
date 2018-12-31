const {parse: parseQueryString} = require('querystring');

const vowelPattern = /f([\d/.]+)c([\d/.]+)(r|u)(l|x)(.*)/;

const SchemaValidator = require('./schema-validator');
const ParseError = require('./input-parse-error');

module.exports = class QueryParser {
	constructor(validator = new SchemaValidator()) {
		this._validator = validator;
	}

	parse(query) {
		const data = parseQueryString(query);
		if (data.v && !Array.isArray(data.v)) {
			data.v = [data.v];
		}
		const [isValid, errors] = this._validator.validateQuery(data);
		if (!isValid) {
			throw new ParseError('Invalid query string', errors);
		}
		const vowels = data.v.map(parseVowelString);
		return {vowels};
	}
};

function parseVowelString(vowelString) {
	const matches = vowelString.match(vowelPattern);
	const [, rawFront, rawClose, rawRound, labelKind, label] = matches;
	const front = parseNumber(rawFront);
	const close = parseNumber(rawClose);
	const round = rawRound === 'r';
	const labelKey = labelKind === 'l' ? 'label' : 'x-sampa';
	return {
		front,
		close,
		round,
		[labelKey]: label,
	};
}

function parseNumber(rawNumber) {
	return rawNumber.includes('/') ? rawNumber : Number.parseFloat(rawNumber);
}

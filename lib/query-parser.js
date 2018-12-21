const {parse: parseQueryString} = require('querystring');

const SchemaValidator = require('./schema-validator');
const ParseError = require('./input-parse-error');

const vowelStringPattern = /^f(\d{1,2})c(\d{1,2})([ru])?(l|x)([^;,/?:@&=$#]+)$/;

module.exports = class QueryParser {
	constructor(validator = new SchemaValidator()) {
		this._validator = validator;
	}

	parse(query) {
		const data = parseQueryString(query);
		const [isValid, errors] = this._validator.validateQuery(data);
		if (!isValid) {
			throw new ParseError('Invalid query string', errors);
		}
		const rawVowels = Array.isArray(data.v) ? data.v : [data.v];
		const vowels = rawVowels.map(parseVowelString);
		return {vowels};
	}
};

function parseVowelString(vowelString) {
	const matches = vowelString.match(vowelStringPattern);
	const [, rawFront, rawClose, rawRound, labelKind, label] = matches;
	const front = Number.parseInt(rawFront, 10);
	const close = Number.parseInt(rawClose, 10);
	const round = rawRound === 'r';
	const labelKey = labelKind === 'l' ? 'label' : 'x-sampa';
	return {
		front,
		close,
		round,
		[labelKey]: label,
	};
}

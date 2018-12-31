const translate = require('x-sampa');

const SchemaValidator = require('./schema-validator');
const InputParseError = require('./input-parse-error');

module.exports = class SwineboukInputParser {
	constructor(validator = null) {
		this.validator = validator || new SchemaValidator();
	}

	parse(data) {
		const [isValid, errors] = this.validator.validateInput(data);
		if (!isValid) {
			throw new InputParseError('Invalid vowel chart', errors);
		}
		const vowels = data.vowels.map(v => ({
			front: parseFractionOfOne(v.front),
			close: parseFractionOfOne(v.close),
			round: v.round,
			label: v.label || translate(v['x-sampa']),
		}));
		return {vowels};
	}
};

function parseFractionOfOne(rawNumber) {
	if (typeof rawNumber === 'number') {
		return rawNumber;
	}
	const [n, d] = rawNumber.split('/');
	return n / d;
}

const Ajv = require('ajv');

const readSchema = require('./read-schema');

module.exports = class QueryValidator {
	constructor(ajvOptions = {allErrors: true}) {
		const schemas = [readSchema('schema/query.json')];
		const ajv = new Ajv({...ajvOptions, schemas});
		this.validatorFunction = ajv.getSchema('swinebouk/schema/query.json');
	}

	validate(data) {
		const isValid = this.validatorFunction(data);
		if (isValid) {
			return [true, []];
		}
		return [false, this.validatorFunction.errors];
	}
};

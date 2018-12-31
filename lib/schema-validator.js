const Ajv = require('ajv');

const schemas = require('./schemas');

module.exports = class SwineboukSchemaValidator {
	constructor(ajvOptions = {allErrors: true}) {
		this.ajvOptions = ajvOptions;
	}

	validateInput(data) {
		return this._validate('input', data);
	}

	validateNormal(data) {
		return this._validate('normal', data);
	}

	validateQuery(data) {
		return this._validate('query', data);
	}

	_validate(schema, data) {
		const isValid = this._getValidatorFunctions().get(schema)(data);
		if (isValid) {
			return [true, []];
		}
		return [false, this._getValidatorFunctions().get(schema).errors];
	}

	_getValidatorFunctions() {
		if (!this._validatorMap) {
			const names = ['defs', 'input', 'normal', 'query'];
			const schemaArray = names.map(n => schemas[n]);
			const ajv = new Ajv({schemas: schemaArray, ...this.ajvOptions});
			ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));
			const entries = names.map(n => [
				n,
				ajv.getSchema(`swinebouk/schema/${n}.json`),
			]);
			this._validatorMap = new Map(entries);
		}
		return this._validatorMap;
	}
};

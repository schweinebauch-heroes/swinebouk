module.exports = class InputParseError extends Error {
	constructor(message, errors) {
		super(message);
		this.errors = errors;
	}
};

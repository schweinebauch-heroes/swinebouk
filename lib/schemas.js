const readSchema = require('./read-schema');

module.exports = {
	defs: readSchema(`schema/defs.json`),
	input: readSchema(`schema/input.json`),
	normal: readSchema(`schema/normal.json`),
	query: readSchema(`schema/query.json`),
};

const {join} = require('path');
const {readFileSync} = require('fs');

function readSchema(name) {
	const path = join(__dirname, `../${name}`);
	const schema = JSON.parse(readFileSync(path, {encoding: 'utf-8'}));
	return schema;
}

module.exports = readSchema;

# swinebouk

[![Travis](https://img.shields.io/travis/schweinebauch-heroes/swinebouk.svg)](https://travis-ci.org/schweinebauch-heroes/swinebouk)

Engine for plotting vowels

## Data Schemas

### Input Schema

This schema is supposed to be used for describing a vowel chart with plain text.

### Normalised Schema

This schema is an intermediate representation, normalised out of the "Input Schema" with only literal labels instead of X-SAMPA-encoded ones.

### Query Schema

This schema is used for validating query strings. After parsing the query string with `require('querystring').parse`, data is validated against `swinebouk/schema/query.json`.

Each vowel is described as a string in the form `f<frontness>c<closeness><roundness><label>`, where:

- "frontness" is a number between 0 and 1, e.g. "0", "0.2", ".7", "1"
- "closeness" is a number between 0 and 1, in the same manner of "frontness",
- "roundness" is the letter "u" (unrounded) or "r" (rounded),
- "label" is one of the following:
  - "l", followed by any characters valid as a query string value e.g. `"l%2F%C9%99%2F"` for "/ə/", or `"%2Fə%2F"` (if internationalized URIs are supported),
	- "x", followed by any characters valid as a query string value, which then get translated from X-SAMPA to IPA, e.g. `"@"` for "ə".

Examples:

- `v=f0c0ula` (back open unrounded vowel with label "a")
- `v=f.5c.5ux%40` (mid-central vowel with X-SAMPA-encoded label "@" or "%40" when decoded with `decodeUriComponent`)
- `v=f0c0ula&v=f.5c.5ulə` (equivalent to two previous)

## Usage

To validate input or query strings:

```js
const {SchemaValidator} = require('swinebouk');

const validator = new SchemaValidator();

validator.validateInput({vowels: [{front: 1, close: 1, round: false, label: 'i'}]});
validator.validateNormal({vowels: [{front: 1, close: 1, round: false, label: 'i'}]});
validator.validateQuery('v=f0c0ula');
```

To transform input schema or query schema-formed data into a normal representation:

```js
const {InputParser, QueryParser} = require('swinebouk');

new InputParser().parse({
	vowels: [
		{front: 0.5, close: 0.5, round: false, 'x-sampa': '@'},
		{front: 1, close: 1, round: true, label: 'y'},
	];
});
// { vowels:
//    [ { front: 0.5, close: 0.5, round: false, label: 'ə' },
//      { front: 1, close: 1, round: true, label: 'y' } ] }

new QueryParser().parse('v=f.5c.5ulə&v=f1c1rly');
// { vowels:
//    [ { front: 0.5, close: 0.5, round: false, label: 'ə' },
//      { front: 1, close: 1, round: true, label: 'y' } ] }
```

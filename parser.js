var PEG = require('pegjs');
var assert = require('assert');
var fs = require('fs'); // for loading files

// Read file contents
var data = fs.readFileSync('peg_grammar', 'utf-8');
// Show the PEG grammar file
console.log(data);
// Create my parser
var parse = PEG.buildParser(data).parse;
// Do a test
//simple expression
assert.deepEqual( parse("(a b c)"), ["a", "b", "c"] );
//expression with extraneous whiteSpace
assert.deepEqual( parse("(a b c\n)"), ["a", "b", "c"] );
//quoted Expression
assert.deepEqual( parse("'(a b c)"), ["quote",["a", "b", "c"]] );
//nested expression
assert.deepEqual( parse("(a (b) c (d))"), ["a", ["b"], "c",["d"]] );
//expression with comments
assert.deepEqual( parse("(a b c);;(a b c d e)"), ["a", "b", "c"] );
quotedExpression=parse("'(a b c)");

console.log(quotedExpression);

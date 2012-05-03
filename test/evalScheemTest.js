//require.paths.push('/usr/lib/node_modules');

if (typeof module !== 'undefined') {
    // In Node.js load required modules
    var assert = require('chai').assert;
    var PEG = require('pegjs');
    var fs = require('fs');
    var evalScheem = require('../scheem_interpreter.js').evalScheem;
    var parse = PEG.buildParser(fs.readFileSync(
        '/home/uday/code/PL101/grammar.peg', 'utf-8')).parse;
} else {
    // In browser assume loaded by <script>
    var parse = SCHEEM.parse;
    var assert = chai.assert;
}


suite('quote', function() {
    test('a number', function() {
        assert.deepEqual(
            evalScheem(['quote', 3], {}),
            3
        );
    });
    test('an atom', function() {
        assert.deepEqual(
            evalScheem(['quote', 'dog'], {}),
            'dog'
        );
    });
    test('a list', function() {
        assert.deepEqual(
            evalScheem(['quote', [1, 2, 3]], {}),
            [1, 2, 3]
        );
    });
});

suite('+', function() {
    test('two numbers', function() {
        assert.deepEqual(
            evalScheem(['+', 3,3], {}),
            6
        );
    });

});

suite('cons', function() {
    test('two numbers', function() {
        assert.deepEqual(
            evalScheem(['cons', 3,3], {}),
            [3, 3]
        );
    });

});

import test from 'ava';
let index = require("./index")

test('math string to math array', t => {
	t.deepEqual(index.mathStrToArray("2*3+5"), [ 2, '*', 3, '+', 5 ])
});

test('math array to reverse polish notation', t => {
	t.deepEqual(index.toRPN([ 2, '*', 3, '+', 5 ]), [2, 3, "*", 5, "+"])
})

test('RPN array to final calculation', t => {
	t.is(index.calculateOnRPN([2, 3, "*", 5, "+"]), 11)
})
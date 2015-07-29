
import Magic from './magic.js';
const { keys, defineProperty } = Object;

export default class Node {
	constructor(context, calculator) {
	this.context = context;
	this.calculator = calculator;
	}

	calculate(data, dsl) {
	const calculator = this.calculator(data, dsl);
	const magic = keys(calculator).reduce((memo, key) => {
		const value = calculator[key];
		const isFunction = 'function' === typeof value;

		defineProperty(memo, key, (
			isFunction ?
			property({ get() { return value.call(magic) }}) :
			property({ value }))
		);
		return memo;
	}, new Magic);
	return magic;
	}
}

function property(descriptor) {
	descriptor.enumerable = true;
	return descriptor;
}

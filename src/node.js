const { keys, defineProperty } = Object;

export default class Node {
	constructor(context, calculator) {
		this.context = context;
		this.calculator = calculator;
	}

	compute(data, dsl) {
		const calculator = this.calculator(data, dsl);
		const membrane = keys(calculator).reduce((memo, key) => {
			const value = calculator[key];
			const isFunction = 'function' === typeof value;

			defineProperty(memo, key, (
				isFunction ?
				property({ get() { return value.call(membrane) }}) :
				property({ value })));

			return memo;
		}, {});
		return membrane;
	}
}

function property(descriptor) {
	descriptor.enumerable = true;
	return descriptor;
}

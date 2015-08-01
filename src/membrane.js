const { keys, defineProperty } = Object;

export default function createMembraneFactory(calculatorFactory) {
	let isInitialized = false;

	return (data, dsl) => new Membrane(data, dsl);

	function Membrane(target, dsl) {
		this.target = target;
		this.dsl = dsl;
		this.calculator = calculatorFactory(target, dsl);

		// LAZY GETTER CREATION:
		if (isInitialized) return;

		keys(this.calculator).forEach(key => {
			const value = this.calculator[key];
			const isFunction = 'function' === typeof value;

			defineProperty(Membrane.prototype, key,
				isFunction ?
				property({ get() { return value.call(this); }}) :
				property({ value }))});

		isInitialized = true;
	}
}

function property(descriptor) {
	descriptor.enumerable = true;
	return descriptor;
}

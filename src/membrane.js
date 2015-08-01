const { keys, defineProperty } = Object;

export default function createMembraneFactory(calculatorFactory) {
	let isInitialized = false;

	class Membrane {

		constructor(target, dsl) {
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
					property({ value }));
			});

			isInitialized = true;
		}
	}
	return (data, dsl) => new Membrane(data, dsl);
}

function property(descriptor) {
	descriptor.enumerable = true;
	return descriptor;
}

const { keys, defineProperty } = Object;

class Exemplar {
	constructor(target, dsl) {
		this.target = target;
		this.dsl = dsl;
	}
}

export default function createMembraneFactory(calculatorFactory) {
	let isInitialized = false;

	class Membrane extends Exemplar {

		constructor(target, dsl) {
			super(target, dsl);
			this.calculator = calculatorFactory(target, dsl);
			this.initialize();
		}

		initialize() {
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

		isInitialized() {
			return isInitialized;
		}
	};
	return (data, dsl) => new Membrane(data, dsl);
}

function property(descriptor) {
	descriptor.enumerable = true;
	return descriptor;
}

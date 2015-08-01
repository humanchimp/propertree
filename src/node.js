import createMembraneFactory from './membrane'

export default class Node {
	constructor(context, calculator) {
		this.context = context;
		this.calculator = calculator;
		this.compute = createMembraneFactory(calculator);
	}
}

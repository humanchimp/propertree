import Node from './node.js';
import dsl from './dsl.js';

const { defineProperty } = Object;

export default class Graph {
	constructor() {
		this.nodes = new Map();
	}

	addNode(key, node) {
		this.nodes.set(key, new Node(key, node));
		this.makeGetter(key);
		return this;
	}

	removeNode(key) {
		this.nodes.delete(key);
		return this;
	}

	getNode(key) {
		return this.nodes.get(key);
	}

	makeGetter(key) {
		defineProperty(this, key, { get() {
			return this.calculate()[key];
		}});
	}

	calculate(data, nodes=[...this.nodes.entries()]) {
		return nodes.map(([key, node]) =>
				[key, node.calculate(data[key], dsl)])
			.reduce((memo, [key, value]) => {
				memo[key] = value;
				return memo;
			}, {});
	}
}

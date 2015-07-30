import Node from './node.js';
import dsl from './dsl.js';

export default class Graph {
	constructor() {
		this.nodes = new Map();
	}

	node(key, node) {
		this.nodes.set(key, new Node(key, node));
		return this;
	}

	compute(data, nodes=[...this.nodes.entries()]) {
		return nodes.map(([key, node]) =>
				[key, node.compute(data[key], dsl)])
			.reduce((memo, [key, computed]) => {
				memo[key] = computed;
				return memo;
			}, {});
	}
}

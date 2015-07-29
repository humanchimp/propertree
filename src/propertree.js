
import dsl from './dsl.js';
import Graph from './graph.js';

export default function propertree() {
	const graph = new Graph();
	const zoomer = key => graph.getNode(key);
	Object.setPrototypeOf(zoomer, graph);
	return zoomer;
};

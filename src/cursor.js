import last from 'lodash/array/last';

const { keys, defineProperty } = Object;

export default function cursor(funcs) {
	class Cursor {
		constructor() { clear(this) }

		handler() {
			this.callbacks.forEach(callback =>
				callback.call(this, last(this.stack)));
		}
	}

	keys(funcs).forEach(func =>
		defineProperty(Cursor.prototype, func, {
			value() {
				apply(this, func, funcs[func]);
				return this;
			}
		}));

	return Cursor;
}

function clear(cursor) {
	cursor.stack = [];
	cursor.callbacks = [];
}

function apply(cursor, action, impl) {
	cursor.stack.push({
		action, step: impl(last(cursor.stack)),
	});
}

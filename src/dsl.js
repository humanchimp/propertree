import traverse from './traverse.js';

export default dsl;

Object.assign(dsl, {
	// TODO: this is crazy, but I'm doing this for the time being because I
	//       don't want to think about boring html escaping.
	html: dsl,

	traverse

});

function dsl(strings, ...values) {
	return values.map((value, i) => {
			if ('function' === typeof value) {
				value = value();
			}
			return strings[i] + value;
		}).join("");
}

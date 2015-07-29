export default dsl;

Object.assign(dsl, {
	foo() {}
});

function dsl(strings, ...values) {
	return values.map((value, i) => {
			if ('function' === typeof value) {
				value = value();
			}
			value = safeString(value);
			return strings[i] + value;
		}).join("");
}

function safeString(str) {
	return str;
}
